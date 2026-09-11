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
