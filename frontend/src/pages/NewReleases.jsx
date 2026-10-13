import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ModelBadge from "../components/ModelBadge";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import { getNewReleases } from "../services/api";

function NewReleases() {
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadNewReleases() {
      try {
        const data = await getNewReleases();

        const modelList = Array.isArray(data)
          ? data
          : data?.models ?? data?.items ?? [];

        if (isMounted) {
          setModels(modelList);
        }
      } catch {
        if (isMounted) {
          setModels([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadNewReleases();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="page">
      <Navbar />

      <main>
        <section className="new-releases">
          <div className="page__container">
            <header className="new-releases__header fade-in">
              <p className="section__eyebrow">NEW RELEASES</p>

              <h1 className="new-releases__title">
                Meet the latest AI models.
              </h1>

              <p className="new-releases__description">
                Explore recently released models and discover new
                capabilities for your next project.
              </p>
            </header>

            {isLoading ? (
              <LoadingState message="Loading new releases..." />
            ) : models.length > 0 ? (
              <div className="new-releases__grid">
                {models.map((model, index) => {
                  const modelId = model.id ?? model.model_id;
                  const provider =
                    typeof model.provider === "string"
                      ? model.provider
                      : model.provider?.name ?? "Unknown provider";

                  return (
                    <article
                      className="card new-release-card"
                      key={modelId ?? `${model.name}-${index}`}
                    >
                      <div className="card__content">
                        <div className="new-release-card__top">
                          <span className="new-release-card__icon">
                            <Sparkles size={20} aria-hidden="true" />
                          </span>

                          <ModelBadge variant="primary">
                            New
                          </ModelBadge>
                        </div>

                        <p className="model-card__provider">
                          {provider}
                        </p>

                        <h2 className="card__title">
                          {model.name ?? "Unnamed model"}
                        </h2>

                        <p className="card__description">
                          {model.description ??
                            "Explore this recently released AI model."}
                        </p>

                        <div className="card__meta">
                          {model.category && (
                            <ModelBadge>
                              {model.category}
                            </ModelBadge>
                          )}

                          {model.capabilities?.supports_vision && (
                            <ModelBadge variant="accent">
                              Vision
                            </ModelBadge>
                          )}

                          {model.capabilities?.supports_tools && (
                            <ModelBadge variant="accent">
                              Tool calling
                            </ModelBadge>
                          )}
                        </div>

                        {modelId && (
                          <div className="card__footer">
                            <span className="model-card__label">
                              Recently added
                            </span>

                            <Link
                              to={`/models/${modelId}`}
                              className="model-card__link"
                              aria-label={`View details for ${model.name}`}
                            >
                              Explore model
                            </Link>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                title="No new releases available"
                description="Check back later to explore newly added AI models."
              />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default NewReleases;