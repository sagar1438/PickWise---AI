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


def get_model_by_id(db: Session, model_id: int):
    return (
        db.query(Model)
        .options(
            joinedload(Model.provider),
            joinedload(Model.metrics),
            joinedload(Model.capabilities),
        )
        .filter(Model.id == model_id)
        .first()
    )


def get_trending_models(db: Session):
    return (
        db.query(Model)
        .options(
            joinedload(Model.provider),
            joinedload(Model.metrics),
            joinedload(Model.capabilities),
        )
        .filter(Model.is_trending.is_(True))
        .order_by(Model.name)
        .all()
    )


def get_new_releases(db: Session):
    return (
        db.query(Model)
        .options(
            joinedload(Model.provider),
            joinedload(Model.metrics),
            joinedload(Model.capabilities),
        )
        .filter(Model.release_date.is_not(None))
        .order_by(Model.release_date.desc())
        .all()
    )