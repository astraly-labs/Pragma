import assert from "node:assert/strict";
import {
  ageLabel,
  chartData,
  groupMarkets,
  priceNumber,
} from "../src/lib/explorer-metrics.ts";

const markets = groupMarkets([
  {
    pair_id: "BTC/USD",
    source: "BINANCE",
    last_updated_timestamp: 1000,
    price: "0x64",
    decimals: 0,
    daily_updates: 10,
  },
  {
    pair_id: "BTC/USD",
    source: "OKX",
    last_updated_timestamp: 1100,
    price: "0x65",
    decimals: 0,
    daily_updates: 12,
  },
  {
    pair_id: "OLD/USD",
    source: "BINANCE",
    last_updated_timestamp: 1,
    price: "0x32",
    decimals: 0,
    daily_updates: 0,
  },
]);
assert.equal(markets.length, 2, "Historical markets must remain visible");
assert.equal(
  markets[0].updates,
  22,
  "Count source observations, not duplicate market rows"
);
assert.equal(markets[0].sources.length, 2);
assert.equal(markets[0].timestamp, 1100);
assert.equal(priceNumber("0x64", 0), 100, "Preserve zero decimals");
assert.equal(ageLabel(1000, 1901), "15m ago");
assert.equal(ageLabel(0, 1901), "Not reported");

const chart = chartData([
  {
    name: "A / BINANCE",
    color: "red",
    gap: 1800,
    points: [
      { timestamp: 100, price: 10 },
      { timestamp: 200, price: 11 },
      { timestamp: 4000, price: 15 },
    ],
  },
  {
    name: "B / BINANCE",
    color: "blue",
    gap: 1800,
    points: [{ timestamp: 150, price: 12 }],
  },
]);
assert.equal(
  chart.lines.length,
  3,
  "An outage must split the line, not imply continuous publication"
);
assert.equal(chart.lines[0].data[0].price, 10);
assert.equal(
  chart.lines[2].data[0].price,
  12,
  "Preserve publisher identity even with the same source"
);
assert.equal(chart.lines[1].data[0].price, 15);
assert.equal(chart.lines[0].data.length, 2, "Do not bridge the outage");
assert.equal(
  chart.lines[1].data.length,
  1,
  "An isolated observation must remain visible as a dot"
);
assert.deepEqual(
  chart.rows.map((row) => row.timestamp),
  [100, 150, 200, 4000],
  "Keep actual submission times"
);
console.log(
  "Explorer market coverage, freshness, source identity and chart gap checks passed"
);
