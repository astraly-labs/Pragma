import React from "react";

import { AssetKeyT } from "../../hooks/oracle";

// Mapping from asset key abbreviation to currency symbol.
const currencySymbols = {
  usd: "$",
  mxn: "$",
};

/**
 * Converts asset key into currency symbol;
 * @param {AssetKeyT} assetKey
 * @return {string} currency symbol
 */
function getCurrency(assetKey: AssetKeyT): string {
  const slashIndex = assetKey.indexOf("/");
  const dashIndex = assetKey.indexOf("-");
  const cur =
    dashIndex === -1
      ? assetKey.slice(slashIndex + 1)
      : assetKey.slice(slashIndex + 1, dashIndex);
  return currencySymbols[cur];
}

const DECIMALS_TO_SHOW = 5;

interface AssetCardPriceProps {
  price: number;
  assetKey: AssetKeyT;
}

const AssetCardPrice: React.FC<AssetCardPriceProps> = ({ price, assetKey }) => {
  return (
    <React.Fragment>
      {/* {loading || price === undefined ? (
        <div className="w-12 h-2 bg-slate-200 animate-pulse" />
      ) : ( */}
      <div className="inline font-mono">
        <div className="inline text-lg tracking-wide sm:text-xl md:text-2xl">
          {getCurrency(assetKey)}
          {Math.floor(price)}
        </div>
        <div className="hidden sm:inline md:text-lg">
          {(price - Math.floor(price))
            .toFixed(DECIMALS_TO_SHOW)
            .toString()
            .slice(1)}
        </div>
      </div>
      {/* )} */}
    </React.Fragment>
  );
};

export default AssetCardPrice;
