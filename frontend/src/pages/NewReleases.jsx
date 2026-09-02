import { CalendarDays, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ModelBadge from "../components/ModelBadge";

const releases = [
  {
    id: "model-g",
    name: "Model G",
    provider: "Provider G",
    releaseDate: "Demo",
    description:
      "A newly added model focused on strong general-purpose performance.",
    context: "128K",
    capabilities: ["Chat", "Reasoning", "Tools"],
  },
  {
    id: "model-h",
    name: "Model H",
    provider: "Provider H",
    releaseDate: "Demo",
    description:
      "A multimodal model designed for applications that work with text and images.",
    context: "200K",
    capabilities: ["Vision", "Chat", "Reasoning"],
  },
  {
    id: "model-i",
    name: "Model I",
    provider: "Provider I",
    releaseDate: "Demo",
    description:
      "A recently added coding-oriented model for software development workflows.",
    context: "128K",
    capabilities: ["Coding", "Tools", "Chat"],
  },
];

function NewReleases() {
  return (
    <div className="page">
      <Navbar />

      <main>
        <section className="releases">
          <div className="page__container">
            <div className="releases__header fade-in">
              <p className="section__eyebrow">NEW RELEASES</p>

              <h1 className="releases__title">
                Explore the latest models added to the catalog.
              </h1>

              <p className="releases__description">
                Browse recently added models and explore their capabilities,
                context length, and intended use cases.
              </p>
            </div>

            <div className="releases__list">
              {releases.map((model) => (
                <article className="card release-card" key={model.id}>
                  <div className="card__content">
                    <div className="release-card__top">
                      <ModelBadge variant="primary">New</ModelBadge>

                      <span className="release-card__date">
                        <CalendarDays size={15} />
                        {model.releaseDate}
                      </span>
                    </div>

                    <div className="release-card__body">
                      <div>
                        <p className="model-card__provider">
                          {model.provider}
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
                        {model.context} Context
                      </ModelBadge>

                      {model.capabilities.map((capability) => (
                        <ModelBadge key={capability}>
                          {capability}
                        </ModelBadge>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <p className="releases__note">
              Release information shown here is demo data and will be replaced
              with verified current sources.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default NewReleases;