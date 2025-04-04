import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/Assets/styles.module.scss";
import { AssetInfo } from "@/app/(dashboard)/assets/_types";

type AssetRowProps = {
  asset: AssetInfo;
  loading: boolean;
  currentSource?: string;
};

export const AssetRow = ({
  asset,
  loading,
  currentSource = "",
}: AssetRowProps) => {
  const [priceChangeClass, setPriceChangeClass] = useState(styles.priceNormal);
  const prevPriceRef = useRef(asset.price);
  const [imageError, setImageError] = useState(false);

  const isApiSource = currentSource === "api";

  useEffect(() => {
    if (
      !loading &&
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

  const hasError = asset?.error !== undefined;
  const isUnsupported = asset?.isUnsupported;

  const renderIcon = (value: number) => {
    return value > 0 ? "▲" : value === 0 ? "-" : "▼";
  };

  return (
    <Link
      href={
        !hasError
          ? `/asset/${encodeURIComponent(asset.ticker).replace(
              "%2F",
              "-"
            )}?network=mainnet`
          : hasError
          ? "#"
          : `/provider/${asset.ticker}`
      }
      prefetch
      className={classNames(
        styles.assetPerf,
        hasError && "opacity-70",
        isApiSource && styles.assetPerfApi
      )}
      onClick={(e) => {
        if (hasError) {
          e.preventDefault();
        }
      }}
    >
      <div className="my-auto flex flex-row gap-4 text-LightGreenFooter md:tracking-wider">
        {/* Avatar: Keep fixed 8x8 */}
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
          <div className="flex-none h-8 w-8 rounded-full bg-lightBlur flex items-center justify-center text-sm">
            <span>{asset.ticker[0]}</span>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col text-lg text-lightGreen">
            <div className="my-auto mb-1 h-3 w-14 animate-pulse rounded-full bg-lightBlur" />
            <div className="my-auto h-2 w-8 animate-pulse rounded-full bg-lightBlur" />
          </div>
        ) : (
          <div className="flex flex-col text-lightGreen flex-shrink min-w-0">
            <span className="text-md font-medium truncate">{asset.ticker}</span>
            <span className="font-mono text-xs uppercase text-LightGreenFooter md:tracking-wider">
              {asset.type}
            </span>
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
          <div>{asset.sources}</div>
        )}
      </div>
      <div className="my-auto flex flex-row gap-2 font-mono text-sm md:tracking-wider">
        {loading ? (
          <div className="my-auto h-3 w-20 animate-pulse rounded-full bg-lightBlur"></div>
        ) : isUnsupported ? (
          <div className="text-redDown">N/A</div>
        ) : (
          <div className={priceChangeClass}>
            ${Number.parseFloat(String(asset.price)).toFixed(5)}
          </div>
        )}
      </div>
      {!isApiSource && (
        <>
          {loading ? (
            <div className="my-auto h-3  w-12 animate-pulse rounded-full bg-lightBlur"></div>
          ) : !hasError ? (
            <div
              className={classNames(
                Number(asset.variations.past1h) > 0
                  ? "text-mint"
                  : asset.variations.past1h === 0
                  ? "text-LightGreenFooter"
                  : "text-redDown",
                "my-auto flex flex-row gap-2 font-mono text-sm md:tracking-wider"
              )}
            >
              {renderIcon(Number(asset.variations.past1h))}{" "}
              {asset.variations.past1h}%
            </div>
          ) : hasError ? (
            <div className="my-auto flex flex-row gap-2 font-mono text-sm text-redDown md:tracking-wider">
              N/A
            </div>
          ) : null}
          {loading ? (
            <div className="my-auto h-3  w-12 animate-pulse rounded-full bg-lightBlur" />
          ) : !hasError ? (
            <div
              className={classNames(
                Number(asset.variations.past24h) > 0
                  ? "text-mint"
                  : asset.variations.past24h === 0
                  ? "text-LightGreenFooter"
                  : "text-redDown",
                "my-auto flex flex-row gap-2 font-mono text-sm md:tracking-wider"
              )}
            >
              {renderIcon(Number(asset.variations.past24h))}
              {asset.variations.past24h}%
            </div>
          ) : hasError ? (
            <div className="my-auto flex flex-row gap-2 font-mono text-sm text-redDown md:tracking-wider">
              N/A
            </div>
          ) : null}

          {loading ? (
            <div className="my-auto h-3  w-12 animate-pulse rounded-full bg-lightBlur"></div>
          ) : !hasError ? (
            <div
              className={classNames(
                Number(asset.variations.past7d) > 0
                  ? "text-mint"
                  : asset.variations.past7d === 0
                  ? "text-LightGreenFooter"
                  : "text-redDown",
                "my-auto flex flex-row gap-2 font-mono text-sm md:tracking-wider"
              )}
            >
              {renderIcon(Number(asset.variations.past7d))}
              {asset.variations.past7d}%
            </div>
          ) : hasError ? (
            <div className="my-auto flex flex-row gap-2 font-mono text-sm text-redDown md:tracking-wider">
              N/A
            </div>
          ) : null}
          {loading ? (
            <div className="my-auto h-3  w-12 animate-pulse rounded-full bg-lightBlur"></div>
          ) : !hasError ? (
            <div className="my-auto flex flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              <Image height={50} width={150} alt="Chart" src={asset.chart} />
            </div>
          ) : hasError ? (
            <div className="my-auto flex flex-row gap-2 font-mono text-sm text-redDown md:tracking-wider">
              N/A
            </div>
          ) : null}
        </>
      )}
    </Link>
  );
};
