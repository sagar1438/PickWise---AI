from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.recommendation import (
    RecommendationItem,
    RecommendationRequest,
    RecommendationResponse,
)
from app.services.ai_service import (
    generate_recommendation_explanation,
    parse_requirements,
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
    try:
        parsed_requirements = parse_requirements(request.requirements)

        request_data = request.model_dump()

        for field in [
            "budget",
            "priority",
            "task",
        ]:
            if request_data[field] is None:
                request_data[field] = parsed_requirements.get(field)

        for field in [
            "vision",
            "audio",
            "tools",
            "large_context",
        ]:
            if not request_data[field]:
                request_data[field] = parsed_requirements.get(field, False)

        structured_request = RecommendationRequest(**request_data)

        ranked_models = get_recommendations(
            db,
            structured_request,
        )

        recommendations = []

        for item in ranked_models:
            model = item["model"]

            explanation = generate_recommendation_explanation(
                requirements=request.requirements,
                model_name=model.name,
                provider=model.provider.name,
                score=item["score"],
            )

            recommendations.append(
                RecommendationItem(
                    model_id=model.id,
                    model_name=model.name,
                    provider=model.provider.name,
                    score=item["score"],
                    strengths=explanation.get("strengths", []),
                    weaknesses=explanation.get("weaknesses", []),
                    why_recommended=explanation.get(
                        "why_recommended",
                        "This model matches the provided requirements.",
                    ),
                )
            )

        return RecommendationResponse(
            recommendations=recommendations,
        )

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail="Unable to generate recommendations.",
        ) from exc