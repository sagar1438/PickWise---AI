import { ArrowLeft, Check, Code2, Eye, Gauge, Sparkles, Wrench, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ModelBadge from "../components/ModelBadge";
import Button from "../components/Button";

const models = {
  "model-a": {
    name: "Model A",
    provider: "Provider A",
    category: "General Purpose",
    description:
      "A general-purpose AI model designed for reliable production applications across conversations, reasoning, and tool-based workflows.",
    releaseDate: "Demo",
    context: "128K tokens",
    pricing: "Demo pricing",
    strengths: [
      "Strong overall quality",
      "Good balance of speed and capability",
      "Suitable for a wide range of applications",
    ],
    weaknesses: [
      "May cost more than lightweight alternatives",
      "Not optimized for every specialized workload",
    ],
    useCases: ["Chat applications", "Business automation", "AI assistants"],
    capabilities: [
      { name: "Reasoning", icon: Sparkles, supported: true },
      { name: "Coding", icon: Code2, supported: true },
      { name: "Vision", icon: Eye, supported: true },
      { name: "Audio", icon: Gauge, supported: false },
      { name: "Tools", icon: Wrench, supported: true },
    ],
  },
  "model-b": {
    name: "Model B",
    provider: "Provider B",
    category: "Coding",
    description:
      "A coding-oriented AI model focused on fast software development assistance and practical developer workflows.",
    releaseDate: "Demo",
    context: "64K tokens",
    pricing: "Demo pricing",
    strengths: [
      "Fast responses",
      "Strong coding capabilities",
      "Cost-efficient for frequent requests",
    ],
    weaknesses: [
      "Smaller context than some alternatives",
      "Less focused on advanced multimodal tasks",
    ],
    useCases: ["Code generation", "Debugging", "Developer assistants"],
    capabilities: [
      { name: "Reasoning", icon: Sparkles, supported: true },
      { name: "Coding", icon: Code2, supported: true },
      { name: "Vision", icon: Eye, supported: true },
      { name: "Audio", icon: Gauge, supported: true },
      { name: "Tools", icon: Wrench, supported: true },
    ],
  },
  "model-c": {
    name: "Model C",
    provider: "Provider C",
    category: "Reasoning",
    description:
      "An advanced model aimed at complex reasoning workloads where response quality and long-context performance are important.",
    releaseDate: "Demo",
    context: "200K tokens",
    pricing: "Demo pricing",
    strengths: [
      "Strong reasoning performance",
      "Large context window",
      "Good fit for complex workflows",
    ],
    weaknesses: [
      "Higher cost",
      "Slower for some workloads",
    ],
    useCases: ["Research", "Complex reasoning", "Long-context analysis"],
    capabilities: [
      { name: "Reasoning", icon: Sparkles, supported: true },
      { name: "Coding", icon: Code2, supported: true },
      { name: "Vision", icon: Eye, supported: true },
      { name: "Audio", icon: Gauge, supported: false },
      { name: "Tools", icon: Wrench, supported: true },
    ],
  },
};

function ModelDetails() {
  const { id } = useParams();
  const model = models[id];

  if (!model) {
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
                  The model may not exist yet or may have been removed from
                  the catalog.
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
                <p className="section__eyebrow">{model.provider}</p>

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
                <strong>{model.releaseDate}</strong>
              </div>

              <div>
                <span>Context</span>
                <strong>{model.context}</strong>
              </div>

              <div>
                <span>Pricing</span>
                <strong>{model.pricing}</strong>
              </div>
            </div>

            <div className="model-details__content">
              <section className="model-details__section">
                <div className="model-details__section-header">
                  <p className="section__eyebrow">CAPABILITIES</p>
                  <h2>What this model can do.</h2>
                </div>

                <div className="model-details__capabilities">
                  {model.capabilities.map((capability) => {
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
                    <p className="section__eyebrow">STRENGTHS</p>

                    <ul className="detail-list">
                      {model.strengths.map((strength) => (
                        <li key={strength}>
                          <Check size={16} />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="section__eyebrow">WEAKNESSES</p>

                    <ul className="detail-list">
                      {model.weaknesses.map((weakness) => (
                        <li key={weakness}>
                          <X size={16} />
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section className="model-details__section">
                <div className="model-details__section-header">
                  <p className="section__eyebrow">USE CASES</p>
                  <h2>Where it fits best.</h2>
                </div>

                <div className="model-details__use-cases">
                  {model.useCases.map((useCase) => (
                    <ModelBadge key={useCase}>{useCase}</ModelBadge>
                  ))}
                </div>
              </section>
            </div>

            <p className="model-details__note">
              Model information shown here is temporary demo data and will be
              replaced with verified model information from the backend.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ModelDetails;