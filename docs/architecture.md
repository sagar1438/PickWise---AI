# PickWise - AI Architecture

## Overview

PickWise - AI is a full-stack application that helps users find the AI model that best fits their project requirements.

The application combines natural-language requirement analysis with a deterministic recommendation engine.

## Architecture Flow

User
→ React Frontend
→ FastAPI Backend
→ Gemini requirement parsing
→ Recommendation scoring engine
→ Top 3 models
→ Gemini explanation generation
→ React recommendations page

## Frontend

The frontend is built with:

- React
- Vite
- JavaScript
- React Router
- Plain CSS
- Lucide React

The frontend is responsible for:

- User interface
- Navigation
- Model discovery
- Model comparison
- Requirement collection
- Displaying recommendations
- Displaying model details

## Backend

The backend is built with:

- Python
- FastAPI
- SQLAlchemy
- SQLite
- Google Gemini API

The backend is responsible for:

- REST API endpoints
- Database access
- Requirement processing
- Model scoring
- Recommendation ranking
- Gemini integration

## Recommendation System

The recommendation system does not allow Gemini to directly choose a model.

The process is:

1. The user describes their requirements.
2. Gemini converts the description into structured requirements.
3. The backend recommendation engine evaluates available models.
4. Each model receives a deterministic match score.
5. The top three models are selected.
6. Gemini generates a human-readable explanation for each recommendation.

## Scoring

The initial scoring weights are:

| Factor | Weight |
|---|---:|
| Cost | 30% |
| Speed | 25% |
| Quality | 20% |
| Context | 15% |
| Features | 10% |

When the user selects a priority such as cost, speed, or quality, the weights can be adjusted.

## Database

The initial database contains:

- Providers
- Models
- Model Metrics
- Model Capabilities

SQLite is used during development.

PostgreSQL can be introduced later for production deployment.

## Design Principle

AI is used for understanding and explanation, while the application's core recommendation logic remains deterministic and explainable.

This makes the system easier to test, debug, and explain during technical interviews.