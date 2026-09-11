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
  const [streamingData, setStreamingData] = useState<PriceStreamData>({});

  const { data: tokens, isLoading: isLoadingTokens } = useQuery({
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

  const assets = useMemo(
    () =>
      (tokens ?? []).map((token) => ({
        ticker: token.ticker.includes("/")
          ? token.ticker
          : token.ticker + "/USD",
        address: token.address || "0x0",
        decimals: token.decimals ?? 8,
      })),
    [tokens]
  );

  useEffect(() => {
    if (source !== "api" || assets.length === 0) return;
    return startPriceStream(
      assets.map((asset) => asset.ticker),
      setStreamingData
    );
  }, [source, assets]);

  const assetQueries = useQueries({
    queries: (tokens ?? []).map((asset) => ({
      queryKey: ["asset", asset.ticker, source],
      queryFn: () => getAssets({ asset, source }),
      initialData: initialTokens?.[asset.ticker],
      refetchInterval: source === "mainnet" ? 30000 : false,
      retry: false,
      enabled: source !== "api",
    })),
  });

  const isStreamLoading =
    source === "api" &&
    assets.length > 0 &&
    assets.every(
      (asset) =>
        !streamingData[asset.ticker] || streamingData[asset.ticker].loading
    );

  const isTokensLoadingData =
    isLoadingTokens ||
    (source === "mainnet" &&
      assetQueries.length > 0 &&
      assetQueries.every((query) => query.isLoading)) ||
    isStreamLoading;

  const data = useMemo(() => {
    if (source === "api")
      return Object.fromEntries(
        assets.map((asset) => [
          asset.ticker,
          streamingData[asset.ticker] ?? { error: "Waiting for price" },
        ])
      );

    return (tokens ?? []).reduce((acc, asset, index) => {
      const query = assetQueries[index];
      acc[asset.ticker] = query?.isError
        ? { error: "Price unavailable" }
        : (query?.data ?? { error: "Waiting for price" });
      return acc;
    }, {});
  }, [source, tokens, assets, assetQueries, streamingData]);

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
