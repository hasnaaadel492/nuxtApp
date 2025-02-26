import { env } from "@/@core/utils/env";
import axios from "axios";

export default defineNuxtPlugin(async () => {
  const axiosIns = axios.create({
    baseURL: env("VITE_API_BASE_URL", "https://api-dev.7lerp.com/central/api"),

    withCredentials: true, // ✅ Enables cookies (including XSRF-TOKEN)
    headers: {
      "Accept-Language": useCookie("lang").value || "ar",

      Accept: "application/json, text/plain, */*",
      "X-Authorization": env(
        "VITE_X_AUTHORIZATION",
        "UecYq9HzazyIjQ116v8E82VRLxotWPKiCm10gmH2kGF55EMN1TiBK5AhNq7rAa9k"
      ),
    },
  });

  axiosIns.interceptors.request.use((config) => {
    const token = useCookie("accessToken").value;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axiosIns.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response?.status === 401) {
        useCookie("userData").value = null;
        useCookie("accessToken").value = null;
        useCookie("userAbilities").value = null;
        navigateTo("/auth/login");
      }
      if (error?.response?.status === 419) {
        console.error("419 Error: CSRF issue or session expired.");
        navigateTo("/auth/login");
      }
      if (error?.response?.status === 503) {
        navigateTo("/under-maintenance");
      }
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      axios: axiosIns,
    },
  };
});
