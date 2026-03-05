export default async function handler(req, res) {
  const { network = "mainnet", pair = "btc/usd" } = req.query;

  const apiUrl = `${process.env.NEXT_PUBLIC_INTERNAL_API}/onchain/${pair}?network=starknet-${network}&aggregation=median`;
  console.log(`Fetching data from ${apiUrl}`);

  try {
    const apiResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-api-key": process.env.API_KEY!,
      },
    });

    if (apiResponse.ok) {
      const data = await apiResponse.json();
      return res.status(200).json(data);
    } else {
      return res
        .status(apiResponse.status)
        .json({ error: "Failed to fetch data from external API" });
    }
  } catch (error) {
    console.error("Error fetching external API:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
