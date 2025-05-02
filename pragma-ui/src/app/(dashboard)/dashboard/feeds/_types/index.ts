export type Feed = {
  id: string;
  ticker: string;
  created_at: string;
};

export type FeedsResponse = {
  feeds: Feed[];
  total: number;
  subscription_tier: string;
  max_feeds: number;
  remaining_feeds: number;
};
