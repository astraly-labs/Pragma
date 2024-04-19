import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

const AssetPerf = ({ asset, isAsset }) => {
  return (
    <div className={classNames(styles.assetPerf)}>
      <div className="my-auto flex flex-row gap-4 text-LightGreenFooter md:tracking-wider">
        <img alt="AssetImage" src={asset.image} />
        <div className="flex flex-col text-lg text-lightGreen">
          {asset.ticker}{" "}
          <div className="font-mono text-xs uppercase text-LightGreenFooter md:tracking-wider">
            {asset.type}
          </div>
        </div>
      </div>
      <div className="my-auto flex flex-row gap-2 font-mono text-xs text-lightGreen md:tracking-wider">
        {asset.lastUpdated}
      </div>
      <div className="my-auto flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
        {asset.sources}
      </div>
      <div className="my-auto flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
        ${asset.price}
      </div>
      <div
        className={classNames(
          asset.variations.past1h > 0
            ? "text-mint"
            : asset.variations.past1h === 0
            ? "text-LightGreenFooter"
            : "text-redDown",
          "my-auto flex flex-row gap-2 font-mono text-sm md:tracking-wider"
        )}
      >
        {asset.variations.past1h > 0
          ? "▲"
          : asset.variations.past1h === 0
          ? "-"
          : "▼"}{" "}
        {asset.variations.past1h}%
      </div>
      <div
        className={classNames(
          asset.variations.past24h > 0
            ? "text-mint"
            : asset.variations.past24h === 0
            ? "text-LightGreenFooter"
            : "text-redDown",
          "my-auto flex flex-row gap-2 font-mono text-sm md:tracking-wider"
        )}
      >
        {asset.variations.past24h > 0
          ? "▲"
          : asset.variations.past24h === 0
          ? "-"
          : "▼"}{" "}
        {asset.variations.past24h}%
      </div>
      <div
        className={classNames(
          asset.variations.past7d > 0
            ? "text-mint"
            : asset.variations.past7d === 0
            ? "text-LightGreenFooter"
            : "text-redDown",
          "my-auto flex flex-row gap-2 font-mono text-sm md:tracking-wider"
        )}
      >
        {asset.variations.past7d > 0
          ? "▲"
          : asset.variations.past7d === 0
          ? "-"
          : "▼"}{" "}
        {asset.variations.past7d}%
      </div>
      <div className="my-auto flex flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
        <img alt="Chart" src={asset.chart} />
      </div>
    </div>
  );
};

export default AssetPerf;
