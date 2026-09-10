from sqlalchemy.orm import Session, joinedload

from app.database.models import Model


def get_all_models(db: Session):
    return (
        db.query(Model)
        .options(
            joinedload(Model.provider),
            joinedload(Model.metrics),
            joinedload(Model.capabilities),
        )
        .order_by(Model.name)
        .all()
    )




