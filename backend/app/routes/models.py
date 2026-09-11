from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.model import ModelResponse
from app.services.model_service import get_all_models, get_model_by_id

router = APIRouter(
    prefix="/api/models",
    tags=["Models"],
)


@router.get("/", response_model=list[ModelResponse])
def get_models(db: Session = Depends(get_db)):
    return get_all_models(db)


@router.get("/{model_id}", response_model=ModelResponse)
def get_model(model_id: int, db: Session = Depends(get_db)):
    model = get_model_by_id(db, model_id)

    if model is None:
        raise HTTPException(
            status_code=404,
            detail="Model not found",
        )

    return model