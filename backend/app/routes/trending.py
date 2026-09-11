from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.model import ModelResponse
from app.services.model_service import get_trending_models

router = APIRouter(
    prefix="/api/trending",
    tags=["Trending"],
)


@router.get("/", response_model=list[ModelResponse])
def get_trending(db: Session = Depends(get_db)):
    return get_trending_models(db)