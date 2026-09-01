import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RecommendationCard from "../components/RecommendationCard";

const recommendations = [
  {
    rank: 1,
    id: "model-a",
    name: "Model A",
    provider: "Provider A",
    description:
      "A balanced model for production applications that need strong quality, speed, and broad capabilities.",
    score: 93,
    strengths: [
      "Strong overall quality",
      "Good speed for production workloads",
      "Supports the required capabilities",
    ],
    weaknesses: [
      "Higher cost than some alternatives",
      "May be more than needed for simple tasks",
    ],
    cost: "Medium",
    speed: "Fast",
    context: "128K",
  },
  {
    rank: 2,
    id: "model-b",
    name: "Model B",
    provider: "Provider B",
    description:
      "A cost-conscious option with reliable performance for high-volume application workloads.",
    score: 88,
    strengths: [
      "Lower operating cost",
      "Good response speed",
      "Suitable for high-volume usage",
    ],
    weaknesses: [
      "Slightly lower quality",
      "Fewer advanced capabilities",
    ],
    cost: "Low",
    speed: "Fast",
    context: "64K",
  },
  {
    rank: 3,
    id: "model-c",
    name: "Model C",
    provider: "Provider C",
    description:
      "A capable model focused on quality and advanced reasoning for demanding applications.",
    score: 84,
    strengths: [
      "Strong reasoning performance",
      "High-quality responses",
      "Good fit for complex tasks",
    ],
    weaknesses: [
      "Higher latency",
      "Less cost-efficient for large workloads",
    ],
    cost: "High",
    speed: "Medium",
    context: "200K",
  },
];

function Recommendations() {
  return (
    <div className="page">
      <Navbar />

      <main>
        <section className="recommendations">
          <div className="page__container">
            <div className="recommendations__header fade-in">
              <p className="section__eyebrow">YOUR MATCH</p>

              <h1 className="recommendations__title">
                Models matched to your requirements.
              </h1>

              <p className="recommendations__description">
                These recommendations are ranked using the requirements you
                provided and the model scoring system.
              </p>
            </div>

            <div className="recommendations__list">
              {recommendations.map((model) => (
                <RecommendationCard key={model.id} {...model} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Recommendations;