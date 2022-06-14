import React from "react";
import { AppProps } from "next/app";

import "../styles/index.css";
import PontisHeader from "../components/PontisHeader";
import PontisFooter from "../components/PontisFooter";
import { InjectedConnector, StarknetProvider } from "@starknet-react/core";
import Head from "next/head";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const connectors = [new InjectedConnector()];

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
        <div className="min-h-screen flex flex-col justify-start bg-white">
          {/* <PontisHeader /> */}
          <Component {...pageProps} />
          <PontisFooter />
        </div>
      </StarknetProvider>
    </div>
  );
};

export default MyApp;
