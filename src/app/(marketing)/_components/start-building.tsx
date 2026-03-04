"use client";

import React, { useEffect, useState, useMemo } from "react";
import { debounce } from "lodash"; // or implement your own debounce function
import BlurBox from "@/components/common/BlurBox";

const StartBuilding = () => {
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
      firstText="Start Building"
      title="Integrate existing feeds, or build new ones."
      generalText="A few lines to integrate any existing data feed, a few more if you want to create a new feed using our raw data."
      urlSvg={getImageSource[2]}
      textButton="Start Building"
      linkButton="https://docs.pragma.build/Resources/Starknet/computational-feeds/what-are-computational-feeds"
    />
  );
};

export default StartBuilding;
