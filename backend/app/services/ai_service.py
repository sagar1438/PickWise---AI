import json
import os

from google import genai


GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-3.8-flash")


def get_client():
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is not configured")

    return genai.Client(api_key=api_key)


def parse_requirements(requirements: str):
    client = get_client()

    prompt = f"""
Analyze the following AI model requirements and return only valid JSON.

Requirements:
{requirements}

Return this structure:
{{
  "task": "chat|coding|vision|reasoning|embeddings|other",
  "priority": "cost|speed|quality|null",
  "budget": "low|medium|high|null",
  "vision": true,
  "audio": false,
  "tools": false,
  "large_context": false
}}

