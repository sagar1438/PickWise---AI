function MatchScore({ score = 0 }) {
  const safeScore = Math.min(100, Math.max(0, Number(score) || 0));

  return (
    <div className="match-score">
      <div className="match-score__header">
        <span className="match-score__label">Match</span>
        <span className="match-score__value">{safeScore}%</span>
      </div>

      <div
        className="match-score__track"
        role="progressbar"
        aria-label="Model match score"
        aria-valuenow={safeScore}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="match-score__progress"
          style={{ width: `${safeScore}%` }}
        />
      </div>
    </div>
  );
}

export default MatchScore;