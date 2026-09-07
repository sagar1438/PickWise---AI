from fastapi import APIRouter

router = APIRouter(
    prefix="/api/models",
    tags=["Models"],
)


@router.get("/")
def get_models():
    return {
        "message": "Models endpoint is ready",
        "models": [],
    }


@router.get("/{model_id}")
def get_model(model_id: int):
    return {
        "message": "Model details endpoint is ready",
        "model_id": model_id,
    }