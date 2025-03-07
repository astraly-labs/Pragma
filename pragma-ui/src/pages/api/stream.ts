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

  // Remove "/USD" suffix if present for the API request
  const cleanPair = typeof pair === 'string' ? pair.split('/')[0] : pair;
  
  const apiUrl = `https://ws.dev.pragma.build/node/v1/data/${cleanPair}/USD/stream?interval=${interval}&aggregation=${aggregation}&historical_prices=${historical_prices}`;
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

    // Handle error responses from the API
    if (!apiResponse.ok || !apiResponse.body) {
      console.error(`API response not OK: ${apiResponse.status} ${apiResponse.statusText}`);
      
      try {
        // Try to get the response content as text first
        const textResponse = await apiResponse.text();
        console.error(`Error response: ${textResponse.substring(0, 200)}...`);
        
        // Return a simple error response
        res.status(apiResponse.status || 500).json({ 
          error: `Failed to fetch data for ${pair}`,
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

    // We need to handle the case where the API is already sending data in SSE format
    // with "data: " prefix
    let buffer = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        console.log("Stream done");
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      
      // Check if the chunk already has the "data: " prefix
      if (chunk.trim().startsWith('data:')) {
        // The API is already sending SSE formatted data, just pass it through
        console.log(`Received SSE chunk, passing through: ${chunk.substring(0, 50)}...`);
        res.write(chunk);
        flush();
      } else {
        // Normal JSON data, format it as SSE
        try {
          console.log(`Received JSON chunk: ${chunk.substring(0, 100)}...`);
          // Parse the chunk as JSON to properly format it as an SSE event
          const data = JSON.parse(chunk);
          
          // Format as a proper SSE event
          res.write(`data: ${JSON.stringify(data)}\n\n`);
          flush();
        } catch (e) {
          console.error(`Error parsing chunk as JSON: ${e}`);
          // If the chunk isn't valid JSON, send it as a message
          res.write(`data: ${JSON.stringify({ error: "Invalid JSON", raw: chunk })}\n\n`);
          flush();
        }
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
