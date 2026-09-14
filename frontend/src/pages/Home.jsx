import {
  ArrowRight,
  BarChart3,
  Compass,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import ModelBadge from "../components/ModelBadge";

const featuredModels = [
  {
    name: "Model Alpha",
    provider: "Demo Provider A",
    category: "General Purpose",
    description:
      "A balanced model for chat, reasoning, and production workflows.",
  },
  {
    name: "Model Beta",
    provider: "Demo Provider B",
    category: "Coding",
    description:
      "A developer-focused model for coding and software workflows.",
  },
  {
    name: "Model Gamma",
    provider: "Demo Provider C",
    category: "Reasoning",
    description:
      "A reasoning-focused model for complex analysis and long-context tasks.",
  },
];

function Home() {
  return (
    <div className="page">
      <Navbar />

      <main>
        <section className="hero">
          <div className="page__container">
            <div className="hero__content fade-in">
              <p className="hero__eyebrow">PICKWISE - AI</p>

              <h1 className="hero__title">
                Find the right AI model for your project.
              </h1>

              <p className="hero__description">
                Describe what you're building, tell us what matters most, and
                discover AI models that fit your requirements.
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
                Explore a few examples from the PickWise catalog. Real model
                information will be connected to the backend and verified
                sources later.
              </p>
            </div>

            <div className="home-model-grid">
              {featuredModels.map((model) => (
                <article className="card home-model-card" key={model.name}>
                  <div className="card__content">
                    <ModelBadge variant="primary">
                      {model.category}
                    </ModelBadge>

                    <p className="model-card__provider">
                      {model.provider}
                    </p>

                    <h3 className="card__title">{model.name}</h3>

                    <p className="card__description">
                      {model.description}
                    </p>

                    <div className="card__footer">
                      <span className="model-card__label">
                        Explore catalog
                      </span>

                      <ArrowRight size={16} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
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

                <h2>Recommendation based on your requirements.</h2>

                <p>
                  PickWise analyzes your project needs and ranks models using
                  transparent scoring factors instead of simply asking an AI
                  which model is best.
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
                  Search and filter models by category, capabilities, speed,
                  quality, and other factors.
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
                  Compare important model characteristics before choosing the
                  right fit for your application.
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

                <h3>Keep up with the model ecosystem.</h3>

                <p>
                  Explore trending models and recent releases once verified
                  external data sources are connected.
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
                <p className="section__eyebrow">MAKE THE CHOICE EASIER</p>

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