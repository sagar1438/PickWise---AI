from fastapi import APIRouter, Query

from app.services.catalog_service import search_live_models


router = APIRouter(
    prefix="/api/catalog",
    tags=["Catalog"],
)


@router.get("/")
def get_catalog(
    q: str = Query(default="", max_length=200),
    limit: int = Query(default=100, ge=1, le=100),
):
    """Search and retrieve live AI models from OpenRouter."""

    models = search_live_models(
        query=q,
        limit=limit,
    )

    return {
        "query": q,
        "count": len(models),
        "models": models,
    }