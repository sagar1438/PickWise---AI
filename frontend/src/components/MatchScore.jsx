function MatchScore({ score }) {
  return (
    <div className="match-score">
      <div className="match-score__header">
        <span className="match-score__label">Match</span>
        <span className="match-score__value">{score}%</span>
      </div>

      <div className="match-score__track">
        <div
          className="match-score__progress"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export default MatchScore;