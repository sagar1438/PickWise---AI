from pydantic import BaseModel, ConfigDict, Field


class RecommendationRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    requirements: str = Field(min_length=10, max_length=5000)

    budget: str | None = Field(default=None, max_length=50)
    priority: str | None = Field(default=None, max_length=50)
    task: str | None = Field(default=None, max_length=50)

    vision: bool = False
    audio: bool = False
    tools: bool = False
    large_context: bool = False


class RecommendationItem(BaseModel):
    model_id: int = Field(gt=0)
    model_name: str = Field(min_length=1, max_length=100)
    provider: str = Field(min_length=1, max_length=100)
    score: float = Field(ge=0, le=100)
    strengths: list[str]
    weaknesses: list[str]
    why_recommended: str = Field(min_length=1)


class RecommendationResponse(BaseModel):
    recommendations: list[RecommendationItem]