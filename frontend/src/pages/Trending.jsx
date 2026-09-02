import { TrendingUp } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ModelBadge from "../components/ModelBadge";

const trendingModels = [
  {
    rank: 1,
    name: "Model A",
    provider: "Provider A",
    category: "General Purpose",
    trend: "Demo",
    reason: "Strong overall performance and broad capabilities.",
    capabilities: ["Chat", "Reasoning", "Tools"],
  },
  {
    rank: 2,
    name: "Model B",
    provider: "Provider B",
    category: "Coding",
    trend: "Demo",
    reason: "Popular choice for software development workflows.",
    capabilities: ["Coding", "Chat", "Tools"],
  },
  {
    rank: 3,
    name: "Model C",
    provider: "Provider C",
    category: "Vision",
    trend: "Demo",
    reason: "Useful for applications combining text and visual inputs.",
    capabilities: ["Vision", "Chat", "Reasoning"],
  },
];

function Trending() {
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
                Explore models currently highlighted by PickWise. Trend data
                will be connected to verified external sources later.
              </p>
            </div>

            <div className="trending__list">
              {trendingModels.map((model) => (
                <article className="card trending-card" key={model.name}>
                  <div className="card__content">
                    <div className="trending-card__rank">
                      <span>#{model.rank}</span>
                      <TrendingUp size={16} />
                    </div>

                    <div className="trending-card__main">
                      <div className="trending-card__heading">
                        <div>
                          <p className="model-card__provider">
                            {model.provider}
                          </p>

                          <h2 className="card__title">{model.name}</h2>
                        </div>

                        <ModelBadge variant="primary">
                          {model.trend}
                        </ModelBadge>
                      </div>

                      <p className="card__description">{model.reason}</p>

                      <div className="card__meta">
                        <ModelBadge>{model.category}</ModelBadge>

                        {model.capabilities.map((capability) => (
                          <ModelBadge key={capability} variant="accent">
                            {capability}
                          </ModelBadge>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Trending;