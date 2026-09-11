from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.model import ModelResponse
from app.services.model_service import get_new_releases

router = APIRouter(
    prefix="/api/releases",
    tags=["Releases"],
)


@router.get("/", response_model=list[ModelResponse])
def get_releases(db: Session = Depends(get_db)):
    return get_new_releases(db)