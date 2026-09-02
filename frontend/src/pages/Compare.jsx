import { Plus, X } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ModelBadge from "../components/ModelBadge";
import Button from "../components/Button";

const models = [
  {
    id: "model-a",
    name: "Model A",
    provider: "Provider A",
    quality: 94,
    speed: 91,
    cost: 78,
    context: "128K",
    reasoning: 92,
    coding: 90,
    vision: "Yes",
    audio: "No",
    tools: "Yes",
  },
  {
    id: "model-b",
    name: "Model B",
    provider: "Provider B",
    quality: 89,
    speed: 96,
    cost: 92,
    context: "64K",
    reasoning: 84,
    coding: 88,
    vision: "Yes",
    audio: "Yes",
    tools: "Yes",
  },
  {
    id: "model-c",
    name: "Model C",
    provider: "Provider C",
    quality: 97,
    speed: 79,
    cost: 65,
    context: "200K",
    reasoning: 96,
    coding: 94,
    vision: "Yes",
    audio: "No",
    tools: "Yes",
  },
];

const metrics = [
  { label: "Quality", key: "quality", type: "score" },
  { label: "Speed", key: "speed", type: "score" },
  { label: "Cost efficiency", key: "cost", type: "score" },
  { label: "Context window", key: "context", type: "text" },
  { label: "Reasoning", key: "reasoning", type: "score" },
  { label: "Coding", key: "coding", type: "score" },
  { label: "Vision", key: "vision", type: "text" },
  { label: "Audio", key: "audio", type: "text" },
  { label: "Tool support", key: "tools", type: "text" },
];

function Compare() {
  return (
    <div className="page">
      <Navbar />

      <main>
        <section className="compare">
          <div className="page__container">
            <div className="compare__header fade-in">
              <p className="section__eyebrow">COMPARE</p>

              <h1 className="compare__title">
                Put models side by side.
              </h1>

              <p className="compare__description">
                Compare the factors that matter most before choosing an AI
                model for your project.
              </p>
            </div>

            <div className="compare__toolbar">
              <div>
                <p className="compare__selected-label">Selected models</p>

                <div className="compare__selected">
                  {models.map((model) => (
                    <div className="compare__selected-model" key={model.id}>
                      <span>{model.name}</span>

                      <button
                        type="button"
                        aria-label={`Remove ${model.name}`}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="secondary">
                <Plus size={16} />
                Add model
              </Button>
            </div>

            <div className="compare-table">
              <div className="compare-table__header">
                <div className="compare-table__metric-heading">
                  Comparison
                </div>

                {models.map((model) => (
                  <div className="compare-table__model-heading" key={model.id}>
                    <p>{model.provider}</p>
                    <h2>{model.name}</h2>
                    <ModelBadge variant="primary">Selected</ModelBadge>
                  </div>
                ))}
              </div>

              {metrics.map((metric) => (
                <div className="compare-table__row" key={metric.key}>
                  <div className="compare-table__metric">
                    {metric.label}
                  </div>

                  {models.map((model) => (
                    <div className="compare-table__value" key={model.id}>
                      {metric.type === "score" ? (
                        <div className="compare-score">
                          <span>{model[metric.key]}</span>
                          <div className="compare-score__track">
                            <div
                              className="compare-score__progress"
                              style={{
                                width: `${model[metric.key]}%`,
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <strong>{model[metric.key]}</strong>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <p className="compare__note">
              The values shown here are temporary demo data and will be
              replaced with database-backed model information later.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Compare;