import { Token, AssetT } from "@/app/(dashboard)/assets/_types";
import { DEFAULT_ASSETS } from "@/lib/constants";

export const getTokens = async (source?: string): Promise<AssetT[]> => {
  if (source === "api") {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_INTERNAL_API}/tokens/all`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch available tokens");
    }

    const data: { tokens: Token[] } = await response.json();

    return data.tokens || [];
  }

  return DEFAULT_ASSETS;
};
