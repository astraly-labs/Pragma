import React, { useState } from "react";
import { useRouter } from "next/router";
import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";

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
    <>
      <Head>
        <meta name="robots" content="all" />
        <link rel="icon" type="image/ico" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#2151af" />
      </Head>
      <DefaultSeo
        title="Empiric Network | ZK-Oracle"
        description="Empiric Network is the first zk-native oracle, bringing the principles of DeFi to data infrastructure: decentralization, transparency and composability. Empiric is the leading oracle on Starknet, powered by high-quality data from the biggest market makers and exchanges, such as Alameda, CMT, Flow Traders, Gemini and Jane Street."
        canonical="https://www.empiric.network"
        openGraph={{
          url: "https://www.empiric.network",
          title: "Empiric Network | ZK-Oracle",
          description:
            "Empiric Network is the first zk-native oracle, bringing the principles of DeFi to data infrastructure: decentralization, transparency and composability. Empiric is the leading oracle on Starknet, powered by high-quality data from the biggest market makers and exchanges, such as Alameda, CMT, Flow Traders, Gemini and Jane Street.",
          images: [
            {
              url: "https://www.empiric.network/empiric-og-img.png",
              width: 1200,
              height: 630,
              alt: "Empiric Network",
              type: "image/png",
            },
          ],
          site_name: "Empiric Network",
        }}
        twitter={{
          site: "@EmpiricNetwork",
          cardType: "summary_large_image",
        }}
      />
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
    </>
  );
};

export default MyApp;
