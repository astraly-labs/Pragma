import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/Assets/styles.module.scss";
import { DataProviderInfo } from "@/app/assets/_types";
import { getPublisherType } from "@/app/assets/_helpers/getPublisherType";

type PublisherRowProps = {
  publisher: DataProviderInfo;
  loading: boolean;
  currentSource?: string;
};

export const PublisherRow = ({
  publisher,
  loading,
  currentSource = "",
}: PublisherRowProps) => {
  const [priceChangeClass] = useState(styles.priceNormal);
  const [imageError, setImageError] = useState(false);

  // Check if we're using the API source
  const isApiSource = currentSource === "api";

  // Check if asset has an error
  const hasError = undefined;
  const isUnsupported = false;

  // For unsupported assets, we'll still show the asset but with error indicators
  return (
    <Link
      href={`/provider/${publisher.name}`}
      scroll={false}
      className={classNames(styles.dpPerf, hasError && "opacity-70")}
    >
      <div className="my-auto flex flex-row gap-4 text-LightGreenFooter md:tracking-wider">
        {loading ? (
          <div className="my-auto h-8 w-8 animate-pulse rounded-full bg-lightBlur" />
        ) : publisher.image && !imageError ? (
          <Image
            height={30}
            width={30}
            alt="AssetImage"
            src={publisher.image}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="my-auto size-8 rounded-full bg-lightBlur text-center inline-flex justify-center">
            <span className="self-center">{publisher.name[0]}</span>
          </div>
        )}
        {loading ? (
          <div className="flex flex-col text-lg text-lightGreen">
            <div className="my-auto mb-1 h-3 w-14 animate-pulse rounded-full bg-lightBlur"></div>{" "}
            <div className="my-auto h-2 w-8 animate-pulse rounded-full bg-lightBlur"></div>
          </div>
        ) : (
          <div className="text-md flex flex-col text-lightGreen">
            {publisher.name === "SKYNET_TRADING" ? "SKYNET" : publisher.name}{" "}
            <div className="font-mono text-xs uppercase text-LightGreenFooter md:tracking-wider">
              {publisher.type}
            </div>
          </div>
        )}
      </div>
      <div className="my-auto flex flex-row gap-2 font-mono text-xs md:tracking-wider">
        {loading ? (
          <div className=" my-auto h-3 w-24 animate-pulse rounded-full bg-lightBlur"></div>
        ) : (
          <div className={isUnsupported ? "text-redDown" : "text-lightGreen"}>
            {formatDistanceToNow(
              new Date(Number(publisher.lastUpdated) * 1000),
              { addSuffix: true }
            )}
          </div>
        )}
      </div>
      <div className="my-auto flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
        {loading ? (
          <div className="my-auto h-3 w-14 animate-pulse rounded-full bg-lightBlur"></div>
        ) : (
          <div>{getPublisherType(Number(publisher.type))}</div>
        )}
      </div>
      <div className="my-auto flex flex-row gap-2 font-mono text-sm md:tracking-wider">
        {loading ? (
          <div className="my-auto h-3 w-20 animate-pulse rounded-full bg-lightBlur"></div>
        ) : isUnsupported ? (
          <div className="text-redDown">N/A</div>
        ) : (
          <div className={priceChangeClass}>{publisher.reputationScore}</div>
        )}
      </div>
      {loading ? (
        <div className="my-auto h-3  w-12 animate-pulse rounded-full bg-lightBlur"></div>
      ) : (
        <div className="my-auto flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
          {publisher.nbFeeds}
        </div>
      )}
      {loading ? (
        <div className="my-auto h-3  w-12 animate-pulse rounded-full bg-lightBlur"></div>
      ) : (
        <div className="my-auto flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
          {publisher.dailyUpdates}
        </div>
      )}
      {loading ? (
        <div className="my-auto h-3  w-12 animate-pulse rounded-full bg-lightBlur"></div>
      ) : (
        <div className="my-auto flex flex-row gap-2 font-mono text-sm text-lightGreen md:tracking-wider">
          {publisher.totalUpdates}
        </div>
      )}
    </Link>
  );
};
