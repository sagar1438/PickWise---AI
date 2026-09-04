const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function getModels() {
  return request("/api/models");
}

export async function getModelById(id) {
  return request(`/api/models/${id}`);
}

export async function getTrendingModels() {
  return request("/api/trending");
}

export async function getNewReleases() {
  return request("/api/releases");
}

export async function getRecommendations(payload) {
  return request("/api/recommendations", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}