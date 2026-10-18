import json
import logging
import os
import re

from google import genai

logger = logging.getLogger(__name__)

GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-3.8-flash")

VALID_TASKS = {"chat", "coding", "vision", "reasoning", "embeddings", "other"}
VALID_PRIORITIES = {"cost", "speed", "quality"}
VALID_BUDGETS = {"low", "medium", "high"}


def get_client():
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is not configured")

    return genai.Client(api_key=api_key)


def _generate_json(prompt: str) -> dict:
    response = get_client().interactions.create(
        model=GEMINI_MODEL,
        input=prompt,
    )

    output = (getattr(response, "output_text", None) or "").strip()

    if not output:
        raise ValueError("Gemini returned an empty response")

    output = re.sub(
        r"^```(?:json)?\s*|\s*```$",
        "",
        output,
        flags=re.IGNORECASE,
    ).strip()

    try:
        result = json.loads(output)
    except json.JSONDecodeError:
        decoder = json.JSONDecoder()
        result = None

        for index, character in enumerate(output):
            if character == "{":
                try:
                    result, _ = decoder.raw_decode(output[index:])
                    break
                except json.JSONDecodeError:
                    continue

        if result is None:
            raise ValueError("Gemini returned invalid JSON")

    if not isinstance(result, dict):
        raise ValueError("Gemini response must be a JSON object")

    return result


def _to_bool(value) -> bool:
    if isinstance(value, bool):
        return value

    if isinstance(value, str):
        return value.strip().lower() in {"true", "yes", "1"}

    return False


def parse_requirements(requirements: str) -> dict:
    prompt = f"""
Analyze these AI model requirements and return only a JSON object.

Requirements:
{requirements}

Use exactly this structure:
{{
  "task": "chat",
  "priority": null,
  "budget": null,
  "vision": false,
  "audio": false,
  "tools": false,
  "large_context": false
}}

Rules:
- task must be one of: chat, coding, vision, reasoning, embeddings, other.
- priority must be cost, speed, quality, or null.
- budget must be low, medium, high, or null.
- The four capability fields must be booleans.
- Use null when task details are unclear.
- Do not include markdown or explanations.
"""

    result = _generate_json(prompt)

    task = result.get("task")
    priority = result.get("priority")
    budget = result.get("budget")

    return {
        "task": task if task in VALID_TASKS else None,
        "priority": priority if priority in VALID_PRIORITIES else None,
        "budget": budget if budget in VALID_BUDGETS else None,
        "vision": _to_bool(result.get("vision")),
        "audio": _to_bool(result.get("audio")),
        "tools": _to_bool(result.get("tools")),
        "large_context": _to_bool(result.get("large_context")),
    }


def generate_recommendation_explanation(
    requirements: str,
    model_name: str,
    provider: str,
    score: float,
) -> dict:
    prompt = f"""
Explain why this AI model may match the user's requirements.

User requirements:
{requirements}

Model name: {model_name}
Provider: {provider}
Match score: {score}%

Return only a JSON object with this structure:
{{
  "strengths": ["First relevant strength"],
  "weaknesses": ["Potential limitation to verify"],
  "why_recommended": "A concise explanation."
}}

Rules:
- Keep the explanation concise and relevant.
- Do not invent pricing, capabilities, benchmarks, or model facts.
- Treat the supplied match score as a ranking produced by the application.
- Use generic verification advice if specific facts are unavailable.
- Do not include markdown.
"""

    result = _generate_json(prompt)

    strengths = result.get("strengths")
    weaknesses = result.get("weaknesses")
    explanation = result.get("why_recommended")

    if not isinstance(strengths, list):
        strengths = []

    if not isinstance(weaknesses, list):
        weaknesses = []

    strengths = [
        item.strip()
        for item in strengths
        if isinstance(item, str) and item.strip()
    ]

    weaknesses = [
        item.strip()
        for item in weaknesses
        if isinstance(item, str) and item.strip()
    ]

    if not strengths:
        strengths = [
            "Ranked using available model metrics and your requirements."
        ]

    if not weaknesses:
        weaknesses = [
            "Verify current pricing and capabilities before choosing."
        ]

    if not isinstance(explanation, str) or not explanation.strip():
        explanation = (
            "This model was ranked using your requirements "
            "and the available model data."
        )

    return {
        "strengths": strengths,
        "weaknesses": weaknesses,
        "why_recommended": explanation.strip(),
    }