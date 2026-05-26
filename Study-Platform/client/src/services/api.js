import axios from "axios";

const API = axios.create({

  baseURL:
    import.meta.env.VITE_API_URL,

  withCredentials: true,

});

/* =========================
   REQUEST INTERCEPTOR
========================= */

API.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem(
        "token"
      );

    // AUTOMATICALLY ADD TOKEN
    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  },

  (error) => {

    return Promise.reject(error);

  }

);

/* =========================
   RESPONSE INTERCEPTOR
========================= */

API.interceptors.response.use(

  (response) => response,

  (error) => {

    // AUTO LOGOUT IF TOKEN INVALID
    if (
      error.response?.status === 401
    ) {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      // REDIRECT TO LOGIN
      window.location.href =
        "/login";

    }

    return Promise.reject(error);

  }

);

export default API;