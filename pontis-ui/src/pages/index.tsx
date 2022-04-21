import React, { useState } from "react";
import { StyledExternalLink } from "../components/StyledLink";
import { AssetKeyT, useOracleGetValue } from "../hooks/oracle";
import { getOracleAddress } from "../services/address.service";
import {
  buildExplorerUrlForAddress,
  networkId,
} from "../services/wallet.service";

const CurrentPrice = ({ assetKey }: { assetKey: AssetKeyT }) => {
  const { oracleResponse, loading, error } = useOracleGetValue(assetKey);

  return (
    <div className="text-8xl">
      {loading && oracleResponse === undefined ? (
        <div className="text-xl">Loading...</div>
      ) : oracleResponse !== undefined ? (
        <div className="inline">{oracleResponse.value.toFixed(4)}</div>
      ) : (
        <div>Error: {error}</div>
      )}
    </div>
  );
};

const AssetKeyPicker = ({
  selectedAssetKey,
  onKeyChange,
}: {
  selectedAssetKey: AssetKeyT;
  onKeyChange: (newKey: AssetKeyT) => void;
}) => {
  return (
    <div className="text-xl my-6">{selectedAssetKey.toLocaleUpperCase()}</div>
  );
};
const IndexPage = () => {
  const [currentKey, setCurrentKey] = useState<AssetKeyT>("eth/usd");

  const handleKeyChange = (newKey: AssetKeyT) => {
    setCurrentKey(newKey);
  };

  return (
    <div className="m-auto text-center">
      <CurrentPrice assetKey={currentKey} />
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
