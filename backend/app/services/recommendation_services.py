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


