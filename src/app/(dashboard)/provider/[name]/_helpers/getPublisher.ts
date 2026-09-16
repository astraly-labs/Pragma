import { Publisher } from "@/app/(dashboard)/assets/_types";

export const getPublisher = async (
  name: string,
  source?: string
): Promise<Publisher | undefined> => {
  if (!source || source === "api") {
    return undefined;
  }

  const publisherId = name.toUpperCase() === "READY" ? "ARGENT" : name;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_INTERNAL_API}/onchain/publisher/${encodeURIComponent(publisherId)}?network=starknet-${source}&data_type=Spot`,
    {
      headers: process.env.API_KEY ? { "x-api-key": process.env.API_KEY } : {},
      signal: AbortSignal.timeout(25000),
      cache: "no-store",
    }
  );

  if (response.status === 404) return undefined;

  if (!response.ok) {
    throw new Error("Failed to fetch publishers data");
  }

  const publisher: Publisher = await response.json();

  if (!publisher) {
    return undefined;
  }

  return publisher;
};
