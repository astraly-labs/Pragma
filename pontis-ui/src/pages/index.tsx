import React, { useState } from "react";
import AssetKeyPicker from "../components/AssetKeyPicker";
import CurrentPrice from "../components/CurrentPrice";
import { StyledExternalLink } from "../components/StyledLink";
import { AssetKeyT } from "../hooks/oracle";
import { getOracleAddress } from "../services/address.service";
import {
  buildExplorerUrlForAddress,
  networkId,
} from "../services/wallet.service";

const IndexPage = () => {
  const [currentKey, setCurrentKey] = useState<AssetKeyT>("eth/usd");

  const handleKeyChange = (newKey: AssetKeyT) => {
    setCurrentKey(newKey);
  };

  return (
    <div className="m-auto text-center text-xl">
      <CurrentPrice key={currentKey} assetKey={currentKey} />
      <AssetKeyPicker
        selectedAssetKey={currentKey}
        onKeyChange={handleKeyChange}
      />
      <StyledExternalLink
        href={buildExplorerUrlForAddress(getOracleAddress(networkId()))}
        target="_blank"
      >
        View on Voyager
      </StyledExternalLink>
    </div>
  );
};

export default IndexPage;
