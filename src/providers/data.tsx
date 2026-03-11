import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { useQueries, useQuery } from "@tanstack/react-query";

export const initialAssets = [
  { ticker: "BTC/USD", address: "0x0", decimals: 18 },
  { ticker: "ETH/USD", address: "0x1", decimals: 18 },
  { ticker: "STRK/USD", address: "0x1", decimals: 18 },
  { ticker: "SUI/USD", address: "0x1", decimals: 18 },
  { ticker: "AAVE/USD", address: "0x1", decimals: 18 },
];

type AssetT = {
  ticker: string;
  address: string;
  decimals: number;
};

export type PublisherT = {
  publisher: string;
  website_url: string;
  last_updated_timestamp: number;
  type: number;
  nb_feeds: number;
  daily_updates: number;
  total_updates: number;
  components: {
    pair_id: string;
    last_updated_timestamp: number;
    price: string;
    source: string;
    decimals: number;
    daily_updates: number;
  }[];
};

export type CheckpointT = {
  tx_hash: string;
  price: string;
  timestamp: number;
  sender_address: string;
};

type DataContextType = {
  assets: AssetT[];
  data: { [ticker: string]: any };
  publishers: PublisherT[];
  checkpoints: { [ticker: string]: CheckpointT[] };
  loading: boolean;
  error: string | null;
  switchSource: (source: string) => void;
  currentSource: string;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const dataSources: Record<string, string> = {
  mainnet: "/api/onchain?network=mainnet",
  api: "/api/stream?env=production",
  tokensApi: "/api/tokens/all?env=production",
  publishersMainnet: "/api/publishers?network=mainnet&data_type=Spot",
  checkpointsMainnet: "/api/checkpoints?network=mainnet",
};

export const DataProvider = ({
  children,
  initialData,
  initialPublishers,
  initialCheckpoints,
}: {
  children: ReactNode;
  initialData: { [ticker: string]: any };
  initialPublishers: PublisherT[];
  initialCheckpoints: { [ticker: string]: CheckpointT[] };
}) => {
  const [assets, setAssets] = useState<AssetT[]>([]);
  const [source, setSource] = useState("mainnet");
  const [streamingData, setStreamingData] = useState<{
    [ticker: string]: any;
  }>({});

  const { data: availableTokens, isLoading: isLoadingTokens } = useQuery({
    queryKey: ["available-tokens", source],
    queryFn: async () => {
      if (source === "api") {
        const apiUrl = process.env.NEXT_PUBLIC_INTERNAL_API;
        const response = await fetch(`${apiUrl}/tokens/all`);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to fetch tokens:", errorText);
          throw new Error("Failed to fetch available tokens");
        }

        const data = await response.json();
        return data.tokens || [];
      }
      return [
        { ticker: "BTC/USD", address: "0x0", decimals: 8 },
        { ticker: "ETH/USD", address: "0x1", decimals: 8 },
        { ticker: "STRK/USD", address: "0x1", decimals: 8 },
      ];
    },
    retry: 1,
    retryDelay: 1000,
  });

  useEffect(() => {
    if (availableTokens) {
      const newAssets = availableTokens.map((token) => {
        const ticker = token.ticker.includes("/USD")
          ? token.ticker
          : token.ticker + "/USD";
        return {
          ticker,
          address: token.addresses?.[source] || "0x0",
          decimals: token.decimals || 8,
        };
      });
      setAssets(newAssets);
    }
  }, [availableTokens, source]);

  useEffect(() => {
    const storedSource = localStorage.getItem("dataSource");
    if (storedSource && dataSources[storedSource]) {
      setSource(storedSource);
    }
  }, []);

  const startStreaming = async (assets: AssetT[]) => {
    const pairs = assets.map((asset) => asset.ticker);
    const apiUrl = process.env.NEXT_PUBLIC_INTERNAL_API;
    const pairsQuery = pairs
      .map((pair) => `pairs=${encodeURIComponent(pair)}`)
      .join("&");
    const url = `${apiUrl}/stream?${pairsQuery}&interval=1s&aggregation=median&historical_prices=10`;

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
        } catch {
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

      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();

      let initialDataReceived = false;
      let streamPromiseResolve: () => void;
      let streamPromiseReject: (error: any) => void;

      const streamPromise = new Promise<void>((resolve, reject) => {
        streamPromiseResolve = resolve;
        streamPromiseReject = reject;
      });

      const timeoutId = setTimeout(() => {
        if (!initialDataReceived) {
          console.warn("⚠️ Timeout: No initial streaming data received.");
        }
      }, 10000);

      let buffer = "";

      const processStream = async () => {
        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            buffer += value;
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;

              const jsonStr = trimmed.slice(5).trim();
              if (!jsonStr) continue;

              try {
                JSON.parse(jsonStr);
              } catch (e) {
                console.error("Parse error:", e, jsonStr.slice(0, 200));
                if (!initialDataReceived) {
                  clearTimeout(timeoutId);
                  streamPromiseReject(e);
                }
              }
            }
          }
        } catch (error) {
          console.error("Stream fatal error:", error);
          clearTimeout(timeoutId);
          if (!initialDataReceived) streamPromiseReject(error);
          throw error;
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

      try {
        await streamPromise;
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
            error: `Failed to start stream: ${
              error.message || "Unknown error"
            }`,
            loading: false,
          };
        });
        return newState;
      });
      throw error;
    }
  };

  useEffect(() => {
    if (source === "api" && assets.length > 0) {
      let mounted = true;
      let retryCount = 0;
      const maxRetries = 3;
      const retryDelay = 5000;

      setStreamingData({});

      setStreamingData((prev) => {
        const newState = { ...prev };
        assets.forEach((asset) => {
          newState[asset.ticker] = {
            price: "0x0",
            decimals: asset.decimals,
            last_updated_timestamp: Math.floor(Date.now() / 1000),
            nb_sources_aggregated: 0,
            variations: { "1h": 0, "1d": 0, "1w": 0 },
            loading: true,
          };
        });
        return newState;
      });

      const startStreamWithRetry = async () => {
        try {
          await startStreaming(assets);
        } catch (error: any) {
          console.error(
            `Stream error (attempt ${retryCount + 1}/${maxRetries}):`,
            error
          );
          if (mounted && retryCount < maxRetries) {
            retryCount++;
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
            return startStreamWithRetry();
          } else {
            if (mounted) {
              setStreamingData((prev) => {
                const newState = { ...prev };
                assets.forEach((asset) => {
                  newState[asset.ticker] = {
                    ...(prev[asset.ticker] || {}),
                    loading: false,
                    error: `Failed after ${maxRetries} attempts: ${error.message}`,
                  };
                });
                return newState;
              });
            }
            throw error;
          }
        }
      };

      startStreamWithRetry().catch((error) => {
        console.error("All retry attempts failed:", error);
      });

      return () => {
        mounted = false;
      };
    } else {
      setStreamingData({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source, assets]);

  const fetchAssetData = async (asset: AssetT) => {
    if (source === "api") {
      const streamData = streamingData[asset.ticker];

      if (!streamData) {
        const isStreamStarted = assets.some((a) => a.ticker === asset.ticker);
        if (isStreamStarted && !streamingData[asset.ticker]) {
          try {
            startStreaming([asset]).catch((error) => {
              console.error(
                `Error starting stream for ${asset.ticker}:`,
                error
              );
            });
          } catch (error) {
            console.error(`Failed to start stream for ${asset.ticker}:`, error);
          }
        }
        return {
          price: "0x0",
          decimals: asset.decimals || 8,
          last_updated_timestamp: Math.floor(Date.now() / 1000),
          nb_sources_aggregated: 1,
          variations: { "1h": 0, "1d": 0, "1w": 0 },
        };
      }

      return {
        price: streamData.price || "0x0",
        decimals: streamData.decimals || asset.decimals || 8,
        last_updated_timestamp:
          streamData.last_updated_timestamp || Math.floor(Date.now() / 1000),
        nb_sources_aggregated: streamData.nb_sources_aggregated || 1,
        variations: streamData.variations || { "1h": 0, "1d": 0, "1w": 0 },
      };
    } else {
      const url = `${dataSources[source]}&pair=${encodeURIComponent(
        asset.ticker
      )}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${asset.ticker}`);
      }
      return response.json();
    }
  };

  const fetchCheckpoints = async (asset: AssetT) => {
    if (source === "api") {
      return [];
    }
    const checkpointsUrl = dataSources["checkpointsMainnet"];
    const url = `${checkpointsUrl}&pair=${encodeURIComponent(asset.ticker)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch checkpoints for ${asset.ticker}`);
    }
    return response.json();
  };

  const fetchPublishers = async () => {
    if (source === "api") {
      return [];
    }
    const publisherUrl = dataSources["publishersMainnet"];
    const response = await fetch(publisherUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch publishers data");
    }
    return response.json();
  };

  const switchSource = (newSource: string) => {
    if (dataSources[newSource]) {
      setSource(newSource);
      localStorage.setItem("dataSource", newSource);
    } else {
      console.error("Invalid data source");
    }
  };

  const assetQueries = useQueries({
    queries: assets.map((asset) => ({
      queryKey: ["asset", asset.ticker, source],
      queryFn: () => fetchAssetData(asset),
      initialData: initialData?.[asset.ticker],
      refetchInterval: source === "api" ? 1000 : undefined,
      retry: false,
      enabled: source !== "api",
    })),
  });

  const data = useMemo(() => {
    if (source === "api") {
      const result: { [ticker: string]: any } = { ...streamingData };
      assets.forEach((asset) => {
        if (!result[asset.ticker]) {
          result[asset.ticker] = {
            price: "0x0",
            decimals: asset.decimals || 8,
            last_updated_timestamp: Math.floor(Date.now() / 1000),
            nb_sources_aggregated: 0,
            variations: { "1h": 0, "1d": 0, "1w": 0 },
            loading: true,
          };
        }
      });
      return result;
    }
    return assets.reduce(
      (acc, asset, index) => {
        acc[asset.ticker] = assetQueries[index].data;
        return acc;
      },
      {} as { [ticker: string]: any }
    );
  }, [source, assets, assetQueries, streamingData]);

  const checkpointQueries = useQueries({
    queries: assets.map((asset) => ({
      queryKey: ["checkpoints", asset.ticker, source],
      queryFn: () => fetchCheckpoints(asset),
      initialData: initialCheckpoints?.[asset.ticker],
      enabled: source !== "api",
    })),
  });

  const publishersQuery = useQuery({
    queryKey: ["publishers", source],
    queryFn: fetchPublishers,
    initialData: initialPublishers,
    enabled: source !== "api",
  });

  const loading =
    (isLoadingTokens && source === "api") ||
    assetQueries.some((query) => query.isLoading) ||
    checkpointQueries.some((query) => query.isLoading) ||
    publishersQuery.isLoading;

  const error =
    assetQueries.find((query) => query.error)?.error?.message ||
    checkpointQueries.find((query) => query.error)?.error?.message ||
    publishersQuery.error?.message ||
    null;

  const publishers = useMemo(() => {
    return publishersQuery.data || [];
  }, [publishersQuery.data]);

  const checkpoints = useMemo(() => {
    return assets.reduce(
      (acc, asset, index) => {
        acc[asset.ticker] = checkpointQueries[index].data;
        return acc;
      },
      {} as { [ticker: string]: CheckpointT[] }
    );
  }, [assets, checkpointQueries]);

  return (
    <DataContext.Provider
      value={{
        assets,
        data,
        publishers,
        checkpoints,
        loading,
        error,
        switchSource,
        currentSource: source,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
