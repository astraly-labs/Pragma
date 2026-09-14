import { DataProviderInfo } from "@/app/(dashboard)/assets/_types";
import { fetchExplorer } from "@/lib/explorer-api";
export type DataType = "Spot" | "Perp";
export const getPublishers = async (
  source?: string,
  dataType: DataType = "Spot"
): Promise<DataProviderInfo[]> => {
  if (!source || source === "api") return [];
  const query = new URLSearchParams({
    network: `starknet-${source}`,
    data_type: dataType,
  });
  const publishers = await fetchExplorer<DataProviderInfo[]>(
    `/onchain/publishers?${query}`,
    `/api/publishers?${query}`
  );
  return publishers.map((publisher) =>
    publisher.name.toLowerCase() === "pragma"
      ? { ...publisher, image: "/brand/pragma-mark.svg" }
      : publisher
  );
};
