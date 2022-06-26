import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { assetKeyToUrl, urlToAssetKey } from "../../../utils/encodeURL";
import AssetLogo from "../../components/Asset/AssetLogo";
import { AssetKeys, AssetKeyT } from "../../hooks/oracle";
import { SearchIcon } from "@heroicons/react/outline";
import AssetCardName from "../../components/Asset/AssetCardName";
import AssetCardPrice from "../../components/Asset/AssetCardPrice";
import AssetCardTime from "../../components/Asset/AssetCardTime";

const Details = ({ assetKey }) => {
  return (
    <div className="w-screen bg-white py-40 px-6 sm:px-24 md:px-32">
      {/* <div className="col-span-1 mx-auto flex max-w-xl flex-col items-center space-y-6 rounded-xl bg-slate-50 px-8 pb-12">
        <div className="-mt-8 rounded-xl bg-slate-300 p-3 text-slate-700 shadow-md">
          <AssetLogo assetKey={assetKey} className="h-6" />
        </div>
        <h4 className="text-xl font-medium text-slate-700 sm:text-2xl">
          {assetKey.toLocaleUpperCase()}
        </h4>
        <div className="grid grid-cols-2 gap-8">
          <div>Price</div>
          <div>1000.0000</div>
          <div>Last updated</div>
          <div>1:01 min</div>
        </div>
      </div>*/}
      <div className="mx-auto max-w-3xl md:grid md:grid-cols-3 md:gap-6">
        <div className="px-4 sm:px-0 md:col-span-1 md:place-self-start">
          <AssetCardName assetKey={assetKey} />
        </div>
        <div className="mt-5 flex flex-col space-y-10 overflow-hidden rounded-xl bg-slate-50 shadow-lg md:col-span-2 md:mt-0">
          <div className="grid grid-cols-2 gap-12 px-4 py-3 sm:px-6">
            <div className="text-xl text-slate-900">Price</div>
            {/* <AssetCardPrice price={1000.002} assetKey={assetKey} /> */}
            <div className="text-xl text-slate-900">Last updated</div>
            {/* <AssetCardTime lastUpdatedTimestamp={} /> */}
          </div>
          <div className="flex items-center justify-end bg-slate-300 px-4 py-3 sm:px-6">
            <div className="m-3 flex w-fit cursor-pointer items-center rounded-md bg-white shadow-md">
              <div className="flex items-center justify-center rounded-l-md px-3 py-2">
                <SearchIcon className="h-6 w-6 text-gray-500" />
              </div>
              <div className="rounded-r-md border-l border-slate-300 px-3 py-2 text-sm text-slate-400 sm:text-base">
                Search different assets...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const { assetKey } = params;
  const url = urlToAssetKey(assetKey);
  return {
    props: { assetKey: url },
  };
};

export const getStaticPaths = async () => {
  const encodedAssets = AssetKeys.map((assetKey) => assetKeyToUrl(assetKey));
  const paths = encodedAssets.map((assetKey) => ({ params: { assetKey } }));
  return {
    paths,
    fallback: false,
  };
};

export default Details;
