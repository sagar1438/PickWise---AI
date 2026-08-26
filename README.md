# PickWise AI

> **Choose the right AI model for what you're building.**

PickWise AI is a full-stack web application that helps developers and AI enthusiasts discover and choose AI models based on their specific requirements.

Instead of asking *“Which AI model is the best?”*, PickWise AI focuses on a better question:

> **“Which AI model is the best fit for my use case?”**

Users can describe what they are building, and PickWise AI analyzes their requirements to recommend the **top 3 matching AI models**, along with their strengths, trade-offs, capabilities, and match scores.

---

## ✨ Features

### 🤖 AI Model Recommendations

Describe your project requirements in natural language and get personalized recommendations.

Example:

> "I need a fast and affordable model for a customer-support chatbot with long-context support and image understanding."

PickWise AI returns:

```text
🥇 Model A — 93% Match
🥈 Model B — 88% Match
🥉 Model C — 84% Match
```

Each recommendation includes:

- Match score
- Why it was recommended
- Strengths
- Weaknesses
- Cost characteristics
- Speed
- Context window
- Supported capabilities

### 🔎 Discover AI Models

Browse available models and explore their:

- Providers
- Categories
- Capabilities
- Context windows
- Performance metrics
- Pricing information
- Release dates

### 🔥 Trending Models

Explore AI models currently gaining attention and popularity.

### 🚀 New Releases

Discover recently released AI models and explore their capabilities and use cases.

### ⚖️ Model Comparison

Compare multiple models side-by-side based on:

- Quality
- Speed
- Cost
- Context
- Reasoning
- Coding
- Vision
- Audio
- Tool support

### 🎯 Requirement-Based Matching

PickWise AI doesn't simply ask an AI model which model is "best."

The application:

```text
User Requirements
       ↓
AI Requirement Analysis
       ↓
Structured Requirements
       ↓
Recommendation Engine
       ↓
Model Scoring
       ↓
Top 3 Models
       ↓
AI-Generated Explanation
```

This combines AI with deterministic recommendation logic.

---

## 🛠️ Tech Stack

### Frontend

- React
- JavaScript
- HTML
- CSS
- Vite
- React Router
- Lucide React

### Backend

- Python
- FastAPI

### Database

- SQLite
- PostgreSQL

### AI

- Google Gemini API

---

## 🏗️ Architecture

```text
                    ┌───────────────────┐
                    │      React        │
                    │     Frontend     │
                    └─────────┬─────────┘
                              │
                         REST API
                              │
                              ▼
                    ┌───────────────────┐
                    │     FastAPI       │
                    │      Backend      │
                    └─────────┬─────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
       ┌─────────────────┐         ┌─────────────────┐
       │ Recommendation  │         │   Gemini API    │
       │     Engine      │         │                 │
       └────────┬────────┘         └─────────────────┘
                │
                ▼
       ┌─────────────────┐
       │  SQL Database   │
       │  Model Catalog  │
       └─────────────────┘
```

---

## 📁 Project Structure

```text
pickwise-ai/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── data/
│       ├── styles/
│       ├── App.jsx
│       ├── router.jsx
│       └── main.jsx
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── database/
│   │   ├── schemas/
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env.example
│
├── database/
│
├── docs/
│   ├── architecture.md
│   ├── database.md
│   ├── api.md
│   └── roadmap.md
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🎨 Design

PickWise AI is designed as a modern, premium product rather than a typical AI-generated dashboard.

The interface focuses on:

- Strong typography
- Clean layouts
- Generous whitespace
- Subtle gradients
- Soft shadows
- Minimal borders
- Smooth micro-interactions
- Responsive design
- Clear visual hierarchy

The design takes inspiration from modern product and SaaS interfaces while maintaining its own visual identity.

---

## 🔐 Security

API keys and sensitive configuration are stored using environment variables.

```env
GEMINI_API_KEY=your_api_key
DATABASE_URL=your_database_url
```

Secrets are never committed to the repository.

---

## 🚧 Project Status

**Under Development**

### Planned milestones

- [x] Project planning
- [ ] Frontend foundation
- [ ] Home page
- [ ] Model recommendation UI
- [ ] Model discovery
- [ ] Trending models
- [ ] New releases
- [ ] Model comparison
- [ ] FastAPI backend
- [ ] SQL database
- [ ] Recommendation engine
- [ ] Gemini integration
- [ ] Frontend/backend integration
- [ ] Testing
- [ ] Deployment

---

## 🔮 Future Improvements

Potential future features include:

- Personalized recommendation history
- Advanced model filtering
- More providers
- Live model data
- Usage-based cost estimation
- AI model benchmarks
- Saved models
- User accounts
- Community ratings

---

## ⚠️ Disclaimer

PickWise AI provides model recommendations based on available model information and user-defined requirements.

A model with the highest match score is **not necessarily the universally "best" model**. The recommended model depends on factors such as workload, budget, performance requirements, capabilities, and user priorities.

Model information such as pricing, capabilities, and release status may change over time.

---

## 👨‍💻 Author

**Sagar Panwar**

Built as a full-stack AI project using React, Python, FastAPI, SQL, and Gemini.

---

## 📄 License

This project is licensed under the MIT License.
