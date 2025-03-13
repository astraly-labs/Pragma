"use client";
import { useQuery } from "@tanstack/react-query";

import { getPublishers } from "@/app/assets/_helpers/getPublishers";
import { DataProviderInfo } from "@/app/assets/_types";
import AssetList from "@/components/Assets/AssetList";

type PublishersTableProps = {
  initialPublishers: DataProviderInfo[];
  source: string;
  options: string[];
};

const PublishersTable = ({
  initialPublishers,
  source,
  options,
}: PublishersTableProps) => {
  const {
    data: publishers,
    isLoading: isLoadingPublishers,
    isFetching: isFetchingPublishers,
    isRefetching: isRefecthingPublishers,
  } = useQuery({
    queryKey: ["PUBLISHERS", source],
    queryFn: async () => {
      const result = await getPublishers(source);
      return result;
    },
    initialData: initialPublishers,
    enabled: source !== "api",
  });

  const isPublishersLoadingData =
    isLoadingPublishers || isFetchingPublishers || isRefecthingPublishers;

  return (
    <AssetList
      options={options}
      assets={publishers}
      onSourceChange={() => {}}
      selectedSource={source}
      loading={isPublishersLoadingData}
    />
  );
};

export default PublishersTable;
