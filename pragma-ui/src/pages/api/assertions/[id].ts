import { NextApiRequest, NextApiResponse } from "next";

/**
 * Handles HTTP requests to fetch the assertion details from an external API.
 * @param {IncomingMessage} req - The HTTP request object.
 * @param {ServerResponse} res - The HTTP response object.
 * @return {Promise<void>} A Promise that resolves when the response is sent.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const apiUrl = `https://api.devnet.pragma.build/node/v1/optimistic/assertions/${id}`;

  try {
    const apiResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-api-key": process.env.API_KEY,
      },
    });

    if (apiResponse.ok) {
      const data = await apiResponse.json();
      return res.status(200).json(data);
    } else {
      return res
        .status(apiResponse.status)
        .json({ error: "Failed to fetch assertion details from external API" });
    }
  } catch (error) {
    console.error("Error fetching assertion details:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
