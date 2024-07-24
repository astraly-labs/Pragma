import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

const AssetPerf = ({ asset, isAsset, loading }) => {
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
        {loading ? (
          <div className="my-auto  h-8 w-8 animate-pulse rounded-full bg-lightBlur"></div>
        ) : (
          <Image height={30} width={30} alt="AssetImage" src={asset.image} />
        )}
        {loading ? (
          <div className="flex flex-col text-lg text-lightGreen">
            <div className="my-auto mb-1 h-3 w-14 animate-pulse rounded-full bg-lightBlur"></div>{" "}
            <div className="my-auto h-2 w-8 animate-pulse rounded-full bg-lightBlur"></div>
          </div>
        ) : (
          <div className="text-md flex flex-col text-lightGreen">
            {isAsset
              ? asset.ticker
              : asset.name === "SKYNET_TRADING"
              ? "SKYNET"
              : asset.name}{" "}
            <div className="font-mono text-xs uppercase text-LightGreenFooter md:tracking-wider">
              {asset.type}
            </div>
          </div>
        )}
      </div>
      <div className="my-auto flex translate-x-3 flex-row gap-2 font-mono text-xs text-lightGreen md:tracking-wider">
        {loading ? (
          <div className=" my-auto h-3 w-24 animate-pulse rounded-full bg-lightBlur"></div>
        ) : (
          <div>{asset.lastUpdated}</div>
        )}
      </div>
      <div className="my-auto flex translate-x-2 flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
        {loading ? (
          <div className="my-auto h-3 w-14 animate-pulse rounded-full bg-lightBlur"></div>
        ) : (
          <div>{isAsset ? asset.sources : asset.type}</div>
        )}
      </div>
      <div className="my-auto flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
        {loading ? (
          <div className="my-auto h-3 w-20 animate-pulse rounded-full bg-lightBlur"></div>
        ) : (
          <>
            {isAsset ? "$" : ""}
            {isAsset
              ? Number.parseFloat(asset.price).toFixed(2)
              : asset.reputationScore}
          </>
        )}
      </div>
      {loading ? (
        <div className="my-auto h-3  w-12 animate-pulse rounded-full bg-lightBlur"></div>
      ) : isAsset ? (
        ""
      ) : (
        <div className="my-auto flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
          {asset.nbFeeds}
        </div>
      )}
      {loading ? (
        <div className="my-auto h-3  w-12 animate-pulse rounded-full bg-lightBlur"></div>
      ) : isAsset ? (
        ""
      ) : (
        <div className="my-auto flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
          {asset.dailyUpdates}
        </div>
      )}
      {loading ? (
        <div className="my-auto h-3  w-12 animate-pulse rounded-full bg-lightBlur"></div>
      ) : isAsset ? (
        ""
      ) : (
        <div className="my-auto flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
          {asset.totalUpdates}
        </div>
      )}
      {loading ? (
        <div className="my-auto h-3  w-12 animate-pulse rounded-full bg-lightBlur"></div>
      ) : isAsset ? (
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
      {loading ? (
        <div className="my-auto h-3  w-12 animate-pulse rounded-full bg-lightBlur"></div>
      ) : isAsset ? (
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

      {loading ? (
        <div className="my-auto h-3  w-12 animate-pulse rounded-full bg-lightBlur"></div>
      ) : isAsset ? (
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
      {loading ? (
        <div className="my-auto h-3  w-12 animate-pulse rounded-full bg-lightBlur"></div>
      ) : isAsset ? (
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
