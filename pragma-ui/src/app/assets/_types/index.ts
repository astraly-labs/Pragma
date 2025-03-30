export type AssetInfo = {
  image: string;
  type: string;
  ticker: string;
  lastUpdated: string;
  price: number;
  sources: number;
  variations: {
    past1h: string | number;
    past24h: string | number;
    past7d: string | number;
  };
  chart: string;
  ema: string;
  macd: string;
  error?: string;
  isUnsupported?: boolean;
  decimals?: number;
  components?: Price[];
};

export type Price = {
  publisher: string;
  source: string;
  price: string;
  tx_hash: string;
  timestamp: number;
};

export type DataProviderInfo = {
  image: string;
  type: string;
  link: string;
  name: string;
  lastUpdated: string;
  reputationScore: string | null;
  nbFeeds: number;
  dailyUpdates: number;
  totalUpdates: number;
};

export type Token = {
  ticker: string;
  address: string;
  decimals: number;
};

export type Publisher = {
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

export type AssetT = {
  ticker: string;
  address: string;
  decimals: number;
};

export type StreamData = {
  price: string;
  decimals: number;
  last_updated_timestamp: number;
  nb_sources_aggregated: number;
  variations: {
    "1h": number;
    "1d": number;
    "1w": number;
  };
  loading: boolean;
};

export type PriceComponents = {
  publisher: string;
  link: string;
  source: string;
  price: number;
  hash: string;
  lastUpdated: number;
};

export type CheckpointComponent = {
  hash: string;
  price: number;
  date: string;
  hour: string;
  signer: string;
};

export type Checkpoint = {
  image: string;
  type: string;
  ticker: string;
  lastUpdated: string;
  price: number;
  sources: number;
  variations: {
    past1h: number;
    past24h: number;
    past7d: number;
  };
  chart: string;
  ema: string;
  macd: string;
  error: string;
  isUnsupported: boolean;
};
