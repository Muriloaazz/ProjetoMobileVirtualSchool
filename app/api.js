import { Platform } from "react-native";

const configuredUrl = process.env.EXPO_PUBLIC_API_URL?.trim().replace(
  /\/$/,
  "",
);

export default function getApiBaseUrls() {
  if (configuredUrl) return [configuredUrl];
  if (Platform.OS === "android") return ["http://10.0.2.2:8080"];
  return ["http://localhost:8080"];
}

export async function fetchFromApi(path, options) {
  let lastError;
  for (const baseUrl of getApiBaseUrls()) {
    try {
      const response = await fetch(`${baseUrl}${path}`, options);
      if (response.ok) return response;
      lastError = new Error(`A API retornou HTTP ${response.status}.`);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError ?? new Error("Nenhum endereço de API foi configurado.");
}
