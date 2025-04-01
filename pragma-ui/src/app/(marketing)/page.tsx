"use client";

import React, { useEffect, useState, useMemo, Suspense } from "react";
import classNames from "classnames";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash"; // or implement your own debounce function
import { DEFAULT_ASSETS } from "@/lib/constants";
import { AssetT } from "@/app/(dashboard)/assets/_types";
import BoxContainer from "@/components/common/BoxContainer";
import Hero from "@/components/Landing/Hero";
import MarqueeLogo from "@/components/Landing/MarqueeLogo";
import BlurBox from "@/components/common/BlurBox";
import { ChartBox } from "@/components/common/ChartBox";
import AssetBox from "@/components/common/AssetBox";
import CodeSnippet from "@/components/Landing/CodeSnippet";
import Architecture from "@/components/Landing/Architecture";
import Testimonial from "@/components/Landing/Testimonial/Testimonial";
import Blog from "@/components/Landing/Blog/Blog";
import Events from "@/components/Landing/Events";
import ReadyBox from "@/components/common/ReadyBox";
import styles from "@/pages/styles.module.scss";
import { fetchAsset } from "./_helpers/fetch-asset";

const IndexPage = () => {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [selectedAssetPair, setSelectedAssetPair] = useState<AssetT>(
    DEFAULT_ASSETS[0]
  );

  const { data: allData } = useQuery({
    queryKey: ["assetData"],
    queryFn: async () => {
      const results = await Promise.all(
        DEFAULT_ASSETS.map((asset) => fetchAsset(asset.ticker, asset.decimals))
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
        windowWidth && windowWidth < 640
          ? "/assets/vectors/vector1bis.svg"
          : "/assets/vectors/vector1.svg",
      2:
        windowWidth && windowWidth < 640
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
          {selectedAsset && <ChartBox assetPair={selectedAsset} />}
          <AssetBox
            assets={DEFAULT_ASSETS}
            onAssetSelect={setSelectedAssetPair}
            data={
              allData?.sort((a, b) => a.ticker.localeCompare(b.ticker)) || []
            }
          />
        </div>
      </BoxContainer>
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
    </div>
  );
};

export default IndexPage;
