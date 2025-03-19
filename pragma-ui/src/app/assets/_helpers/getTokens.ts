import { dataSources } from "@/lib/endpoints";
import { Token, AssetT } from "@/app/assets/_types";

export const getTokens = async (source?: string): Promise<AssetT[]> => {
  if (source === "api") {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PUBLIC_URL}/${dataSources.tokensApi}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch available tokens");
    }

    const data: { tokens: Token[] } = await response.json();

    return data.tokens || [];
  }

  return [
    { ticker: "BTC/USD", address: "0x0", decimals: 8 },
    { ticker: "ETH/USD", address: "0x1", decimals: 8 },
    { ticker: "STRK/USD", address: "0x1", decimals: 8 },
  ];
};
