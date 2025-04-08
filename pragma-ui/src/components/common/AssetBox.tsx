"use client";

import React, { useState } from "react";
import styles from "./styles.module.scss";
import SearchBar from "../Navigation/SearchBar";
import { UTCTimestamp } from "lightweight-charts";

type PriceDataPoint = { time: UTCTimestamp; value: number };

export interface AssetPair {
  ticker: string;
  lastPrice: number;
  variation24h: number;
  relativeVariation24h: number;
  priceData: PriceDataPoint[];
}

export interface AssetT {
  ticker: string;
  address: string;
  decimals: number;
}

interface AssetBoxProps {
  assets: AssetT[];
  onAssetSelect: (assetPair: AssetT) => void;
  data: AssetPair[];
}

const AssetBox = ({ assets, onAssetSelect, data }: AssetBoxProps) => {
  const handleAssetSelect = (assetPair: AssetT) => {
    onAssetSelect(assetPair);
  };

  const [filteredValue, setFilteredValue] = useState("");

  const handleInputChange = (value: string) => {
    setFilteredValue(value);
  };

  const filteredAssets = assets.filter((asset) =>
    asset.ticker.toLowerCase().includes(filteredValue.toLowerCase())
  );

  return (
    <div className={styles.assetBox}>
      <h4 className="flex w-full flex-col justify-between gap-2 pb-3 text-left text-lightGreen sm:flex-row sm:items-center">
        Assets <SearchBar onInputChange={handleInputChange} />
      </h4>
      <div className="grid w-full grid-cols-4 gap-4 pr-2 font-mono text-xs text-LightGreenFooter">
        <div>Symbol</div> <div>Last</div> <div>24H</div> <div>24H%</div>
      </div>
      <div className="flex max-h-16 w-full flex-col overflow-auto pr-2">
        {filteredAssets
          ?.sort((a, b) => a.ticker.localeCompare(b.ticker))
          .map((asset, index) => (
            <button
              key={index}
              className="grid w-full grid-cols-4 gap-4 border-t border-t-lightBlur py-2 font-mono text-xs text-lightGreen transition-opacity duration-300 hover:opacity-50"
              onClick={() => handleAssetSelect(asset)} // Call handleAssetSelect onClick
            >
              <div className="text-left">{asset.ticker}</div>
              <div className="text-left">
                {data
                  ? (data[index]?.lastPrice / 10 ** asset.decimals).toFixed(3)
                  : 0}
              </div>
              <div className="text-left">
                {data
                  ? (data[index]?.variation24h / 10 ** asset.decimals).toFixed(
                      5
                    )
                  : 0}
              </div>
              <div className="text-left">
                {data ? data[index]?.relativeVariation24h.toFixed(3) : 0}%
              </div>
            </button>
          ))}
        {filteredAssets.length === 0 ? (
          <div className="py-2 font-mono text-xs text-lightGreen">
            No assets for your search
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default AssetBox;
