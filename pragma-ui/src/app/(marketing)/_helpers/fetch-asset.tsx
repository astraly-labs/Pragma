import moment from "moment-timezone";
import { TIME_ZONE } from "@/lib/constants";
import { UTCTimestamp } from "lightweight-charts";
import { AssetDataPointResponse } from "@/app/(marketing)/_types";

const removeDuplicateTimestamps = (arr) => {
  const seenTimestamps = new Set();
  const result: any[] = [];
  for (const obj of arr) {
    const timestamp = moment.tz(obj.time, TIME_ZONE).valueOf();
    if (!seenTimestamps.has(timestamp)) {
      seenTimestamps.add(timestamp);
      result.push(obj);
    }
  }
  return result;
};

export const fetchAsset = async (pairId: string, decimals: number) => {
  const base = pairId.split("/")[0].toLowerCase();
  const quote = pairId.split("/")[1].toLowerCase();

  const encodedTicker = encodeURIComponent(`${base}/${quote}`);

  const url = `${process.env.NEXT_PUBLIC_INTERNAL_API}/aggregation/candlestick?pair=${encodedTicker}&interval=15min`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const unorderedData: AssetDataPointResponse = await response.json();

  const data = removeDuplicateTimestamps(
    unorderedData.data.sort(
      (a, b) =>
        moment.tz(b.time, TIME_ZONE).valueOf() -
        moment.tz(a.time, TIME_ZONE).valueOf()
    )
  );

  const priceData = data.reverse().map((d: any) => ({
    time: (moment.tz(d.time, TIME_ZONE).valueOf() / 1000) as UTCTimestamp,
    value: parseInt(d.open) / 10 ** decimals,
  }));

  const lastIndex = data.length - 1;
  const dayIndex = lastIndex - 96;
  const variation24h = data[lastIndex].open - data[dayIndex].open;
  const relativeVariation24h = (variation24h / data[dayIndex].open) * 100;

  return {
    ticker: unorderedData.pair_id,
    lastPrice: data[lastIndex].open,
    variation24h,
    relativeVariation24h,
    priceData,
  };
};
