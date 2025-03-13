"use client";

import { useQuery } from "@tanstack/react-query";

import { getTokens } from "@/app/assets/_helpers/getTokens";

import { AssetInfo } from "@/app/assets/_types";
import AssetList from "@/components/Assets/AssetList";

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

  const isTokensLoadingData =
    isLoadingTokens || isFetchingTokens || isRefecthingTokens;

  return (
    <AssetList
      options={options}
      isAsset
      assets={tokens}
      onSourceChange={() => {}}
      selectedSource={source}
      loading={isTokensLoadingData}
    />
  );
};
