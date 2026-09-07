from fastapi import APIRouter

router = APIRouter(
    prefix="/api/releases",
    tags=["Releases"],
)


@router.get("/")
def get_new_releases():
    return {
        "message": "New releases endpoint is ready",
        "models": [],
    }