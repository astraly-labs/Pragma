import type { NextApiRequest, NextApiResponse } from "next";

interface ExtendedNextApiResponse extends NextApiResponse {
  flush?: () => void;
}

export default async function handler(req: NextApiRequest, res: ExtendedNextApiResponse) {
  const {
    pair = "STRK/USD",
    interval = "1s",
    aggregation = "median",
    historical_prices = "10",
  } = req.query;

  const apiUrl = `https://ws.dev.pragma.build/node/v1/data/${pair}/stream?interval=${interval}&aggregation=${aggregation}&historical_prices=${historical_prices}`;
  console.log(`Fetching data from ${apiUrl}`);

  try {
    const apiResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-api-key": process.env.API_KEY || "",
      },
    });

    if (!apiResponse.ok || !apiResponse.body) {
      res.status(apiResponse.status).json({ error: "Failed to fetch data from external API" });
      return;
    }

    // Set SSE headers
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    });
    console.log("Stream headers set");

    // Use res.flush() if available; otherwise, use a no-op
    const flush = typeof res.flush === "function" ? res.flush.bind(res) : () => {};

    const reader = apiResponse.body.getReader();
    const decoder = new TextDecoder();
    console.log("Stream reader and decoder set up");

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        console.log("Stream done");
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
    //   console.debug("Received and decoded chunk:", chunk);
      res.write(chunk);
      flush();
    }

    res.end();
  } catch (error) {
    console.error("Error fetching external API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
