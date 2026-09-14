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
    async function loadModel() {
      try {
        const data = await getModelById(id);
        setModel(data);
      } catch {
        setError("Model not found.");
      } finally {
        setIsLoading(false);
      }
    }

    loadModel();
  }, [id]);

  function formatReleaseDate(date) {
    if (!date) {
      return "Date unavailable";
    }

    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  }

  function formatContext(contextWindow) {
    if (!contextWindow) {
      return "Unavailable";
    }

    return `${Math.round(contextWindow / 1000)}K tokens`;
  }

  function getCapabilities(modelData) {
    return [
      {
        name: "Reasoning",
        icon: Sparkles,
        supported: Boolean(modelData.metrics?.reasoning_score),
      },
      {
        name: "Coding",
        icon: Code2,
        supported: Boolean(modelData.metrics?.coding_score),
      },
      {
        name: "Vision",
        icon: Eye,
        supported: Boolean(modelData.capabilities?.supports_vision),
      },
      {
        name: "Audio",
        icon: Gauge,
        supported: Boolean(modelData.capabilities?.supports_audio),
      },
      {
        name: "Tools",
        icon: Wrench,
        supported: Boolean(modelData.capabilities?.supports_tools),
      },
    ];
  }

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
                  The model may not exist or may not be available in the
                  current catalog.
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

  const providerName = model.provider?.name || "Unknown provider";
  const capabilities = getCapabilities(model);

  return (
    <div className="page">
      <Navbar />

      <main>
        <section className="model-details">
          <div className="page__container">
            <Link to="/discover" className="model-details__back">
              <ArrowLeft size={16} />
              Back to Discover
            </Link>

            <div className="model-details__hero fade-in">
              <div>
                <p className="section__eyebrow">{providerName}</p>

                <div className="model-details__title-row">
                  <h1 className="model-details__title">{model.name}</h1>

                  <ModelBadge variant="primary">
                    {model.category}
                  </ModelBadge>
                </div>

                <p className="model-details__description">
                  {model.description}
                </p>
              </div>

              <div className="model-details__actions">
                <Button to={`/compare?model=${model.id}`} variant="secondary">
                  Compare model
                </Button>

                <Button to="/find-model">Find my match</Button>
              </div>
            </div>

            <div className="model-details__overview">
              <div>
                <span>Release</span>
                <strong>
                  {formatReleaseDate(model.release_date)}
                </strong>
              </div>

              <div>
                <span>Context</span>
                <strong>
                  {formatContext(model.capabilities?.context_window)}
                </strong>
              </div>

              <div>
                <span>Category</span>
                <strong>{model.category}</strong>
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
                        <Icon size={18} />

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
                        <Check size={16} />
                        <span>
                          Quality score:{" "}
                          {model.metrics?.quality_score ?? "N/A"}
                        </span>
                      </li>

                      <li>
                        <Check size={16} />
                        <span>
                          Speed score:{" "}
                          {model.metrics?.speed_score ?? "N/A"}
                        </span>
                      </li>

                      <li>
                        <Check size={16} />
                        <span>
                          Reasoning score:{" "}
                          {model.metrics?.reasoning_score ?? "N/A"}
                        </span>
                      </li>

                      <li>
                        <Check size={16} />
                        <span>
                          Coding score:{" "}
                          {model.metrics?.coding_score ?? "N/A"}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="section__eyebrow">COST</p>

                    <ul className="detail-list">
                      <li>
                        <X size={16} />
                        <span>
                          Cost efficiency score:{" "}
                          {model.metrics?.cost_score ?? "N/A"}
                        </span>
                      </li>

                      <li>
                        <X size={16} />
                        <span>
                          Detailed pricing will be shown once verified
                          pricing data is added.
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
                  <ModelBadge>{model.category}</ModelBadge>
                  <ModelBadge variant="accent">
                    {formatContext(model.capabilities?.context_window)}
                  </ModelBadge>

                  {model.is_trending && (
                    <ModelBadge variant="success">Trending</ModelBadge>
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