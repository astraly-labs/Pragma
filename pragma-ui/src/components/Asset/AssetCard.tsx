import React, { useMemo } from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/outline";

import { AssetKeyT, useOracleGetValue } from "../../hooks/oracle";
import AssetCardName from "./AssetCardName";
import AssetCardPrice from "./AssetCardPrice";
import AssetCardTime from "./AssetCardTime";
import LoadingBar from "../common/LoadingBar";
import { assetKeyToUrl } from "../../../utils/encodeUrl";

/**
 * @param {AssetKeyT} assetKey
 * @return {string} display string of asset key
 */
export function assetKeyDisplayString(assetKey: AssetKeyT): string {
  return assetKey.toLocaleUpperCase();
}

interface AssetCardProps {
  assetKey: AssetKeyT;
}

const AssetCard: React.FC<AssetCardProps> = ({ assetKey }) => {
  const { oracleResponse, loading, error } = useOracleGetValue(assetKey);

  const content = useMemo(() => {
    if (error) {
      return (
        <div className="col-span-2 col-start-2 row-span-2 sm:row-span-1">
          <div>Error fetching price for {assetKeyDisplayString(assetKey)}.</div>
          <div>Please try again later.</div>
        </div>
      );
    }
    if (loading || !oracleResponse?.value) {
      return (
        <>
          <div className="place-self-center">
            <LoadingBar className="h-4 w-24" />
          </div>
          <div className="place-self-center">
            <LoadingBar className="h-4 w-24" />
          </div>
        </>
      );
    }
    if (oracleResponse?.lastUpdatedTimestamp === 0) {
      return <div>No results found for {assetKeyDisplayString(assetKey)}</div>;
    }
    return (
      <>
        <div className="col-span-1 col-start-2 row-span-2 row-start-1 flex items-start justify-end sm:row-span-1 sm:place-self-center">
          <AssetCardPrice price={oracleResponse.value} assetKey={assetKey} />
        </div>
        <div className="col-span-2 col-start-1 row-span-1 row-start-2 sm:col-span-1 sm:col-start-3 sm:row-start-1 sm:flex sm:items-center sm:justify-end">
          <AssetCardTime
            lastUpdatedTimestamp={oracleResponse.lastUpdatedTimestamp}
          />
        </div>
      </>
    );
  }, [oracleResponse, loading, error, assetKey]);

  return (
    <Link href={`/details/${assetKeyToUrl(assetKey)}`} className="w-full">
      <div
        style={{ boxShadow: "5px 5px 15px 5px #151414" }}
        className=" border-1 flex w-full cursor-pointer flex-row overflow-hidden rounded-lg  border-secondary bg-black shadow-lg hover:shadow-xl"
      >
        <div className="mx-4 grid w-full max-w-full grid-cols-2 grid-rows-2 gap-y-3 py-4 font-sans text-white sm:grid-cols-3 sm:grid-rows-1">
          <div className="col-span-1 row-span-1 place-self-start font-sans">
            <AssetCardName assetKey={assetKey} />
          </div>
          {content}
        </div>
        <div className="flex w-12 flex-row items-center justify-center bg-dark sm:w-16 md:w-24">
          <ChevronRightIcon className="w-8 text-grey" />
        </div>
      </div>
    </Link>
  );
};

export default AssetCard;
