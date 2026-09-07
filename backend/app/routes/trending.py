from fastapi import APIRouter

router = APIRouter(
    prefix="/api/trending",
    tags=["Trending"],
)


@router.get("/")
def get_trending_models():
    return {
        "message": "Trending models endpoint is ready",
        "models": [],
    }