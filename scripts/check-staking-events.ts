import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  parseActivity,
  parseAttestation,
  parseDelegator,
} from "../src/lib/staking-events";
import handler from "../src/pages/api/staking/events";
const fixture = (name: string) =>
  JSON.parse(
    readFileSync(
      new URL(`./fixtures/staking-${name}.json`, import.meta.url),
      "utf8"
    )
  );
const delegator = parseDelegator(fixture("delegators")[0]);
assert.equal(delegator.amount, "5000000000000000000000000");
assert.ok(
  delegator.share > 27 && delegator.share < 28,
  "Basis points must be converted to percent"
);
assert.equal(
  parseDelegator({
    address: "0x1",
    delegatedStake: "0.000000000000000001",
    share: 0,
  }).amount,
  "1"
);
assert.throws(() =>
  parseDelegator({ address: "0x1", delegatedStake: "invalid", share: 0 })
);
assert.equal(
  parseDelegator({
    address: "0x1",
    delegatedStake: "7.99999999984e-7",
    share: 0,
  }).amount,
  "799999999984"
);
assert.equal(
  parseDelegator({ address: "0x1", delegatedStake: "1e-18", share: 0 }).amount,
  "1"
);
assert.throws(() =>
  parseDelegator({ address: "0x1", delegatedStake: "1e-19", share: 0 })
);
const withdrawal = parseActivity(fixture("activity")[1]);
assert.equal(withdrawal.operation, "Withdrawn");
assert.equal(withdrawal.amount, "100000000000000000000000");
assert.equal(withdrawal.symbol, "STRK");
assert.equal(parseAttestation(fixture("attestations")[0]).epochId, 12907);
async function main() {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.VOYAGER_API_KEY;
  process.env.VOYAGER_API_KEY = "test-only";
  let requested = "";
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
  });
  try {
    for (const type of ["delegators", "activity", "attestations"]) {
      globalThis.fetch = (async (url) => {
        requested = String(url);
        return Response.json({
          items: fixture(type),
          pagination: { totalPages: 3 },
        });
      }) as typeof fetch;
      const res = response();
      await handler(
        { method: "GET", query: { type, page: "2" } } as any,
        res as any
      );
      assert.equal(res.code, 200);
      assert.equal(res.body.page, 2);
      assert.equal(res.body[type].length, 2);
      const url = new URL(requested);
      assert.equal(url.searchParams.get("p"), "2");
      assert.equal(url.searchParams.get("ps"), "25");
      assert.ok(
        url.searchParams.get(type === "activity" ? "address" : "validator")
      );
    }
    globalThis.fetch = (async () =>
      new Response("Unavailable", { status: 503 })) as typeof fetch;
    const failed = response();
    await handler(
      { method: "GET", query: { type: "activity" } } as any,
      failed as any
    );
    assert.equal(
      failed.code,
      502,
      "Upstream failure must not look like an empty history"
    );
    assert.equal(failed.headers["Cache-Control"], "no-store");
    const invalid = response();
    await handler(
      { method: "GET", query: { page: "-1" } } as any,
      invalid as any
    );
    assert.equal(invalid.code, 400);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.VOYAGER_API_KEY;
    else process.env.VOYAGER_API_KEY = originalKey;
  }
  console.log(
    "Staking checks passed: units, shares, event meaning, independent pagination, invalid requests and upstream failures."
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
