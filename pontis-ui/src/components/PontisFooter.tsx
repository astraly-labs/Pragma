import React from "react";
import { getOracleControllerAddress } from "../services/address.service";
import {
  buildExplorerUrlForAddress,
  networkId,
} from "../services/wallet.service";
import { StyledExternalLink } from "./StyledLink";

const PontisFooter = () => {
  return (
    <div className="w-full py-6 mt-auto text-center text-lg">
      <StyledExternalLink
        href={buildExplorerUrlForAddress(
          getOracleControllerAddress(networkId())
        )}
        target="_blank"
      >
        View on Voyager
      </StyledExternalLink>
    </div>
  );
};

export default PontisFooter;
