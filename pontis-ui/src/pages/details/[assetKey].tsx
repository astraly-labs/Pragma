import React from "react";
import { assetKeyToUrl, urlToAssetKey } from "../../../utils/encodeUrl";
import { AssetKeys, useOracleGetEntries } from "../../hooks/oracle";
import AssetCardName from "../../components/Asset/AssetCardName";
import SearchBar from "../../components/Navigation/SearchBar";

const Details = ({ assetKey }) => {
  useOracleGetEntries(assetKey);
  // In progress
  return (
    <div className="w-screen bg-white py-40 px-6 sm:px-24 md:px-32">
      <div className="mx-auto max-w-3xl md:grid md:grid-cols-3 md:gap-6">
        <div className="px-4 sm:px-0 md:col-span-1 md:place-self-start">
          <AssetCardName assetKey={assetKey} />
        </div>
        <div className="mt-5 flex flex-col space-y-10 overflow-hidden rounded-xl bg-slate-50 shadow-lg md:col-span-2 md:mt-0">
          <div className="grid grid-cols-2 gap-12 px-4 py-3 sm:px-6">
            <div className="text-xl text-slate-900">Price</div>
            <div className="text-xl text-slate-900">Last updated</div>
          </div>
          <div className="flex items-center justify-end bg-slate-300 px-4 py-3 sm:px-6">
            <SearchBar />
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
