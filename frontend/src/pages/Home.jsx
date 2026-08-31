import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";

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
                <p className="section__eyebrow">HOW IT WORKS</p>

                <h2 className="section__title">
                  Choose based on your needs, not hype.
                </h2>
              </div>

              <p className="section__description">
                PickWise combines AI-powered requirement analysis with a
                transparent scoring system to help you make better model
                decisions.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;