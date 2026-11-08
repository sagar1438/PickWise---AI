import json
import os
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from fastapi import HTTPException


OPENROUTER_MODELS_URL = "https://openrouter.ai/api/v1/models"


def _to_float(value):
    """Safely convert a value to float."""
    try:
        return float(value) if value is not None else None
    except (TypeError, ValueError):
        return None


def _to_int(value):
    """Safely convert a value to integer."""
    try:
        return int(value) if value is not None else None
    except (TypeError, ValueError):
        return None


def _normalize_model(model):
    """Convert an OpenRouter model into our frontend format."""

    model_id = model.get("id", "")
    architecture = model.get("architecture") or {}
    pricing = model.get("pricing") or {}
    top_provider = model.get("top_provider") or {}

    input_modalities = architecture.get("input_modalities") or []
    output_modalities = architecture.get("output_modalities") or []
    supported_parameters = model.get("supported_parameters") or []

    model_author = model_id.split("/", 1)[0] if "/" in model_id else "unknown"

    # Derive a display category from the model's supported modalities.
    all_modalities = set(input_modalities + output_modalities)

    if "embedding" in all_modalities or "embeddings" in all_modalities:
        category = "Embeddings"
    elif "audio" in all_modalities:
        category = "Audio"
    elif "video" in all_modalities:
        category = "Video"
    elif "image" in all_modalities:
        category = "Multimodal"
    else:
        category = "Text"

    return {
        "id": model_id,
        "name": model.get("name") or model_id,
        "provider": model_author.replace("-", " ").title(),
        "description": model.get("description") or "",
        "category": category,
        "contextWindow": _to_int(model.get("context_length")),
        "maxCompletionTokens": _to_int(
            top_provider.get("max_completion_tokens")
        ),
        "pricing": {
            "inputPerMillion": (
                _to_float(pricing.get("prompt")) * 1_000_000
                if _to_float(pricing.get("prompt")) is not None
                else None
            ),
            "outputPerMillion": (
                _to_float(pricing.get("completion")) * 1_000_000
                if _to_float(pricing.get("completion")) is not None
                else None
            ),
        },
        "inputModalities": input_modalities,
        "outputModalities": output_modalities,
        "supportsVision": "image" in input_modalities,
        "supportsAudio": (
            "audio" in input_modalities or "audio" in output_modalities
        ),
        "supportsTools": "tools" in supported_parameters,
        "supportedParameters": supported_parameters,
        "createdAt": _to_int(model.get("created")),
    }


def search_live_models(query="", limit=100):
    """
    Fetch live AI models from OpenRouter.

    Args:
        query: Search text for model name or ID.
        limit: Maximum number of models to return.

    Returns:
        A list of normalized model dictionaries.
    """

    api_key = os.getenv("OPENROUTER_API_KEY")

    if not api_key:
        raise HTTPException(
            status_code=503,
            detail="OpenRouter API key is not configured. "
                   "Add OPENROUTER_API_KEY to backend/.env.",
        )

    # OpenRouter supports free-text search using the q parameter.
    # Request all output modalities instead of only text models.
    params = {"output_modalities": "all"}

    if query and query.strip():
        params["q"] = query.strip()

    url = f"{OPENROUTER_MODELS_URL}?{urlencode(params)}"

    http_request = Request(
        url,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Accept": "application/json",
        },
        method="GET",
    )

    try:
        with urlopen(http_request, timeout=20) as response:
            payload = json.loads(response.read().decode("utf-8"))

    except HTTPError as error:
        if error.code in (401, 403):
            detail = "OpenRouter rejected the API key. Check OPENROUTER_API_KEY."
            status_code = 502
        elif error.code == 429:
            detail = "OpenRouter rate limit reached. Please try again later."
            status_code = 503
        else:
            detail = f"OpenRouter API request failed with status {error.code}."
            status_code = 502

        raise HTTPException(status_code=status_code, detail=detail)

    except URLError:
        raise HTTPException(
            status_code=503,
            detail="Could not connect to OpenRouter. Please try again.",
        )

    except (json.JSONDecodeError, UnicodeDecodeError):
        raise HTTPException(
            status_code=502,
            detail="OpenRouter returned an invalid response.",
        )

    models_data = payload.get("data") if isinstance(payload, dict) else None

    if not isinstance(models_data, list):
        raise HTTPException(
            status_code=502,
            detail="Unexpected response format from OpenRouter.",
        )

    normalized_models = [
        _normalize_model(model)
        for model in models_data
        if isinstance(model, dict) and model.get("id")
    ]

    safe_limit = max(1, min(limit, 100))

    return normalized_models[:safe_limit]