import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { getRecommendations } from "../services/api";

function FindModel() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    requirements: "",
    budget: "",
    priority: "",
    task: "",
    vision: false,
    audio: false,
    tools: false,
    large_context: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.requirements.trim()) {
      setError("Please describe what you're building.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const data = await getRecommendations({
        requirements: formData.requirements.trim(),
        budget: formData.budget || null,
        priority: formData.priority || null,
        task: formData.task || null,
        vision: formData.vision,
        audio: formData.audio,
        tools: formData.tools,
        large_context: formData.large_context,
      });

      navigate("/recommendations", {
        state: {
          requirements: formData.requirements,
          recommendations: data.recommendations,
        },
      });
    } catch (requestError) {
      setError(
        "We couldn't generate recommendations right now. Please make sure the backend is running and try again."
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
                Describe your project in your own words. PickWise will analyze
                your requirements and find the models that fit best.
              </p>
            </div>

            <form className="find-model__form" onSubmit={handleSubmit}>
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
                    value={formData.budget}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select budget</option>
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
                    <option value="">Select priority</option>
                    <option value="cost">Cost</option>
                    <option value="speed">Speed</option>
                    <option value="quality">Quality</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="task" className="form-label">
                    Task
                  </label>

                  <select
                    id="task"
                    name="task"
                    value={formData.task}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select task</option>
                    <option value="chat">Chat</option>
                    <option value="coding">Coding</option>
                    <option value="vision">Vision</option>
                    <option value="reasoning">Reasoning</option>
                    <option value="embeddings">Embeddings</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="find-model__capabilities">
                <p className="form-label">Capabilities</p>

                <label className="capability-option">
                  <input
                    type="checkbox"
                    name="vision"
                    checked={formData.vision}
                    onChange={handleChange}
                  />
                  <span>Vision</span>
                </label>

                <label className="capability-option">
                  <input
                    type="checkbox"
                    name="audio"
                    checked={formData.audio}
                    onChange={handleChange}
                  />
                  <span>Audio</span>
                </label>

                <label className="capability-option">
                  <input
                    type="checkbox"
                    name="tools"
                    checked={formData.tools}
                    onChange={handleChange}
                  />
                  <span>Tools</span>
                </label>

                <label className="capability-option">
                  <input
                    type="checkbox"
                    name="large_context"
                    checked={formData.large_context}
                    onChange={handleChange}
                  />
                  <span>Large context</span>
                </label>
              </div>

              {error && <p className="form-error">{error}</p>}

              <Button type="submit" disabled={isLoading}>
                <Sparkles size={17} />
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