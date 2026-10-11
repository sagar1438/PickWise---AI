import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { getRecommendations } from "../services/api";

const initialFormData = {
  requirements: "",
  budget: "",
  priority: "",
  task: "",
  vision: false,
  audio: false,
  tools: false,
  large_context: false,
};

function FindModel() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (error) setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const requirements = formData.requirements.trim();

    if (!requirements) {
      setError("Please describe what you're building.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const data = await getRecommendations({
        ...formData,
        requirements,
        budget: formData.budget || null,
        priority: formData.priority || null,
        task: formData.task || null,
      });

      navigate("/recommendations", {
        state: {
          requirements,
          recommendations: data?.recommendations ?? [],
        },
      });
    } catch {
      setError(
        "Unable to generate recommendations. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

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
                Describe your project, select your priorities, and find
                AI models that fit your requirements.
              </p>
            </div>

            <form
              className="find-model__form"
              onSubmit={handleSubmit}
              aria-busy={isLoading}
            >
              <div className="form-group">
                <label htmlFor="requirements" className="form-label">
                  What are you building?
                </label>

                <textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  className="form-textarea find-model__textarea"
                  placeholder="Example: I need an affordable AI model for a customer-support chatbot with fast responses and image understanding."
                  required
                  minLength={5}
                  maxLength={3000}
                  aria-describedby={error ? "find-model-error" : undefined}
                />

                <span className="form-hint">
                  {formData.requirements.length}/3000 characters
                </span>
              </div>

              <div className="find-model__options">
                <div className="form-group">
                  <label htmlFor="budget" className="form-label">
                    Budget
                  </label>

                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Any budget</option>
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
                    value={formData.priority}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Balanced</option>
                    <option value="cost">Cost</option>
                    <option value="speed">Speed</option>
                    <option value="quality">Quality</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="task" className="form-label">
                    Primary task
                  </label>

                  <select
                    id="task"
                    name="task"
                    value={formData.task}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Any task</option>
                    <option value="chat">Chat</option>
                    <option value="coding">Coding</option>
                    <option value="vision">Vision</option>
                    <option value="reasoning">Reasoning</option>
                    <option value="embeddings">Embeddings</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <fieldset className="find-model__capabilities">
                <legend className="form-label">Required capabilities</legend>

                {[
                  { name: "vision", label: "Vision" },
                  { name: "audio", label: "Audio" },
                  { name: "tools", label: "Tool calling" },
                  { name: "large_context", label: "Large context" },
                ].map(({ name, label }) => (
                  <label className="capability-option" key={name}>
                    <input
                      type="checkbox"
                      name={name}
                      checked={formData[name]}
                      onChange={handleChange}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </fieldset>

              {error && (
                <p
                  id="find-model-error"
                  className="form-error"
                  role="alert"
                >
                  {error}
                </p>
              )}

              <Button type="submit" disabled={isLoading}>
                <Sparkles size={17} aria-hidden="true" />
                {isLoading ? "Finding your match..." : "Find My Model"}
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