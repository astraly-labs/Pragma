import React from "react";
import { AssetKeyT } from "../../hooks/oracle";
import { getCurrency } from "../../../utils/mappings";

const DECIMALS_TO_SHOW = 5;

interface AssetCardPriceProps {
  price: number;
  assetKey: AssetKeyT;
}

const AssetCardPrice: React.FC<AssetCardPriceProps> = ({ price, assetKey }) => {
  const { src, alt } = getCurrency(assetKey);
  return (
    <>
      <div className="flex items-center">
        <img
          src={`/assets/currencies/${src}`}
          className="mr-2 h-6 w-6 md:mr-3"
          alt={alt}
        />
        <div className="inline font-sans">
          <span className="text-secondary inline text-lg tracking-wide sm:text-xl md:text-2xl">
            {Math.floor(price)}
          </span>
          <span className="text-secondary hidden sm:inline md:text-lg">
            {(price - Math.floor(price))
              .toFixed(DECIMALS_TO_SHOW)
              .toString()
              .slice(1)}
          </span>
        </div>
      </div>
    </>
  );
};

export default AssetCardPrice;
