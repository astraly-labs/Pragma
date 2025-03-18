import { SetStateAction } from "react";
import { AssetT } from "../_types";

export const startStreaming = async (
  assets: AssetT[],
  setStreamingData: (
    value: SetStateAction<{
      [ticker: string]: any;
    }>
  ) => void
) => {
  const pairs = assets.map((asset) => asset.ticker);
  const url = `/api/stream?${pairs
    .map((pair) => `pairs=${encodeURIComponent(pair)}`)
    .join("&")}&interval=1s&aggregation=median&historical_prices=10`;

  console.log(`Starting stream for ${pairs.length} pairs:`, pairs.join(", "));
  console.log("Stream URL:", url);

  let retryCount = 0;
  const maxRetries = 5;
  const retryDelay = 3000; // 3 seconds

  const connectStream = async () => {
    try {
      const response = await fetch(url, {
        headers: { Accept: "text/event-stream" },
      });

      if (!response.ok || !response.body) {
        console.error(
          `Failed to fetch data:`,
          response.status,
          response.statusText
        );
        throw new Error(
          `Failed to fetch: ${response.status} ${response.statusText}`
        );
      }

      console.log(`Stream connected successfully`);

      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();

      let jsonBuffer = "";
      let initialDataReceived = false;
      let streamPromiseResolve: () => void;
      let streamPromiseReject: (error: Error) => void;

      const streamPromise = new Promise<void>((resolve, reject) => {
        streamPromiseResolve = resolve;
        streamPromiseReject = reject;
      });

      const timeoutId = setTimeout(() => {
        if (!initialDataReceived) {
          streamPromiseReject(new Error("Timeout waiting for initial data"));
        }
      }, 10000); // 10 second timeout

      const processStream = async () => {
        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) {
              console.log(`Stream done`);
              break;
            }

            jsonBuffer += value;
            const lines = jsonBuffer.split("\n");
            jsonBuffer = lines.pop() || ""; // Save last incomplete line

            for (const line of lines) {
              if (!line.trim()) continue;

              if (line.startsWith("data:")) {
                try {
                  const jsonStr = line.slice(5).trim();
                  if (!jsonStr) continue;
                  const data = JSON.parse(jsonStr);

                  if (data.connected) {
                    console.log(`Initial connection established`);
                    initialDataReceived = true;
                    clearTimeout(timeoutId);
                    streamPromiseResolve();
                    continue;
                  }

                  if (data.error) {
                    console.error(`Stream error:`, data.error);
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

                      if (!initialDataReceived) {
                        initialDataReceived = true;
                        clearTimeout(timeoutId);
                        streamPromiseResolve();
                      }
                    }
                  }
                } catch (e) {
                  console.error(
                    `Failed to parse data:`,
                    e,
                    `Raw data: ${line.slice(5).trim().substring(0, 200)}`
                  );
                  if (!initialDataReceived) {
                    clearTimeout(timeoutId);
                    streamPromiseReject(e);
                  }
                }
              }
            }
          }
        } catch (error) {
          console.error(`Stream error:`, error);
          clearTimeout(timeoutId);
          if (!initialDataReceived) {
            streamPromiseReject(error);
          }
          throw error; // Trigger reconnect
        }
      };

      processStream().catch((error) => {
        console.error(`Unhandled stream error:`, error);
        clearTimeout(timeoutId);
        if (!initialDataReceived) {
          streamPromiseReject(error);
        }
        throw error;
      });

      await streamPromise;
      console.log(`Stream initialization complete`);
    } catch (error: any) {
      console.error(`Failed to start stream:`, error);
      setStreamingData((prev) => {
        const newState = { ...prev };
        assets.forEach((asset) => {
          newState[asset.ticker] = {
            price: "0x0",
            decimals: asset.decimals,
            last_updated_timestamp: Math.floor(Date.now() / 1000),
            nb_sources_aggregated: 0,
            variations: { "1h": 0, "1d": 0, "1w": 0 },
            error: `Failed to start stream: ${
              error.message || "Unknown error"
            }`,
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
        console.error("Max retries reached. Stopping stream.");
      }
    }
  };

  connectStream();
};
