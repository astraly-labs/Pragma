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

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "text/event-stream",
      },
    });

    if (!response.ok || !response.body) {
      console.error(
        `Failed to fetch data:`,
        response.status,
        response.statusText
      );
      try {
        const errorData = await response.json();
        console.error(`Error details:`, errorData);

        // Set error state for all assets
        setStreamingData((prev) => {
          const newState = { ...prev };
          assets.forEach((asset) => {
            newState[asset.ticker] = {
              price: "0x0",
              decimals: asset.decimals,
              last_updated_timestamp: Math.floor(Date.now() / 1000),
              nb_sources_aggregated: 0,
              variations: { "1h": 0, "1d": 0, "1w": 0 },
              error: errorData.error || "Failed to fetch data",
              loading: false,
            };
          });
          return newState;
        });
      } catch (parseError) {
        setStreamingData((prev) => {
          const newState = { ...prev };
          assets.forEach((asset) => {
            newState[asset.ticker] = {
              price: "0x0",
              decimals: asset.decimals,
              last_updated_timestamp: Math.floor(Date.now() / 1000),
              nb_sources_aggregated: 0,
              variations: { "1h": 0, "1d": 0, "1w": 0 },
              error: `Error: ${response.status} ${response.statusText}`,
              loading: false,
            };
          });
          return newState;
        });
      }
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    console.log(`Stream connected successfully`);

    const reader = response.body
      .pipeThrough(new TextDecoderStream())
      .getReader();

    let initialDataReceived = false;
    let streamPromiseResolve: () => void;
    let streamPromiseReject: (error: Error) => void;

    const streamPromise = new Promise<void>((resolve, reject) => {
      streamPromiseResolve = resolve;
      streamPromiseReject = reject;
    });

    // Set a timeout for initial data
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

          const lines = value.split("\n");

          for (const line of lines) {
            if (!line.trim()) continue;

            if (line.startsWith("data:")) {
              try {
                const jsonStr = line.slice(5).trim();
                const data = JSON.parse(jsonStr);

                // Handle initial connection message
                if (data.connected) {
                  console.log(`Initial connection established`);
                  initialDataReceived = true;
                  clearTimeout(timeoutId);
                  streamPromiseResolve();
                  continue;
                }

                // Handle error messages
                if (data.error) {
                  console.error(`Stream error:`, data.error);
                  // Don't fail the stream for individual asset errors
                  if (
                    !initialDataReceived &&
                    data.error.includes("entry not found")
                  ) {
                    // If we haven't received any data yet and this is just a missing asset,
                    // don't fail the whole stream
                    continue;
                  }
                  continue;
                }

                // Handle array of price updates
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
                // Don't reject for parse errors unless we haven't received any data yet
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
        throw error; // Re-throw to trigger stream restart
      }
    };

    processStream().catch((error) => {
      console.error(`Unhandled stream error:`, error);
      clearTimeout(timeoutId);
      if (!initialDataReceived) {
        streamPromiseReject(error);
      }
      // Re-throw to trigger stream restart
      throw error;
    });

    try {
      await streamPromise;
      console.log(`Stream initialization complete`);
    } catch (error) {
      console.error(`Stream initialization failed:`, error);
      throw error;
    }
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
          error: `Failed to start stream: ${error.message || "Unknown error"}`,
          loading: false,
        };
      });
      return newState;
    });
    throw error;
  }
};
