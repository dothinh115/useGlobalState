import { headers } from "next/headers";

export const serverFetch = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const clientHeaders = headers();
  try {
    const response = await fetch(url, {
      method: "GET", // Hoặc 'POST', 'PUT', 'DELETE' tuỳ theo yêu cầu
      ...(clientHeaders && {
        headers: clientHeaders,
      }),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};
