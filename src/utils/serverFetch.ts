import { headers } from "next/headers";

export default async function serverFetch<T = any>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const clientHeaders = headers();
  const sanitizedHeaders = new Headers(clientHeaders);

  const unwantedHeaders = [
    "host",
    "content-length",
    "connection",
    "accept-encoding",
  ];
  unwantedHeaders.forEach((header) => sanitizedHeaders.delete(header));

  const target = new URL(url, process.env.APP_URL).toString();
  try {
    const response = await fetch(target, {
      ...(sanitizedHeaders && {
        headers: sanitizedHeaders,
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
