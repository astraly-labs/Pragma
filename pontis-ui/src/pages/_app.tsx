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
        <title>Pontis | The zk-Oracle</title>
        <meta name="robots" content="all" />
        <meta
          name="description"
          content="Pontis is the leading oracle on Starknet, built to empower native protocols to realize their ambitious potential.
          By being zk-first from the ground up, Pontis offers unique features and improvements over existing solutions."
        ></meta>
        <link rel="canonical" href="https://www.pontisoracle.xyz" />
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
