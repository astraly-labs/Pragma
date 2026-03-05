"use client";

import { ReactNode } from "react";
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { mainnet, Chain } from "@starknet-react/chains";
import { jsonRpcProvider, voyager, StarknetConfig } from "@starknet-react/core";

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
  function rpc(chain: Chain) {
    return {
      nodeUrl: `https://starknet-mainnet.public.blastapi.io/rpc/v0_7`,
    };
  }

  const queryClient = getQueryClient();
  const provider = jsonRpcProvider({ rpc });

  return (
    <QueryClientProvider client={queryClient}>
      <StarknetConfig chains={[mainnet]} provider={provider} explorer={voyager}>
        {children}
      </StarknetConfig>
    </QueryClientProvider>
  );
};
