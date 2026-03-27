import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5006",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token on every request (if present)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Single unified 401 handler + error normalizer
api.interceptors.response.use(
  (resp) => resp,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/login") window.location.href = "/login";
    }

    // Normalize error message so every page can use err.message directly
    const data = err?.response?.data;
    if (data?.detail) err.message = data.detail;
    else if (data?.title) err.message = data.title;

    return Promise.reject(err);
  }
);

export default api;
