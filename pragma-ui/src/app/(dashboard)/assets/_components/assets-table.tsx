"use client";

import { useQueries, useQuery } from "@tanstack/react-query";

import { getTokens } from "@/app/(dashboard)/assets/_helpers/getTokens";

import { AssetT } from "@/app/(dashboard)/assets/_types";
import { useEffect, useMemo, useState } from "react";
import { getAssets } from "../_helpers/getAssets";
import { startStreaming } from "../_helpers/startStreaming";
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
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (tokens) {
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
    if (source === "api" && assets.length > 0) {
      let mounted = true;
      let retryCount = 0;
      const maxRetries = 3;
      const retryDelay = 5000; // 5 seconds

      // Clear existing streams
      setStreamingData({});

      // Initialize loading state for all assets
      setStreamingData((prev) => {
        const newState = { ...prev };
        assets.forEach((asset) => {
          newState[asset.ticker] = {
            price: "0x0",
            decimals: asset.decimals,
            last_updated_timestamp: Math.floor(Date.now() / 1000),
            nb_sources_aggregated: 0,
            variations: { "1h": 0, "1d": 0, "1w": 0 },
            loading: true,
          };
        });
        return newState;
      });

      // Function to start stream with retry logic
      const startStreamWithRetry = async () => {
        try {
          await startStreaming(assets, setStreamingData);
        } catch (error) {
          if (mounted && retryCount < maxRetries) {
            retryCount++;
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
            return startStreamWithRetry();
          } else {
            if (mounted) {
              setStreamingData((prev) => {
                const newState = { ...prev };
                assets.forEach((asset) => {
                  newState[asset.ticker] = {
                    ...(prev[asset.ticker] || {}),
                    loading: false,
                    error: `Failed after ${maxRetries} attempts: ${error.message}`,
                  };
                });
                return newState;
              });
            }
            throw error;
          }
        }
      };

      // Start the stream with retry logic
      startStreamWithRetry().catch((error) => {
        console.error("All retry attempts failed:", error);
      });

      return () => {
        mounted = false;
      };
    } else {
      setStreamingData({});
    }
  }, [source, assets]);

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
    (isLoadingTokens && source === "api") ||
    assetQueries.some((query: any) => query.isLoading) ||
    isLoadingTokens ||
    isFetchingTokens ||
    isRefecthingTokens;

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
      acc[asset.ticker] = assetQueries[index]?.data ?? {};
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
