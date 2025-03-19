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
