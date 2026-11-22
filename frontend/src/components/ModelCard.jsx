
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import ModelBadge from "./ModelBadge";

function formatPrice(price) {
  if (price === null || price === undefined || !Number.isFinite(Number(price))) {
    return null;
  }

  const value = Number(price);
  const decimals = value < 0.01 ? 5 : value < 1 ? 3 : 2;

  return Number(value.toFixed(decimals)).toString();
}

function ModelCard({
  id,
  name,
  provider,
  description,
  category,
  contextWindow,
  pricing,
  supportsVision,
  supportsAudio,
  supportsTools,
}) {
  const inputPrice = formatPrice(pricing?.inputPerMillion);
  const outputPrice = formatPrice(pricing?.outputPerMillion);

  return (
    <article className="card model-card hover-lift">
      <div className="card__content">
        <div className="model-card__top">
          <div>
            <p className="model-card__provider">{provider}</p>
            <h3 className="card__title">{name}</h3>
          </div>

          <ArrowUpRight size={18} aria-hidden="true" />
        </div>

        <p className="card__description">
          {description || "No description available."}
        </p>

        <div className="card__meta">
          {category && <ModelBadge>{category}</ModelBadge>}

          {contextWindow && (
            <ModelBadge variant="accent">
              {contextWindow} Context
            </ModelBadge>
          )}

          {supportsVision && <ModelBadge>Vision</ModelBadge>}
          {supportsAudio && <ModelBadge>Audio</ModelBadge>}
          {supportsTools && <ModelBadge>Tools</ModelBadge>}
        </div>

        {(inputPrice !== null || outputPrice !== null) && (
          <div className="card__meta">
            {inputPrice !== null && (
              <ModelBadge>Input ${inputPrice} / 1M</ModelBadge>
            )}

            {outputPrice !== null && (
              <ModelBadge>Output ${outputPrice} / 1M</ModelBadge>
            )}
          </div>
        )}

        <div className="card__footer">
          <span className="model-card__label">Model details</span>

          <Link
            to={`/models/${encodeURIComponent(id)}`}
            className="model-card__link"
            aria-label={`View details for ${name}`}
          >
            View model
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ModelCard;
