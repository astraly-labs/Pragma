import { NextApiRequest, NextApiResponse } from "next";

/**
 * Exchanges a Google OAuth token for a JWT token from our API.
 * @param {NextApiRequest} req - The HTTP request object.
 * @param {NextApiResponse} res - The HTTP response object.
 * @return {Promise<void>} A Promise that resolves when the response is sent.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { credential } = req.body;
  if (!credential) {
    return res.status(400).json({ error: "Missing Google credential" });
  }

  try {
    // Exchange the Google token for our API JWT
    const response = await fetch(`${process.env.NEXT_PUBLIC_TOKEN_API_URL || 'http://localhost:8002'}/v1/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_token: credential })
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json(error);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error exchanging token:', error);
    return res.status(500).json({ error: 'Failed to exchange token' });
  }
} 