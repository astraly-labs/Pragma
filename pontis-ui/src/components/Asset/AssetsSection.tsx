import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import AssetCard from "./AssetCard";
import { AssetKeys } from "../../hooks/oracle";
import { Button } from "../common/Button";
import SearchBar from "../Navigation/SearchBar";

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

  return (
    <div className="flex w-full max-w-3xl -translate-y-14 flex-col items-center space-y-16 sm:-translate-y-8">
      {AssetKeys.slice(0, numToShow).map((assetKey, index) => (
        <AssetCard assetKey={assetKey} key={index} />
      ))}
      <div className="flex w-min flex-col items-center space-y-4 sm:w-full sm:flex-row sm:justify-between sm:space-y-0">
        <SearchBar />
        <div className="flex items-center">
          <Button
            variant="outline"
            color="slate"
            onClick={() => setNumToShow(incrementShow(numToShow))}
            icon={ChevronDownIcon}
            className="rounded-l-lg rounded-r-none"
            type="button"
            disabled={numToShow === AssetKeys.length}
          >
            More
          </Button>
          <Button
            variant="outline"
            color="slate"
            onClick={() => setNumToShow(SHOW_DEFAULT)}
            icon={ChevronUpIcon}
            className="rounded-r-lg rounded-l-none border-l-0"
            type="button"
            disabled={numToShow === SHOW_DEFAULT}
          >
            Less
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssetsSection;
