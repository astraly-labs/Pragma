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
import { Provider } from "starknet";
import Head from "next/head";
import NavHeader from "../components/Navigation/NavHeader";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const connectors = getInstalledInjectedConnectors();
  const provider = new Provider({
    rpc: {
      nodeUrl: "https://starknet-sepolia.public.blastapi.io",
      retries: 3,
    },
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // Needed because of the following bug: https://github.com/vercel/next.js/issues/9992
  const router = useRouter();

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
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
        titleTemplate="%s - Pragma - StarkNet Oracle"
        defaultTitle="Pragma - StarkNet Oracle"
        description="Pragma is the leading zk-native oracle, live on StarkNet with 20+ price feeds. Pragma makes data decentralized, transparent and composable."
        canonical="https://www.pragmaoracle.com"
        openGraph={{
          url: "https://www.pragmaoracle.com",
          title: "Pragma - StarkNet Oracle",
          description:
            "Pragma is the leading zk-native oracle, live on StarkNet with 20+ price feeds. Pragma makes data decentralized, transparent and composable.",
          images: [
            {
              url: "https://www.pragmaoracle.com/pragma-og-img.png",
              width: 1200,
              height: 630,
              alt: "Pragma",
              type: "image/png",
            },
          ],
          site_name: "Pragma",
        }}
        twitter={{
          site: "@pragmaoracle",
          cardType: "summary_large_image",
        }}
      />
      <StarknetProvider
        autoConnect
        connectors={connectors}
        defaultProvider={provider}
      >
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
