"use client";
import React from "react";
import { InjectedConnector } from "starknetkit/injected";
import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";
import { mainnet } from "@starknet-react/chains";
import { StarknetConfig, publicProvider } from "@starknet-react/core";

interface StarknetProviderProps {
  children: React.ReactNode;
  connectors?: any[];
}

export default function StarknetProvider({
  children,
  connectors = [
    new InjectedConnector({ options: { id: "braavos", name: "Braavos" } }),
    new InjectedConnector({ options: { id: "argentX", name: "Argent X" } }),
    new WebWalletConnector({ url: "https://web.argent.xyz" }),
    new ArgentMobileConnector(),
  ],
}: StarknetProviderProps) {
  return (
    <StarknetConfig
      chains={[mainnet]}
      provider={publicProvider()}
      connectors={connectors}
    >
      {children}
    </StarknetConfig>
  );
}
