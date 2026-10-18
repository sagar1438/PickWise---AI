def clamp_score(score: float) -> float:
    """Keep a score within the 0–100 range."""
    return max(0.0, min(100.0, float(score)))


def normalize_text(value: str) -> str:
    """Remove leading, trailing, and repeated whitespace."""
    return " ".join(value.strip().split())