/** The browser uses same-origin proxies; credentials stay on the server. */
export async function fetchExplorer<T>(
  path: string,
  browserPath?: string
): Promise<T> {
  const server = typeof window === "undefined";
  const base = process.env.NEXT_PUBLIC_INTERNAL_API;
  if (server && !base)
    throw new Error("Explorer data is temporarily unavailable");
  const response = await fetch(server ? `${base}${path}` : browserPath!, {
    headers:
      server && process.env.API_KEY ? { "x-api-key": process.env.API_KEY } : {},
    signal: AbortSignal.timeout(25000),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Explorer data is temporarily unavailable");
  const data = await response.json();
  if (data && typeof data === "object" && data.error) {
    throw new Error("Explorer data is temporarily unavailable");
  }
  return data as T;
}
