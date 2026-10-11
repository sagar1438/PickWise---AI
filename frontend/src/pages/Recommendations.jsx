import { Navigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RecommendationCard from "../components/RecommendationCard";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";

function Recommendations() {
  const location = useLocation();
  const requirements = location.state?.requirements;

  const recommendations = location.state?.recommendations;

  if (!Array.isArray(recommendations)) {
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
                PickWise ranked these AI models based on your project
                requirements, priorities, and supported capabilities.
              </p>

              {requirements && (
                <div className="recommendations__requirement">
                  <span>Your requirement</span>
                  <p>{requirements}</p>
                </div>
              )}
            </div>

            {recommendations.length > 0 ? (
              <>
                <p className="recommendations__count">
                  {recommendations.length}{" "}
                  {recommendations.length === 1
                    ? "model recommended"
                    : "models recommended"}
                </p>

                <div className="recommendations__list">
                  {recommendations.map((recommendation, index) => (
                    <RecommendationCard
                      key={`${recommendation.model_id}-${index}`}
                      rank={index + 1}
                      id={recommendation.model_id}
                      name={recommendation.model_name}
                      provider={recommendation.provider}
                      description={recommendation.why_recommended}
                      score={recommendation.score}
                      strengths={
                        Array.isArray(recommendation.strengths)
                          ? recommendation.strengths
                          : []
                      }
                      weaknesses={
                        Array.isArray(recommendation.weaknesses)
                          ? recommendation.weaknesses
                          : []
                      }
                      cost="—"
                      speed="—"
                      context="—"
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="recommendations__empty">
                <EmptyState
                  title="No recommendations found"
                  description="Try changing your requirements or selecting different priorities."
                />

                <Button to="/find-model" variant="secondary">
                  Update requirements
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Recommendations;