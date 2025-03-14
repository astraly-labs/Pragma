import { dataSources } from "@/lib/endpoints";
import { AssetInfo, Token } from "@/app/assets/_types";
import { formatAssets } from ".";

const sortTokens = (tokens: Token[]) => {
  return formatAssets(tokens).sort((a, b) => {
    // Sort by ticker alphabetically
    return a.ticker.localeCompare(b.ticker);
  });
};

export const getTokens = async (source?: string): Promise<AssetInfo[]> => {
  if (source === "api") {
    const response = await fetch(
      `http://localhost:3000/${dataSources.tokensApi}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch available tokens");
    }

    const data: { tokens: Token[] } = await response.json();

    return sortTokens(data.tokens) || [];
  }

  return sortTokens([
    { ticker: "BTC/USD", address: "0x0", decimals: 8 },
    { ticker: "ETH/USD", address: "0x1", decimals: 8 },
    { ticker: "STRK/USD", address: "0x1", decimals: 8 },
  ]);
};
