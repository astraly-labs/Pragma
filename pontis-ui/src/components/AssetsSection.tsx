import React, { useState } from "react";
import AssetCard from "./Asset/AssetCard";
import { AssetKeys } from "../hooks/oracle";
import { ChevronDownIcon } from "@heroicons/react/outline";

const SHOW_DEFAULT = 3;
const SHOW_STEP = 5;

/**
 * Returns the new number of assets to show. Never increments past the length of AssetKeys.
 * Uses SHOW_STEP to determine step size.
 * @param {number} curNum current number of assets displayed
 * @return {number} the incremented number to display
 */
function incrementShow(curNum: number): number {
  const newNum = curNum + SHOW_STEP;
  return newNum < AssetKeys.length ? newNum : AssetKeys.length;
}

const AssetsSection = () => {
  const [numToShow, setNumToShow] = useState<number>(SHOW_DEFAULT);

  const buttonStyle =
    "bg-slate-300 rounded-2xl px-4 py-2 text-slate-900 shadow-lg hover:shadow-xl cursor-pointer flex items-center";

  return (
    <div className="w-screen bg-white px-6 pb-40 sm:px-24 md:px-32">
      <div className="mx-auto flex max-w-3xl -translate-y-14 flex-col items-center space-y-16 sm:-translate-y-8">
        {AssetKeys.slice(0, numToShow).map((assetKey, index) => (
          <AssetCard assetKey={assetKey} key={index} />
        ))}
        {numToShow === AssetKeys.length ? (
          <div
            onClick={() => setNumToShow(SHOW_DEFAULT)}
            className={buttonStyle}
          >
            Show less
          </div>
        ) : (
          <div
            onClick={() => setNumToShow(incrementShow(numToShow))}
            className={buttonStyle}
          >
            Show more
            <ChevronDownIcon className="ml-2 h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetsSection;
