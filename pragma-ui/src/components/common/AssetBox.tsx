import React from "react";
import styles from "./styles.module.scss";
import SearchBar from "../Navigation/SearchBar";

interface Asset {
  pair: string;
  lastPrice: number;
  var24h: number;
  var24hPercent: number;
}

interface AssetListProps {
  assets: Asset[];
}

const AssetBox: React.FC<AssetListProps> = ({ assets }) => {
  return (
    <div className={styles.assetBox}>
      <div className="flex w-full flex-col	justify-between gap-2 pb-3 text-left text-3xl text-lightGreen sm:flex-row sm:items-center">
        Assets <SearchBar />
      </div>
      <div className="grid w-full grid-cols-4 gap-4 font-mono text-xs text-LightGreenFooter">
        <div>Symbol</div> <div>Last</div> <div>24H</div> <div>24H%</div>
      </div>
      <div className="flex max-h-36 w-full flex-col overflow-auto pr-2">
        {assets.map((asset, index) => (
          <div
            key={index}
            className="grid w-full grid-cols-4 gap-4 border-t border-t-lightBlur py-2 font-mono text-xs text-lightGreen"
          >
            <td>{asset.pair}</td>
            <td>{asset.lastPrice}</td>
            <td>{asset.var24h}</td>
            <td>{asset.var24hPercent}%</td>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetBox;
