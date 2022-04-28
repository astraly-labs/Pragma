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
        <title>Pontis</title>
        <meta name="robots" content="all" />
        <meta
          name="description"
          content="Pontis is the leading oracle on Starknet, built to empower native protocols to realize their ambitious potential.
          By being zk-first from the ground up, Pontis offers unique features and improvements over existing solutions."
        ></meta>
        <link rel="canonical" href="https://www.pontisoracle.xyz" />
      </Head>
      <StarknetProvider autoConnect connectors={connectors}>
        <div className="bg-fuchsia-800 bg-gradient-to-tr from-indigo-900 min-h-screen flex flex-col justify-start text-slate-200">
          <PontisHeader />
          <Component {...pageProps} />
          <PontisFooter />
        </div>
      </StarknetProvider>
    </div>
  );
};

export default MyApp;
