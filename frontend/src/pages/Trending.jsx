import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ModelBadge from "../components/ModelBadge";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import { getTrendingModels } from "../services/api";

function Trending() {
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadTrendingModels() {
      try {
        const data = await getTrendingModels();

        const modelList = Array.isArray(data)
          ? data
          : data?.models ?? [];

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

    loadTrendingModels();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="page">
      <Navbar />

      <main>
        <section className="trending">
          <div className="page__container">
            <header className="trending__header fade-in">
              <p className="section__eyebrow">TRENDING</p>

              <h1 className="trending__title">
                Models getting attention right now.
              </h1>

              <p className="trending__description">
                Explore popular AI models and compare their capabilities
                to find the right fit for your project.
              </p>
            </header>

            {isLoading ? (
              <LoadingState message="Loading trending models..." />
            ) : models.length > 0 ? (
              <div className="trending__list">
                {models.map((model, index) => (
                  <article
                    className="card trending-card"
                    key={model.id ?? `${model.name}-${index}`}
                  >
                    <div className="card__content">
                      <div className="trending-card__rank">
                        <span>#{index + 1}</span>
                        <TrendingUp size={16} aria-hidden="true" />
                      </div>

                      <div className="trending-card__main">
                        <div className="trending-card__heading">
                          <div>
                            <p className="model-card__provider">
                              {model.provider?.name ??
                                model.provider ??
                                "Unknown provider"}
                            </p>

                            <h2 className="card__title">
                              {model.name ?? "Unnamed model"}
                            </h2>
                          </div>

                          <ModelBadge variant="success">
                            Trending
                          </ModelBadge>
                        </div>

                        <p className="card__description">
                          {model.description ??
                            "No description available."}
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

                          {model.capabilities?.supports_audio && (
                            <ModelBadge variant="accent">
                              Audio
                            </ModelBadge>
                          )}

                          {model.capabilities?.supports_tools && (
                            <ModelBadge variant="accent">
                              Tools
                            </ModelBadge>
                          )}
                        </div>

                        {model.id && (
                          <div className="card__footer">
                            <span className="model-card__label">
                              Explore model
                            </span>

                            <Link
                              to={`/models/${model.id}`}
                              className="model-card__link"
                              aria-label={`View details for ${model.name}`}
                            >
                              View details
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No trending models available"
                description="There are currently no trending models in the catalog."
              />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Trending;