import React, { createContext, useContext, useMemo, useState } from "react";
import { Network } from "../services/wallet.service";
import { Provider } from "starknet";

const NetworkContext = createContext(null);

const useNetwork = () => useContext(NetworkContext);

const NetworkProvider = ({ children }) => {
  // Use the useState hook to manage the network state
  const [network, setNetwork] = useState<Network>("goerli-alpha");
  const provider = useMemo(() => {
    return new Provider({
      sequencer: {
        baseUrl:
          network === "goerli-alpha"
            ? "https://alpha4.starknet.io"
            : "https://alpha-mainnet.starknet.io",
      },
    });
  }, [network]);

  // Toggle the network when called
  const toggleNetwork = () => {
    setNetwork((prevNetwork) =>
      prevNetwork === "goerli-alpha" ? "mainnet-alpha" : "goerli-alpha"
    );
  };

  return (
    // Provide the network state and toggleNetwork function to children
    <NetworkContext.Provider value={{ network, provider, toggleNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
};

export { NetworkProvider, useNetwork };
