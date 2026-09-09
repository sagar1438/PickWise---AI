from datetime import date

from app.database.database import Base, SessionLocal, engine
from app.database.models import Model, ModelCapabilities, ModelMetrics, Provider

Base.metadata.create_all(bind=engine)


def seed_database():
    db = SessionLocal()

    try:
        if db.query(Provider).count() > 0:
            return

        providers = [
            Provider(
                name="Demo Provider A",
                website="https://example.com",
                logo=None,
            ),
            Provider(
                name="Demo Provider B",
                website="https://example.com",
                logo=None,
            ),
            Provider(
                name="Demo Provider C",
                website="https://example.com",
                logo=None,
            ),
        ]

        db.add_all(providers)
        db.flush()

        models = [
            Model(
                provider_id=providers[0].id,
                name="Demo Model Alpha",
                description="A balanced general-purpose model for chat, reasoning, and tool-based workflows.",
                category="General Purpose",
                release_date=date(2026, 1, 15),
                is_trending=True,
            ),
            Model(
                provider_id=providers[1].id,
                name="Demo Model Beta",
                description="A fast and cost-conscious model designed for high-volume conversational workloads.",
                category="Chat",
                release_date=date(2026, 2, 10),
                is_trending=True,
            ),
            Model(
                provider_id=providers[2].id,
                name="Demo Model Gamma",
                description="A reasoning-focused model designed for complex analysis and long-context tasks.",
                category="Reasoning",
                release_date=date(2026, 3, 5),
                is_trending=False,
            ),
        ]

        db.add_all(models)
        db.flush()

 