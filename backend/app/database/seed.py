from datetime import date

from app.database.database import Base, SessionLocal, engine
from app.database.models import (
    Model,
    ModelCapabilities,
    ModelMetrics,
    Provider,
)


SEED_MODELS = [
    {
        "provider": "Demo Provider A",
        "name": "Demo Model Alpha",
        "description": "A balanced general-purpose model for chat, reasoning, and tool-based workflows.",
        "category": "General Purpose",
        "release_date": date(2026, 1, 15),
        "is_trending": True,
        "metrics": {
            "cost_score": 78,
            "speed_score": 91,
            "quality_score": 94,
            "reasoning_score": 92,
            "coding_score": 90,
        },
        "capabilities": {
            "context_window": 128000,
            "supports_vision": True,
            "supports_audio": False,
            "supports_tools": True,
        },
    },
    {
        "provider": "Demo Provider B",
        "name": "Demo Model Beta",
        "description": "A fast and cost-conscious model for high-volume conversational workloads.",
        "category": "Chat",
        "release_date": date(2026, 2, 10),
        "is_trending": True,
        "metrics": {
            "cost_score": 92,
            "speed_score": 96,
            "quality_score": 89,
            "reasoning_score": 84,
            "coding_score": 88,
        },
        "capabilities": {
            "context_window": 64000,
            "supports_vision": True,
            "supports_audio": True,
            "supports_tools": True,
        },
    },
    {
        "provider": "Demo Provider C",
        "name": "Demo Model Gamma",
        "description": "A reasoning-focused model for complex analysis and long-context tasks.",
        "category": "Reasoning",
        "release_date": date(2026, 3, 5),
        "is_trending": False,
        "metrics": {
            "cost_score": 65,
            "speed_score": 79,
            "quality_score": 97,
            "reasoning_score": 96,
            "coding_score": 94,
        },
        "capabilities": {
            "context_window": 200000,
            "supports_vision": True,
            "supports_audio": False,
            "supports_tools": True,
        },
    },
]


def seed_database():
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    try:
        providers = {}

        for item in SEED_MODELS:
            provider_name = item["provider"]

            if provider_name not in providers:
                provider = (
                    db.query(Provider)
                    .filter(Provider.name == provider_name)
                    .first()
                )

                if provider is None:
                    provider = Provider(
                        name=provider_name,
                        website="https://example.com",
                        logo=None,
                    )
                    db.add(provider)
                    db.flush()

                providers[provider_name] = provider

        for item in SEED_MODELS:
            model = (
                db.query(Model)
                .filter(Model.name == item["name"])
                .first()
            )

            if model is None:
                model = Model(
                    provider_id=providers[item["provider"]].id,
                    name=item["name"],
                    description=item["description"],
                    category=item["category"],
                    release_date=item["release_date"],
                    is_trending=item["is_trending"],
                )
                db.add(model)
                db.flush()

            if model.metrics is None:
                db.add(
                    ModelMetrics(
                        model_id=model.id,
                        **item["metrics"],
                    )
                )

            if model.capabilities is None:
                db.add(
                    ModelCapabilities(
                        model_id=model.id,
                        **item["capabilities"],
                    )
                )

        db.commit()
        print("PickWise demo database seeded successfully.")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_database()