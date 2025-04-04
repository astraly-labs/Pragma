export type AssetDataPoint = {
  time: string;
  open: string;
  low: string;
  high: string;
  close: string;
};

export type AssetDataPointResponse = {
  pair_id: string;
  data: AssetDataPoint[];
};
