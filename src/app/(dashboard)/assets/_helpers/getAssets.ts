import { AssetT } from "../_types";

export const getAssets = async ({
  source,
  asset,
}: {
  source: string;
  asset: AssetT;
}) => {
  const pair = encodeURIComponent(asset.ticker.toLowerCase());
  const response = await fetch(`/api/onchain?network=${source}&pair=${pair}`);
  if (!response.ok) throw new Error(`Failed to fetch data for ${asset.ticker}`);
  return response.json();
};
