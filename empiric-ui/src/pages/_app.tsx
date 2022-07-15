import React, { useState } from "react";
import { useRouter } from "next/router";
import { AppProps } from "next/app";

import "../styles/index.css";
import NavFooter from "../components/Navigation/NavFooter";
import CommandPallate from "../components/Navigation/CommandPalette";
import { SearchContext } from "../providers/search";
import {
  StarknetProvider,
  getInstalledInjectedConnectors,
} from "@starknet-react/core";
import Head from "next/head";
import NavHeader from "../components/Navigation/NavHeader";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const connectors = getInstalledInjectedConnectors();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // Needed because of the following bug: https://github.com/vercel/next.js/issues/9992
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Empiric Network | ZK-Oracle</title>
        <meta name="robots" content="all" />
        <meta
          name="description"
          content="Empiric Network is the zk-native oracle, bringing the principles of DeFi to data infrastructure: decentralization, transparency and composability.
          Empiric is the leading oracle on Starknet, powered by high-quality data from the biggest market makers and exchanges, such as Alameda, CMT, Flow Traders, Gemini and Jane Street."
        ></meta>
        <link rel="canonical" href="https://www.empiric.network" />
        <link rel="icon" type="image/ico" href="/favicon.ico" />
      </Head>
      <StarknetProvider autoConnect connectors={connectors}>
        <div className="flex min-h-screen flex-col justify-start bg-white">
          <SearchContext.Provider value={setIsSearchOpen}>
            <NavHeader />
            <CommandPallate isOpen={isSearchOpen} />
            <Component {...pageProps} key={router.asPath} />
            <NavFooter />
          </SearchContext.Provider>
        </div>
      </StarknetProvider>
    </div>
  );
};

export default MyApp;
