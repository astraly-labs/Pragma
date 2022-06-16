import React from "react";
import Link from "next/link";
import { getOracleControllerAddress } from "../services/address.service";
import {
  buildExplorerUrlForAddress,
  networkId,
} from "../services/wallet.service";
import { StyledExternalLink } from "./StyledLink";

const PontisFooter = () => {
  return (
    <section className="container mx-auto flex max-w-7xl flex-col items-center border-t border-gray-400 p-8 sm:flex-row">
      <Link href="/">
        <a>
          <img src="/pontis-logo.svg" className="h-8" alt="Pontis Logo" />
        </a>
      </Link>
      <p className="mt-4 text-sm sm:mt-0 sm:ml-4 sm:border-l sm:border-gray-400 sm:pl-4">
        © 42 Labs - {new Date().getFullYear()}
      </p>
      <span className="mt-4 inline-flex justify-center space-x-5 sm:mt-0 sm:ml-auto sm:justify-start">
        <StyledExternalLink
          href={buildExplorerUrlForAddress(
            getOracleControllerAddress(networkId())
          )}
          target="_blank"
        >
          View on Voyager
        </StyledExternalLink>
      </span>
    </section>
  );
};

export default PontisFooter;
