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
    { ticker: "BTC/USD", address: "0x2", decimals: 8 },
    { ticker: "ETH/USD", address: "0x1", decimals: 8 },
    { ticker: "WBTC/USD", address: "0x3", decimals: 8 },
    { ticker: "STRK/USD", address: "0x4", decimals: 8 },
    { ticker: "WSTETH/USD", address: "0x5", decimals: 8 },
    { ticker: "LORDS/USD", address: "0x6", decimals: 8 },
    { ticker: "EKUBO/USD", address: "0x7", decimals: 8 },
    { ticker: "BROTHER/USDPLUS", address: "0x8", decimals: 8 },
    { ticker: "ZEND/USD", address: "0x9", decimals: 8 },
    { ticker: "DAI/USD", address: "0x9", decimals: 8 },
    { ticker: "USDC/USD", address: "0x9", decimals: 8 },
    { ticker: "USDT/USD", address: "0x9", decimals: 8 },
    { ticker: "BTC/EUR", address: "0x9", decimals: 8 },
    { ticker: "WBTC/BTC", address: "0x9", decimals: 8 },
    { ticker: "NSTR/USD", address: "0x9", decimals: 8 },
    { ticker: "XSTRK/USD", address: "0x9", decimals: 8 },
  ];
};
