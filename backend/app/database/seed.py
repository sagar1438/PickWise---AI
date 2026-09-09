from datetime import date

from app.database.database import Base, SessionLocal, engine
from app.database.models import Model, ModelCapabilities, ModelMetrics, Provider

Base.metadata.create_all(bind=engine)


