import { NextApiRequest, NextApiResponse } from "next";

/**
 * Handles HTTP requests to add a new token to the system.
 * @param {NextApiRequest} req - The HTTP request object.
 * @param {NextApiResponse} res - The HTTP response object.
 * @return {Promise<void>} A Promise that resolves when the response is sent.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if user is authenticated via the Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Unauthorized - Please login first" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { token_config } = req.body;

  if (!token_config) {
    return res.status(400).json({ error: "Missing token configuration" });
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_TOKEN_API_URL || 'http://localhost:8002'}/v1/tokens/add`;

  try {
    const apiResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Forward the user's JWT token
        "Authorization": authHeader
      },
      body: JSON.stringify({ token_config }),
    });

    if (apiResponse.ok) {
      const data = await apiResponse.json();
      return res.status(200).json(data);
    } else {
      const errorData = await apiResponse.json();
      return res.status(apiResponse.status).json(errorData);
    }
  } catch (error) {
    console.error("Error adding token:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
} 