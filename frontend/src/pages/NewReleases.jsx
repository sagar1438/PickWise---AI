import { useEffect, useState } from "react";
import { CalendarDays, ArrowUpRight } from "lucide-react";
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
    async function loadNewReleases() {
      try {
        const data = await getNewReleases();
        setModels(data);
      } catch {
        setModels([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadNewReleases();
  }, []);

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
      return "Context unavailable";
    }

    return `${Math.round(contextWindow / 1000)}K Context`;
  }

  return (
    <div className="page">
      <Navbar />

      <main>
        <section className="releases">
          <div className="page__container">
            <div className="releases__header fade-in">
              <p className="section__eyebrow">NEW RELEASES</p>

              <h1 className="releases__title">
                Explore recently released models.
              </h1>

              <p className="releases__description">
                Browse models ordered by release date and explore their
                available capabilities and context length.
              </p>
            </div>

            {isLoading ? (
              <LoadingState message="Loading new releases..." />
            ) : models.length > 0 ? (
              <div className="releases__list">
                {models.map((model) => (
                  <article className="card release-card" key={model.id}>
                    <div className="card__content">
                      <div className="release-card__top">
                        <ModelBadge variant="primary">New</ModelBadge>

                        <span className="release-card__date">
                          <CalendarDays size={15} />
                          {formatReleaseDate(model.release_date)}
                        </span>
                      </div>

                      <div className="release-card__body">
                        <div>
                          <p className="model-card__provider">
                            {model.provider?.name || "Unknown provider"}
                          </p>

                          <h2 className="card__title">{model.name}</h2>
                        </div>

                        <Link
                          to={`/models/${model.id}`}
                          className="release-card__link"
                          aria-label={`View ${model.name} details`}
                        >
                          <ArrowUpRight size={18} />
                        </Link>
                      </div>

                      <p className="card__description">
                        {model.description}
                      </p>

                      <div className="card__meta">
                        <ModelBadge variant="accent">
                          {formatContext(
                            model.capabilities?.context_window
                          )}
                        </ModelBadge>

                        {model.capabilities?.supports_vision && (
                          <ModelBadge>Vision</ModelBadge>
                        )}

                        {model.capabilities?.supports_audio && (
                          <ModelBadge>Audio</ModelBadge>
                        )}

                        {model.capabilities?.supports_tools && (
                          <ModelBadge>Tools</ModelBadge>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No releases available"
                description="There are currently no release records available in the catalog."
              />
            )}

            <p className="releases__note">
              Release information is displayed from the PickWise model
              catalog. Only verified data should be added to this dataset.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default NewReleases;