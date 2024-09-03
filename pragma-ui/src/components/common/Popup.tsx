import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import {
  ArrowCircleUpIcon,
  ArrowsExpandIcon,
  ExternalLinkIcon,
} from "@heroicons/react/outline";

interface PopupProps {
  title: string;
  text: string;
  txHash?: string;
  networkType?: string;
}

const PopupComponent: React.FC<PopupProps> = ({
  title,
  text,
  txHash,
  networkType,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const getExplorerUrl = (hash: string) => {
    const network = networkType === "mainnet" ? "mainnet" : "sepolia";
    return `https://${network}.starkscan.co/tx/${hash}`;
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  const handleClosePopup = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className={styles.popup}>
          <span className={styles.close} onClick={handleClosePopup}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </span>
          <h3 className="pb-5 text-lg text-lightGreen">{title}</h3>
          <p className="text-xs text-lightGreen opacity-50">{text}</p>
          {txHash && txHash !== "" && (
            <div className="mt-3 flex flex-row gap-1 hover:underline">
              <ExternalLinkIcon className="h-4 w-4 text-mint" />
              <a
                href={getExplorerUrl(txHash)}
                target="_blank"
                rel="noopener noreferrer"
                className=" block text-xs text-mint"
              >
                View transaction on explorer
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PopupComponent;
