import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import ModelBadge from "./ModelBadge";

function ModelCard({
  id,
  name,
  provider,
  description,
  category,
  contextWindow,
}) {
  return (
    <article className="card model-card hover-lift">
      <div className="card__content">
        <div className="model-card__top">
          <div>
            <p className="model-card__provider">{provider}</p>
            <h3 className="card__title">{name}</h3>
          </div>

          <ArrowUpRight size={18} />
        </div>

        <p className="card__description">{description}</p>

        <div className="card__meta">
          <ModelBadge>{category}</ModelBadge>

          {contextWindow && (
            <ModelBadge variant="accent">
              {contextWindow} Context
            </ModelBadge>
          )}
        </div>

        <div className="card__footer">
          <span className="model-card__label">Model details</span>

          <Link to={`/models/${id}`} className="model-card__link">
            View model
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ModelCard;