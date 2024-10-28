import { headers } from "next/headers";

export default async function serverFetch<T = any>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const clientHeaders = await headers();
  const target = new URL(url, process.env.APP_URL).toString();
  clientHeaders.delete("host");
  clientHeaders.delete("connection");
  clientHeaders.delete("content-length");
  clientHeaders.delete("accept-encoding");
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
}
