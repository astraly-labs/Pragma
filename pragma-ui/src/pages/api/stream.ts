import type { NextApiRequest, NextApiResponse } from "next";

interface ExtendedNextApiResponse extends NextApiResponse {
  flush?: () => void;
}

export default async function handler(req: NextApiRequest, res: ExtendedNextApiResponse) {
  const {
    pairs: rawPairs,
    interval = "1s",
    aggregation = "median",
    historical_prices = "10",
  } = req.query;

  // Handle pairs parameter which could be string, string[] or undefined
  let pairs: string[];
  if (typeof rawPairs === 'string') {
    pairs = [rawPairs];
  } else if (Array.isArray(rawPairs)) {
    pairs = rawPairs;
  } else {
    res.status(400).json({ error: "pairs parameter is required" });
    return;
  }

  // Clean pairs (remove /USD suffix if present)
  const cleanPairs = pairs.map(pair => 
    typeof pair === 'string' ? pair.split('/')[0] : pair
  );
  
  // Construct URL with multiple pairs
  const pairsQuery = cleanPairs.map(pair => `pairs[]=${encodeURIComponent(pair)}/USD`).join('&');
  const apiUrl = `https://api .devnet.pragma.build/node/v1/data/multi/stream?${pairsQuery}&interval=${interval}&aggregation=${aggregation}&historical_prices=${historical_prices}`;
  console.log(`Fetching data from ${apiUrl}`);

  try {
    const apiKey = process.env.API_KEY;
    console.log(`Using API key: ${apiKey ? apiKey.substring(0, 5) + '...' : 'undefined'}`);
    
    const apiResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-api-key": apiKey || "",
      },
    });

    if (!apiResponse.ok || !apiResponse.body) {
      console.error(`API response not OK: ${apiResponse.status} ${apiResponse.statusText}`);
      try {
        const textResponse = await apiResponse.text();
        console.error(`Error response: ${textResponse.substring(0, 200)}...`);
        res.status(apiResponse.status || 500).json({ 
          error: `Failed to fetch data for pairs: ${pairs.join(', ')}`,
          status: apiResponse.status,
          statusText: apiResponse.statusText
        });
      } catch (parseError) {
        res.status(500).json({ 
          error: `Error parsing API response: ${parseError}`
        });
      }
      return;
    }

    // Set SSE headers
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      // Add CORS headers for local development
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    console.log("Stream headers set");

    // Use res.flush() if available; otherwise, use a no-op
    const flush = typeof res.flush === "function" ? res.flush.bind(res) : () => {};

    // Send an initial connection message
    res.write(`data: ${JSON.stringify({ connected: true, timestamp: Date.now() })}\n\n`);
    flush();

    const reader = apiResponse.body.getReader();
    const decoder = new TextDecoder();
    console.log("Stream reader and decoder set up");

    let buffer = '';
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        console.log("Stream done");
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;
      
      // Split on double newlines (SSE message boundary)
      const messages = buffer.split('\n\n');
      buffer = messages.pop() || ''; // Keep the last incomplete message in the buffer
      
      for (const message of messages) {
        if (!message.trim()) continue;
        
        // Pass through the SSE message as is
        res.write(message + '\n\n');
        flush();
      }
    }

    res.end();
  } catch (error) {
    console.error("Error fetching external API:", error);
    res.status(500).json({ 
      error: "Internal server error", 
      details: `${error}`
    });
  }
}
