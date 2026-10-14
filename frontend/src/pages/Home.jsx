import { useEffect, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Compass,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import ModelBadge from "../components/ModelBadge";
import LoadingState from "../components/LoadingState";
import { getModels } from "../services/api";
import fallbackModels from "../data/fallbackModels";

function Home() {
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadModels() {
      try {
        const data = await getModels();
        const modelList = Array.isArray(data)
          ? data
          : data?.models ?? [];

        if (isMounted) {
          if (modelList.length > 0) {
            const featured = [...modelList]
              .sort(
                (a, b) =>
                  Number(b.metrics?.quality_score ?? 0) -
                  Number(a.metrics?.quality_score ?? 0)
              )
              .slice(0, 3);

            setModels(featured);
          } else {
            setModels(fallbackModels.slice(0, 3));
            setUsingFallback(true);
          }
        }
      } catch {
        if (isMounted) {
          setModels(fallbackModels.slice(0, 3));
          setUsingFallback(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadModels();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="page">
      <Navbar />

      <main>
        <section className="hero">
          <div className="page__container">
            <div className="hero__content fade-in">
              <p className="hero__eyebrow">PICKWISE — AI</p>

              <h1 className="hero__title">
                Find the right AI model for your project.
              </h1>

              <p className="hero__description">
                Tell us what you're building, choose your priorities,
                and discover AI models that match your requirements.
              </p>

              <div className="hero__actions">
                <Button to="/find-model">
                  Find My Model
                  <ArrowRight size={16} />
                </Button>

                <Button to="/discover" variant="secondary">
                  Explore Models
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="page__container">
            <div className="section__header">
              <div>
                <p className="section__eyebrow">FEATURED MODELS</p>

                <h2 className="section__title">
                  Start with models worth exploring.
                </h2>
              </div>

              <p className="section__description">
                Explore models from the catalog and compare their
                capabilities to find the right fit for your project.
              </p>
            </div>

            {isLoading ? (
              <LoadingState message="Loading featured models..." />
            ) : (
              <>
                {usingFallback && (
                  <p className="section__description">
                    Showing sample models because the catalog is
                    currently unavailable.
                  </p>
                )}

                <div className="home-model-grid">
                  {models.map((model, index) => {
                    const provider =
                      typeof model.provider === "string"
                        ? model.provider
                        : model.provider?.name ?? "Unknown provider";

                    const hasRealId =
                      Number.isInteger(Number(model.id)) &&
                      String(model.id).trim() !== "";

                    return (
                      <article
                        className="card home-model-card"
                        key={model.id ?? model.name ?? index}
                      >
                        <div className="card__content">
                          <ModelBadge variant="primary">
                            {model.category ?? "General Purpose"}
                          </ModelBadge>

                          <p className="model-card__provider">
                            {provider}
                          </p>

                          <h3 className="card__title">
                            {model.name ?? "Unnamed model"}
                          </h3>

                          <p className="card__description">
                            {model.description ??
                              "Explore this AI model and its capabilities."}
                          </p>

                          <div className="card__footer">
                            <span className="model-card__label">
                              Explore model
                            </span>

                            <Link
                              to={
                                !usingFallback && hasRealId
                                  ? `/models/${model.id}`
                                  : "/discover"
                              }
                              aria-label={`Explore ${model.name ?? "model"}`}
                            >
                              <ArrowRight size={16} />
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </section>

        <section className="section home-feature-section">
          <div className="page__container">
            <div className="home-feature-grid">
              <div className="home-feature-card home-feature-card--primary">
                <div className="home-feature-card__icon">
                  <Sparkles size={20} />
                </div>

                <p className="section__eyebrow">PERSONALIZED</p>

                <h2>Recommendations based on your requirements.</h2>

                <p>
                  Describe your project and discover models ranked
                  according to your needs and priorities.
                </p>

                <Button to="/find-model" variant="secondary">
                  Find my match
                </Button>
              </div>

              <div className="home-feature-card">
                <div className="home-feature-card__icon">
                  <Compass size={20} />
                </div>

                <p className="section__eyebrow">DISCOVER</p>

                <h3>Explore the model landscape.</h3>

                <p>
                  Search the catalog and explore available models
                  by category and capabilities.
                </p>

                <Button to="/discover" variant="ghost">
                  Browse models
                  <ArrowRight size={15} />
                </Button>
              </div>

              <div className="home-feature-card">
                <div className="home-feature-card__icon">
                  <BarChart3 size={20} />
                </div>

                <p className="section__eyebrow">COMPARE</p>

                <h3>Make better decisions side by side.</h3>

                <p>
                  Compare model characteristics before choosing
                  the right fit for your application.
                </p>

                <Button to="/compare" variant="ghost">
                  Compare models
                  <ArrowRight size={15} />
                </Button>
              </div>

              <div className="home-feature-card">
                <div className="home-feature-card__icon">
                  <TrendingUp size={20} />
                </div>

                <p className="section__eyebrow">STAY CURRENT</p>

                <h3>Explore the evolving AI ecosystem.</h3>

                <p>
                  Browse trending models and explore recently
                  added models in the catalog.
                </p>

                <div className="home-feature-links">
                  <Button to="/trending" variant="ghost">
                    Trending
                    <ArrowRight size={15} />
                  </Button>

                  <Button to="/releases" variant="ghost">
                    New releases
                    <ArrowRight size={15} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section home-cta-section">
          <div className="page__container">
            <div className="home-cta">
              <div>
                <p className="section__eyebrow">
                  MAKE THE CHOICE EASIER
                </p>

                <h2>
                  Don't ask which model is best.
                  <br />
                  Ask which model fits you.
                </h2>
              </div>

              <Button to="/find-model">
                Find My Model
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;