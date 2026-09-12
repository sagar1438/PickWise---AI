from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine
from app.routes.models import router as models_router
from app.routes.recommendations import router as recommendations_router
from app.routes.trending import router as trending_router
from app.routes.releases import router as releases_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="PickWise - AI API",
    description="Backend API for the PickWise AI model recommendation platform.",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(models_router)
app.include_router(recommendations_router)
app.include_router(trending_router)
app.include_router(releases_router)


@app.get("/")
def root():
    return {
        "message": "PickWise - AI API is running",
    }


@app.get("/health")
def health_check():
    return {
        "status": "ok",
    }