const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"
).replace(/\/+$/, "");

async function request(endpoint, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } catch {
    throw new Error(
      "Unable to connect to the server. Please check your connection."
    );
  }

  if (!response.ok) {
    let message = `Request failed (${response.status})`;

    try {
      const errorData = await response.json();
      message = errorData.detail || errorData.message || message;
    } catch {
      // Keep the default error message.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function getModels() {
  return request("/api/models");
}

export function getModelById(id) {
  return request(`/api/models/${encodeURIComponent(id)}`);
}

export function getTrendingModels() {
  return request("/api/trending");
}

export function getNewReleases() {
  return request("/api/releases");
}

export function getRecommendations(payload) {
  return request("/api/recommendations", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}