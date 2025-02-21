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
  publishersSepolia: "/api/publishers?network=sepolia&dataType=spot_entry",
  publishersMainnet: "/api/publishers?network=mainnet&dataType=spot_entry",
  checkpointsSepolia: "/api/checkpoints?network=sepolia",
  checkpointsMainnet: "/api/checkpoints?network=mainnet",
};

export const initialAssets: AssetT[] = [
  { ticker: "BTC/USD", address: "0x0", decimals: 8 },
  { ticker: "ETH/USD", address: "0x1", decimals: 8 },
];

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
  const [assets] = useState<AssetT[]>(initialAssets);
  const [source, setSource] = useState("mainnet");
  const [streamingData, setStreamingData] = useState<{ [ticker: string]: any }>({});

  // Read initial source from localStorage
  useEffect(() => {
    const storedSource = localStorage.getItem("dataSource");
    if (storedSource && dataSources[storedSource]) {
      setSource(storedSource);
    }
  }, []);

  // Function to start streaming for an asset
  const startStreaming = async (asset: AssetT) => {
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
        throw new Error(`Failed to fetch data for ${asset.ticker}`);
      }

      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();

      let buffer = '';

      const processStream = async () => {
        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            buffer += value;
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (!line.trim()) continue;

              if (line.startsWith('data:')) {
                try {
                  const jsonStr = line.slice(5).trim();
                  const data = JSON.parse(jsonStr);

                  if (Array.isArray(data)) {
                    const formattedData = {
                      ...data[0],
                      historical: data,
                      nb_sources_aggregated: data[0].num_sources_aggregated,
                      last_updated_timestamp: data[0].timestamp / 1000,
                      variations: { past1h: 0, past24h: 0, past7d: 0 },
                    };
                    setStreamingData((prev) => ({ ...prev, [asset.ticker]: formattedData }));
                  } else {
                    const formattedData = {
                      ...data,
                      nb_sources_aggregated: data.num_sources_aggregated,
                      last_updated_timestamp: data.timestamp / 1000,
                      variations: { past1h: 0, past24h: 0, past7d: 0 },
                    };
                    setStreamingData((prev) => ({ ...prev, [asset.ticker]: formattedData }));
                  }
                } catch (e) {
                  console.error(`[${asset.ticker}] Failed to parse data:`, e);
                }
              }
            }
          }
        } catch (error) {
          console.error(`[${asset.ticker}] Stream error:`, error);
        }
      };

      // Start processing without awaiting it
      processStream();
    } catch (error) {
      console.error(`[${asset.ticker}] Failed to start stream:`, error);
    }
  };

  // Manage streams when source changes
  useEffect(() => {
    if (source === 'api') {
      assets.forEach((asset) => {
        startStreaming(asset);
      });
    } else {
      setStreamingData({});
    }
  }, [source, assets]);

  const fetchAssetData = async (asset: AssetT) => {
    if (source === 'api') {
      return streamingData[asset.ticker] || null;
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
    assetQueries.some((query) => query.isLoading) ||
    checkpointQueries.some((query) => query.isLoading) ||
    publishersQuery.isLoading;

  useEffect(() => {
    console.log('Loading state:', loading);
  }, [loading]);

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
