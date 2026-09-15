"use client";

import { useQueries, useQuery } from "@tanstack/react-query";

import { getTokens } from "@/app/(dashboard)/assets/_helpers/getTokens";

import { AssetT } from "@/app/(dashboard)/assets/_types";
import { useEffect, useMemo, useState } from "react";
import { getAssets } from "../_helpers/getAssets";
import { formatAssets } from "../_helpers";
import AssetList from "./asset-list";
import { getMidenPrices } from "@/lib/miden-api";

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
  const isMiden = source === "miden";
  const midenQuery = useQuery({
    queryKey: ["MIDEN_PRICES", source],
    queryFn: getMidenPrices,
    enabled: isMiden,
    refetchInterval: 30000,
    retry: 1,
  });
  // Re-render ages even when a feed stops sending data.
  const [, refreshAges] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => refreshAges((value) => value + 1), 10000);
    return () => clearInterval(timer);
  }, []);

  const { data: tokens, isLoading: isLoadingTokens } = useQuery({
    queryKey: ["AVAILABLE_TOKENS", source],
    queryFn: async () => {
      const result = await getTokens(source);
      return result;
    },
    initialData: initialTokens,
    enabled: !isMiden,
    retry: 1,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
  });

  const assetQueries = useQueries({
    queries: (tokens ?? []).map((asset) => ({
      queryKey: ["asset", asset.ticker, source],
      queryFn: () => getAssets({ asset, source }),
      enabled: !isMiden,
      refetchInterval: 30000,
      retry: 1,
      retryDelay: 2000,
    })),
  });

  const isTokensLoadingData =
    isLoadingTokens ||
    (assetQueries.length > 0 && assetQueries.every((query) => query.isLoading));

  const data = useMemo(() => {
    return (tokens ?? []).reduce((acc, asset, index) => {
      const query = assetQueries[index];
      acc[asset.ticker] = query?.isError
        ? { error: "Price unavailable" }
        : (query?.data ?? { error: "Waiting for price" });
      return acc;
    }, {});
  }, [tokens, assetQueries]);

  const formattedAssets = isTokensLoadingData
    ? []
    : formatAssets(data, source).sort((a, b) => {
        // Sort by ticker alphabetically
        return a.ticker.localeCompare(b.ticker);
      });

  if (isMiden) {
    return (
      <AssetList
        options={options}
        assets={midenQuery.data ?? []}
        selectedSource={source}
        loading={midenQuery.isLoading}
        error={
          midenQuery.isError
            ? "Miden prices are temporarily unavailable. Retrying automatically; any prices shown are from the last successful request."
            : undefined
        }
      />
    );
  }

  return (
    <AssetList
      options={options}
      assets={formattedAssets.filter((asset) => asset.ticker.includes("/USD"))}
      selectedSource={source}
      loading={isTokensLoadingData}
    />
  );
};
