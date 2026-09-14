import { useLocation, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RecommendationCard from "../components/RecommendationCard";

function Recommendations() {
  const location = useLocation();

  const recommendations = location.state?.recommendations;
  const requirements = location.state?.requirements;

  if (!recommendations) {
    return <Navigate to="/find-model" replace />;
  }

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
                Based on your project description, PickWise ranked the
                available models using its recommendation scoring system.
              </p>

              {requirements && (
                <div className="recommendations__requirement">
                  <span>Your requirement</span>
                  <p>{requirements}</p>
                </div>
              )}
            </div>

            <div className="recommendations__list">
              {recommendations.map((recommendation, index) => (
                <RecommendationCard
                  key={recommendation.model_id}
                  rank={index + 1}
                  id={recommendation.model_id}
                  name={recommendation.model_name}
                  provider={recommendation.provider}
                  description={recommendation.why_recommended}
                  score={recommendation.score}
                  strengths={recommendation.strengths}
                  weaknesses={recommendation.weaknesses}
                  cost="Based on model data"
                  speed="Based on model data"
                  context="Based on model data"
                />
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