import React from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/outline";

import { AssetKeyT, useOracleGetValue } from "../../hooks/oracle";
import AssetCardName from "./AssetCardName";
import AssetCardPrice from "./AssetCardPrice";
import AssetCardTime from "./AssetCardTime";
import LoadingBar from "./LoadingBar";
import { assetKeyToUrl } from "../../../utils/encodeUrl";
<<<<<<< HEAD
=======

/**
 * @param {AssetKeyT} assetKey
 * @return {string} display string of asset key
 */
export function assetKeyDisplayString(assetKey: AssetKeyT): string {
  return assetKey.toLocaleUpperCase();
}
>>>>>>> ui-v1.0

interface AssetCardProps {
  assetKey: AssetKeyT;
}

const AssetCard: React.FC<AssetCardProps> = ({ assetKey }) => {
  const { oracleResponse, error } = useOracleGetValue(assetKey);
  return (
    <Link href={`/details/${assetKeyToUrl(assetKey)}`}>
      <a className="flex w-full cursor-pointer flex-row overflow-hidden rounded-lg bg-slate-50 shadow-lg hover:shadow-xl">
        <div className="mx-4 grid w-full max-w-full grid-cols-2 grid-rows-2 gap-y-3 py-4 text-slate-900 sm:grid-cols-3 sm:grid-rows-1">
          <div className="col-span-1 row-span-1 place-self-start">
            <AssetCardName assetKey={assetKey} />
          </div>
          {oracleResponse?.value !== undefined ? (
            oracleResponse.lastUpdatedTimestamp === 0 ? (
<<<<<<< HEAD
              <div>No results found for {assetKey.toLocaleUpperCase()}</div>
=======
              <div>No results found for {assetKeyDisplayString(assetKey)}</div>
>>>>>>> ui-v1.0
            ) : (
              <>
                <div className="col-span-1 col-start-2 row-span-2 row-start-1 flex items-start justify-end sm:row-span-1 sm:place-self-center">
                  <AssetCardPrice
                    price={oracleResponse.value}
                    assetKey={assetKey}
                  />
                </div>
                <div className="col-span-2 col-start-1 row-span-1 row-start-2 sm:col-span-1 sm:col-start-3 sm:row-start-1 sm:flex sm:items-center sm:justify-end">
                  <AssetCardTime
                    lastUpdatedTimestamp={oracleResponse.lastUpdatedTimestamp}
                  />
                </div>
              </>
            )
          ) : error !== undefined ? (
            <div className="col-span-2 col-start-2 row-span-2 sm:row-span-1">
              <div>
<<<<<<< HEAD
                Error fetching price for {assetKey.toLocaleUpperCase()}.
=======
                Error fetching price for {assetKeyDisplayString(assetKey)}.
>>>>>>> ui-v1.0
              </div>
              <div>Please try again later.</div>
            </div>
          ) : (
            <>
              <div className="place-self-center">
                <LoadingBar />
              </div>
              <div className="place-self-center">
                <LoadingBar />
              </div>
            </>
          )}
        </div>
        <div className="flex w-12 flex-row items-center justify-center bg-slate-300 sm:w-16 md:w-24">
          <ChevronRightIcon className="w-8 text-slate-900" />
        </div>
      </a>
    </Link>
  );
};

export default AssetCard;
