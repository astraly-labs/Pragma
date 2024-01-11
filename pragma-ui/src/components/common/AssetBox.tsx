import React from "react";
import styles from "./styles.module.scss";
import SearchBar from "../Navigation/SearchBar";

type PriceDataPoint = { time: string; value: number };

export interface AssetPair {
  ticker: string;
  lastPrice: number;
  variation24h: number;
  relativeVariation24h: number;
  priceData: PriceDataPoint[];
}

interface AssetBoxProps {
  assets: AssetPair[];
  onAssetSelect: (assetPair: AssetPair) => void;
}

const AssetBox: React.FC<AssetBoxProps> = ({ assets, onAssetSelect }) => {
  const handleAssetSelect = (assetPair: AssetPair) => {
    onAssetSelect(assetPair);
  };
  return (
    <div className={styles.assetBox}>
      <div className="flex w-full flex-col justify-between gap-2 pb-3 text-left text-3xl text-lightGreen sm:flex-row sm:items-center">
        Assets <SearchBar />
      </div>
      <div className="grid w-full grid-cols-4 gap-4 pr-2 font-mono text-xs text-LightGreenFooter">
        <div>Symbol</div> <div>Last</div> <div>24H</div> <div>24H%</div>
      </div>
      <div className="flex max-h-16 w-full flex-col overflow-auto pr-2">
        {assets.map((asset, index) => (
          <button
            key={index}
            className="grid w-full grid-cols-4 gap-4 border-t border-t-lightBlur py-2 font-mono text-xs text-lightGreen hover:opacity-50"
            onClick={() => handleAssetSelect(asset)} // Call handleAssetSelect onClick
          >
            <div className="text-left">{asset.ticker}</div>
            <div className="text-left">{asset.lastPrice}</div>
            <div className="text-left">{asset.variation24h}</div>
            <div className="text-left">{asset.relativeVariation24h}%</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AssetBox;
