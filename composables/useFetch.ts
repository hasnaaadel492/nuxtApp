import { useCookie } from "#imports";

export const useFetchWithCsrf = <T>(url: string, options: any = {}) => {
  const csrfToken = useCookie("XSRF-TOKEN"); // ✅ Get CSRF token from cookies

  // Add CSRF token to headers if available
  const headers = {
    ...options.headers,
    "X-Authorization":
      "UecYq9HzazyIjQ116v8E82VRLxotWPKiCm10gmH2kGF55EMN1TiBK5AhNq7rAa9k",
  };

  // Use Nuxt's built-in `useFetch`
  const { data, error } = useFetch<T>(url, {
    ...options,
    headers,
    credentials: "include", // ✅ Include cookies in requests
  });

  // Global error handling
  if (error.value) {
    if (error.value.statusCode === 401 && process.client) {
      // ✅ Handle 401 Unauthorized
      useCookie("accessToken").value = null;
      useCookie("userData").value = null;
      useCookie("userAbilities").value = null;
      window.location.href = "/auth/login";
    } else if (error.value.statusCode === 503 && process.client) {
      // ✅ Handle 503 Service Unavailable
      window.location.href = "/under-maintenance";
    }

    throw new Error(error.value.message || "API Request Failed");
  }

  return { data, error };
};
