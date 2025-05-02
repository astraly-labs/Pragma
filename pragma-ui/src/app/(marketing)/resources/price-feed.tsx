"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UTCTimestamp } from "lightweight-charts";
import { AssetT } from "@/app/(dashboard)/assets/_types";
import PriceFeedBox from "@/components/Resources/PriceFeedBox";
import { ChartBox } from "@/app/(marketing)/_components/chart-box";
import { AssetBox } from "@/app/(marketing)/_components/asset-box";
import { fetchAsset } from "@/app/(marketing)/_helpers/fetch-asset";
import { INITIAL_ASSETS } from "@/lib/constants";
import { initialAssets } from "@/lib/endpoints";

type Assets = {
  ticker: string;
  lastPrice: any;
  variation24h: number | null;
  relativeVariation24h: number | null;
  priceData: {
    time: UTCTimestamp;
    value: number;
  }[];
}[];

export const PriceFeed = ({ initialData }: { initialData: Assets }) => {
  const [selectedAssetPair, setSelectedAssetPair] = useState<AssetT>(
    INITIAL_ASSETS[0]
  );

  const { data: allData } = useQuery({
    queryKey: ["RESOURCES_ASSETS"],
    queryFn: async () => {
      const results = await Promise.all(
        INITIAL_ASSETS.map((asset) => fetchAsset(asset.ticker, asset.decimals))
      );

      return results;
    },
    initialData: initialData,
    retry: 0,
    // staleTime: 60000, // Cache for 1 minute
  });

  const selectedAsset = useMemo(
    () =>
      allData?.find((asset) => asset.ticker === selectedAssetPair.ticker) ||
      null,
    [allData, selectedAssetPair]
  );

  const handleAssetSelect = (assetPair: AssetT) => {
    setSelectedAssetPair(assetPair);
  };

  if (!selectedAsset) return null;

  return (
    <PriceFeedBox
      selectedAsset={selectedAsset}
      initialAssets={initialAssets}
      handleAssetSelect={handleAssetSelect}
      data={allData}
    />
  );
};
