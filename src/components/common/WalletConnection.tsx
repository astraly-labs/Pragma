import React, { useState } from "react";
import { useConnect, useAccount, useDisconnect } from "@starknet-react/core";
import { useStarknetkitConnectModal } from "starknetkit";
import { Button } from "./Button";

/**
 * A wallet connection component
 * @component
 * @return {JSX.Element} The rendered component.
 */
export default function WalletConnection() {
  const { address, isConnected } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const { disconnect } = useDisconnect();
  const addressShort = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;
  const { connect, connectors } = useConnect();
  const toggleModal = () => setIsOpen(!isOpen);

  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors as any,
  });

  const connectWallet = async () => {
    try {
      const { connector } = await starknetkitConnectModal();
      if (connector) {
        await connect({ connector });
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };
  const onClick = () => {
    connectWallet();
    toggleModal();
  };
  return (
    <div>
      {!isConnected ? (
        <Button
          variant="solid"
          color="mint"
          center={false}
          onClick={() => onClick()}
        >
          Connect Wallet
        </Button>
      ) : (
        <Button
          onClick={() => {
            disconnect();
            toggleModal();
          }}
          variant="solid"
          color="grey"
          center={false}
        >
          {addressShort}
        </Button>
      )}
    </div>
  );
}
