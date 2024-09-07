import { headers } from "next/headers";
export const serverFetch = async <T = any>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const clientHeaders = headers();
  const target = new URL(url, process.env.APP_URL).toString();
  try {
    const response = await fetch(target, {
      ...(clientHeaders && {
        headers: clientHeaders,
      }),
      ...options,
    });

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};
