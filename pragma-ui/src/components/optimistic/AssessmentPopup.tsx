import React, { useState, useEffect, useRef } from "react";
import { XIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { ClockIcon, InformationCircleIcon } from "@heroicons/react/outline";
import { Item } from "../../pages/optimistic";
import axios from "axios";
import {
  useAccount,
  useContractWrite,
  useContractRead,
  useNetwork,
} from "@starknet-react/core";
import {
  OO_CONTRACT_ADDRESS,
  CURRENCIES,
  ORACLE_ANCILLARY_ADDRESS,
} from "../../utils/constants";
import { uint256 } from "starknet";
import WalletConnection from "../common/WalletConnection";
import AncillaryABI from "../../abi/Ancillary.json";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { findCurrencyNameByAddress, utcToLocalTime } from "../../utils";
import Toast, { ToastType } from "../common/Toast";

interface AssessmentPopupProps {
  assessment: Item; // Replace 'any' with your actual Assessment type
  onClose: () => void;
  network: string;
}

interface ResolutionDetails {
  domain_id: string;
  asserter: string;
  disputer: string | null; // 'None' can be treated as null.
  disputed: boolean;
  dispute_id: string | null; // 'None' can be treated as null.
  callback_recipient: string;
  caller: string;
  settled: boolean;
  settle_caller: string;
  settlement_resolution: string;
}

const AssessmentPopup: React.FC<AssessmentPopupProps> = ({
  assessment,
  onClose,
  network,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");
  const currency = CURRENCIES[network];
  const { address } = useAccount();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isNetworkMismatch, setIsNetworkMismatch] = useState(false);
  const queryClient = useQueryClient();
  const { full: time } = utcToLocalTime(assessment.timestamp);
  const { full: expiryTime } = utcToLocalTime(assessment.expiration_time);
  const { chain } = useNetwork();
  const [toastKey, setToastKey] = useState(0);
  const popupRef = useRef<HTMLDivElement>(null);
  const [toastContent, setToastContent] = useState({
    title: "",
    text: "",
    type: "success" as ToastType,
    txHash: "",
  });

  const { data: resolutionItem, isLoading } = useQuery<
    ResolutionDetails,
    Error
  >({
    queryKey: ["assertionDetails", assessment.assertion_id],
    queryFn: async () => {
      const response = await axios.get(
        `/api/assertions/${assessment.assertion_id}`
      );
      return response.data;
    },
  });

  const showToast = (
    title: string,
    text: string,
    type: ToastType = "success",
    txHash?: string
  ) => {
    setToastContent({ title, text, type, txHash: txHash || "" });
    setToastKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    setIsWalletConnected(!!address);
  }, [address]);

  useEffect(() => {
    if (isWalletConnected && chain) {
      setIsNetworkMismatch(
        (network === "sepolia" && chain.network !== "sepolia") ||
          (network === "mainnet" && chain.network !== "mainnet")
      );
    } else {
      setIsNetworkMismatch(false);
    }
  }, [isWalletConnected, chain, network]);

  useEffect(() => {
    const updateProgressAndTime = () => {
      const start = new Date(assessment.timestamp + "Z");
      const startTimestamp = Math.floor(start.getTime());
      console.log(startTimestamp);
      const end = new Date(assessment.expiration_time + "Z");
      const endTimestamp = Math.floor(end.getTime());
      const now = Date.now();
      const total = endTimestamp - startTimestamp;
      const current = now - startTimestamp;
      const calculatedProgress = Math.min(
        Math.max((current / total) * 100, 0),
        100
      );
      setProgress(calculatedProgress);

      // Calculate time left
      const remaining = endTimestamp - now;
      if (remaining > 0) {
        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (remaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeLeft("Ended");
      }
    };

    updateProgressAndTime();
    const timer = setInterval(updateProgressAndTime, 1000); // Update every second

    return () => clearInterval(timer);
  }, [assessment]);
  // Settle assertion
  const { writeAsync: settleAssertion } = useContractWrite({
    calls: [
      {
        contractAddress:
          network == "sepolia"
            ? OO_CONTRACT_ADDRESS.sepolia
            : OO_CONTRACT_ADDRESS.mainnet,
        entrypoint: "settle_assertion",
        calldata: [],
      },
    ],
  });

  // Push price to ancillary
  const { writeAsync: pushPrice } = useContractWrite({
    calls: [
      {
        contractAddress:
          network == "sepolia"
            ? ORACLE_ANCILLARY_ADDRESS.sepolia
            : ORACLE_ANCILLARY_ADDRESS.mainnet,
        entrypoint: "push_price",
        calldata: [],
      },
    ],
  });

  // Dispute assertion
  const { writeAsync: approveAndDispute } = useContractWrite({
    calls: [
      {
        contractAddress: currency[0].address,
        entrypoint: "approve",
        calldata: [
          network == "sepolia"
            ? OO_CONTRACT_ADDRESS.sepolia
            : OO_CONTRACT_ADDRESS.mainnet,
          uint256.bnToUint256(assessment.bond).low,
          uint256.bnToUint256(assessment.bond).high,
        ],
      },
      {
        contractAddress:
          network == "sepolia"
            ? OO_CONTRACT_ADDRESS.sepolia
            : OO_CONTRACT_ADDRESS.mainnet,
        entrypoint: "dispute_assertion",
        calldata: [],
      },
    ],
  });

  const { data: owner } = useContractRead({
    address:
      network == "sepolia"
        ? OO_CONTRACT_ADDRESS.sepolia
        : OO_CONTRACT_ADDRESS.mainnet,
    abi: AncillaryABI,
    functionName: "owner",
    args: [],
    watch: true,
  });

  const settleMutation = useMutation({
    mutationFn: (assertionId: number) =>
      settleAssertion({
        calls: [
          {
            contractAddress:
              network == "sepolia"
                ? OO_CONTRACT_ADDRESS.sepolia
                : OO_CONTRACT_ADDRESS.mainnet,
            entrypoint: "settle_assertion",
            calldata: [assertionId.toString()],
          },
        ],
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["assertionDetails", assessment.assertion_id],
      });
      showToast(
        "Success",
        "Assertion settled successfully",
        "success",
        data.transaction_hash
      );
    },
    onError: (error) => {
      showToast("Error", `Failed to settle assertion: ${error}`, "fail");
    },
  });

  const disputeMutation = useMutation({
    mutationFn: ({
      assertionId,
      bond,
    }: {
      assertionId: number;
      bond: string;
    }) =>
      approveAndDispute({
        calls: [
          {
            contractAddress: currency[0].address,
            entrypoint: "approve",
            calldata: [
              network == "sepolia"
                ? OO_CONTRACT_ADDRESS.sepolia
                : OO_CONTRACT_ADDRESS.mainnet,
              uint256.bnToUint256(bond).low,
              uint256.bnToUint256(bond).high,
            ],
          },
          {
            contractAddress:
              network == "sepolia"
                ? OO_CONTRACT_ADDRESS.sepolia
                : OO_CONTRACT_ADDRESS.mainnet,
            entrypoint: "dispute_assertion",
            calldata: address ? [assertionId.toString(), address] : [],
          },
        ],
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["assertionDetails", assessment.assertion_id],
      });
      showToast(
        "Success",
        "Assertion disputed successfully",
        "success",
        data.transaction_hash
      );
    },
    onError: (error) => {
      showToast("Error", `Failed to dispute assertion: ${error}`, "fail");
    },
  });

  const resolveDisputeMutation = useMutation({
    mutationFn: ({
      assertionId,
      requestId,
      resolution,
    }: {
      assertionId: number;
      requestId: string;
      resolution: boolean;
    }) => {
      const resolutionInt = resolution ? 1000000000000000000 : 0;
      return pushPrice({
        calls: [
          {
            contractAddress:
              network === "sepolia"
                ? ORACLE_ANCILLARY_ADDRESS.sepolia
                : ORACLE_ANCILLARY_ADDRESS.mainnet,
            entrypoint: "push_price_by_request_id",
            calldata: [
              requestId.toString(),
              uint256.bnToUint256(resolutionInt).low,
              uint256.bnToUint256(resolutionInt).high,
            ],
          },
        ],
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["assertionDetails", assessment.assertion_id],
      });
      settleMutation.mutate(variables.assertionId);
    },
  });

  // Handlers
  const handleSettle = (assertionId: number) => {
    settleMutation.mutate(assertionId);
  };

  const handleDispute = (assertionId: number, bond: string) => {
    disputeMutation.mutate({ assertionId, bond });
  };

  const handleResolveDispute = (
    assertionId: number,
    requestId: string,
    resolution: boolean
  ) => {
    if (owner != address) {
      showToast("Error", "Address not authorized", "fail");
      return;
    }
    resolveDisputeMutation.mutate({ assertionId, requestId, resolution });
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for the animation to finish before calling onClose
  };

  useEffect(() => {
    setIsVisible(true);

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        // Check if the click is on the StarkNet Kit modal or its children
        const walletModal = document.getElementById(
          "starknetkit-modal-container"
        );

        if (
          walletModal &&
          (walletModal === event.target ||
            walletModal.contains(event.target as Node))
        ) {
          return; // Don't close if click is on StarkNet Kit modal
        }
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
          isVisible ? "opacity-50" : "pointer-events-none opacity-0"
        }`}
        onClick={handleClose}
      ></div>
      <div
        ref={popupRef}
        className={`relative w-full bg-darkGreen text-lightGreen shadow-lg transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        {!isLoading ? (
          <>
            <div className="sticky top-0 flex	 items-center justify-between bg-lightBlur px-10 py-4 backdrop-blur">
              <div className="flex flex-row gap-3">
                <Image
                  width={25}
                  height={25}
                  alt="Logo"
                  src={
                    assessment.image
                      ? assessment.image
                      : "/assets/vectors/optimist.svg"
                  }
                />
                <h3 className="text-xl font-bold">{assessment.title}</h3>
              </div>
              <button
                onClick={handleClose}
                className="rounded-full border border-lightGreen p-2 text-lightGreen hover:bg-lightGreen hover:text-darkGreen"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4 p-5 md:p-10">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex w-full flex-wrap space-y-4 rounded-2xl border border-whiteTrans bg-greenFooter p-4 md:w-3/4 md:p-10">
                  <div className="flex w-full flex-row items-center gap-3">
                    <InformationCircleIcon className=" my-auto h-6 w-6 rounded-full text-lightGreen" />
                    <h5>Assertion</h5>
                  </div>
                  <p className="mr-8 w-fit">
                    <div className=" text-mint">Description</div>{" "}
                    {assessment.description}
                  </p>
                  <p className="flex w-full flex-col flex-wrap overflow-auto">
                    <div className="text-mint">Assertion Id</div>{" "}
                    {assessment.assertion_id}
                  </p>
                  <p className="mr-8">
                    <div className="text-mint">Challenge period ends</div>{" "}
                    {expiryTime}
                  </p>
                  <p className="mr-8">
                    <div className="text-mint">Result</div>{" "}
                    {assessment.identifier}
                  </p>
                  <p className="mr-8">
                    <div className="text-mint">Bond</div>{" "}
                    <div className="flex flex-row gap-2">
                      <Image
                        alt="Bond Currency"
                        width={17}
                        height={17}
                        src={`/assets/currencies/${findCurrencyNameByAddress(
                          assessment.currency
                        ).toLowerCase()}.svg`}
                      />
                      {assessment.bond}
                    </div>
                  </p>
                </div>
                <div className="flex w-full flex-wrap items-start justify-start space-y-4 rounded-2xl border border-whiteTrans bg-xlightBlur p-4 md:w-1/4 md:p-10">
                  <div className="flex w-full flex-row items-center gap-3">
                    <InformationCircleIcon className=" my-auto h-6 w-6 rounded-full text-lightGreen" />
                    <h5>Actions</h5>
                  </div>
                  {!isWalletConnected && (
                    <div
                      data-testid="wallet-modal"
                      className="m-auto flex flex-col gap-3 text-center"
                    >
                      Connect your wallet
                      <WalletConnection />
                    </div>
                  )}
                  {isNetworkMismatch && (
                    <div className="w-full text-center font-bold text-redDown">
                      Please change network to{" "}
                      {chain.network === "sepolia" ? "Mainnet" : "Testnet"}
                    </div>
                  )}

                  {isWalletConnected &&
                    !isNetworkMismatch &&
                    !isLoading &&
                    !resolutionItem?.settled && (
                      <div className="m-auto flex w-full flex-col items-center gap-3 text-center text-mint">
                        You are connected with
                        <WalletConnection />
                      </div>
                    )}

                  <div className="flex w-full flex-wrap items-center justify-center gap-4">
                    {isWalletConnected &&
                      !isNetworkMismatch &&
                      !isLoading &&
                      !resolutionItem?.settled && (
                        <button
                          type="submit"
                          className="w-fit rounded-full border border-darkGreen bg-mint py-4 px-6 text-sm uppercase tracking-wider text-darkGreen transition-colors hover:border-mint hover:bg-darkGreen hover:text-mint"
                          onClick={() => handleSettle(assessment.assertion_id)}
                        >
                          Settle
                        </button>
                      )}

                    {isWalletConnected &&
                      !isNetworkMismatch &&
                      !isLoading &&
                      !resolutionItem?.disputed &&
                      !resolutionItem?.settled && (
                        <button
                          type="submit"
                          className="w-fit rounded-full border border-darkGreen bg-lightGreen py-4 px-6 text-sm uppercase tracking-wider text-darkGreen transition-colors hover:border-mint hover:bg-darkGreen hover:text-mint"
                          onClick={() =>
                            handleDispute(
                              assessment.assertion_id,
                              assessment.bond
                            )
                          }
                        >
                          Dispute
                        </button>
                      )}
                  </div>
                  {isWalletConnected &&
                    !isNetworkMismatch &&
                    !isLoading &&
                    resolutionItem?.disputed &&
                    !resolutionItem?.settled && (
                      <div className="flex w-full flex-wrap items-center justify-center gap-4">
                        <button
                          type="submit"
                          className="w-fit rounded-full border border-darkGreen bg-lightGreen py-4 px-6 text-sm uppercase tracking-wider text-darkGreen transition-colors hover:border-mint hover:bg-darkGreen hover:text-mint"
                          onClick={() =>
                            handleResolveDispute(
                              assessment.assertion_id,
                              resolutionItem?.dispute_id as string,
                              true
                            )
                          }
                        >
                          True
                        </button>
                        <button
                          type="submit"
                          className="w-fit rounded-full border border-darkGreen bg-lightGreen py-4 px-6 text-sm uppercase tracking-wider text-darkGreen transition-colors hover:border-mint hover:bg-darkGreen hover:text-mint"
                          onClick={() =>
                            handleResolveDispute(
                              assessment.assertion_id,
                              resolutionItem?.dispute_id as string,
                              false
                            )
                          }
                        >
                          False
                        </button>
                      </div>
                    )}
                </div>
              </div>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex w-full flex-wrap space-y-4 rounded-2xl border border-whiteTrans bg-lightBackground p-4 md:w-1/2 md:p-10">
                  <div className="flex w-full flex-row items-center gap-3">
                    <ClockIcon className=" my-auto h-6 w-6 rounded-full text-lightGreen" />
                    <h5>Timeline</h5>
                  </div>
                  <p className=" mr-8">
                    <div className="text-mint">Start challenge period</div>{" "}
                    {time}
                  </p>
                  <p className=" mr-8">
                    <div className="text-mint">End challenge period</div>{" "}
                    {expiryTime}
                  </p>
                  <div className="flex w-full flex-col items-center justify-center">
                    <div className="h-1 w-full rounded-full bg-lightBlur">
                      <div
                        className="h-1 rounded-full bg-mint transition-all duration-500 ease-out"
                        style={{
                          width: timeLeft === "Ended" ? "100%" : `${progress}%`,
                        }}
                      ></div>
                    </div>
                    <div className="mt-1 text-xs">Left: {timeLeft}</div>
                  </div>
                </div>
                <div className="flex w-full flex-wrap space-y-4 rounded-2xl border border-whiteTrans bg-greenFooter p-4 md:w-1/2 md:p-10">
                  <div className="flex flex-row items-center gap-3">
                    <InformationCircleIcon className=" my-auto h-6 w-6 rounded-full text-lightGreen" />
                    <h5>Details</h5>
                  </div>
                  <p className="flex w-full flex-col flex-wrap overflow-auto">
                    <div className="text-mint">Asserter</div>
                    {resolutionItem?.asserter}
                  </p>
                  <p className="mr-8">
                    <div className="text-mint">Disputed</div>
                    {resolutionItem?.disputed ? "True" : "False"}
                  </p>
                  {resolutionItem?.disputed && (
                    <p className="mr-8">
                      <div className="text-mint">Disputer</div>
                      {resolutionItem?.disputer}
                    </p>
                  )}
                  {resolutionItem?.disputed && (
                    <p className="mr-8">
                      <div className="text-mint">Dispute Id</div>
                      {resolutionItem?.dispute_id}
                    </p>
                  )}
                  <p className="mr-8">
                    <div className="text-mint">Settled</div>
                    {resolutionItem?.settled ? "True" : "False"}
                  </p>
                  {resolutionItem?.settled && (
                    <p className="mr-8">
                      <div className="text-mint">Settled caller</div>
                      {resolutionItem?.settle_caller}
                    </p>
                  )}
                  {resolutionItem?.settled && (
                    <p className="mr-8">
                      <div className="text-mint">Settlement Resolution</div>
                      {resolutionItem?.settlement_resolution}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col">
            <div className="sticky top-0 flex	 items-center justify-between bg-lightBlur px-10 py-4 backdrop-blur">
              <div className="flex flex-row gap-4">
                <div className="my-auto  h-8 w-8 animate-pulse rounded-full bg-lightBlur"></div>
                <div className="my-auto  h-4 w-40 animate-pulse rounded-full bg-lightBlur"></div>
              </div>
              <button
                onClick={handleClose}
                className="rounded-full border border-lightGreen p-2 text-lightGreen hover:bg-lightGreen hover:text-darkGreen"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4 p-5 md:p-10">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="my-auto h-60 w-full animate-pulse rounded-2xl bg-lightBlur md:w-3/4"></div>
                <div className="my-auto h-60 w-full animate-pulse rounded-2xl bg-lightBlur md:w-1/4"></div>
              </div>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="my-auto h-60 w-full animate-pulse rounded-2xl bg-lightBlur md:w-1/2"></div>
                <div className="my-auto h-60 w-full animate-pulse rounded-2xl bg-lightBlur md:w-1/2"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      {toastContent.title && (
        <Toast
          key={toastKey}
          title={toastContent.title}
          text={toastContent.text}
          type={toastContent.type}
          txHash={toastContent.txHash}
        />
      )}
    </div>
  );
};

export default AssessmentPopup;
