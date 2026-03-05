import { DataProviderInfo } from "@/app/(dashboard)/assets/_types";

export type DataType = "Spot" | "Perp";

export const getPublishers = async (
  source?: string,
  dataType: DataType = "Spot"
): Promise<DataProviderInfo[]> => {
  if (!source || source === "api") {
    return [];
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_INTERNAL_API}/onchain/publishers?network=starknet-${source}&data_type=${dataType}`
  );

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    console.error(`Failed to fetch publishers (${dataType}):`, errorText);
    throw new Error(`Failed to fetch ${dataType} publishers data`);
  }

  const publishers: DataProviderInfo[] = await response.json();

  return publishers;
};
