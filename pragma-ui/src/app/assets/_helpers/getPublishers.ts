import { dataSources } from "@/lib/endpoints";
import { DataProviderInfo, Publisher } from "@/app/assets/_types";
import { formatPublishers } from ".";

export const getPublishers = async (
  source?: string
): Promise<DataProviderInfo[]> => {
  if (!source || source === "api") {
    return [];
  }

  const formattedSource = ("publishers" +
    source.charAt(0).toUpperCase() +
    source.slice(1)) as keyof typeof dataSources;

  const publisherUrl = dataSources[formattedSource];
  const response = await fetch(publisherUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch publishers data");
  }

  const publishers: {
    data: Publisher[];
  } = await response.json();

  return formatPublishers(publishers.data);
};
