"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { UTCTimestamp } from "lightweight-charts";
import { AssetT } from "@/app/(dashboard)/assets/_types";
import { INITIAL_ASSETS } from "@/lib/constants";
import { fetchAsset } from "../_helpers/fetch-asset";
import { ChartBox } from "@/components/common/ChartBox";
import AssetBox from "@/components/common/AssetBox";

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

export const AssetsSection = ({ initialData }: { initialData: Assets }) => {
  const [selectedAssetPair, setSelectedAssetPair] = useState<AssetT>(
    INITIAL_ASSETS[0]
  );

  const { data: allData } = useQuery({
    queryKey: ["HOME_ASSETS"],
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
  return (
    <div className="flex h-full w-full flex-col gap-3 sm:gap-8">
      {selectedAsset && <ChartBox assetPair={selectedAsset} />}
      <AssetBox
        assets={INITIAL_ASSETS}
        onAssetSelect={setSelectedAssetPair}
        data={allData?.sort((a, b) => a.ticker.localeCompare(b.ticker)) || []}
      />
    </div>
  );
};
