import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { useQueries, useQuery } from "@tanstack/react-query";

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
      if (source === 'api') {
        console.log("Fetching tokens from API...");
        const response = await fetch(dataSources.tokensApi);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to fetch tokens:", errorText);
          throw new Error("Failed to fetch available tokens");
        }
        
        const data = await response.json();
        console.log("Tokens fetched successfully:", data.tokens?.length || 0, "tokens");
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
    retryDelay: 1000
  });

  // Update assets when availableTokens changes
  useEffect(() => {
    if (availableTokens) {
      console.log("Updating assets with:", availableTokens.length, "tokens");
      const newAssets = availableTokens.map(token => {
        // Check if the ticker already has /USD suffix
        const ticker = token.ticker.includes('/USD') ? token.ticker : token.ticker + "/USD";
        return {
          ticker,
          address: token.addresses?.[source] || "0x0",
          decimals: token.decimals || 8
        };
      });
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

  // Function to start streaming for an asset
  const startStreaming = async (asset: AssetT) => {
    // Extract the base ticker (e.g., "BTC" from "BTC/USD")
    const baseTicker = asset.ticker.split('/')[0];
    const encodedPair = encodeURIComponent(asset.ticker);
    const url = `/api/stream?pair=${encodedPair}&interval=1s&aggregation=median&historical_prices=10`;
    console.log(`[${asset.ticker}] Starting stream from:`, url);

    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'text/event-stream',
        },
      });

      if (!response.ok || !response.body) {
        console.error(`[${asset.ticker}] Failed to fetch data:`, response.status, response.statusText);
        
        // Try to get more detailed error information
        try {
          const errorData = await response.json();
          console.error(`[${asset.ticker}] Error details:`, errorData);
          
          // Set error state for this asset
          setStreamingData((prev) => ({ 
            ...prev, 
            [asset.ticker]: {
              price: "0x0",
              decimals: asset.decimals,
              last_updated_timestamp: Math.floor(Date.now() / 1000),
              nb_sources_aggregated: 0,
              variations: { "1h": 0, "1d": 0, "1w": 0 },
              error: errorData.error || "Failed to fetch data",
              isUnsupported: errorData.error?.includes("Unsupported asset") || false
            } 
          }));
        } catch (parseError) {
          // If we can't parse the error response, use a generic error
          setStreamingData((prev) => ({ 
            ...prev, 
            [asset.ticker]: {
              price: "0x0",
              decimals: asset.decimals,
              last_updated_timestamp: Math.floor(Date.now() / 1000),
              nb_sources_aggregated: 0,
              variations: { "1h": 0, "1d": 0, "1w": 0 },
              error: `Error: ${response.status} ${response.statusText}`
            } 
          }));
        }
        return;
      }

      console.log(`[${asset.ticker}] Stream connected successfully`);

      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();

      let buffer = '';

      const processStream = async () => {
        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) {
              console.log(`[${asset.ticker}] Stream done`);
              break;
            }

            buffer += value;
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (!line.trim()) continue;

              if (line.startsWith('data:')) {
                try {
                  const jsonStr = line.slice(5).trim();
                  console.log(`[${asset.ticker}] Received data:`, jsonStr.substring(0, 50));
                  
                  const data = JSON.parse(jsonStr);
                  
                  // Skip the initial connection message
                  if (data.connected) {
                    console.log(`[${asset.ticker}] Initial connection established`);
                    continue;
                  }

                  // Check for error messages
                  if (data.error) {
                    console.error(`[${asset.ticker}] Stream error:`, data.error);
                    
                    // Check if it's an unsupported asset error
                    if (data.error.includes("entry not found")) {
                      setStreamingData((prev) => ({ 
                        ...prev, 
                        [asset.ticker]: {
                          price: "0x0",
                          decimals: asset.decimals,
                          last_updated_timestamp: Math.floor(Date.now() / 1000),
                          nb_sources_aggregated: 0,
                          variations: { "1h": 0, "1d": 0, "1w": 0 },
                          error: `Unsupported asset: ${asset.ticker}`,
                          isUnsupported: true
                        } 
                      }));
                    }
                    continue;
                  }

                  // Check if we have a valid price update
                  if (data.price && data.timestamp) {
                    console.log(`[${asset.ticker}] Valid price update:`, data.price);
                    
                    const formattedData = {
                      ...data,
                      nb_sources_aggregated: data.num_sources_aggregated || 1,
                      last_updated_timestamp: data.timestamp / 1000,
                      variations: { "1h": 0, "1d": 0, "1w": 0 },
                    };
                    
                    setStreamingData((prev) => ({ ...prev, [asset.ticker]: formattedData }));
                  } else if (Array.isArray(data) && data.length > 0 && data[0].price) {
                    // Handle array of price updates (historical data)
                    const formattedData = {
                      ...data[0],
                      historical: data,
                      nb_sources_aggregated: data[0].num_sources_aggregated || 1,
                      last_updated_timestamp: data[0].timestamp / 1000,
                      variations: { "1h": 0, "1d": 0, "1w": 0 },
                    };
                    setStreamingData((prev) => ({ ...prev, [asset.ticker]: formattedData }));
                  }
                } catch (e) {
                  console.error(`[${asset.ticker}] Failed to parse data:`, e, line.slice(5).trim().substring(0, 50));
                }
              }
            }
          }
        } catch (error) {
          console.error(`[${asset.ticker}] Stream error:`, error);
          setStreamingData((prev) => ({ 
            ...prev, 
            [asset.ticker]: {
              ...(prev[asset.ticker] || {}),
              error: `Stream error: ${error.message || 'Unknown error'}`
            } 
          }));
        }
      };

      // Start processing without awaiting it
      processStream();
    } catch (error) {
      console.error(`[${asset.ticker}] Failed to start stream:`, error);
      // Set default data for this asset with error
      setStreamingData((prev) => ({ 
        ...prev, 
        [asset.ticker]: {
          price: "0x0",
          decimals: asset.decimals,
          last_updated_timestamp: Math.floor(Date.now() / 1000),
          nb_sources_aggregated: 0,
          variations: { "1h": 0, "1d": 0, "1w": 0 },
          error: `Failed to start stream: ${error.message || 'Unknown error'}`
        } 
      }));
    }
  };

  // Manage streams when source or assets change
  useEffect(() => {
    if (source === 'api') {
      // Clear existing streams
      setStreamingData({});
      // Start new streams for all assets
      assets.forEach((asset) => {
        startStreaming(asset);
      });
    } else {
      setStreamingData({});
    }
  }, [source, assets]);

  const fetchAssetData = async (asset: AssetT) => {
    if (source === 'api') {
      // For API source, we're using streaming data
      const streamData = streamingData[asset.ticker];
      
      if (!streamData) {
        console.log(`No streaming data for ${asset.ticker}, returning default`);
        return {
          price: "0x0",
          decimals: asset.decimals || 8,
          last_updated_timestamp: Math.floor(Date.now() / 1000),
          nb_sources_aggregated: 1,
          variations: {
            "1h": 0,
            "1d": 0,
            "1w": 0
          }
        };
      }
      
      // Format the streaming data
      return {
        price: streamData.price || "0x0",
        decimals: streamData.decimals || asset.decimals || 8,
        last_updated_timestamp: streamData.last_updated_timestamp || Math.floor(Date.now() / 1000),
        nb_sources_aggregated: streamData.nb_sources_aggregated || 1,
        variations: streamData.variations || {
          "1h": 0,
          "1d": 0,
          "1w": 0
        }
      };
    } else {
      const url = `${dataSources[source]}&pair=${encodeURIComponent(asset.ticker)}`;
      console.log(`[${asset.ticker}] Fetching from:`, url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${asset.ticker}`);
      }
      return response.json();
    }
  };

  const fetchCheckpoints = async (asset: AssetT) => {
    if (source === 'api') {
      return [];
    }
    const checkpointsUrl = dataSources[`checkpoints${source.charAt(0).toUpperCase() + source.slice(1)}`];
    const url = `${checkpointsUrl}&pair=${encodeURIComponent(asset.ticker)}`;
    console.log(`[${asset.ticker}] Fetching checkpoints from:`, url);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch checkpoints for ${asset.ticker}`);
    }
    return response.json();
  };

  const fetchPublishers = async () => {
    if (source === 'api') {
      return [];
    }
    const publisherUrl = dataSources[`publishers${source.charAt(0).toUpperCase() + source.slice(1)}`];
    console.log('Fetching publishers from:', publisherUrl);
    
    const response = await fetch(publisherUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch publishers data");
    }
    return response.json();
  };

  const switchSource = (newSource: string) => {
    if (dataSources[newSource]) {
      console.log('Switching source to:', newSource);
      setSource(newSource);
      localStorage.setItem("dataSource", newSource);
    } else {
      console.error("Invalid data source");
    }
  };

  useEffect(() => {
    console.log('Current source:', source);
  }, [source]);

  const assetQueries = useQueries({
    queries: assets.map((asset) => ({
      queryKey: ["asset", asset.ticker, source],
      queryFn: () => fetchAssetData(asset),
      initialData: initialData?.[asset.ticker],
      refetchInterval: source === 'api' ? 1000 : undefined,
      retry: false,
      enabled: source !== 'api',
    })),
  });

  const data = useMemo(() => {
    if (source === 'api') {
      return streamingData;
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
      enabled: source !== 'api',
    })),
  });

  const publishersQuery = useQuery({
    queryKey: ["publishers", source],
    queryFn: fetchPublishers,
    initialData: initialPublishers,
    enabled: source !== 'api',
  });

  const loading =
    (isLoadingTokens && source === 'api') ||
    assetQueries.some((query) => query.isLoading) ||
    checkpointQueries.some((query) => query.isLoading) ||
    publishersQuery.isLoading;

  useEffect(() => {
    console.log('Loading state:', loading, 'Assets:', assets.length, 'Streaming data:', Object.keys(streamingData).length);
  }, [loading, assets.length, streamingData]);

  const error =
    assetQueries.find((query) => query.error)?.error?.message ||
    checkpointQueries.find((query) => query.error)?.error?.message ||
    publishersQuery.error?.message ||
    null;

  useEffect(() => {
    if (error) {
      console.error('Provider error:', error);
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
