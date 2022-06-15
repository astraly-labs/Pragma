import React, { useState } from "react";
import AssetCard from "./Asset/AssetCard";
import { AssetKeys } from "../hooks/oracle";

const SHOW_DEFAULT = 3;

const AssetsSection = () => {
  const [numToShow, setNumToShow] = useState<number>(SHOW_DEFAULT);

  const buttonStyle =
    "bg-slate-300 rounded-2xl px-4 py-2 text-slate-900 shadow-lg hover:shadow-xl cursor-pointer";

  return (
    <section className="pb-40 px-6 sm:px-24 md:px-32 bg-white w-screen">
      <div className="flex flex-col space-y-16 items-center -translate-y-8 max-w-3xl mx-auto">
        {AssetKeys.slice(0, numToShow).map((assetKey, index) => (
          <AssetCard assetKey={assetKey} key={index} />
        ))}
        {numToShow === SHOW_DEFAULT ? (
          <div
            onClick={() => setNumToShow(AssetKeys.length)}
            className={buttonStyle}
          >
            Show more
          </div>
        ) : (
          <div
            onClick={() => setNumToShow(SHOW_DEFAULT)}
            className={buttonStyle}
          >
            Show less
          </div>
        )}
      </div>
    </section>
  );
};

export default AssetsSection;
