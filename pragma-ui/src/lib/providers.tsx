"use client";

import { ReactNode } from "react";
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { sepolia, Chain } from "@starknet-react/chains";
import { jsonRpcProvider, voyager, StarknetConfig } from "@starknet-react/core";

import { usePathname } from "next/navigation";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        refetchOnWindowFocus: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export const Providers = ({ children }: { children: ReactNode }) => {
  /**
   * Generates RPC configuration for the specified chain.
   * @param {Chain} chain - The blockchain chain for which to generate RPC configuration.
   * @return {object} An object containing RPC configuration for the specified chain.
   */
  function rpc(chain: Chain) {
    return {
      nodeUrl: `https://starknet-sepolia.public.blastapi.io/rpc/v0_6`,
    };
  }

  const queryClient = getQueryClient();
  const provider = jsonRpcProvider({ rpc });

  return (
    <QueryClientProvider client={queryClient}>
      <StarknetConfig chains={[sepolia]} provider={provider} explorer={voyager}>
        {children}
      </StarknetConfig>
    </QueryClientProvider>
  );
};
