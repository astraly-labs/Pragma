import { NextApiRequest, NextApiResponse } from "next";

/**
 * Handles HTTP requests to fetch all tokens from the external API.
 * @param {NextApiRequest} req - The HTTP request object.
 * @param {NextApiResponse} res - The HTTP response object.
 * @return {Promise<void>} A Promise that resolves when the response is sent.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_TOKEN_API_URL || 'http://localhost:8002'}/v1/tokens/all`;
  console.log("Calling external API:", apiUrl);

  try {
    const apiResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (apiResponse.ok) {
      const data = await apiResponse.json();
      console.log("API response successful, token count:", data.tokens?.length || 0);
      
      // Log the first few tokens for debugging
      if (data.tokens && data.tokens.length > 0) {
        console.log("First 5 tokens:", data.tokens.slice(0, 5).map((t: any) => t.ticker).join(", "));
        console.log("Last 5 tokens:", data.tokens.slice(-5).map((t: any) => t.ticker).join(", "));
      }
      
      return res.status(200).json(data);
    } else {
      const errorText = await apiResponse.text();
      console.error("API error:", apiResponse.status, errorText);
      return res
        .status(apiResponse.status)
        .json({ error: "Failed to fetch tokens from external API", details: errorText });
    }
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return res.status(500).json({ error: "Internal server error", details: String(error) });
  }
} 