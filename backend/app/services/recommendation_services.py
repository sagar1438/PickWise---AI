from sqlalchemy.orm import Session, joinedload

from app.database.models import Model
from app.schemas.recommendation import RecommendationRequest


def calculate_weights(request: RecommendationRequest):
    weights = {
        "cost": 0.30,
        "speed": 0.25,
        "quality": 0.20,
        "context": 0.15,
        "features": 0.10,
    }

    if request.priority == "cost":
        weights = {
            "cost": 0.45,
            "speed": 0.20,
            "quality": 0.15,
            "context": 0.10,
            "features": 0.10,
        }

    elif request.priority == "speed":
        weights = {
            "cost": 0.20,
            "speed": 0.45,
            "quality": 0.15,
            "context": 0.10,
            "features": 0.10,
        }

    elif request.priority == "quality":
        weights = {
            "cost": 0.15,
            "speed": 0.15,
            "quality": 0.45,
            "context": 0.15,
            "features": 0.10,
        }

    return weights


def calculate_context_score(model, request: RecommendationRequest):
    if not model.capabilities:
        return 0

    context_window = model.capabilities.context_window

    if request.large_context:
        if context_window >= 200000:
            return 100
        if context_window >= 128000:
            return 85
        if context_window >= 64000:
            return 65
        return 40

    if context_window >= 128000:
        return 100
    if context_window >= 64000:
        return 85

    return 70


def calculate_feature_score(model, request: RecommendationRequest):
    if not model.capabilities:
        return 0

    capability_matches = 0
    capability_requirements = 0

    requirements = [
        (request.vision, model.capabilities.supports_vision),
        (request.audio, model.capabilities.supports_audio),
        (request.tools, model.capabilities.supports_tools),
    ]

    for required, supported in requirements:
        if required:
            capability_requirements += 1

            if supported:
                capability_matches += 1

    if capability_requirements == 0:
        return 100

    return (capability_matches / capability_requirements) * 100


def calculate_task_score(model, request: RecommendationRequest):
    if not request.task:
        return 100

    if not model.metrics:
        return 0

    task_scores = {
        "chat": model.metrics.quality_score,
        "coding": model.metrics.coding_score,
        "reasoning": model.metrics.reasoning_score,
        "vision": (
            100
            if model.capabilities and model.capabilities.supports_vision
            else 0
        ),
        "embeddings": model.metrics.quality_score,
        "other": model.metrics.quality_score,
    }

    return task_scores.get(
        request.task,
        model.metrics.quality_score,
    )


def calculate_match_score(model, request: RecommendationRequest):
    if not model.metrics:
        return 0

    weights = calculate_weights(request)

    feature_score = (
        calculate_feature_score(model, request) * 0.5
        + calculate_task_score(model, request) * 0.5
    )

    score = (
        model.metrics.cost_score * weights["cost"]
        + model.metrics.speed_score * weights["speed"]
        + model.metrics.quality_score * weights["quality"]
        + calculate_context_score(model, request) * weights["context"]
        + feature_score * weights["features"]
    )

    return round(score, 2)


def get_recommendations(
    db: Session,
    request: RecommendationRequest,
):
    models = (
        db.query(Model)
        .options(
            joinedload(Model.provider),
            joinedload(Model.metrics),
            joinedload(Model.capabilities),
        )
        .all()
    )

    ranked_models = [
        {
            "model": model,
            "score": calculate_match_score(model, request),
        }
        for model in models
    ]

    ranked_models.sort(
        key=lambda item: item["score"],
        reverse=True,
    )

    return ranked_models[:3]