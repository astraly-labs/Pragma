// Run with Bun: bun scripts/check-asset-display.ts
import assert from "node:assert/strict";
import { formatAssets } from "../src/app/(dashboard)/assets/_helpers";
for (const source of ["mainnet", "api"]) {
  assert.equal(
    formatAssets({ "BTC/USD": { error: "Waiting for price" } }, source)[0]
      .lastUpdated,
    "Loading…",
    "Pending requests must not be presented as failed prices"
  );
  const missing = formatAssets(
    { "UNKNOWN/USD": { price: 1, decimals: 0 } },
    source
  )[0];
  assert.equal(missing.lastUpdated, "Unavailable");
  assert.equal(
    missing.chart,
    "",
    "An unknown asset must not inherit Bitcoin’s chart"
  );
  assert.equal(
    missing.variations.past1h,
    "—",
    "Missing performance is not a zero return"
  );
  const error = formatAssets(
    { "BTC/USD": { error: "Unavailable" } },
    source
  )[0];
  assert.equal(error.lastUpdated, "Price unavailable");
  assert.equal(error.chart, "");
  const stale = formatAssets(
    {
      "ZERO/USD": {
        price: "0x64",
        decimals: 0,
        lastUpdated: 1,
        last_updated_timestamp: 1,
      },
    },
    source
  )[0];
  assert.equal(stale.price, 100, "Zero decimals must be preserved");
  assert.match(
    stale.lastUpdated,
    /1970-01-01/,
    "Old observations must include their date"
  );
}

for (const [pair, rawPrice, expected] of [
  ["BTC/USD", 6081765131486, 60817.65131486],
  ["USDC/USD", 999854, 0.999854],
  ["USDT/USD", 1000123, 1.000123],
  ["DOG/USD", 123, 0.00123],
] as const) {
  for (const price of [
    rawPrice,
    String(rawPrice),
    `0x${rawPrice.toString(16)}`,
  ]) {
    const data = { [pair]: { price, decimals: 0, lastUpdated: 1 } };
    const original = structuredClone(data);
    assert.equal(formatAssets(data, "mainnet")[0].price, expected);
    assert.deepEqual(data, original, "Formatting must not mutate API data");
  }
}
assert.equal(
  formatAssets({ "USDC/USD": { price: 0.999854, decimals: 6 } }, "mainnet")[0]
    .price,
  0.999854,
  "An already normalized API price must not be divided again"
);
assert.equal(
  formatAssets({ "BTC/USD": { price: 100, decimals: 0 } }, "api")[0].price,
  100,
  "The Starknet display correction must not affect other data sources"
);
console.log("Asset display checks passed");

assert.equal(
  formatAssets(
    { "BTC/USD": { error: "500: internal host details" } },
    "mainnet"
  )[0].lastUpdated,
  "Price unavailable"
);
