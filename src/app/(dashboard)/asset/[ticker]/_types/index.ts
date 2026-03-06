export type PriceComponent = {
  source: string;
  price: string;
  timestamp: number;
};

export type PriceData = {
  num_sources_aggregated: number;
  pair_id: string;
  price: string;
  timestamp: number;
  decimals: number;
  components: PriceComponent[];
};
