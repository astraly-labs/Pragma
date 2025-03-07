import { NextApiRequest, NextApiResponse } from "next";
import { dataSources } from "../../providers/data";

// Default assets to use when initialAssets is not available
export const defaultAssets = [
  { ticker: "BTC/USD", address: "0x0", decimals: 8 },
  { ticker: "ETH/USD", address: "0x1", decimals: 8 },
  { ticker: "STRK/USD", address: "0x1", decimals: 8 },
];

const fetchAssetData = async (asset: any, dataType: string) => {
  const url = `${dataSources[dataType]}${
    dataType.includes("checkpoints") ? "&pair=" : ""
  }${asset.ticker}`;
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`Failed to fetch ${dataType} data for ${asset.ticker}`);
  return response.json();
};

/**
 * API handler for fetching asset data, checkpoint data, and publisher data.
 * @param {NextApiRequest} req - The incoming request object.
 * @param {NextApiResponse} res - The response object.
 * @return {Promise<void>} */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { source = "mainnet" } = req.query;

  try {
    const [assetResults, checkpointResults, publishersResponse] =
      await Promise.all([
        Promise.all(
          defaultAssets.map((asset) => fetchAssetData(asset, source as string))
        ),
        Promise.all(
          defaultAssets.map((asset) =>
            fetchAssetData(
              asset,
              `checkpoints${
                (source as string).charAt(0).toUpperCase() +
                (source as string).slice(1)
              }`
            )
          )
        ),
        fetch(
          dataSources[
            `publishers${
              (source as string).charAt(0).toUpperCase() +
              (source as string).slice(1)
            }`
          ]
        ),
      ]);

    const publishersData = await publishersResponse.json();

    const results = Object.fromEntries(
      defaultAssets.map((asset, index) => [asset.ticker, assetResults[index]])
    );
    const checkpointsData = Object.fromEntries(
      defaultAssets.map((asset, index) => [
        asset.ticker,
        checkpointResults[index],
      ])
    );

    res.status(200).json({ results, publishersData, checkpointsData });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
