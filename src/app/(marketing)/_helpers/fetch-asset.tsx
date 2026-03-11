import { toZonedTime } from "date-fns-tz";
import { TIME_ZONE } from "@/lib/constants";
type UTCTimestamp = number;
import { AssetDataPointResponse } from "@/app/(marketing)/_types";

const toTimestamp = (time: string) =>
  toZonedTime(new Date(time), TIME_ZONE).getTime();

const removeDuplicateTimestamps = (arr: any[]) => {
  const seenTimestamps = new Set<number>();
  const result: any[] = [];
  for (const obj of arr) {
    const timestamp = toTimestamp(obj.time);
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

  const apiBase = process.env.NEXT_PUBLIC_INTERNAL_API;
  if (!apiBase) {
    return {
      ticker: pairId,
      lastPrice: 0,
      variation24h: null,
      relativeVariation24h: null,
      priceData: [],
    };
  }

  const encodedTicker = encodeURIComponent(`${base}/${quote}`);
  const url = `${apiBase}/offchain/aggregation/candlestick?pair=${encodedTicker}&interval=15min`;

  let response: Response;
  try {
    response = await fetch(url, { cache: "no-store" });
  } catch (err) {
    console.error(`Failed to fetch candlestick for ${pairId}:`, err);
    return {
      ticker: pairId,
      lastPrice: 0,
      variation24h: null,
      relativeVariation24h: null,
      priceData: [],
    };
  }

  if (!response.ok) {
    console.error(
      `Candlestick API error for ${pairId}: ${response.status} ${response.statusText}`
    );
    return {
      ticker: pairId,
      lastPrice: 0,
      variation24h: null,
      relativeVariation24h: null,
      priceData: [],
    };
  }

  const unorderedData: AssetDataPointResponse = await response.json();

  if (!unorderedData?.data?.length) {
    return {
      ticker: pairId,
      lastPrice: 0,
      variation24h: null,
      relativeVariation24h: null,
      priceData: [],
    };
  }

  const data = removeDuplicateTimestamps(
    unorderedData.data.sort((a, b) => toTimestamp(b.time) - toTimestamp(a.time))
  );

  const priceData = data.reverse().map((d: any) => ({
    time: (toTimestamp(d.time) / 1000) as UTCTimestamp,
    value: parseInt(d.open) / 10 ** decimals,
  }));

  if (data.length < 97) {
    return {
      ticker: unorderedData.pair_id,
      lastPrice: parseInt(data[data.length - 1].open) / 10 ** decimals,
      variation24h: null,
      relativeVariation24h: null,
      priceData,
    };
  }

  const lastIndex = data.length - 1;
  const dayIndex = lastIndex - 96;
  const lastPrice = parseInt(data[lastIndex].open) / 10 ** decimals;
  const dayPrice = parseInt(data[dayIndex].open) / 10 ** decimals;
  const variation24h = lastPrice - dayPrice;
  const relativeVariation24h = (variation24h / dayPrice) * 100;

  return {
    ticker: unorderedData.pair_id,
    lastPrice,
    variation24h,
    relativeVariation24h,
    priceData,
  };
};
