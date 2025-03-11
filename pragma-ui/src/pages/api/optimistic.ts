/**
 * Handles HTTP requests to fetch the assertions from an external API.
 * @param {IncomingMessage} req - The HTTP request object.
 * @param {ServerResponse} res - The HTTP response object.
 * @return {Promise<void>} A Promise that resolves when the response is sent.
 */
export default async function handler(req, res) {
  // Extract the query parameters from the request
  const { status = "active", page = "1", limit = "5" } = req.query;

  const apiUrl = `https://api.devnet.pragma.build/node/v1/optimistic/assertions?status=${status}&page=${page}&limit=${limit}`;
  console.log(`Fetching data from ${apiUrl}`);

  try {
    const apiResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-api-key": process.env.API_KEY, // Securely manage your API key
      },
    });

    if (apiResponse.ok) {
      const data = await apiResponse.json();
      return res.status(200).json(data);
    } else {
      // Handle errors from the external API
      return res
        .status(apiResponse.status)
        .json({ error: "Failed to fetch data from external API" });
    }
  } catch (error) {
    console.error("Error fetching external API:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
