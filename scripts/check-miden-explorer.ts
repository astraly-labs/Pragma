// Run with Bun: bun scripts/check-miden-explorer.ts
import assert from "node:assert/strict";
import { midenAssets } from "../src/lib/miden-api";
import { explorerSource, MIDEN_DEPLOYMENT } from "../src/lib/explorer-networks";
import { getAsset } from "../src/app/(dashboard)/asset/[ticker]/_helpers/getAsset";
import { getCheckpoints } from "../src/app/(dashboard)/asset/[ticker]/_helpers/getCheckpoints";
import handler from "../src/pages/api/miden";

const prices = [
  {
    symbol: "BTC/USD",
    price: 76963.08687849,
    change24h: 1.888,
    high24h: 79600,
  },
  { symbol: "USDT/USD", price: 0.99965, change24h: -0.019 },
];
const assets = midenAssets(prices);
assert.equal(assets[0].price, prices[0].price, "Medians are already scaled");
assert.equal(assets[1].price, 0.99965, "Keep the measured stablecoin price");
assert.equal(
  assets[0].lastUpdated,
  "Not reported",
  "Request time is not observation time"
);
assert.equal(
  assets[0].sources,
  null,
  "Missing source coverage is not zero or a fabricated count"
);
assert.equal(
  assets[0].variations.past24h,
  "—",
  "Exchange statistics are not oracle returns"
);
assert.equal(
  assets[0].components,
  undefined,
  "Do not fabricate publisher observations"
);
for (const price of [0, -1, null, "0.99", NaN, Infinity]) {
  assert.equal(
    midenAssets([{ symbol: "BTC/USD", price }])[0].error,
    "Price unavailable"
  );
}
assert.throws(() => midenAssets({ error: "upstream failure" }));
assert.throws(() => midenAssets([{ symbol: "https://example.com", price: 1 }]));
assert.throws(() => midenAssets([prices[0], prices[0]]));
assert.equal(explorerSource("miden"), "miden");
assert.equal(explorerSource(undefined), "mainnet");
assert.equal(explorerSource(["miden"]), "mainnet");
assert.equal(
  explorerSource("miden-mainnet"),
  "mainnet",
  "Do not expose an unconfigured Miden mainnet"
);

async function main() {
  const originalFetch = globalThis.fetch;
  const requests: string[] = [];
  const response = () => ({
    code: 0,
    body: null as any,
    headers: {} as Record<string, string>,
    setHeader(key: string, value: string) {
      this.headers[key] = value;
    },
    status(code: number) {
      this.code = code;
      return this;
    },
    json(body: any) {
      this.body = body;
      return this;
    },
    end() {
      return this;
    },
  });
  try {
    globalThis.fetch = (async (url, options) => {
      requests.push(String(url));
      assert.equal(String(url), `${MIDEN_DEPLOYMENT.apiUrl}/api/prices`);
      assert.equal(new Headers(options?.headers).has("x-api-key"), false);
      return Response.json(prices);
    }) as typeof fetch;
    const result = response();
    await handler(
      { method: "GET", query: { url: "https://example.com" } } as any,
      result as any
    );
    assert.equal(result.code, 200);
    assert.equal(result.body.length, 2);
    assert.equal(result.headers["Cache-Control"], "no-store");
    assert.equal(
      (await getAsset({ ticker: "USDT%2FUSD", source: "miden" }))?.price,
      0.99965
    );
    assert.equal(
      await getAsset({ ticker: "STRK%2FUSD", source: "miden" }),
      undefined
    );
    const beforeCheckpoints = requests.length;
    assert.deepEqual(
      await getCheckpoints({ ticker: "BTC%2FUSD", source: "miden" }),
      []
    );
    assert.equal(
      requests.length,
      beforeCheckpoints,
      "Miden detail must not request Starknet checkpoints"
    );
    const disallowed = response();
    await handler({ method: "POST" } as any, disallowed as any);
    assert.equal(disallowed.code, 405);
    assert.equal(requests.length, beforeCheckpoints);
    for (const upstream of [
      new Response("unavailable", { status: 503 }),
      Response.json({ error: "private upstream details" }),
    ]) {
      globalThis.fetch = (async () => upstream) as typeof fetch;
      const failed = response();
      await handler({ method: "GET" } as any, failed as any);
      assert.equal(failed.code, 502);
      assert.deepEqual(failed.body, {
        error: "Miden prices are temporarily unavailable",
      });
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
  console.log(
    "Miden explorer checks passed: prices, missing provenance, routing, network isolation and upstream failures."
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
