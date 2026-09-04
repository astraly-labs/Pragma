// Run with Node 24+: node scripts/check-price-stream.mjs
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { setTimeout as delay } from "node:timers/promises";
import {
  parsePriceUpdates,
  startPriceStream,
} from "../src/lib/price-stream.ts";

// Public BTC/USD responses captured on 2026-09-04: history is newest first.
const historical = [
  {
    num_sources_aggregated: 1,
    pair_id: "BTC/USD",
    price: "0x113fc866d2a9d24c9900",
    timestamp: 1788513555000,
    decimals: 18,
  },
  {
    num_sources_aggregated: 1,
    pair_id: "BTC/USD",
    price: "0x1125e160fedeb56c0000",
    timestamp: 1788513554000,
    decimals: 18,
  },
];
const live = {
  num_sources_aggregated: 1,
  pair_id: "BTC/USD",
  price: "0x1125e160fedeb56c0000",
  timestamp: 1788513556121,
  decimals: 18,
};
assert.equal(
  parsePriceUpdates([historical])["BTC/USD"].price,
  historical[0].price
);
assert.equal(
  parsePriceUpdates([live])["BTC/USD"].last_updated_timestamp,
  live.timestamp / 1000
);
assert.deepEqual(parsePriceUpdates([{ ...live, price: "invalid" }]), {});
assert.equal(
  parsePriceUpdates([{ ...live, decimals: 0 }])["BTC/USD"].decimals,
  0
);

let connections = 0;
let closed = 0;
let state = { "BTC/USD": { loading: true }, "WBTC/USD": { loading: true } };
const server = createServer((request, response) => {
  connections++;
  response.on("close", () => closed++);
  response.writeHead(200, { "Content-Type": "text/event-stream" });
  const historyEvent = `event: historical\r\ndata: ${JSON.stringify([historical])}\r\n\r\n`;
  response.write(historyEvent.slice(0, 35));
  response.write(historyEvent.slice(35));
  response.write(`data: ${JSON.stringify([live])}\n\n`);
  response.write(historyEvent); // Replayed older history must not overwrite live.
  if (connections === 1) response.end();
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const actualFetch = globalThis.fetch;
globalThis.fetch = (url, options) =>
  actualFetch(`http://127.0.0.1:${server.address().port}${url}`, options);
const stop = startPriceStream(Object.keys(state), (update) => {
  state = update(state);
});
try {
  const deadline = Date.now() + 5000;
  while (connections < 2 && Date.now() < deadline) await delay(20);
  assert.equal(connections, 2, "EOF must reconnect");
  assert.equal(state["BTC/USD"].price, live.price);
  assert.equal(state["BTC/USD"].last_updated_timestamp, live.timestamp / 1000);
  assert.deepEqual(state["WBTC/USD"], {
    loading: false,
    error: "No recent price",
  });
  stop();
  const closeDeadline = Date.now() + 1500;
  while (closed < 2 && Date.now() < closeDeadline) await delay(20);
  assert.equal(closed, 2, "Cleanup must close the active HTTP stream");
  await delay(3100);
  assert.equal(connections, 2, "Cleanup must cancel reconnect timers");
  console.log(
    "PASS: captured historical/live prices, unavailable assets, EOF reconnect and cleanup"
  );
} finally {
  stop();
  globalThis.fetch = actualFetch;
  server.closeAllConnections();
  server.close();
}
