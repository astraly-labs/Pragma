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
  pragmaDevnet: "/api/onchain?network=pragma_devnet",
  offchain: "/api/proxy",
  publishersSepolia: "/api/publishers?network=sepolia&dataType=spot_entry",
  publishersMainnet: "/api/publishers?network=mainnet&dataType=spot_entry",
  checkpointsSepolia: "/api/checkpoints?network=sepolia",
  checkpointsMainnet: "/api/checkpoints?network=mainnet",
};

export const initialAssets: AssetT[] = [
  { ticker: "BTC/USD", address: "0x0", decimals: 8 },
  { ticker: "ETH/USD", address: "0x1", decimals: 8 },
  { ticker: "USDC/USD", address: "0x2", decimals: 6 },
  { ticker: "USDT/USD", address: "0x2", decimals: 6 },
  { ticker: "DAI/USD", address: "0x2", decimals: 8 },
  { ticker: "STRK/USD", address: "0x2", decimals: 8 },
  { ticker: "WSTETH/USD", address: "0x2", decimals: 8 },
  { ticker: "WBTC/USD", address: "0x2", decimals: 8 },
  { ticker: "LORDS/USD", address: "0x2", decimals: 8 },
  // { ticker: "ZEND/USD", address: "0x2", decimals: 8 },
  // { ticker: "NSTR/USD", address: "0x2", decimals: 8 },
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

  useEffect(() => {
    // Update the source from localStorage after initial render
    const storedSource = localStorage.getItem("dataSource");
    if (storedSource && dataSources[storedSource]) {
      setSource(storedSource);
    }
  }, []);

  const fetchAssetData = async (asset: AssetT) => {
    const response = await fetch(`${dataSources[source]}&pair=${asset.ticker}`);
    if (!response.ok)
      throw new Error(`Failed to fetch data for ${asset.ticker}`);
    return response.json();
  };

  const fetchCheckpoints = async (asset: AssetT) => {
    const checkpointsUrl =
      dataSources[
        `checkpoints${source.charAt(0).toUpperCase() + source.slice(1)}`
      ];
    const response = await fetch(`${checkpointsUrl}&pair=${asset.ticker}`);
    if (!response.ok)
      throw new Error(`Failed to fetch checkpoints for ${asset.ticker}`);
    return response.json();
  };

  const fetchPublishers = async () => {
    const publisherUrl =
      dataSources[
        `publishers${source.charAt(0).toUpperCase() + source.slice(1)}`
      ];
    const response = await fetch(publisherUrl);
    if (!response.ok) throw new Error("Failed to fetch publishers data");
    return response.json();
  };

  const assetQueries = useQueries({
    queries: assets.map((asset) => ({
      queryKey: ["asset", asset.ticker, source],
      queryFn: () => fetchAssetData(asset),
      initialData: initialData?.[asset.ticker],
    })),
  });

  const checkpointQueries = useQueries({
    queries: assets.map((asset) => ({
      queryKey: ["checkpoints", asset.ticker, source],
      queryFn: () => fetchCheckpoints(asset),
      initialData: initialCheckpoints?.[asset.ticker],
    })),
  });

  const publishersQuery = useQuery({
    queryKey: ["publishers", source],
    queryFn: fetchPublishers,
    initialData: initialPublishers,
  });

  const loading =
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

  const data = useMemo(() => {
    return assets.reduce((acc, asset, index) => {
      acc[asset.ticker] = assetQueries[index].data;
      return acc;
    }, {} as { [ticker: string]: any });
  }, [assets, assetQueries]);

  const checkpoints = useMemo(() => {
    return assets.reduce((acc, asset, index) => {
      acc[asset.ticker] = checkpointQueries[index].data;
      return acc;
    }, {} as { [ticker: string]: CheckpointT[] });
  }, [assets, checkpointQueries]);

  const switchSource = (newSource: string) => {
    if (dataSources[newSource]) {
      setSource(newSource);
      localStorage.setItem("dataSource", newSource);
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
