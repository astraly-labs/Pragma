import React, { useMemo, useState } from "react";
import { ClockIcon } from "@heroicons/react/outline";
import AssetLogo from "../Asset/AssetLogo";
import DetailCard from "./DetailCard";
import LoadingBar from "../common/LoadingBar";
import { getCurrency } from "../Asset/AssetCardPrice";
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
    if (loading || !oracleResponse?.value) {
      return <LoadingBar className="my-4 !w-full" />;
    }
    if (error) {
      return <p className="text-lg font-normal">Error fetching price.</p>;
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
    if (loading || !oracleResponse?.value) {
      return <LoadingBar className="my-4 !w-full" />;
    }
    if (error) {
      return <p className="text-lg font-normal">Error fetching time.</p>;
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

  return (
    <div className="grid w-full max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <DetailCard
        label="Asset"
        description="The asset you asked for."
        toDisplay={<h3>{assetKeyDisplayString(assetKey)}</h3>}
        img={<AssetLogo assetKey={assetKey} className="h-5 w-5" />}
      />
      <DetailCard
        label="Price"
        description="This price was aggregated on chain using the data provided by our publishers. You can find the exact details in the table below."
        toDisplay={priceContent}
        img={
          <img
            src={`/assets/currencies/${getCurrency(assetKey)}`}
            className="h-5 w-5"
          />
        }
      />
      <DetailCard
        label="Last updated"
        description="This is the last time this price was updated on StarkNet. You might see bigger delays when StarkNet is slow in processing our requests."
        toDisplay={timeContent}
        img={<ClockIcon className="h-5 w-5 stroke-slate-700" />}
      />
    </div>
  );
};

export default DetailDisplay;
