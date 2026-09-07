from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="PickWise - AI API",
    description="Backend API for the PickWise AI model recommendation platform.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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