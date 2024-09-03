import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import {
  CheckCircleIcon,
  ExternalLinkIcon,
  InformationCircleIcon,
  XCircleIcon,
  XIcon,
} from "@heroicons/react/outline";

export type ToastType = "success" | "fail" | "information";

interface ToastProps {
  title: string;
  text: string;
  txHash?: string;
  networkType?: string;
  type?: ToastType;
}

const Toast: React.FC<ToastProps> = ({
  title,
  text,
  txHash,
  networkType,
  type = "success",
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const getExplorerUrl = (hash: string) => {
    const network = networkType === "mainnet" ? "mainnet" : "sepolia";
    return `https://${network}.starkscan.co/tx/${hash}`;
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 4000000);

    return () => clearTimeout(timeout);
  }, []);

  const handleCloseToast = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className={styles.toast}>
          <div className="flex w-full flex-row items-center gap-4 rounded-t-2xl bg-lightBlur px-5	py-3 sm:gap-10 md:gap-16">
            {type === "success" && (
              <div className="flex flex-row items-center justify-center gap-3">
                <CheckCircleIcon className="h-6 w-6 text-mint" />
                <h3 className=" text-lg tracking-wider text-mint">{title}</h3>
              </div>
            )}
            {type === "fail" && (
              <div className="flex flex-row items-center justify-center gap-3">
                <XCircleIcon className="h-6 w-6 text-redDown" />
                <h3 className=" text-lg tracking-wider text-redDown">
                  {title}
                </h3>
              </div>
            )}
            {type === "information" && (
              <div className="flex flex-row items-center justify-center gap-3">
                <InformationCircleIcon className="h-6 w-6 text-lightGreen" />
                <h3 className=" text-lg tracking-wider text-lightGreen">
                  {title}
                </h3>
              </div>
            )}
            <span className={styles.close} onClick={handleCloseToast}>
              {type === "success" && <XIcon className="h-5 w-5 text-mint" />}
              {type === "fail" && <XIcon className="h-5 w-5 text-redDown" />}
              {type === "information" && (
                <XIcon className="h-5 w-5 text-lightGreen" />
              )}
            </span>
          </div>
          <p className="px-5 py-5 text-sm tracking-wider text-lightGreen opacity-50">
            {text}
          </p>
          {txHash && txHash !== "" && (
            <a
              href={getExplorerUrl(txHash)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-t-md rounded-b-2xl border-t border-lightBlur hover:bg-xlightBlur"
            >
              <div className=" flex flex-row gap-1 px-5 py-4">
                <ExternalLinkIcon className="h-4 w-4 text-mint" />
                <div className=" block text-xs tracking-wider text-mint">
                  View transaction on explorer
                </div>
              </div>
            </a>
          )}
        </div>
      )}
    </>
  );
};

export default Toast;
