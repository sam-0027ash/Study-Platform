import axios from "axios";

/* =========================
   AXIOS INSTANCE
========================= */

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

/* =========================
   REQUEST INTERCEPTOR
   (AUTO ATTACH TOKEN)
========================= */

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* =========================
   RESPONSE INTERCEPTOR
   (HANDLE AUTH ERRORS)
========================= */

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // AUTO LOGOUT ON UNAUTHORIZED
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // avoid redirect loop issues
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;