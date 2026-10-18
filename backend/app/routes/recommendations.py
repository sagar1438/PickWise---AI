import logging

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
from app.services.recommendation_services import get_recommendations

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/api/recommendations",
    tags=["Recommendations"],
)


@router.post("/", response_model=RecommendationResponse)
def create_recommendation(
    request: RecommendationRequest,
    db: Session = Depends(get_db),
):
    request_data = request.model_dump()

    try:
        parsed = parse_requirements(request.requirements)

        if isinstance(parsed, dict):
            for field in ("budget", "priority", "task"):
                if request_data[field] is None:
                    request_data[field] = parsed.get(field)

            for field in ("vision", "audio", "tools", "large_context"):
                if not request_data[field]:
                    request_data[field] = parsed.get(field, False)

    except Exception:
        logger.warning(
            "AI requirement parsing failed; using provided requirements.",
            exc_info=True,
        )

    structured_request = RecommendationRequest(**request_data)

    try:
        ranked_models = get_recommendations(db, structured_request)
    except Exception as exc:
        logger.exception("Failed to rank AI models.")
        raise HTTPException(
            status_code=500,
            detail="Unable to rank models.",
        ) from exc

    recommendations = []

    for item in ranked_models:
        model = item["model"]

        fallback_explanation = {
            "strengths": [
                "Ranked using the available model metrics and requirements."
            ],
            "weaknesses": [
                "Verify current pricing and capabilities before choosing."
            ],
            "why_recommended": (
                "This model was ranked using your requirements "
                "and the available model data."
            ),
        }

        try:
            explanation = generate_recommendation_explanation(
                requirements=request.requirements,
                model_name=model.name,
                provider=model.provider.name,
                score=item["score"],
            )

            if not isinstance(explanation, dict):
                explanation = fallback_explanation

        except Exception:
            logger.warning(
                "AI explanation failed for model ID %s.",
                model.id,
                exc_info=True,
            )
            explanation = fallback_explanation

        recommendations.append(
            RecommendationItem(
                model_id=model.id,
                model_name=model.name,
                provider=model.provider.name,
                score=item["score"],
                strengths=explanation.get(
                    "strengths",
                    fallback_explanation["strengths"],
                ),
                weaknesses=explanation.get(
                    "weaknesses",
                    fallback_explanation["weaknesses"],
                ),
                why_recommended=explanation.get(
                    "why_recommended",
                    fallback_explanation["why_recommended"],
                ),
            )
        )

    return RecommendationResponse(recommendations=recommendations)