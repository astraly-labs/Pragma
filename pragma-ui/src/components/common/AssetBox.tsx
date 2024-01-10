import React from "react";
import styles from "./styles.module.scss";
import SearchBar from "../Navigation/SearchBar";

interface Asset {
  pair: string;
  lastPrice: number;
  var24h: number;
  var24hPercent: string;
}

interface AssetListProps {
  assets: Asset[];
  onAssetSelect: (assetPair: string) => void; // Define onAssetSelect function
}

const AssetBox: React.FC<AssetListProps> = ({ assets, onAssetSelect }) => {
  const handleAssetSelect = (assetPair) => {
    onAssetSelect(assetPair); // Pass the selected asset pair to the parent component
  };
  return (
    <div className={styles.assetBox}>
      <div className="flex w-full flex-col justify-between gap-2 pb-3 text-left text-3xl text-lightGreen sm:flex-row sm:items-center">
        Assets <SearchBar />
      </div>
      <div className="grid w-full grid-cols-4 gap-4 pr-2 font-mono text-xs text-LightGreenFooter">
        <div>Symbol</div> <div>Last</div> <div>24H</div> <div>24H%</div>
      </div>
      <div className="flex max-h-36 w-full flex-col overflow-auto pr-2">
        {assets.map((asset, index) => (
          <button
            key={index}
            className="grid w-full grid-cols-4 gap-4 border-t border-t-lightBlur py-2 font-mono text-xs text-lightGreen hover:opacity-50"
            onClick={() => handleAssetSelect(asset.pair)} // Call handleAssetSelect onClick
          >
            <td className="text-left">{asset.pair}</td>
            <td className="text-left">{asset.lastPrice}</td>
            <td className="text-left">{asset.var24h}</td>
            <td className="text-left">{asset.var24hPercent}%</td>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AssetBox;
