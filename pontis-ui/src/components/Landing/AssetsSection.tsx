import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import AssetCard from "../Asset/AssetCard";
import { AssetKeys } from "../../hooks/oracle";
import { Button } from "../common/Button";

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
      {numToShow === AssetKeys.length ? (
        <Button
          variant="solid"
          color="slate"
          onClick={() => setNumToShow(SHOW_DEFAULT)}
          icon={ChevronUpIcon}
        >
          Show less
        </Button>
      ) : (
        <Button
          variant="solid"
          color="slate"
          onClick={() => setNumToShow(incrementShow(numToShow))}
          icon={ChevronDownIcon}
        >
          Show more
        </Button>
      )}
    </div>
  );
};

export default AssetsSection;
