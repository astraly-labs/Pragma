import { dataSources } from "@/lib/endpoints";
import { AssetInfo } from "../_types";
import { Dispatch, SetStateAction } from "react";

type GetAssets = {
  source: string;
  asset: AssetInfo;
  assets: AssetInfo[];
  streamingData: any;
  startStreaming: (
    assets: AssetInfo[],
    setStreamingData: (
      value: SetStateAction<{
        [ticker: string]: any;
      }>
    ) => void
  ) => Promise<void>;
  setStreamingData: Dispatch<
    SetStateAction<{
      [ticker: string]: any;
    }>
  >;
};

export const getAssets = async ({
  source,
  asset,
  assets,
  streamingData,
  startStreaming,
  setStreamingData,
}: GetAssets) => {
  if (source === "api") {
    const streamData = streamingData[asset.ticker];

    if (!streamData) {
      console.log(`No streaming data for ${asset.ticker}, returning default`);
      const isStreamStarted = assets.some((a) => a.ticker === asset.ticker);
      if (isStreamStarted && !streamingData[asset.ticker]) {
        console.log(`Starting stream for ${asset.ticker} on demand`);
        try {
          startStreaming([asset], setStreamingData).catch((error) => {
            console.error(`Error starting stream for ${asset.ticker}:`, error);
          });
        } catch (error) {
          console.error(`Failed to start stream for ${asset.ticker}:`, error);
        }
      }
      return {
        price: "0x0",
        decimals: 0, // asset.decimals || 8,
        last_updated_timestamp: Math.floor(Date.now() / 1000),
        nb_sources_aggregated: 1,
        variations: {
          "1h": 0,
          "1d": 0,
          "1w": 0,
        },
      };
    }

    return {
      price: streamData.price || "0x0",
      decimals: streamData.decimals || 0, // asset.decimals || 8,
      last_updated_timestamp:
        streamData.last_updated_timestamp || Math.floor(Date.now() / 1000),
      nb_sources_aggregated: streamData.nb_sources_aggregated || 1,
      variations: streamData.variations || { "1h": 0, "1d": 0, "1w": 0 },
    };
  } else {
    const url = `${dataSources[source]}&pair=${encodeURIComponent(
      asset.ticker
    )}`;
    console.log(`[${asset.ticker}] Fetching from:`, url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${asset.ticker}`);
    }
    return response.json();
  }
};
