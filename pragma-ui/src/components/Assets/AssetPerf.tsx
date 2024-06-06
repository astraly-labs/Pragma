import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

const AssetPerf = ({ asset, isAsset }) => {
  return (
    <Link
      href={
        isAsset
          ? `/asset/${encodeURIComponent(asset.ticker)}`
          : `/provider/${asset.name}`
      }
      className={classNames(isAsset ? styles.assetPerf : styles.dpPerf)}
    >
      <div className="my-auto flex flex-row gap-4 text-LightGreenFooter md:tracking-wider">
        <Image height={30} width={30} alt="AssetImage" src={asset.image} />
        <div className="flex flex-col text-lg text-lightGreen">
          {isAsset
            ? asset.ticker
            : asset.name === "SKYNET_TRADING"
            ? "SKYNET"
            : asset.name}{" "}
          <div className="font-mono text-xs uppercase text-LightGreenFooter md:tracking-wider">
            {asset.type}
          </div>
        </div>
      </div>
      <div className="my-auto flex flex-row gap-2 font-mono text-xs text-lightGreen md:tracking-wider">
        {asset.lastUpdated}
      </div>
      <div className="my-auto flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
        {isAsset ? asset.sources : asset.type}
      </div>
      <div className="my-auto flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
        {isAsset ? "$" : ""}
        {isAsset
          ? Number.parseFloat(asset.price).toFixed(2)
          : asset.reputationScore}
      </div>
      {isAsset ? (
        ""
      ) : (
        <div className="my-auto flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
          {asset.nbFeeds}
        </div>
      )}
      {isAsset ? (
        ""
      ) : (
        <div className="my-auto flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
          {asset.dailyUpdates}
        </div>
      )}
      {isAsset ? (
        ""
      ) : (
        <div className="my-auto flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
          {asset.totalUpdates}
        </div>
      )}
      {isAsset ? (
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
      ) : (
        ""
      )}
      {isAsset ? (
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
      ) : (
        ""
      )}
      {isAsset ? (
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
      ) : (
        ""
      )}
      {isAsset ? (
        <div className="my-auto flex flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
          <Image height={50} width={150} alt="Chart" src={asset.chart} />
        </div>
      ) : (
        ""
      )}
    </Link>
  );
};

export default AssetPerf;
