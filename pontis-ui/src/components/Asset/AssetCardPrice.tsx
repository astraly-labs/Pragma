import React from "react";

const DECIMALS_TO_SHOW = 5;

interface AssetCardPriceProps {
  price: number;
}

const AssetCardPrice: React.FC<AssetCardPriceProps> = ({ price }) => {
  return (
    <React.Fragment>
      {/* {loading || price === undefined ? (
        <div className="w-12 h-2 bg-slate-200 animate-pulse" />
      ) : ( */}
      <div className="inline font-mono">
        <div className="inline text-lg sm:text-xl md:text-2xl">
          {Math.floor(price)}
        </div>
        <div className="sm:inline md:text-lg">
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
