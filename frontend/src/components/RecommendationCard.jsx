import { ArrowUpRight, Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import MatchScore from "./MatchScore";
import ModelBadge from "./ModelBadge";

function RecommendationCard({
  rank,
  id,
  name,
  provider,
  description,
  score,
  strengths = [],
  weaknesses = [],
  cost,
  speed,
  context,
}) {
  const isTopMatch = rank === 1;

  return (
    <article className={`card recommendation-card ${isTopMatch ? "recommendation-card--top" : ""}`}>
      <div className="card__content">
        <div className="recommendation-card__header">
          <div className="recommendation-card__rank">
            #{rank}
          </div>

          <div className="recommendation-card__model">
            <p className="model-card__provider">{provider}</p>

            <div className="recommendation-card__name-row">
              <h3 className="card__title">{name}</h3>

              {isTopMatch && (
                <ModelBadge variant="primary">Best Match</ModelBadge>
              )}
            </div>
          </div>

          <Link to={`/models/${id}`} className="recommendation-card__details">
            <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="recommendation-card__score">
          <MatchScore score={score} />
        </div>

        <p className="card__description">{description}</p>

        <div className="recommendation-card__metrics">
          <div>
            <span>Cost</span>
            <strong>{cost}</strong>
          </div>

          <div>
            <span>Speed</span>
            <strong>{speed}</strong>
          </div>

          <div>
            <span>Context</span>
            <strong>{context}</strong>
          </div>
        </div>

        <div className="recommendation-card__columns">
          <div>
            <h4>Why it fits</h4>

            <ul>
              {strengths.map((strength) => (
                <li key={strength}>
                  <Check size={15} />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Trade-offs</h4>

            <ul>
              {weaknesses.map((weakness) => (
                <li key={weakness}>
                  <X size={15} />
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card__footer">
          <span className="model-card__label">Recommendation</span>

          <Link to={`/compare?model=${id}`} className="model-card__link">
            Compare model
          </Link>
        </div>
      </div>
    </article>
  );
}

export default RecommendationCard;