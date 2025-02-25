import { useFetch, useCookie, useRuntimeConfig } from "#imports";

export const loginService = async (email: string, password: string) => {
  const config = useRuntimeConfig();
  const baseURL =
    config.public.VITE_API_BASE_URL || "https://api-dev.7lerp.com/central/api";

  const accessToken = useCookie("accessToken");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: accessToken.value ? `Bearer ${accessToken.value}` : "",
    "X-Authorization":
      "0kbnSUh2SjEShddBbpzyG0htrFXDFLuH8e5WhgvjER9UE6XZdUuDGXigBFSDe789",
  };

  return useFetch("/tenant-owner/login", {
    baseURL,
    method: "POST",
    headers,
    body: { email, password },
    credentials: "include",
  });
};
