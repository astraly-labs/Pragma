import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

const AssetPerf = ({ asset, isAsset, loading, currentSource = '' }) => {
  const [priceChangeClass, setPriceChangeClass] = useState(styles.priceNormal);
  const prevPriceRef = useRef(asset?.price);

  // Check if we're using the API source
  const isApiSource = currentSource === 'api';

  useEffect(() => {
    if (!loading && asset?.price !== undefined && prevPriceRef.current !== undefined) {
      if (asset.price > prevPriceRef.current) {
        setPriceChangeClass(styles.priceUp);
      } else if (asset.price < prevPriceRef.current) {
        setPriceChangeClass(styles.priceDown);
      }
      prevPriceRef.current = asset.price;

      // Reset to normal color after animation
      const timer = setTimeout(() => {
        setPriceChangeClass(styles.priceNormal);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [asset?.price, loading]);

  // Check if asset has an error
  const hasError = asset?.error !== undefined;
  const isUnsupported = asset?.isUnsupported === true;

  // For unsupported assets, we'll still show the asset but with error indicators
  return (
    <Link
      href={
        isAsset && !hasError
          ? `/asset/${encodeURIComponent(asset.ticker)}`
          : isAsset && hasError
          ? "#" // Disable link for unsupported assets
          : `/provider/${asset.name}`
      }
      className={classNames(
        isAsset ? styles.assetPerf : styles.dpPerf,
        hasError && "opacity-70", // Reduce opacity for error assets
        isApiSource && isAsset && styles.assetPerfApi // Add a class for API source
      )}
      onClick={(e) => {
        if (hasError && isAsset) {
          e.preventDefault(); // Prevent navigation for unsupported assets
        }
      }}
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
      <div className="my-auto flex flex-row gap-2 font-mono text-xs md:tracking-wider">
        {loading ? (
          <div className=" my-auto h-3 w-24 animate-pulse rounded-full bg-lightBlur"></div>
        ) : (
          <div className={isUnsupported ? "text-redDown" : "text-lightGreen"}>
            {asset.lastUpdated}
          </div>
        )}
      </div>
      <div className="my-auto flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
        {loading ? (
          <div className="my-auto h-3 w-14 animate-pulse rounded-full bg-lightBlur"></div>
        ) : (
          <div>{isAsset ? asset.sources : asset.type}</div>
        )}
      </div>
      <div className="my-auto flex flex-row gap-2 font-mono text-sm md:tracking-wider">
        {loading ? (
          <div className="my-auto h-3 w-20 animate-pulse rounded-full bg-lightBlur"></div>
        ) : isUnsupported ? (
          <div className="text-redDown">N/A</div>
        ) : (
          <div className={priceChangeClass}>
            {isAsset ? "$" : ""}
            {isAsset
              ? Number.parseFloat(asset.price).toFixed(2)
              : asset.reputationScore}
          </div>
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
      {/* Hide variation columns for API source */}
      {!isApiSource && (
        <>
          {loading ? (
            <div className="my-auto h-3  w-12 animate-pulse rounded-full bg-lightBlur"></div>
          ) : isAsset && !hasError ? (
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
          ) : isAsset && hasError ? (
            <div className="my-auto flex flex-row gap-2 font-mono text-sm text-redDown md:tracking-wider">
              N/A
            </div>
          ) : (
            ""
          )}
          {loading ? (
            <div className="my-auto h-3  w-12 animate-pulse rounded-full bg-lightBlur"></div>
          ) : isAsset && !hasError ? (
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
          ) : isAsset && hasError ? (
            <div className="my-auto flex flex-row gap-2 font-mono text-sm text-redDown md:tracking-wider">
              N/A
            </div>
          ) : (
            ""
          )}

          {loading ? (
            <div className="my-auto h-3  w-12 animate-pulse rounded-full bg-lightBlur"></div>
          ) : isAsset && !hasError ? (
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
          ) : isAsset && hasError ? (
            <div className="my-auto flex flex-row gap-2 font-mono text-sm text-redDown md:tracking-wider">
              N/A
            </div>
          ) : (
            ""
          )}
          {loading ? (
            <div className="my-auto h-3  w-12 animate-pulse rounded-full bg-lightBlur"></div>
          ) : isAsset && !hasError ? (
            <div className="my-auto flex flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              <Image height={50} width={150} alt="Chart" src={asset.chart} />
            </div>
          ) : isAsset && hasError ? (
            <div className="my-auto flex flex-row gap-2 font-mono text-sm text-redDown md:tracking-wider">
              N/A
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </Link>
  );
};

export default AssetPerf;
