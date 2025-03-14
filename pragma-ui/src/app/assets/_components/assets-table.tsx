"use client";

import { useQueries, useQuery } from "@tanstack/react-query";

import { getTokens } from "@/app/assets/_helpers/getTokens";

import { AssetInfo } from "@/app/assets/_types";
import AssetList from "./asset-list";
import { getEventStream } from "@/lib/get-event-stream";
import { useMemo, useState } from "react";
import { getAssets } from "../_helpers/getAssets";
import { startStreaming } from "../_helpers/startStreaming";

type AssetsTableProps = {
  initialTokens: AssetInfo[];
  source: string;
  options: string[];
};

export const AssetsTable = ({
  initialTokens,
  source = "mainnet",
  options,
}: AssetsTableProps) => {
  const [streamingData, setStreamingData] = useState<{ [ticker: string]: any }>(
    {}
  );

  const {
    data: tokens,
    isLoading: isLoadingTokens,
    isFetching: isFetchingTokens,
    isRefetching: isRefecthingTokens,
  } = useQuery({
    queryKey: ["AVAILABLE_TOKENS", source],
    queryFn: async () => {
      const result = await getTokens(source);
      return result;
    },
    initialData: initialTokens,
    retry: 1,
    retryDelay: 1000,
  });

  const assetQueries = useQueries({
    queries: tokens.map((asset) => ({
      queryKey: ["asset", asset.ticker, source],
      queryFn: () =>
        getAssets({
          asset,
          assets: tokens,
          source,
          startStreaming: () =>
            startStreaming([asset], setStreamingData).catch((error) => {
              console.error(
                `Error starting stream for ${asset.ticker}:`,
                error
              );
            }),
          streamingData,
        }),
      initialData: initialTokens?.[asset.ticker],
      refetchInterval: source === "api" ? 1000 : undefined,
      retry: false,
      enabled: source !== "api",
    })),
  });

  const isTokensLoadingData =
    isLoadingTokens || isFetchingTokens || isRefecthingTokens;

  const data = useMemo(() => {
    if (source === "api") {
      const result = { ...streamingData };
      tokens.forEach((asset) => {
        if (!result[asset.ticker]) {
          result[asset.ticker] = {
            price: "0x0",
            decimals: 0, // asset.decimals || 8,
            last_updated_timestamp: Math.floor(Date.now() / 1000),
            nb_sources_aggregated: 0,
            variations: { "1h": 0, "1d": 0, "1w": 0 },
            loading: true,
          };
        }
      });
      return result;
    }

    return tokens.reduce((acc, asset, index) => {
      acc[asset.ticker] = assetQueries[index].data;
      return acc;
    });
  }, [source, tokens, assetQueries, streamingData]);

  console.log({ data });

  return (
    <AssetList
      options={options}
      isAsset
      assets={data}
      selectedSource={source}
      loading={isTokensLoadingData}
    />
  );
};
