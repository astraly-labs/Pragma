import { DataProviderInfo } from "@/app/(dashboard)/assets/_types";

export const getPublishers = async (
  source?: string
): Promise<DataProviderInfo[]> => {
  if (!source || source === "api") {
    return [];
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_INTERNAL_API}/onchain/publishers?network=${source}&data_type=spot_entry`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch publishers data");
  }

  const publishers: DataProviderInfo[] = await response.json();

  return publishers;
};
