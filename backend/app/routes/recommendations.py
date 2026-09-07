from fastapi import APIRouter

router = APIRouter(
    prefix="/api/recommendations",
    tags=["Recommendations"],
)


@router.post("/")
def create_recommendation(request: dict):
    return {
        "message": "Recommendation endpoint is ready",
        "request": request,
        "recommendations": [],
    }