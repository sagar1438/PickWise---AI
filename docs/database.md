# PickWise - AI Database

## Overview

PickWise uses SQLite during development.

The database stores AI model information, provider information, performance metrics, and supported capabilities.

## Tables

### providers

Stores information about AI model providers.

| Field | Type | Description |
|---|---|---|
| id | Integer | Primary key |
| name | String | Provider name |
| website | String | Provider website |
| logo | String | Logo URL or path |

### models

Stores the main information about each AI model.

| Field | Type | Description |
|---|---|---|
| id | Integer | Primary key |
| provider_id | Integer | References providers |
| name | String | Model name |
| description | Text | Model description |
| category | String | Model category |
| release_date | Date | Release date |
| is_trending | Boolean | Whether the model is marked as trending |

### model_metrics

Stores normalized scoring values used by the recommendation engine.

| Field | Type | Description |
|---|---|---|
| id | Integer | Primary key |
| model_id | Integer | References models |
| cost_score | Float | Cost efficiency score |
| speed_score | Float | Speed score |
| quality_score | Float | Quality score |
| reasoning_score | Float | Reasoning score |
| coding_score | Float | Coding score |

### model_capabilities

Stores supported capabilities and context information.

| Field | Type | Description |
|---|---|---|
| id | Integer | Primary key |
| model_id | Integer | References models |
| context_window | Integer | Context window size |
| supports_vision | Boolean | Vision support |
| supports_audio | Boolean | Audio support |
| supports_tools | Boolean | Tool support |

## Relationships

```text
providers
    │
    │ 1
    │
    └──────────< models
                    │
                    ├────────── model_metrics
                    │
                    └────────── model_capabilities