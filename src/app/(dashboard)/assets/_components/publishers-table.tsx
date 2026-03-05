"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import {
  getPublishers,
  type DataType,
} from "@/app/(dashboard)/assets/_helpers/getPublishers";
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
  const [dataType, setDataType] = useState<DataType>("Spot");

  const {
    data: publishers,
    isLoading: isLoadingPublishers,
    isFetching: isFetchingPublishers,
  } = useQuery({
    queryKey: ["PUBLISHERS", source, dataType],
    queryFn: async () => {
      const result = await getPublishers(source, dataType);
      return result;
    },
    initialData: dataType === "Spot" ? initialPublishers : undefined,
    enabled: source !== "api",
    refetchOnWindowFocus: false,
  });

  const isPublishersLoadingData = isLoadingPublishers || isFetchingPublishers;

  return (
    <PublisherList
      options={options}
      publishers={publishers ?? []}
      selectedSource={source}
      loading={isPublishersLoadingData}
      dataType={dataType}
      onDataTypeChange={setDataType}
    />
  );
};

export default PublishersTable;
