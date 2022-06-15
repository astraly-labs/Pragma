import React from "react";

import { AssetKeyT } from "../../hooks/oracle";

interface AssetNameProps {
  assetKey: AssetKeyT;
}

/**
 *
 * @param {string} assetKey string containing the coin abbreviation before a '/'
 * @return {string} returns string that matches corresponding file name in /assets/logos
 */
function getLogo(assetKey: string): string {
  const indexOfSlash = assetKey.indexOf("/");
  return indexOfSlash > 0 ? assetKey.slice(0, indexOfSlash).toLowerCase() : "";
}

const AssetName: React.FC<AssetNameProps> = ({ assetKey }) => {
  const logoString = getLogo(assetKey);
  return (
    <div className="flex flex-row items-center">
      <img
        src={`/assets/logos/${logoString}.svg`}
        alt={`${logoString} logo`}
        className="h-5 mr-2 md:mr-3"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = "/assets/logos/fallback.svg";
        }}
      />
      <span className="text-lg sm:text-xl md:text-2xl uppercase font-mono">
        {assetKey.toLocaleUpperCase()}
      </span>
    </div>
  );
};

export default AssetName;
