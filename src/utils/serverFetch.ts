import { headers } from "next/headers";

export default async function serverFetch<T = any>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const clientHeaders = await headers();
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
    console.error("Server fetch thất bại: ", error);
    throw error;
  }
}
