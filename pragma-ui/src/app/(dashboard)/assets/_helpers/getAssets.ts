import { dataSources } from "@/lib/endpoints";
import { AssetInfo, AssetT } from "../_types";
import { getEncodedTicker } from "../../asset/[ticker]/_helpers/getEncodedTicker";

type GetAssets = {
  source: string;
  asset: AssetT;
  assets: AssetT[];
  streamingData: any;
  startStreaming: () => Promise<void>;
};

export const getAssets = async ({
  source,
  asset,
  assets,
  streamingData,
  startStreaming,
}: GetAssets) => {
  if (source === "api") {
    const streamData = streamingData[asset.ticker];

    if (!streamData) {
      console.log(`No streaming data for ${asset.ticker}, returning default`);
      const isStreamStarted = assets.some((a) => a.ticker === asset.ticker);
      if (isStreamStarted && !streamingData[asset.ticker]) {
        console.log(`Starting stream for ${asset.ticker} on demand`);
        try {
          startStreaming();
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

    // const base = asset.ticker.split("/")[0].toLowerCase();
    // const quote = asset.ticker.split("/")[1].toLowerCase();

    // const encodedTicker = encodeURIComponent(`${base}/${quote}`);

    // const url = `${process.env.NEXT_PUBLIC_INTERNAL_API}/onchain/${encodedTicker}?network=${source}&aggregation=median`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${asset.ticker}`);
    }

    const data = await response.json();

    return data;
  }
};
