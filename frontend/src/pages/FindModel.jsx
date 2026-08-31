import { Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";

function FindModel() {
  return (
    <div className="page">
      <Navbar />

      <main>
        <section className="find-model">
          <div className="page__container">
            <div className="find-model__header fade-in">
              <p className="section__eyebrow">FIND YOUR MODEL</p>

              <h1 className="find-model__title">
                Tell us what you're building.
              </h1>

              <p className="find-model__description">
                Describe your project in your own words. PickWise will analyze
                your requirements and find the models that fit best.
              </p>
            </div>

            <form className="find-model__form">
              <div className="form-group">
                <label htmlFor="requirements" className="form-label">
                  What are you building?
                </label>

                <textarea
                  id="requirements"
                  name="requirements"
                  className="form-textarea find-model__textarea"
                  placeholder="Example: I need a fast and affordable AI model for a customer-support chatbot. It should support long context, handle high traffic, and support image input."
                />
              </div>

              <div className="find-model__options">
                <div className="form-group">
                  <label htmlFor="budget" className="form-label">
                    Budget
                  </label>

                  <select
                    id="budget"
                    name="budget"
                    className="form-select"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select budget
                    </option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="priority" className="form-label">
                    Priority
                  </label>

                  <select
                    id="priority"
                    name="priority"
                    className="form-select"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select priority
                    </option>
                    <option value="cost">Cost</option>
                    <option value="speed">Speed</option>
                    <option value="quality">Quality</option>
                  </select>
                </div>

                
              <div className="find-model__capabilities">
                <p className="form-label">Capabilities</p>

                <label className="capability-option">
                  <input type="checkbox" name="vision" />
                  <span>Vision</span>
                </label>

                <label className="capability-option">
                  <input type="checkbox" name="audio" />
                  <span>Audio</span>
                </label>

                <label className="capability-option">
                  <input type="checkbox" name="tools" />
                  <span>Tools</span>
                </label>

                <label className="capability-option">
                  <input type="checkbox" name="largeContext" />
                  <span>Large context</span>
                </label>
              </div>

              <Button type="submit">
                <Sparkles size={17} />
                Find My Model
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default FindModel;