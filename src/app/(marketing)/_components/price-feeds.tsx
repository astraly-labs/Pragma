"use client";

import React, { useEffect, useState, useMemo, Suspense } from "react";
import { debounce } from "lodash"; // or implement your own debounce function
import BlurBox from "@/components/common/BlurBox";

export const PriceFeeds = () => {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

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
    <BlurBox
      firstText="Price Feeds"
      title="The data your smart-contracts always wanted."
      generalText="Your smart contracts are decentralized, transparent and composable. The data you're using to feed them should have the same properties. Start integrating Pragma's price feed now and unlock the power of verifiable data."
      urlSvg={getImageSource[1]}
      textButton="Integrate Now"
      linkButton="https://docs.pragma.build/Resources/Consuming%20Data%20Feed"
    />
  );
};
