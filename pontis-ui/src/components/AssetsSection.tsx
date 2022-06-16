import React, { useState } from "react";
import AssetCard from "./Asset/AssetCard";
import { AssetKeys } from "../hooks/oracle";

const SHOW_DEFAULT = 3;

const AssetsSection = () => {
  const [numToShow, setNumToShow] = useState<number>(SHOW_DEFAULT);

  const buttonStyle =
    "bg-slate-300 rounded-2xl px-4 py-2 text-slate-900 shadow-lg hover:shadow-xl cursor-pointer";

  return (
    <section className="w-screen bg-white px-6 pb-40 sm:px-24 md:px-32">
      <div className="mx-auto flex max-w-3xl -translate-y-14 flex-col items-center space-y-16 sm:-translate-y-8">
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
