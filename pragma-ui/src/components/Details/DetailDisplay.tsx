import React, { useMemo, useState } from "react";
import { ClockIcon } from "@heroicons/react/outline";
import AssetLogo from "../Asset/AssetLogo";
import DetailCard from "./DetailCard";
import LoadingBar from "../common/LoadingBar";
import { getCurrency } from "../../../utils/mappings";
import { assetKeyDisplayString } from "../Asset/AssetCard";
import { GetValueResponseT } from "../../hooks/oracle";
import { timeSinceUpdate } from "../../../utils/display";

const DECIMALS_TO_SHOW = 10;

interface DetailDisplayProps {
  assetKey: string;
  oracleResponse: GetValueResponseT;
  loading: boolean;
  error: string;
}

const DetailDisplay: React.FC<DetailDisplayProps> = ({
  assetKey,
  oracleResponse,
  loading,
  error,
}) => {
  const priceContent = useMemo(() => {
    if (error) {
      return <p className="text-lg font-normal">Error fetching price.</p>;
    }
    if (loading || !oracleResponse?.value) {
      return <LoadingBar className="my-4 h-4 w-32" />;
    }
    const price = oracleResponse.value;
    return (
      <>
        <span className="">{Math.floor(price)}</span>
        <span className="text-lg sm:text-xl lg:text-2xl">
          {(price - Math.floor(price))
            .toFixed(DECIMALS_TO_SHOW)
            .toString()
            .slice(1)}
        </span>
      </>
    );
  }, [oracleResponse, loading, error]);

  const getCurrentTimestampSeconds = () =>
    Math.round(new Date().getTime() / 1000);

  const [currentTimestampSeconds, setCurrentTimestampSeconds] =
    useState<number>(getCurrentTimestampSeconds());

  const updateCurrentTimestampSeconds = () => {
    setCurrentTimestampSeconds(getCurrentTimestampSeconds());
  };

  setInterval(updateCurrentTimestampSeconds, 1000);

  const timeContent = useMemo(() => {
    if (error) {
      return <p className="text-lg font-normal">Error fetching time.</p>;
    }
    if (loading || !oracleResponse?.value) {
      return <LoadingBar className="my-4 h-4 w-32" />;
    }
    const { minutesSinceUpdate, secondsSinceUpdate } = timeSinceUpdate(
      currentTimestampSeconds,
      oracleResponse.lastUpdatedTimestamp
    );
    return (
      <>
        {minutesSinceUpdate}:{secondsSinceUpdate < 10 && "0"}
        {secondsSinceUpdate}
        <span className="text-lg sm:text-xl lg:text-2xl"> min</span>
      </>
    );
  }, [oracleResponse, loading, error, currentTimestampSeconds]);

  const { src: currencySrc, alt: currencyAlt } = getCurrency(assetKey);

  return (
    <div className="grid w-full max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-12">
      <DetailCard
        label="Asset"
        description="The asset you asked for."
        toDisplay={<h3>{assetKeyDisplayString(assetKey)}</h3>}
        img={<AssetLogo assetKey={assetKey} className="h-6 w-6" />}
      />
      <DetailCard
        label="Price"
        description="This price was aggregated on chain using the data provided by our publishers. You can find the exact details in the table below."
        toDisplay={priceContent}
        img={
          <img
            src={`/assets/currencies/${currencySrc}`}
            className="h-6·w-6·invert-60"
            alt={currencyAlt}
          />
        }
      />
      <DetailCard
        label="Last updated"
        description="This is the last time this price was updated on StarkNet. You might see bigger delays when StarkNet is slow in processing our requests."
        toDisplay={timeContent}
        img={<ClockIcon className="h-6 w-6 stroke-grey" />}
      />
    </div>
  );
};

export default DetailDisplay;
