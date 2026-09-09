from datetime import date

from pydantic import BaseModel, ConfigDict


class ProviderBase(BaseModel):
    name: str
    website: str | None = None
    logo: str | None = None


class ProviderResponse(ProviderBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class ModelMetricsResponse(BaseModel):
    cost_score: float
    speed_score: float
    quality_score: float
    reasoning_score: float
    coding_score: float

    model_config = ConfigDict(from_attributes=True)


class ModelCapabilitiesResponse(BaseModel):
    context_window: int
    supports_vision: bool
    supports_audio: bool
    supports_tools: bool

    model_config = ConfigDict(from_attributes=True)


class ModelResponse(BaseModel):
    id: int
    name: str
    description: str
    category: str
    release_date: date | None = None
    is_trending: bool
    provider: ProviderResponse
    metrics: ModelMetricsResponse | None = None
    capabilities: ModelCapabilitiesResponse | None = None

    model_config = ConfigDict(from_attributes=True)