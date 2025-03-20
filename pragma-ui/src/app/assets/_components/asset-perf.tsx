import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/Assets/styles.module.scss";
import { AssetInfo, DataProviderInfo } from "../_types";

type AssetPerfProps =
  | {
      asset: AssetInfo;
      isAsset: true;
      loading: boolean;
      currentSource?: string;
    }
  | {
      asset: DataProviderInfo;
      isAsset: false;
      loading: boolean;
      currentSource?: string;
    };

export const AssetPerf = ({
  asset,
  isAsset,
  loading,
  currentSource = "",
}: AssetPerfProps) => {
  const [priceChangeClass, setPriceChangeClass] = useState(styles.priceNormal);
  const prevPriceRef = useRef(isAsset ? asset?.price : 0);
  const [imageError, setImageError] = useState(false);

  // Check if we're using the API source
  const isApiSource = currentSource === "api";

  useEffect(() => {
    if (
      !loading &&
      isAsset &&
      asset?.price !== undefined &&
      prevPriceRef.current !== undefined
    ) {
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
  }, [asset, loading]);

  // Check if asset has an error
  const hasError = isAsset ? asset?.error !== undefined : undefined;
  const isUnsupported = isAsset ? asset?.isUnsupported === true : false;

  const renderIcon = () => {
    if (isAsset) {
      return Number(asset.variations.past1h) > 0
        ? "▲"
        : asset.variations.past1h === 0
        ? "-"
        : "▼";
    }
  };

  // For unsupported assets, we'll still show the asset but with error indicators
  return (
    <Link
      href={
        isAsset && !hasError
          ? `/asset/${encodeURIComponent(asset.ticker)}`
          : isAsset && hasError
          ? "#" // Disable link for unsupported assets
          : `/provider/${isAsset ? asset.ticker : asset.name}`
      }
      scroll={false}
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
          <div className="my-auto h-8 w-8 animate-pulse rounded-full bg-lightBlur" />
        ) : asset.image && !imageError ? (
          <Image
            height={30}
            width={30}
            alt="AssetImage"
            src={asset.image}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="my-auto h-8 w-8 rounded-full bg-lightBlur text-center inline-flex justify-center">
            <span className="self-center">
              {isAsset ? asset.ticker[0] : asset.name[0]}
            </span>
          </div>
        )}
        {loading ? (
          <div className="flex flex-col text-lg text-lightGreen">
            <div className="my-auto mb-1 h-3 w-14 animate-pulse rounded-full bg-lightBlur"></div>{" "}
            <div className="my-auto h-2 w-8 animate-pulse rounded-full bg-lightBlur"></div>
          </div>
        ) : (
          <div className="text-md flex flex-col text-lightGreen overflow-hidden text-ellipsis max-w-20">
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
              ? Number.parseFloat(String(asset.price)).toFixed(3)
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
                isAsset && Number(asset.variations.past1h) > 0
                  ? "text-mint"
                  : asset.variations.past1h === 0
                  ? "text-LightGreenFooter"
                  : "text-redDown",
                "my-auto flex flex-row gap-2 font-mono text-sm md:tracking-wider"
              )}
            >
              {renderIcon()} {asset.variations.past1h}%
            </div>
          ) : isAsset && hasError ? (
            <div className="my-auto flex flex-row gap-2 font-mono text-sm text-redDown md:tracking-wider">
              N/A
            </div>
          ) : (
            ""
          )}
          {loading ? (
            <div className="my-auto h-3  w-12 animate-pulse rounded-full bg-lightBlur" />
          ) : isAsset && !hasError ? (
            <div
              className={classNames(
                isAsset && Number(asset.variations.past24h) > 0
                  ? "text-mint"
                  : asset.variations.past24h === 0
                  ? "text-LightGreenFooter"
                  : "text-redDown",
                "my-auto flex flex-row gap-2 font-mono text-sm md:tracking-wider"
              )}
            >
              {renderIcon()}
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
                isAsset && Number(asset.variations.past7d) > 0
                  ? "text-mint"
                  : asset.variations.past7d === 0
                  ? "text-LightGreenFooter"
                  : "text-redDown",
                "my-auto flex flex-row gap-2 font-mono text-sm md:tracking-wider"
              )}
            >
              {renderIcon()}
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
