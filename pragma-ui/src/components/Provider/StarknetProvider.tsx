"use client";
import React from "react";
import { InjectedConnector } from "starknetkit/injected";
import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";
import { mainnet, sepolia } from "@starknet-react/chains";
import { StarknetConfig, publicProvider } from "@starknet-react/core";

interface StarknetProviderProps {
  children: React.ReactNode;

  /**
   * An optional array of wallet connectors to be used for connecting to the Starknet network.
   * Defaults to a set of common connectors including InjectedConnector, WebWalletConnector, and ArgentMobileConnector.
   */
  connectors?: any[];
}

/**
 * A provider component for Starknet applications, wrapping child components with the necessary Starknet configuration.
 * It uses different wallet connectors to facilitate connections to Starknet.
 * @return {JSX.Element} The rendered provider.
 */
export default function StarknetProvider({
  children,
  connectors = [
    new InjectedConnector({ options: { id: "braavos", name: "Braavos" } }),
    new InjectedConnector({ options: { id: "argentX", name: "Argent X" } }),
    new WebWalletConnector({ url: "https://web.argent.xyz" }),
    new ArgentMobileConnector(),
  ],
}: StarknetProviderProps) {
  const chains = [sepolia, mainnet];

  return (
    <StarknetConfig
      chains={chains}
      provider={publicProvider()}
      connectors={connectors}
    >
      {children}
    </StarknetConfig>
  );
}
