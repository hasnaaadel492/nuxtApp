// plugins/api.ts
import { defineNuxtPlugin, useRuntimeConfig } from "#app";

export default defineNuxtPlugin(() => {
  const useApi = async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    const config = useRuntimeConfig();
    const baseURL =
      config.public.VITE_API_BASE_URL ||
      "https://api-dev.7lerp.com/central/api";

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Accept-Language": process.client
        ? localStorage.getItem("lang") || "ar"
        : "ar",
      "X-Authorization":
        config.public.VITE_X_AUTHORIZATION ||
        "0kbnSUh2SjEShddBbpzyG0htrFXDFLuH8e5WhgvjER9UE6XZdUuDGXigBFSDe789",
    };

    if (process.client) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.Authorization = `Bearer ${JSON.parse(token)}`;
      }
    }

    try {
      const response = await fetch(`${baseURL}${endpoint}`, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });

      if (!response.ok) {
        if (response.status === 401 && process.client) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userData");
          localStorage.removeItem("userAbilities");
          window.location.href = "/auth/login";
        } else if (response.status === 503 && process.client) {
          window.location.href = "/under-maintenance";
        }

        const errorData = await response.json();
        throw new Error(errorData.message || "API Request Failed");
      }

      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  return {
    provide: {
      api: useApi,
    },
  };
});
