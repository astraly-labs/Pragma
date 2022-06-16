import React from "react";

import { AssetKeyT } from "../../hooks/oracle";

/**
 *
 * @param {AssetKeyT} assetKey string containing the coin abbreviation before a '/'
 * @return {string} returns string that matches corresponding file name in /assets/logos
 */
function getLogo(assetKey: AssetKeyT): string {
  const indexOfSlash = assetKey.indexOf("/");
  return indexOfSlash > 0 ? assetKey.slice(0, indexOfSlash).toLowerCase() : "";
}

interface AssetNameProps {
  assetKey: AssetKeyT;
}

const AssetName: React.FC<AssetNameProps> = ({ assetKey }) => {
  const logoString = getLogo(assetKey);
  return (
    <div className="flex flex-row items-center">
      <img
        src={`/assets/currencies/${logoString}.svg`}
        alt={`${logoString} logo`}
        className="mr-2 h-5 md:mr-3"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          if (currentTarget.src !== "/assets/currencies/fallback.svg") {
            currentTarget.src = "/assets/currencies/fallback.svg";
          }
        }}
      />
      <span className="font-mono text-lg uppercase sm:text-xl md:text-2xl">
        {assetKey.toLocaleUpperCase()}
      </span>
    </div>
  );
};

export default AssetName;
