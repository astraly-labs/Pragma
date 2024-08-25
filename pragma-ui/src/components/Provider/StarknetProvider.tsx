"use client";
import React from "react";
import { InjectedConnector } from "starknetkit/injected";
import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";
import { mainnet, sepolia } from "@starknet-react/chains";
import { CallData, byteArray } from 'starknet';
import { StarknetConfig, publicProvider } from "@starknet-react/core";

interface StarknetProviderProps {
    children: React.ReactNode;
    connectors?: any[];

}

export default function StarknetProvider({children, 
    connectors = [
        new InjectedConnector({ options: {id: "braavos", name: "Braavos" }}),
        new InjectedConnector({ options: {id: "argentX", name: "Argent X" }}),
        new WebWalletConnector({ url: "https://web.argent.xyz" }),
        new ArgentMobileConnector(),
    ]
}: StarknetProviderProps) {
    const chains = [sepolia,mainnet];

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