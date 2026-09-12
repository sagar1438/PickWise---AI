def clamp_score(score: float) -> float:
    return max(0.0, min(100.0, score))


def normalize_text(value: str) -> str:
    return " ".join(value.strip().split())