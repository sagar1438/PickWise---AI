import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
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
    async function loadTrendingModels() {
      try {
        const data = await getTrendingModels();
        setModels(data);
      } catch {
        setModels([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadTrendingModels();
  }, []);

  return (
    <div className="page">
      <Navbar />

      <main>
        <section className="trending">
          <div className="page__container">
            <div className="trending__header fade-in">
              <p className="section__eyebrow">TRENDING</p>

              <h1 className="trending__title">
                Models getting attention right now.
              </h1>

              <p className="trending__description">
                Explore models currently marked as trending in the PickWise
                catalog. Trend indicators will later be connected to verified
                current data sources.
              </p>
            </div>

            {isLoading ? (
              <LoadingState message="Loading trending models..." />
            ) : models.length > 0 ? (
              <div className="trending__list">
                {models.map((model, index) => (
                  <article className="card trending-card" key={model.id}>
                    <div className="card__content">
                      <div className="trending-card__rank">
                        <span>#{index + 1}</span>
                        <TrendingUp size={16} />
                      </div>

                      <div className="trending-card__main">
                        <div className="trending-card__heading">
                          <div>
                            <p className="model-card__provider">
                              {model.provider?.name || "Unknown provider"}
                            </p>

                            <h2 className="card__title">{model.name}</h2>
                          </div>

                          <ModelBadge variant="success">
                            Trending
                          </ModelBadge>
                        </div>

                        <p className="card__description">
                          {model.description}
                        </p>

                        <div className="card__meta">
                          <ModelBadge>{model.category}</ModelBadge>

                          {model.capabilities?.supports_vision && (
                            <ModelBadge variant="accent">Vision</ModelBadge>
                          )}

                          {model.capabilities?.supports_audio && (
                            <ModelBadge variant="accent">Audio</ModelBadge>
                          )}

                          {model.capabilities?.supports_tools && (
                            <ModelBadge variant="accent">Tools</ModelBadge>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No trending models available"
                description="There are currently no verified trending models in the catalog."
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