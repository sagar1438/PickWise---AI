from pydantic import BaseModel, Field


class RecommendationRequest(BaseModel):
    requirements: str = Field(min_length=10, max_length=5000)

    budget: str | None = None
    priority: str | None = None
    task: str | None = None

    vision: bool = False
    audio: bool = False
    tools: bool = False
    large_context: bool = False


class RecommendationItem(BaseModel):
    model_id: int
    model_name: str
    provider: str
    score: float
    strengths: list[str]
    weaknesses: list[str]
    why_recommended: str


class RecommendationResponse(BaseModel):
    recommendations: list[RecommendationItem]