import moment from "moment";

import { AssetInfo } from "../_types";
import { COINGECKO_MAPPING_IDS } from "@/utils/types";

type Component = {
  publisher: string;
  source: string;
  price: number;
  tx_hash: string;
  timestamp: number;
};

type Variations = {
  past1h: number;
  past24h: number;
  past7d: number;
};

type AssetData = {
  image: string;
  type: string;
  ticker: string;
  decimals: number;
  components: Component[];
  lastUpdated: number;
  price: number;
  sources: number;
  variations: Variations;
  chart: string;
  ema: string;
  macd: string;
  error: string | null;
  isUnsupported: boolean;
};

export const formatAssets = (
  data: { [ticker: string]: any },
  source: string
): AssetInfo[] => {
  if (source === "mainnet") {
    return Object.keys(data)
      .filter((ticker) => data[ticker]) // Filter out undefined/null entries
      .map((ticker) => {
        const assetData: AssetData = data[ticker];

        // Check if this asset has an error (like unsupported asset)
        const hasError = typeof assetData.error === "string";
        const isUnsupported = assetData.isUnsupported === true;

        // Handle missing timestamp
        const timestamp = assetData.lastUpdated
          ? assetData.lastUpdated * 1000
          : Date.now();

        const now = Date.now();
        const diffMs = now - timestamp;

        let lastUpdated: string;
        if (hasError) {
          // For error cases, show the error instead of the timestamp
          lastUpdated = isUnsupported
            ? "Unsupported asset"
            : "Error fetching data";
        } else if (diffMs < 10000) {
          // Less than 10 seconds, show ms
          lastUpdated = `${diffMs}ms ago`;
        } else if (diffMs < 60000) {
          // Less than 1 minute
          const seconds = Math.floor(diffMs / 1000);
          const ms = diffMs % 1000;
          lastUpdated = `${seconds}.${ms.toString().padStart(3, "0")}s ago`;
        } else if (diffMs < 3600000) {
          // Less than 1 hour
          const minutes = Math.floor(diffMs / 60000);
          const seconds = Math.floor((diffMs % 60000) / 1000);
          lastUpdated = `${minutes}m ${seconds}s ago`;
        } else {
          lastUpdated = moment(timestamp).format("HH:mm:ss.SSS");
        }

        // Get the base currency symbol (e.g., "BTC" from "BTC/USD")
        const baseCurrency = ticker.split("/")[0].toLowerCase();

        // Handle price - it could be a hex string or a number
        let price = 0;
        if (
          typeof assetData.price === "string" &&
          String(assetData.price).startsWith("0x")
        ) {
          price =
            parseInt(assetData.price, 16) / 10 ** (assetData.decimals || 8);
        } else if (typeof assetData.price === "number") {
          price = assetData.price;
        } else if (typeof assetData.price === "string") {
          try {
            price =
              parseFloat(assetData.price) / 10 ** (assetData.decimals || 8);
          } catch (e) {
            console.error(
              `Failed to parse price for ${ticker}:`,
              assetData.price
            );
            price = 0;
          }
        }

        return {
          image: `/assets/currencies/${baseCurrency}.svg`,
          type: "Crypto",
          ticker,
          lastUpdated,
          price,
          sources: assetData.sources || 0,
          variations: {
            past1h: assetData.variations?.["past1h"]
              ? (assetData.variations["past1h"] * 100).toFixed(2)
              : "0.00",
            past24h: assetData.variations?.["past7d"]
              ? (assetData.variations["past7d"] * 100).toFixed(2)
              : "0.00",
            past7d: assetData.variations?.["past24h"]
              ? (assetData.variations["past24h"] * 100).toFixed(2)
              : "0.00",
          },
          chart: `https://www.coingecko.com/coins/${
            COINGECKO_MAPPING_IDS[baseCurrency] || "1"
          }/sparkline.svg`,
          ema: "soon",
          macd: "soon",
          error: assetData.error ?? undefined,
          isUnsupported: assetData.isUnsupported,
        };
      });
  } else {
    return Object.keys(data)
      .filter((ticker) => data[ticker]) // Filter out undefined/null entries
      .map((ticker) => {
        const assetData = data[ticker];

        // Check if this asset has an error (like unsupported asset)
        const hasError = assetData.error !== undefined;
        const isUnsupported = assetData.isUnsupported === true;

        // Handle missing timestamp
        const timestamp = assetData.last_updated_timestamp
          ? assetData.last_updated_timestamp * 1000
          : Date.now();

        const now = Date.now();
        const diffMs = now - timestamp;

        let lastUpdated;
        if (hasError) {
          // For error cases, show the error instead of the timestamp
          lastUpdated = isUnsupported
            ? "Unsupported asset"
            : "Error fetching data";
        } else if (diffMs < 10000) {
          // Less than 10 seconds, show ms
          lastUpdated = `${diffMs}ms ago`;
        } else if (diffMs < 60000) {
          // Less than 1 minute
          const seconds = Math.floor(diffMs / 1000);
          const ms = diffMs % 1000;
          lastUpdated = `${seconds}.${ms.toString().padStart(3, "0")}s ago`;
        } else if (diffMs < 3600000) {
          // Less than 1 hour
          const minutes = Math.floor(diffMs / 60000);
          const seconds = Math.floor((diffMs % 60000) / 1000);
          lastUpdated = `${minutes}m ${seconds}s ago`;
        } else {
          lastUpdated = moment(timestamp).format("HH:mm:ss.SSS");
        }

        // Get the base currency symbol (e.g., "BTC" from "BTC/USD")
        const baseCurrency = ticker.split("/")[0].toLowerCase();

        // Handle price - it could be a hex string or a number
        let price = 0;
        if (
          typeof assetData.price === "string" &&
          assetData.price.startsWith("0x")
        ) {
          price =
            parseInt(assetData.price, 16) / 10 ** (assetData.decimals || 8);
        } else if (typeof assetData.price === "number") {
          price = assetData.price;
        } else if (typeof assetData.price === "string") {
          try {
            price =
              parseFloat(assetData.price) / 10 ** (assetData.decimals || 8);
          } catch (e) {
            console.error(
              `Failed to parse price for ${ticker}:`,
              assetData.price
            );
            price = 0;
          }
        }

        return {
          image: `/assets/currencies/${baseCurrency}.svg`,
          type: "Crypto",
          ticker,
          lastUpdated,
          price,
          sources: assetData.nb_sources_aggregated || 0,
          variations: {
            past1h: assetData.variations?.["1h"]
              ? (assetData.variations["1h"] * 100).toFixed(2)
              : "0.00",
            past24h: assetData.variations?.["1d"]
              ? (assetData.variations["1d"] * 100).toFixed(2)
              : "0.00",
            past7d: assetData.variations?.["1w"]
              ? (assetData.variations["1w"] * 100).toFixed(2)
              : "0.00",
          },
          chart: `https://www.coingecko.com/coins/${
            COINGECKO_MAPPING_IDS[baseCurrency] || "1"
          }/sparkline.svg`,
          ema: "soon",
          macd: "soon",
          error: assetData.error,
          isUnsupported: assetData.isUnsupported,
        };
      });
  }
};
