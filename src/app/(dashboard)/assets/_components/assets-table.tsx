"use client";

import { useQueries, useQuery } from "@tanstack/react-query";

import { getTokens } from "@/app/(dashboard)/assets/_helpers/getTokens";

import { AssetT } from "@/app/(dashboard)/assets/_types";
import { useEffect, useMemo, useState } from "react";
import { getAssets } from "../_helpers/getAssets";
import { startPriceStream, PriceStreamData } from "@/lib/price-stream";
import { formatAssets } from "../_helpers";
import AssetList from "./asset-list";

type AssetsTableProps = {
  initialTokens: AssetT[];
  source: string;
  options: string[];
};

export const AssetsTable = ({
  initialTokens,
  source = "mainnet",
  options,
}: AssetsTableProps) => {
  const [assets, setAssets] = useState<AssetT[]>([]);
  const [streamingData, setStreamingData] = useState<PriceStreamData>({});

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
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (tokens && tokens.length > 0) {
      const newAssets = tokens.map((token) => {
        const ticker = token.ticker.includes("/USD")
          ? token.ticker
          : token.ticker + "/USD";
        return {
          ticker,
          address: token.address || "0x0",
          decimals: token.decimals || 8,
        };
      });
      setAssets(newAssets);
    }
  }, [tokens, source]);

  useEffect(() => {
    if (source !== "api" || assets.length === 0) {
      setStreamingData({});
      return;
    }
    const pairs = assets.map((asset) => asset.ticker);
    setStreamingData(
      Object.fromEntries(pairs.map((pair) => [pair, { loading: true }]))
    );
    return startPriceStream(pairs, setStreamingData);
  }, [source, assets]);

  const assetQueries = useQueries({
    queries: (tokens ?? []).map((asset) => ({
      queryKey: ["asset", asset.ticker, source],
      queryFn: () => getAssets({ asset, source }),
      initialData: initialTokens?.[asset.ticker],
      refetchInterval: source === "api" ? 1000 : undefined,
      retry: false,
      enabled: source !== "api",
    })),
  });

  const isStreamLoading =
    source === "api" &&
    (isFetchingTokens ||
      assets.length === 0 ||
      Object.values(streamingData).every((d: any) => d?.loading));

  const isTokensLoadingData =
    isLoadingTokens ||
    isFetchingTokens ||
    isRefecthingTokens ||
    assetQueries.some((query: any) => query.isLoading) ||
    isStreamLoading;

  const data = useMemo(() => {
    if (source === "api") return streamingData;

    return (tokens ?? []).reduce((acc, asset, index) => {
      acc[asset.ticker] = assetQueries[index]?.data ?? {
        error: "Price unavailable",
      };
      return acc;
    }, {});
  }, [source, tokens, assetQueries, streamingData]);

  const formattedAssets = isTokensLoadingData
    ? []
    : formatAssets(data, source).sort((a, b) => {
        // Sort by ticker alphabetically
        return a.ticker.localeCompare(b.ticker);
      });

  return (
    <AssetList
      options={options}
      assets={formattedAssets.filter((asset) => asset.ticker.includes("/USD"))}
      selectedSource={source}
      loading={isTokensLoadingData}
    />
  );
};
