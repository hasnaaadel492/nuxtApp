import { defineNuxtPlugin, useRuntimeConfig } from "#app";
import { useCookie } from "#imports";

export default defineNuxtPlugin(() => {
  const useApi = async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    const config = useRuntimeConfig();
    const baseURL =
      config.public.VITE_API_BASE_URL ||
      "https://api-dev.7lerp.com/central/api";

    // ✅ Use useCookie() instead of localStorage
    const lang = useCookie("lang");
    const accessToken = useCookie("accessToken");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Accept-Language": lang.value || "ar",
      "X-Authorization":
        config.public.VITE_X_AUTHORIZATION ||
        "UecYq9HzazyIjQ116v8E82VRLxotWPKiCm10gmH2kGF55EMN1TiBK5AhNq7rAa9k",
    };

    if (accessToken.value) {
      headers.Authorization = `Bearer ${accessToken.value}`;
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
          // ✅ Remove cookies on 401 (Unauthorized)
          useCookie("accessToken").value = null;
          useCookie("userData").value = null;
          useCookie("userAbilities").value = null;
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
