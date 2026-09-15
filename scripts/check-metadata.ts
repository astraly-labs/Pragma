// Run against a production build: bun scripts/check-metadata.ts http://localhost:3107
import assert from "node:assert/strict";
import { EXPLORER_NETWORKS } from "../src/lib/explorer-networks";

const origin = process.argv[2] || "http://localhost:3107";
const canonicalOrigin = "https://www.pragma.build";
const decode = (value: string) =>
  value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'");

async function metadata(path: string, userAgent = "TelegramBot") {
  const response = await fetch(`${origin}${path}`, {
    headers: { "User-Agent": userAgent },
    signal: AbortSignal.timeout(30000),
  });
  assert.equal(response.status, 200, path);
  assert.ok(
    !response.headers.get("cache-control")?.includes("immutable"),
    `${path}: HTML must not inherit the static asset cache policy`
  );
  const html = await response.text();
  const head = html.split("</head>")[0];
  const tags = new Map<string, string>();
  for (const tag of head.match(/<(?:meta|link)\b[^>]*>/g) || []) {
    const attrs = Object.fromEntries(
      Array.from(tag.matchAll(/([\w:-]+)="([^"]*)"/g)).map(([, key, value]) => [
        key,
        decode(value),
      ])
    );
    const key = attrs.property || attrs.name || attrs.rel;
    if (key) tags.set(key, attrs.content || attrs.href);
  }
  return {
    tags,
    html,
    title: decode(head.match(/<title>(.*?)<\/title>/)?.[1] || ""),
  };
}

const cases = [
  ["/", "/", "The oracle for Starknet and Miden"],
  [
    "/assets?source=mainnet&utm_source=test",
    "/assets",
    "Starknet mainnet oracle price feeds",
  ],
  [
    "/assets?source=miden&utm_source=test",
    "/assets?source=miden",
    `${EXPLORER_NETWORKS.miden} oracle price feeds`,
  ],
  ["/assets?source=unknown", "/assets", "Starknet mainnet oracle price feeds"],
  [
    "/asset/USDT-USD?network=miden",
    "/asset/USDT-USD?network=miden",
    `USDT/USD oracle price on ${EXPLORER_NETWORKS.miden}`,
  ],
  [
    "/asset/BTC-USD?network=mainnet",
    "/asset/BTC-USD",
    "BTC/USD oracle price on Starknet mainnet",
  ],
  [
    "/provider/Pragma?network=mainnet",
    "/provider/Pragma",
    "Pragma oracle data publisher",
  ],
  ["/ecosystem", "/ecosystem", "Starknet and Miden oracle ecosystem"],
  ["/resources", "/resources", "Oracle documentation and developer resources"],
  ["/staking", "/staking", "Stake STRK with Pragma"],
  ["/terms", "/terms", "Terms and conditions"],
  ["/privacy-policy", "/privacy-policy", "Privacy policy"],
];

async function main() {
  const images = new Map<string, string>();
  for (const [path, canonical, title] of cases) {
    const result = await metadata(path);
    assert.equal(result.title, `${title} | Pragma`, path);
    for (const key of ["canonical", "og:url"]) {
      assert.equal(
        new URL(result.tags.get(key)!).href,
        new URL(canonical, canonicalOrigin).href,
        `${path}: ${key}`
      );
    }
    assert.equal(result.tags.get("og:title"), result.title, path);
    assert.equal(result.tags.get("twitter:title"), result.title, path);
    assert.equal(
      result.tags.get("og:description"),
      result.tags.get("description"),
      path
    );
    assert.equal(
      result.tags.get("twitter:description"),
      result.tags.get("description"),
      path
    );
    assert.equal(result.tags.get("twitter:card"), "summary_large_image");
    assert.equal(
      result.tags.get("twitter:image"),
      result.tags.get("og:image"),
      `${path}: both cards must use the current image`
    );
    assert.ok(result.tags.get("description"), `${path}: description missing`);
    const image = result.tags.get("og:image");
    assert.ok(image, `${path}: sharing image missing`);
    assert.ok(
      [canonicalOrigin, new URL(origin).origin].includes(new URL(image).origin),
      `${path}: image must use the site or preview origin`
    );
    assert.ok(
      new URL(image).search,
      `${path}: image URL must change when branding changes`
    );
    images.set(path, image);
    if (path === "/") {
      const data = result.html.match(
        /<script type="application\/ld\+json">(.*?)<\/script>/
      )?.[1];
      assert.ok(data, "Homepage must identify the organization and website");
      const graph = JSON.parse(data)["@graph"];
      assert.deepEqual(
        graph.map((node: { "@type": string }) => node["@type"]),
        ["Organization", "WebSite"]
      );
    }
    console.log(`Metadata OK: ${path}`);
  }

  for (const agent of [
    "facebookexternalhit/1.1",
    "WhatsApp/2.26.0",
    "Twitterbot/1.0",
  ]) {
    const result = await metadata("/assets?source=miden", agent);
    assert.equal(
      result.tags.get("og:title"),
      `${EXPLORER_NETWORKS.miden} oracle price feeds | Pragma`
    );
    assert.equal(result.tags.get("twitter:image"), result.tags.get("og:image"));
  }

  const mainnetImage = images.get(cases[1][0])!;
  const midenImage = images.get(cases[2][0])!;
  assert.notEqual(
    mainnetImage,
    midenImage,
    "Miden and Starknet must have distinct cards"
  );
  const imageContents = new Set<string>();
  for (const image of [
    images.get("/")!,
    mainnetImage,
    midenImage,
    images.get(cases[4][0])!,
  ]) {
    const url = new URL(image);
    const response = await fetch(`${origin}${url.pathname}${url.search}`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") || "", /image\/png/);
    const png = Buffer.from(await response.arrayBuffer());
    assert.equal(png.subarray(1, 4).toString(), "PNG");
    assert.equal(png.readUInt32BE(16), 1200);
    assert.equal(png.readUInt32BE(20), 630);
    imageContents.add(png.toString("base64"));
  }

  assert.equal(
    imageContents.size,
    4,
    "The home, network and asset cards must render different content"
  );

  const icon = await fetch(`${origin}/assets/currencies/btc.svg`);
  assert.equal(icon.status, 200);
  assert.ok(
    icon.headers.get("cache-control")?.includes("immutable"),
    "Static icons retain long-lived caching"
  );

  const robots = await (await fetch(`${origin}/robots.txt`)).text();
  assert.ok(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
  const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
  assert.ok(
    sitemap.includes(`<loc>${canonicalOrigin}/assets?source=miden</loc>`)
  );
  console.log(
    "Sharing images, bot metadata, structured data and crawl discovery checks passed"
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
