import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(410).json({
    error:
      "The streaming API has been retired. Explore onchain feeds at /assets.",
  });
}
