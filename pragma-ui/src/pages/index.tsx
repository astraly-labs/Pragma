import React, { useEffect, useState, useMemo, Suspense } from "react";
import dynamic from "next/dynamic";
import styles from "./styles.module.scss";
import BoxContainer from "../components/common/BoxContainer";
import classNames from "classnames";
import moment from "moment-timezone";
import { UTCTimestamp } from "lightweight-charts";
import { initialAssets } from "../providers/data";
import { useQuery } from "@tanstack/react-query";
import { AssetT } from "../components/common/AssetBox";
import { debounce } from "lodash"; // or implement your own debounce function

// Non-lazy loaded components
import Hero from "../components/Landing/Hero";
import MarqueeLogo from "../components/Landing/MarqueeLogo";
import BlurBox from "../components/common/BlurBox";
import AssetBox from "../components/common/AssetBox";
import { ChartBox } from "../components/common/ChartBox";

// Lazy loaded components
const CodeSnippet = dynamic(() => import("../components/Landing/CodeSnippet"), {
  ssr: false,
});
const Architecture = dynamic(
  () => import("../components/Landing/Architecture"),
  { ssr: false }
);
const Testimonial = dynamic(
  () => import("../components/Landing/Testimonial/Testimonial"),
  { ssr: false }
);
const Blog = dynamic(() => import("../components/Landing/Blog/Blog"), {
  ssr: false,
});
const Events = dynamic(() => import("../components/Landing/Events"), {
  ssr: false,
});
const ReadyBox = dynamic(() => import("../components/common/ReadyBox"), {
  ssr: false,
});

export const timezone = "Europe/London";

export const removeDuplicateTimestamps = (arr) => {
  const seenTimestamps = new Set();
  const result = [];
  for (const obj of arr) {
    const timestamp = moment.tz(obj.time, timezone).valueOf();
    if (!seenTimestamps.has(timestamp)) {
      seenTimestamps.add(timestamp);
      result.push(obj);
    }
  }
  return result;
};

const fetchAssetData = async (pairId: string, decimals: number) => {
  const url = `/api/proxy?pair=${pairId}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const unorderedData = await response.json();
  const data = removeDuplicateTimestamps(
    unorderedData.data.sort(
      (a, b) =>
        moment.tz(b.time, timezone).valueOf() -
        moment.tz(a.time, timezone).valueOf()
    )
  );

  const priceData = data.reverse().map((d: any) => ({
    time: (moment.tz(d.time, timezone).valueOf() / 1000) as UTCTimestamp,
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

const IndexPage = () => {
  const [windowWidth, setWindowWidth] = useState(null);
  const [selectedAssetPair, setSelectedAssetPair] = useState<AssetT>(
    initialAssets[0]
  );

  const { data: allData } = useQuery({
    queryKey: ["assetData"],
    queryFn: async () => {
      const results = await Promise.all(
        initialAssets.map((asset) =>
          fetchAssetData(asset.ticker, asset.decimals)
        )
      );
      return results;
    },
    staleTime: 60000, // Cache for 1 minute
  });

  const selectedAsset = useMemo(
    () =>
      allData?.find((asset) => asset.ticker === selectedAssetPair.ticker) ||
      null,
    [allData, selectedAssetPair]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = debounce(
        () => setWindowWidth(window.innerWidth),
        250
      );
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const getImageSource = useMemo(
    () => ({
      1:
        windowWidth < 640
          ? "/assets/vectors/vector1bis.svg"
          : "/assets/vectors/vector1.svg",
      2:
        windowWidth < 640
          ? "/assets/vectors/vector2bis.svg"
          : "/assets/vectors/vector2.svg",
    }),
    [windowWidth]
  );

  return (
    <div
      className={classNames(
        "relative w-full overflow-x-hidden",
        styles.bigScreen
      )}
    >
      <Hero />
      <BoxContainer>
        <MarqueeLogo />
      </BoxContainer>
      <BoxContainer>
        <BlurBox
          firstText="Price Feeds"
          title="The data your smart-contracts always wanted."
          generalText="Your smart contracts are decentralized, transparent and composable. The data you're using to feed them should have the same properties. Start integrating Pragma's price feed now and unlock the power of verifiable data."
          urlSvg={getImageSource[1]}
          textButton="Integrate Now"
          linkButton="https://docs.pragma.build/Resources/Consuming%20Data%20Feed"
        />
        <div className="flex h-full w-full flex-col gap-3 sm:gap-8">
          <ChartBox assetPair={selectedAsset} />
          <AssetBox
            assets={initialAssets}
            onAssetSelect={setSelectedAssetPair}
            data={
              allData?.sort((a, b) => a.ticker.localeCompare(b.ticker)) || []
            }
          />
        </div>
      </BoxContainer>
      <Suspense fallback={<div>Loading...</div>}>
        <BoxContainer>
          <CodeSnippet />
          <BlurBox
            firstText="Start Building"
            title="Integrate existing feeds, or build new ones."
            generalText="A few lines to integrate any existing data feed, a few more if you want to create a new feed using our raw data."
            urlSvg={getImageSource[2]}
            textButton="Start Building"
            linkButton="https://docs.pragma.build/Resources/Starknet/computational-feeds/what-are-computational-feeds"
          />
        </BoxContainer>
        <BoxContainer>
          <Architecture />
        </BoxContainer>
        <BoxContainer>
          <Testimonial />
        </BoxContainer>
        <Blog />
        <BoxContainer>
          <Events />
        </BoxContainer>
        <BoxContainer>
          <ReadyBox version={true} />
        </BoxContainer>
      </Suspense>
    </div>
  );
};

export default IndexPage;
