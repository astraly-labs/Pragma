import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const baseUrl = process.env.NEXT_PUBLIC_INTERNAL_API;
  const apiUrl = `${baseUrl}/tokens/all`;

  try {
    const apiResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-api-key": process.env.API_KEY || "",
      },
    });

    if (!apiResponse.ok) {
      return res
        .status(apiResponse.status)
        .json({ error: "Failed to fetch tokens" });
    }

    const data = await apiResponse.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
