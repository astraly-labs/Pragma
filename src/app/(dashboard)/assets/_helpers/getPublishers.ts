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
  return fetchExplorer(
    `/onchain/publishers?${query}`,
    `/api/publishers?${query}`
  );
};
