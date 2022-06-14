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
    <section className="text-gray-900">
      <div className="container flex flex-col items-center p-8 mx-auto max-w-7xl border-t border-gray-400 sm:flex-row">
        <Link href="/">
          <a>
            <img src="/pontis-logo.svg" className="h-8" alt="Pontis Logo" />
          </a>
        </Link>
        <p className="mt-4 text-sm sm:pl-4 sm:mt-0 sm:ml-4 sm:border-l sm:border-gray-400">
          © {new Date().getFullYear()} - 42 Labs
        </p>
        <span className="inline-flex justify-center mt-4 space-x-5 sm:justify-start sm:mt-0 sm:ml-auto">
          <StyledExternalLink
            href={buildExplorerUrlForAddress(
              getOracleControllerAddress(networkId())
            )}
            target="_blank"
          >
            View on Voyager
          </StyledExternalLink>
        </span>
      </div>
    </section>
  );
};

export default PontisFooter;
