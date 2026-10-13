import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  Code2,
  Eye,
  Gauge,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ModelBadge from "../components/ModelBadge";
import Button from "../components/Button";
import LoadingState from "../components/LoadingState";
import { getModelById } from "../services/api";

function ModelDetails() {
  const { id } = useParams();

  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadModel() {
      setIsLoading(true);
      setError("");
      setModel(null);

      try {
        const data = await getModelById(id);

        if (isMounted) {
          setModel(data);
        }
      } catch {
        if (isMounted) {
          setError("Model not found.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadModel();

    return () => {
      isMounted = false;
    };
  }, [id]);

  function formatReleaseDate(date) {
    if (!date) return "Unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Unavailable";
    }

    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(parsedDate);
  }

  function formatContext(contextWindow) {
    const value = Number(contextWindow);

    if (!Number.isFinite(value) || value <= 0) {
      return "Unavailable";
    }

    return `${Math.round(value / 1000)}K tokens`;
  }

  function formatScore(score) {
    const value = Number(score);

    return Number.isFinite(value) ? value : "N/A";
  }

  const capabilities = model
    ? [
        {
          name: "Reasoning",
          icon: Sparkles,
          supported: Number(model.metrics?.reasoning_score) > 0,
        },
        {
          name: "Coding",
          icon: Code2,
          supported: Number(model.metrics?.coding_score) > 0,
        },
        {
          name: "Vision",
          icon: Eye,
          supported: Boolean(model.capabilities?.supports_vision),
        },
        {
          name: "Audio",
          icon: Gauge,
          supported: Boolean(model.capabilities?.supports_audio),
        },
        {
          name: "Tool calling",
          icon: Wrench,
          supported: Boolean(model.capabilities?.supports_tools),
        },
      ]
    : [];

  if (isLoading) {
    return (
      <div className="page">
        <Navbar />
        <main>
          <section className="model-details">
            <div className="page__container">
              <LoadingState message="Loading model details..." />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !model) {
    return (
      <div className="page">
        <Navbar />
        <main>
          <section className="model-details">
            <div className="page__container">
              <div className="model-details__not-found">
                <p className="section__eyebrow">MODEL NOT FOUND</p>

                <h1 className="model-details__title">
                  We couldn't find that model.
                </h1>

                <p className="model-details__description">
                  This model may not exist or may no longer be available.
                </p>

                <Button to="/discover" variant="secondary">
                  Back to Discover
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const providerName =
    typeof model.provider === "string"
      ? model.provider
      : model.provider?.name ?? "Unknown provider";

  const category = model.category ?? "Uncategorized";

  return (
    <div className="page">
      <Navbar />

      <main>
        <section className="model-details">
          <div className="page__container">
            <Link to="/discover" className="model-details__back">
              <ArrowLeft size={16} aria-hidden="true" />
              Back to Discover
            </Link>

            <div className="model-details__hero fade-in">
              <div>
                <p className="section__eyebrow">{providerName}</p>

                <div className="model-details__title-row">
                  <h1 className="model-details__title">
                    {model.name ?? "Unnamed model"}
                  </h1>

                  <ModelBadge variant="primary">
                    {category}
                  </ModelBadge>
                </div>

                <p className="model-details__description">
                  {model.description ?? "No description available."}
                </p>
              </div>

              <div className="model-details__actions">
                <Button
                  to={`/compare?model=${encodeURIComponent(model.id ?? id)}`}
                  variant="secondary"
                >
                  Compare model
                </Button>

                <Button to="/find-model">
                  Find my match
                </Button>
              </div>
            </div>

            <div className="model-details__overview">
              <div>
                <span>Release</span>
                <strong>{formatReleaseDate(model.release_date)}</strong>
              </div>

              <div>
                <span>Context window</span>
                <strong>
                  {formatContext(model.capabilities?.context_window)}
                </strong>
              </div>

              <div>
                <span>Category</span>
                <strong>{category}</strong>
              </div>
            </div>

            <div className="model-details__content">
              <section className="model-details__section">
                <div className="model-details__section-header">
                  <p className="section__eyebrow">CAPABILITIES</p>
                  <h2>What this model can do.</h2>
                </div>

                <div className="model-details__capabilities">
                  {capabilities.map((capability) => {
                    const Icon = capability.icon;

                    return (
                      <div
                        className={`capability-card ${
                          capability.supported
                            ? "capability-card--supported"
                            : "capability-card--unsupported"
                        }`}
                        key={capability.name}
                      >
                        <Icon size={18} aria-hidden="true" />

                        <div>
                          <strong>{capability.name}</strong>
                          <span>
                            {capability.supported
                              ? "Supported"
                              : "Not supported"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="model-details__section">
                <div className="model-details__two-column">
                  <div>
                    <p className="section__eyebrow">PERFORMANCE</p>

                    <ul className="detail-list">
                      <li>
                        <Check size={16} aria-hidden="true" />
                        <span>
                          Quality score:{" "}
                          {formatScore(model.metrics?.quality_score)}
                        </span>
                      </li>

                      <li>
                        <Check size={16} aria-hidden="true" />
                        <span>
                          Speed score:{" "}
                          {formatScore(model.metrics?.speed_score)}
                        </span>
                      </li>

                      <li>
                        <Check size={16} aria-hidden="true" />
                        <span>
                          Reasoning score:{" "}
                          {formatScore(model.metrics?.reasoning_score)}
                        </span>
                      </li>

                      <li>
                        <Check size={16} aria-hidden="true" />
                        <span>
                          Coding score:{" "}
                          {formatScore(model.metrics?.coding_score)}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="section__eyebrow">COST</p>

                    <ul className="detail-list">
                      <li>
                        <X size={16} aria-hidden="true" />
                        <span>
                          Cost efficiency score:{" "}
                          {formatScore(model.metrics?.cost_score)}
                        </span>
                      </li>

                      <li>
                        <X size={16} aria-hidden="true" />
                        <span>
                          Verified pricing information is not yet available.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="model-details__section">
                <div className="model-details__section-header">
                  <p className="section__eyebrow">MODEL INFORMATION</p>
                  <h2>Core information at a glance.</h2>
                </div>

                <div className="model-details__use-cases">
                  <ModelBadge>{providerName}</ModelBadge>
                  <ModelBadge>{category}</ModelBadge>

                  <ModelBadge variant="accent">
                    {formatContext(model.capabilities?.context_window)}
                  </ModelBadge>

                  {model.is_trending && (
                    <ModelBadge variant="success">
                      Trending
                    </ModelBadge>
                  )}
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ModelDetails;