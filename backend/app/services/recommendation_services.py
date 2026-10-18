from sqlalchemy.orm import Session, joinedload

from app.database.models import Model
from app.schemas.recommendation import RecommendationRequest


def calculate_weights(request: RecommendationRequest) -> dict[str, float]:
    weights = {
        "cost": 0.30,
        "speed": 0.25,
        "quality": 0.20,
        "context": 0.15,
        "features": 0.10,
    }

    priority_weights = {
        "cost": {
            "cost": 0.45,
            "speed": 0.20,
            "quality": 0.15,
            "context": 0.10,
            "features": 0.10,
        },
        "speed": {
            "cost": 0.20,
            "speed": 0.45,
            "quality": 0.15,
            "context": 0.10,
            "features": 0.10,
        },
        "quality": {
            "cost": 0.15,
            "speed": 0.15,
            "quality": 0.45,
            "context": 0.15,
            "features": 0.10,
        },
    }

    weights = priority_weights.get(request.priority, weights).copy()

    if request.budget == "low":
        weights["cost"] += 0.10
        weights["quality"] -= 0.05
        weights["speed"] -= 0.05

    elif request.budget == "high":
        weights["quality"] += 0.05
        weights["speed"] += 0.05
        weights["cost"] -= 0.10

    return weights


def calculate_context_score(model: Model, request: RecommendationRequest) -> float:
    if not model.capabilities:
        return 0.0

    context_window = model.capabilities.context_window

    if request.large_context:
        if context_window >= 200_000:
            return 100.0
        if context_window >= 128_000:
            return 85.0
        if context_window >= 64_000:
            return 65.0
        return 40.0

    if context_window >= 128_000:
        return 100.0
    if context_window >= 64_000:
        return 85.0

    return 70.0


def calculate_feature_score(model: Model, request: RecommendationRequest) -> float:
    required_features = [
        (request.vision, model.capabilities.supports_vision if model.capabilities else False),
        (request.audio, model.capabilities.supports_audio if model.capabilities else False),
        (request.tools, model.capabilities.supports_tools if model.capabilities else False),
    ]

    required = [supported for is_required, supported in required_features if is_required]

    if not required:
        return 100.0

    return sum(required) / len(required) * 100.0


def calculate_task_score(model: Model, request: RecommendationRequest) -> float:
    if not request.task:
        return 100.0

    if not model.metrics:
        return 0.0

    task_scores = {
        "chat": model.metrics.quality_score,
        "coding": model.metrics.coding_score,
        "reasoning": model.metrics.reasoning_score,
        "vision": (
            100.0
            if model.capabilities and model.capabilities.supports_vision
            else 0.0
        ),
        "embeddings": model.metrics.quality_score,
        "other": model.metrics.quality_score,
    }

    return float(task_scores.get(request.task, model.metrics.quality_score))


def calculate_match_score(model: Model, request: RecommendationRequest) -> float:
    if not model.metrics:
        return 0.0

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

    return round(max(0.0, min(100.0, score)), 2)


def get_recommendations(
    db: Session,
    request: RecommendationRequest,
) -> list[dict]:
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