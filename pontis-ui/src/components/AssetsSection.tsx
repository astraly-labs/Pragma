import React, { useState } from "react";
import { AssetCard } from "./Asset/AssetCard";
import { AssetKeys, AssetKeyT } from "../hooks/oracle";

const defaultShow = 5;

export const AssetsSection = () => {
  const [numToShow, setNumToShow] = useState<number>(defaultShow);

  return (
    <section className="pb-40 px-16 sm:px-24 md:px-32 bg-white w-screen">
      <div className="flex flex-col space-y-16 items-center -translate-y-24">
        {AssetKeys.slice(0, numToShow).map((assetKey, index) => (
          <AssetCard assetKey={assetKey} key={index} />
        ))}
      </div>
      <div onClick={() => setNumToShow(AssetKeys.length)}>Show more</div>
    </section>
  );
};
