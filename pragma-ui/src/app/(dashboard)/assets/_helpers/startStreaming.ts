import { SetStateAction } from "react";
import { AssetT } from "../_types";

let activeStreamController: AbortController | null = null;

export const startStreaming = async (
  assets: AssetT[],
  setStreamingData: (value: SetStateAction<{ [ticker: string]: any }>) => void,
  source: string
) => {
  if (activeStreamController) {
    console.log("Aborting previous stream...");
    activeStreamController.abort();
  }

  activeStreamController = new AbortController();
  const { signal } = activeStreamController;

  const pairs = assets.map((asset) => asset.ticker);

  const apiUrl = source === "api-prod" 
          ? process.env.NEXT_PUBLIC_INTERNAL_API_PROD
          : (process.env.NEXT_PUBLIC_INTERNAL_API_DEV || process.env.NEXT_PUBLIC_INTERNAL_API);

  const url = `${apiUrl}/data/multi/stream?${pairs
    .map((pair) => `pairs=${encodeURIComponent(pair)}`)
    .join("&")}&interval=100ms&aggregation=median&historical_prices=10`;

  console.log(`Starting stream for:`, pairs.join(", "));

  let retryCount = 0;
  const maxRetries = 5;
  const retryDelay = 3000;

  const connectStream = async () => {
    if (signal.aborted) {
      console.warn("Stream initiation aborted.");
      return;
    }

    try {
      const response = await fetch(url, {
        headers: { Accept: "text/event-stream" },
        signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(
          `Failed to fetch: ${response.status} ${response.statusText}`
        );
      }

      console.log("Stream connected successfully");

      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();

      let jsonBuffer = "";
      let initialDataReceived = false;

      const timeoutId = setTimeout(() => {
        if (!initialDataReceived) {
          console.warn("⏰ Timeout: No initial data received.");
          // You can show fallback UI or silently skip
        }
      }, 10000); // 10s timeout

      const processStream = async () => {
        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) {
              console.log("Stream ended.");
              break;
            }

            if (signal.aborted) {
              console.warn("Stream manually aborted.");
              break;
            }

            jsonBuffer += value;
            const lines = jsonBuffer.split("\n");
            jsonBuffer = lines.pop() || ""; // Save last incomplete line

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;

              const jsonStr = trimmed.slice(5).trim();
              if (!jsonStr) continue;

              try {
                const data = JSON.parse(jsonStr);

                if (data.connected) {
                  console.log("✅ Stream connection confirmed.");
                  initialDataReceived = true;
                  continue;
                }

                if (data.error) {
                  console.error("Stream error:", data.error);
                  continue;
                }

                if (Array.isArray(data)) {
                  const updates: { [ticker: string]: any } = {};

                  data.forEach((update) => {
                    if (update.pair_id && update.price && update.timestamp) {
                      updates[update.pair_id] = {
                        price: update.price,
                        decimals: update.decimals,
                        last_updated_timestamp: update.timestamp / 1000,
                        nb_sources_aggregated:
                          update.num_sources_aggregated || 1,
                        variations: { "1h": 0, "1d": 0, "1w": 0 },
                        loading: false,
                      };
                    }
                  });

                  if (Object.keys(updates).length > 0) {
                    setStreamingData((prev) => ({
                      ...prev,
                      ...updates,
                    }));
                    initialDataReceived = true;
                  }
                }
              } catch (e: any) {
                console.error("❌ Failed to parse JSON:", e.message);
                console.warn("Raw (truncated):", jsonStr.slice(0, 300));
                // Don’t reject or crash — continue streaming
              }
            }
          }
        } catch (error: any) {
          if (error.name === "AbortError") {
            console.warn("Stream aborted.");
          } else {
            console.error("Stream read error:", error);
          }
        }
      };

      processStream();
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.warn("Stream fetch aborted.");
        return;
      }

      console.error("Failed to start stream:", error);
      setStreamingData((prev) => {
        const newState = { ...prev };
        assets.forEach((asset) => {
          newState[asset.ticker] = {
            price: "0x0",
            decimals: asset.decimals,
            last_updated_timestamp: Math.floor(Date.now() / 1000),
            nb_sources_aggregated: 0,
            variations: { "1h": 0, "1d": 0, "1w": 0 },
            error: `Stream error: ${error.message || "Unknown error"}`,
            loading: false,
          };
        });
        return newState;
      });

      if (retryCount < maxRetries) {
        retryCount++;
        console.warn(`Reconnecting... (${retryCount}/${maxRetries})`);
        setTimeout(connectStream, retryDelay);
      } else {
        console.error("Max retries reached. Giving up.");
      }
    }
  };

  connectStream();
};
