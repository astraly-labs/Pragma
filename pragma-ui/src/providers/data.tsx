import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

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
  testnet: "/api/onchain?network=testnet",
  mainnet: "/api/onchain?network=mainnet",
  offchain: "/api/proxy",
  publishersTestnet: "/api/publishers?network=testnet&dataType=spot_entry",
  publishersMainnet: "/api/publishers?network=mainnet&dataType=spot_entry",
  checkpointsTestnet: "/api/checkpoints?network=testnet",
  checkpointsMainnet: "/api/checkpoints?network=mainnet",
};

export const initialAssets: AssetT[] = [
  { ticker: "BTC/USD", address: "0x0", decimals: 8 },
  { ticker: "ETH/USD", address: "0x1", decimals: 8 },
  { ticker: "USDC/USD", address: "0x2", decimals: 6 },
  { ticker: "USDT/USD", address: "0x2", decimals: 6 },
  { ticker: "DAI/USD", address: "0x2", decimals: 8 },
  { ticker: "STRK/USD", address: "0x2", decimals: 8 },
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
  const [data, setData] = useState<{ [ticker: string]: any }>(initialData);
  const [publishers, setPublishers] = useState<PublisherT[]>(initialPublishers);
  const [checkpoints, setCheckpoints] = useState<{
    [ticker: string]: CheckpointT[];
  }>(initialCheckpoints);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState("mainnet");

  const fetchData = useCallback(
    async (source: string) => {
      setLoading(true);
      setError(null);
      const results: { [ticker: string]: any } = {};
      const checkpointsData: { [ticker: string]: CheckpointT[] } = {};

      try {
        const publisherUrl =
          dataSources[
            `publishers${source.charAt(0).toUpperCase() + source.slice(1)}`
          ];
        const checkpointsUrl =
          dataSources[
            `checkpoints${source.charAt(0).toUpperCase() + source.slice(1)}`
          ];

        const [, , publishersResponse] = await Promise.all([
          Promise.all(
            assets.map(async (asset) => {
              const response = await fetch(
                `${dataSources[source]}&pair=${asset.ticker}`
              );
              if (!response.ok)
                throw new Error(`Failed to fetch data for ${asset.ticker}`);
              const result = await response.json();
              results[asset.ticker] = result;
            })
          ),
          Promise.all(
            assets.map(async (asset) => {
              const response = await fetch(
                `${checkpointsUrl}&pair=${asset.ticker}`
              );
              if (!response.ok)
                throw new Error(`Failed to fetch data for ${asset.ticker}`);
              const result = await response.json();
              checkpointsData[asset.ticker] = result;
            })
          ),
          fetch(publisherUrl),
        ]);
        if (!publishersResponse.ok)
          throw new Error("Failed to fetch publishers data");
        const publishersData = await publishersResponse.json();

        setData(results);
        setCheckpoints(checkpointsData);
        setPublishers(publishersData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [assets]
  );

  useEffect(() => {
    if (!initialData || !initialPublishers || !initialCheckpoints) {
      fetchData(source);
    } else {
      setLoading(false);
    }
  }, [source, fetchData, initialData, initialPublishers, initialCheckpoints]);

  const switchSource = (newSource: string) => {
    if (dataSources[newSource]) {
      setSource(newSource);
    } else {
      console.error("Invalid data source");
    }
  };

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