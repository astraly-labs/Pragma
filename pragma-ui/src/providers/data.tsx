import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { useQueries, useQuery } from "@tanstack/react-query";

// Default assets to use when initialAssets is not available
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

export const dataSources = {
  sepolia: "/api/onchain?network=sepolia",
  mainnet: "/api/onchain?network=mainnet",
  api: "/api/stream",
  tokensApi: "/api/tokens/all",
  publishersSepolia: "/api/publishers?network=sepolia&dataType=spot_entry",
  publishersMainnet: "/api/publishers?network=mainnet&dataType=spot_entry",
  checkpointsSepolia: "/api/checkpoints?network=sepolia",
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
  const [streamingData, setStreamingData] = useState<{ [ticker: string]: any }>({});

  // Fetch available tokens when source changes
  const { data: availableTokens, isLoading: isLoadingTokens } = useQuery({
    queryKey: ["available-tokens", source],
    queryFn: async () => {
      if (source === "api") {
        console.log("Fetching tokens from API...");
        const response = await fetch(dataSources.tokensApi);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to fetch tokens:", errorText);
          throw new Error("Failed to fetch available tokens");
        }

        const data = await response.json();
        console.log(
          "Tokens fetched successfully:",
          data.tokens?.length || 0,
          "tokens"
        );
        return data.tokens || [];
      }
      // For non-API sources, return default tokens
      return [
        { ticker: "BTC/USD", address: "0x0", decimals: 8 },
        { ticker: "ETH/USD", address: "0x1", decimals: 8 },
        { ticker: "STRK/USD", address: "0x1", decimals: 8 },
      ];
    },
    retry: 1,
    retryDelay: 1000,
  });

  // Update assets when availableTokens changes
  useEffect(() => {
    if (availableTokens) {
      console.log("Updating assets with:", availableTokens.length, "tokens");
      console.log(
        "Available tokens:",
        availableTokens.map((t) => t.ticker).join(", ")
      );

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
      console.log("Setting assets:", newAssets.length, "assets");
      console.log(
        "Asset tickers:",
        newAssets.map((a) => a.ticker).join(", ")
      );
      setAssets(newAssets);
    }
  }, [availableTokens, source]);

  // Read initial source from localStorage
  useEffect(() => {
    const storedSource = localStorage.getItem("dataSource");
    if (storedSource && dataSources[storedSource]) {
      setSource(storedSource);
    }
  }, []);

  // Function to start streaming for all assets
  const startStreaming = async (assets: AssetT[]) => {
    const pairs = assets.map(asset => asset.ticker);
    const url = `/api/stream?${pairs.map(pair => `pairs=${encodeURIComponent(pair)}`).join('&')}&interval=1s&aggregation=median&historical_prices=10`;
    console.log(`Starting stream for ${pairs.length} pairs:`, pairs.join(', '));
    console.log('Stream URL:', url);

    try {
      const response = await fetch(url, {
        headers: {
          Accept: "text/event-stream",
        },
      });

      if (!response.ok || !response.body) {
        console.error(`Failed to fetch data:`, response.status, response.statusText);
        try {
          const errorData = await response.json();
          console.error(`Error details:`, errorData);
          
          // Set error state for all assets
          setStreamingData(prev => {
            const newState = { ...prev };
            assets.forEach(asset => {
              newState[asset.ticker] = {
                price: "0x0",
                decimals: asset.decimals,
                last_updated_timestamp: Math.floor(Date.now() / 1000),
                nb_sources_aggregated: 0,
                variations: { "1h": 0, "1d": 0, "1w": 0 },
                error: errorData.error || "Failed to fetch data",
                loading: false
              };
            });
            return newState;
          });
        } catch (parseError) {
          setStreamingData(prev => {
            const newState = { ...prev };
            assets.forEach(asset => {
              newState[asset.ticker] = {
                price: "0x0",
                decimals: asset.decimals,
                last_updated_timestamp: Math.floor(Date.now() / 1000),
                nb_sources_aggregated: 0,
                variations: { "1h": 0, "1d": 0, "1w": 0 },
                error: `Error: ${response.status} ${response.statusText}`,
                loading: false
              };
            });
            return newState;
          });
        }
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
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
          streamPromiseReject(new Error('Timeout waiting for initial data'));
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

            const lines = value.split('\n');

            for (const line of lines) {
              if (!line.trim()) continue;

              if (line.startsWith('data:')) {
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
                    if (!initialDataReceived && data.error.includes("entry not found")) {
                      // If we haven't received any data yet and this is just a missing asset,
                      // don't fail the whole stream
                      continue;
                    }
                    continue;
                  }

                  // Handle array of price updates
                  if (Array.isArray(data)) {
                    const updates: { [ticker: string]: any } = {};
                    
                    data.forEach(update => {
                      if (update.pair_id && update.price && update.timestamp) {
                        updates[update.pair_id] = {
                          price: update.price,
                          decimals: update.decimals,
                          last_updated_timestamp: update.timestamp / 1000,
                          nb_sources_aggregated: update.num_sources_aggregated || 1,
                          variations: { "1h": 0, "1d": 0, "1w": 0 },
                          loading: false
                        };
                      }
                    });

                    if (Object.keys(updates).length > 0) {
                      setStreamingData(prev => ({
                        ...prev,
                        ...updates
                      }));

                      if (!initialDataReceived) {
                        initialDataReceived = true;
                        clearTimeout(timeoutId);
                        streamPromiseResolve();
                      }
                    }
                  }
                } catch (e) {
                  console.error(`Failed to parse data:`, e, `Raw data: ${line.slice(5).trim().substring(0, 200)}`);
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

      processStream().catch(error => {
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
      setStreamingData(prev => {
        const newState = { ...prev };
        assets.forEach(asset => {
          newState[asset.ticker] = {
            price: "0x0",
            decimals: asset.decimals,
            last_updated_timestamp: Math.floor(Date.now() / 1000),
            nb_sources_aggregated: 0,
            variations: { "1h": 0, "1d": 0, "1w": 0 },
            error: `Failed to start stream: ${error.message || "Unknown error"}`,
            loading: false
          };
        });
        return newState;
      });
      throw error;
    }
  };

  // Manage streams when source or assets change
  useEffect(() => {
    if (source === "api" && assets.length > 0) {
      let mounted = true;
      let retryCount = 0;
      const maxRetries = 3;
      const retryDelay = 5000; // 5 seconds
      
      // Clear existing streams
      setStreamingData({});
      
      // Initialize loading state for all assets
      setStreamingData(prev => {
        const newState = { ...prev };
        assets.forEach(asset => {
          newState[asset.ticker] = {
            price: "0x0",
            decimals: asset.decimals,
            last_updated_timestamp: Math.floor(Date.now() / 1000),
            nb_sources_aggregated: 0,
            variations: { "1h": 0, "1d": 0, "1w": 0 },
            loading: true
          };
        });
        return newState;
      });

      // Function to start stream with retry logic
      const startStreamWithRetry = async () => {
        try {
          await startStreaming(assets);
        } catch (error) {
          console.error(`Stream error (attempt ${retryCount + 1}/${maxRetries}):`, error);
          if (mounted && retryCount < maxRetries) {
            retryCount++;
            console.log(`Retrying in ${retryDelay}ms...`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
            return startStreamWithRetry();
          } else {
            if (mounted) {
              setStreamingData(prev => {
                const newState = { ...prev };
                assets.forEach(asset => {
                  newState[asset.ticker] = {
                    ...(prev[asset.ticker] || {}),
                    loading: false,
                    error: `Failed after ${maxRetries} attempts: ${error.message}`
                  };
                });
                return newState;
              });
            }
            throw error;
          }
        }
      };

      // Start the stream with retry logic
      startStreamWithRetry().catch(error => {
        console.error("All retry attempts failed:", error);
      });

      return () => {
        mounted = false;
      };
    } else {
      setStreamingData({});
    }
  }, [source, assets]);

  const fetchAssetData = async (asset: AssetT) => {
    if (source === "api") {
      const streamData = streamingData[asset.ticker];

      if (!streamData) {
        console.log(`No streaming data for ${asset.ticker}, returning default`);
        const isStreamStarted = assets.some((a) => a.ticker === asset.ticker);
        if (isStreamStarted && !streamingData[asset.ticker]) {
          console.log(`Starting stream for ${asset.ticker} on demand`);
          try {
            startStreaming([asset]).catch((error) => {
              console.error(`Error starting stream for ${asset.ticker}:`, error);
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
          variations: {
            "1h": 0,
            "1d": 0,
            "1w": 0,
          },
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
      console.log(`[${asset.ticker}] Fetching from:`, url);
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
    const checkpointsUrl =
      dataSources[
        "checkpoints" +
          source.charAt(0).toUpperCase() +
          source.slice(1)
      ];
    const url = `${checkpointsUrl}&pair=${encodeURIComponent(asset.ticker)}`;
    console.log(`[${asset.ticker}] Fetching checkpoints from:`, url);
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
    const publisherUrl =
      dataSources[
        "publishers" +
          source.charAt(0).toUpperCase() +
          source.slice(1)
      ];
    console.log("Fetching publishers from:", publisherUrl);
    const response = await fetch(publisherUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch publishers data");
    }
    return response.json();
  };

  const switchSource = (newSource: string) => {
    if (dataSources[newSource]) {
      console.log("Switching source to:", newSource);
      setSource(newSource);
      localStorage.setItem("dataSource", newSource);
    } else {
      console.error("Invalid data source");
    }
  };

  useEffect(() => {
    console.log("Current source:", source);
  }, [source]);

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
    return assets.reduce((acc, asset, index) => {
      acc[asset.ticker] = assetQueries[index].data;
      return acc;
    }, {} as { [ticker: string]: any });
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

  useEffect(() => {
    console.log(
      "Loading state:",
      loading,
      "Assets:",
      assets.length,
      "Streaming data:",
      Object.keys(streamingData).length
    );
  }, [loading, assets.length, streamingData]);

  const error =
    assetQueries.find((query) => query.error)?.error?.message ||
    checkpointQueries.find((query) => query.error)?.error?.message ||
    publishersQuery.error?.message ||
    null;

  useEffect(() => {
    if (error) {
      console.error("Provider error:", error);
    }
  }, [error]);

  const publishers = useMemo(() => {
    return publishersQuery.data || [];
  }, [publishersQuery.data]);

  const checkpoints = useMemo(() => {
    return assets.reduce((acc, asset, index) => {
      acc[asset.ticker] = checkpointQueries[index].data;
      return acc;
    }, {} as { [ticker: string]: CheckpointT[] });
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
