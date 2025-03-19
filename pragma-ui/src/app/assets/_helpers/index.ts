import moment from "moment";

import { PublisherT } from "@/providers/data";
import { getPublisherType } from "@/utils";
import { AssetInfo, DataProviderInfo } from "../_types";
import { COINGECKO_MAPPING_IDS } from "@/utils/types";

export const formatAssets = (data: { [ticker: string]: any }): AssetInfo[] => {
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
      const baseCurrency = ticker
        .split("/")[0]
        .toLowerCase() as keyof typeof COINGECKO_MAPPING_IDS;

      // Handle price - it could be a hex string or a number
      let price = 0;
      if (
        typeof assetData.price === "string" &&
        assetData.price.startsWith("0x")
      ) {
        price = parseInt(assetData.price, 16) / 10 ** (assetData.decimals || 8);
      } else if (typeof assetData.price === "number") {
        price = assetData.price;
      } else if (typeof assetData.price === "string") {
        try {
          price = parseFloat(assetData.price) / 10 ** (assetData.decimals || 8);
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
};
