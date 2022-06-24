import React from "react";

import { AssetKeyT } from "../../hooks/oracle";

// Mapping from asset key abbreviation to currency symbol.
const currencySymbols = {
  usd: "dollar.svg",
  mxn: "dollar.svg",
};

/**
 * Converts asset key into file name of currency symbol;
 * @param {AssetKeyT} assetKey
 * @return {string} file name of currency symbol
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

const AssetCardPrice: React.FC<AssetCardPriceProps> = ({ price, assetKey }) => (
  <>
    <div className="flex items-center">
      <img
        src={`/assets/currencies/${getCurrency(assetKey)}`}
        className="mr-2 h-6 w-6 md:mr-3"
      />
      <div className="inline font-mono">
        <span className="inline text-lg tracking-wide sm:text-xl md:text-2xl">
          {Math.floor(price)}
        </span>
        <span className="hidden sm:inline md:text-lg">
          {(price - Math.floor(price))
            .toFixed(DECIMALS_TO_SHOW)
            .toString()
            .slice(1)}
        </span>
      </div>
    </div>
  </>
);

export default AssetCardPrice;
