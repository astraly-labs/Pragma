"use client";
import { useQuery } from "@tanstack/react-query";

import { getPublishers } from "@/app/(dashboard)/assets/_helpers/getPublishers";
import { DataProviderInfo } from "@/app/(dashboard)/assets/_types";
import { PublisherList } from "./publisher-list";

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
    enabled: source !== "api" && source !== "api-prod",
    refetchOnWindowFocus: false,
  });

  const isPublishersLoadingData =
    isLoadingPublishers || isFetchingPublishers || isRefecthingPublishers;

  return (
    <PublisherList
      options={options}
      publishers={publishers}
      selectedSource={source}
      loading={isPublishersLoadingData}
    />
  );
};

export default PublishersTable;
