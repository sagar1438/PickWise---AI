from datetime import date

from pydantic import BaseModel, ConfigDict, Field


class ProviderBase(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    website: str | None = None
    logo: str | None = None


class ProviderResponse(ProviderBase):
    id: int = Field(gt=0)

    model_config = ConfigDict(from_attributes=True)


class ModelMetricsResponse(BaseModel):
    cost_score: float = Field(ge=0, le=100)
    speed_score: float = Field(ge=0, le=100)
    quality_score: float = Field(ge=0, le=100)
    reasoning_score: float = Field(ge=0, le=100)
    coding_score: float = Field(ge=0, le=100)

    model_config = ConfigDict(from_attributes=True)


class ModelCapabilitiesResponse(BaseModel):
    context_window: int = Field(gt=0)
    supports_vision: bool
    supports_audio: bool
    supports_tools: bool

    model_config = ConfigDict(from_attributes=True)


class ModelResponse(BaseModel):
    id: int = Field(gt=0)
    name: str = Field(min_length=1, max_length=100)
    description: str
    category: str
    release_date: date | None = None
    is_trending: bool

    provider: ProviderResponse
    metrics: ModelMetricsResponse | None = None
    capabilities: ModelCapabilitiesResponse | None = None

    model_config = ConfigDict(from_attributes=True)