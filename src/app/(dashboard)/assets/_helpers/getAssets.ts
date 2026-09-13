import { AssetT } from "../_types";

export const getAssets = async ({
  source,
  asset,
}: {
  source: string;
  asset: AssetT;
}) => {
  const pair = encodeURIComponent(asset.ticker.toLowerCase());
  const response = await fetch(`/api/onchain?network=${source}&pair=${pair}`, {
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error(`Failed to fetch data for ${asset.ticker}`);
  const data = await response.json();
  if (data?.error) throw new Error("Price unavailable");
  return data;
};
