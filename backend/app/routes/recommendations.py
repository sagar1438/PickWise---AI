from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.recommendation import (
    RecommendationItem,
    RecommendationRequest,
    RecommendationResponse,
)
from app.services.recommendation_service import get_recommendations

router = APIRouter(
    prefix="/api/recommendations",
    tags=["Recommendations"],
)


@router.post("/", response_model=RecommendationResponse)
def create_recommendation(
    request: RecommendationRequest,
    db: Session = Depends(get_db),
):
    ranked_models = get_recommendations(db, request)

    recommendations = []

    for item in ranked_models:
        model = item["model"]

        recommendations.append(
            RecommendationItem(
                model_id=model.id,
                model_name=model.name,
                provider=model.provider.name,
                score=item["score"],
                strengths=[],
                weaknesses=[],
                why_recommended="This model matches the provided requirements based on the current scoring criteria.",
            )
        )

    return RecommendationResponse(
        recommendations=recommendations,
    )