import { ofetch } from "ofetch";

export const clientFetch = async <T = any>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  try {
    const response = await ofetch<T>(url, {
      baseURL: process.env.APP_URL,
      ...options,
    });
    return response;
  } catch (error) {
    console.error("Failed to fetch data on client:", error);
    throw error;
  }
};
