import { SetStateAction } from "react";
import { AssetInfo } from "../_types";

export const startStreaming = async (
  assets: AssetInfo[],
  setStreamingData: (
    value: SetStateAction<{
      [ticker: string]: any;
    }>
  ) => void
) => {
  const pairs = assets.map((asset) => asset.ticker);
  const url = `/api/stream?${new URLSearchParams({
    interval: "1s",
    aggregation: "median",
    historical_prices: "10",
    ...Object.fromEntries(pairs.map((pair) => ["pairs", pair])),
  }).toString()}`;

  console.log(`Starting stream for ${pairs.length} pairs:`, pairs.join(", "));
  console.log("Stream URL:", url);

  try {
    const response = await fetch(url, {
      headers: { Accept: "text/event-stream" },
    });
    if (!response.ok || !response.body)
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`
      );

    console.log(`Stream connected successfully`);

    const reader = response.body
      .pipeThrough(new TextDecoderStream())
      .getReader();
    let initialDataReceived = false;
    const streamPromise = new Promise<void>((resolve, reject) => {
      const timeoutId = setTimeout(
        () =>
          !initialDataReceived &&
          reject(new Error("Timeout waiting for initial data")),
        10000
      );

      (async () => {
        try {
          for (;;) {
            const { value, done } = await reader.read();
            if (done) break;

            value.split("\n").forEach((line) => {
              if (!line.startsWith("data:")) return;
              try {
                const data = JSON.parse(line.slice(5).trim());
                if (data.connected) {
                  initialDataReceived = true;
                  clearTimeout(timeoutId);
                  resolve();
                } else if (data.error) {
                  console.error(`Stream error:`, data.error);
                } else if (Array.isArray(data)) {
                  const updates = Object.fromEntries(
                    data.map(
                      ({
                        pair_id,
                        price,
                        timestamp,
                        decimals,
                        num_sources_aggregated,
                      }) => [
                        pair_id,
                        {
                          price,
                          decimals,
                          last_updated_timestamp: timestamp / 1000,
                          nb_sources_aggregated: num_sources_aggregated || 1,
                          variations: { "1h": 0, "1d": 0, "1w": 0 },
                          loading: false,
                        },
                      ]
                    )
                  );
                  setStreamingData((prev) => ({ ...prev, ...updates }));
                  if (!initialDataReceived) {
                    initialDataReceived = true;
                    clearTimeout(timeoutId);
                    resolve();
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
                  reject(e);
                }
              }
            });
          }
        } catch (error) {
          console.error(`Stream error:`, error);
          clearTimeout(timeoutId);
          if (!initialDataReceived) reject(error);
        }
      })();
    });

    await streamPromise;
    console.log(`Stream initialization complete`);
  } catch (error: any) {
    console.error(`Failed to start stream:`, error);
    setStreamingData((prev) => ({
      ...prev,
      ...Object.fromEntries(
        assets.map((asset) => [
          asset.ticker,
          {
            price: "0x0",
            decimals: 0, // asset.decimals,
            last_updated_timestamp: Math.floor(Date.now() / 1000),
            nb_sources_aggregated: 0,
            variations: { "1h": 0, "1d": 0, "1w": 0 },
            error: error.message || "Unknown error",
            loading: false,
          },
        ])
      ),
    }));
    throw error;
  }
};
