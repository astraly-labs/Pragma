import React from "react";
import { AppProps } from "next/app";

import "../styles/index.css";
import PontisHeader from "../components/PontisHeader";
import PontisFooter from "../components/PontisFooter";
import { InjectedConnector, StarknetProvider } from "@starknet-react/core";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const connectors = [new InjectedConnector()];

  return (
    <StarknetProvider autoConnect connectors={connectors}>
      <div className="bg-fuchsia-800 bg-gradient-to-tr from-indigo-900 min-h-screen flex flex-col justify-start text-slate-200">
        <PontisHeader />
        <Component {...pageProps} />
        <PontisFooter />
      </div>
    </StarknetProvider>
  );
};

export default MyApp;
