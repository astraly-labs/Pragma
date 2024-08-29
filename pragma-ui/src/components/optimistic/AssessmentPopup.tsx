import React, { useState, useEffect } from "react";
import { XIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { ClockIcon, InformationCircleIcon } from "@heroicons/react/outline";
import { Item } from "../../pages/optimistic";
import axios from "axios";
import {
  useAccount,
  useContractWrite,
  useContractRead,
  useWaitForTransaction,
} from "@starknet-react/core";
import {
  OO_CONTRACT_ADDRESS,
  CURRENCIES,
  ORACLE_ANCILLARY_ADDRESS,
} from "../../pages/constants";
import { uint256 } from "starknet";
import WalletConnection from "../common/WalletConnection";
import AncillaryABI from "../../abi/Ancillary.json";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

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

  useEffect(() => {
    const updateProgressAndTime = () => {
      const start = new Date(assessment.timestamp);
      const start_timestamp = Math.floor(start.getTime());
      const end = new Date(assessment.expiration_time);
      const end_timestamp = Math.floor(end.getTime());
      const now = Date.now();
      const total = end_timestamp - start_timestamp;
      const current = now - start_timestamp;
      const calculatedProgress = Math.min(
        Math.max((current / total) * 100, 0),
        100
      );
      setProgress(calculatedProgress);

      // Calculate time left
      const remaining = end_timestamp - now;
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

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };
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
  const { writeAsync: push_price } = useContractWrite({
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assertionDetails", assessment.assertion_id],
      });
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
        calls: bond && [
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
            calldata: [assertionId.toString(), address],
          },
        ],
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assertionDetails", assessment.assertion_id],
      });
    },
  });

  const resolveDisputeMutation = useMutation({
    mutationFn: ({
      assertionId,
      request_id,
      resolution,
    }: {
      assertionId: number;
      request_id: string;
      resolution: boolean;
    }) => {
      let resolutionInt = resolution ? 1000000000000000000 : 0;
      return push_price({
        calls: [
          {
            contractAddress:
              network === "sepolia"
                ? ORACLE_ANCILLARY_ADDRESS.sepolia
                : ORACLE_ANCILLARY_ADDRESS.mainnet,
            entrypoint: "push_price_by_request_id",
            calldata: [
              request_id.toString(),
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
    if (!address) {
      alert("Please connect your wallet first");
      return;
    }
    disputeMutation.mutate({ assertionId, bond });
  };

  const handleResolveDispute = (
    assertionId: number,
    request_id: string,
    resolution: boolean
  ) => {
    if (!address) {
      alert("Please connect your wallet first");
      return;
    }
    if (owner != address) {
      alert("Not the owner");
      return;
    }
    resolveDisputeMutation.mutate({ assertionId, request_id, resolution });
  };

  useEffect(() => {
    // Trigger the animation after the component is mounted
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for the animation to finish before calling onClose
  };

  return (
    <div className="fixed bottom-0 left-0 z-50 w-screen">
      <div
        className={`transform bg-darkGreen text-lightGreen shadow-lg transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        {!isLoading ? (
          <>
            <div className="sticky top-0 mb-4 flex	 items-center justify-between bg-lightBlur px-10 py-4 backdrop-blur">
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
            <div className="space-y-4  px-10 pb-5">
              <div className="flex flex-row gap-3">
                <InformationCircleIcon className=" my-auto h-6 w-6 rounded-full text-lightGreen" />
                <h5>Assertion</h5>
              </div>
              <p>
                <div className="text-mint">Description</div>{" "}
                {assessment.description}
              </p>
              <p>
                <div className="text-mint">Assertion Id</div>{" "}
                {assessment.assertion_id}
              </p>
              <p>
                <div className="text-mint">Challenge period ends</div>{" "}
                {assessment.expiration_time}
              </p>
              <p>
                <div className="text-mint">Result</div> {assessment.identifier}
              </p>
              <p>
                <div className="text-mint">Bond</div> {assessment.bond}
              </p>
              <div className="flex flex-row gap-3">
                <ClockIcon className=" my-auto h-6 w-6 rounded-full text-lightGreen" />
                <h5>Timeline</h5>
              </div>
              <p>
                <div className="text-mint">Start challenge period</div>{" "}
                {assessment.timestamp}
              </p>
              <p>
                <div className="text-mint">End challenge period</div>{" "}
                {assessment.expiration_time}
              </p>
              <>
                <div className="h-1 w-40 rounded-full bg-lightBlur">
                  <div
                    className="h-1 rounded-full bg-mint transition-all duration-500 ease-out"
                    style={{
                      width: timeLeft === "Ended" ? "100%" : `${progress}%`,
                    }}
                  ></div>
                </div>
                <div className="mt-1 text-xs">Left: {timeLeft}</div>
              </>
              <div className="flex flex-row gap-3">
                <InformationCircleIcon className=" my-auto h-6 w-6 rounded-full text-lightGreen" />
                <h5>Details</h5>
              </div>
              <p>
                <div className="text-mint">Asserter</div>{" "}
                {resolutionItem.asserter}
              </p>
              <p>
                <div className="text-mint">Disputed</div>
                {resolutionItem.disputed ? "True" : "False"}
              </p>
              <p>
                <div className="text-mint">Disputer</div>
                {resolutionItem.disputer}
              </p>
              <p>
                <div className="text-mint">Dispute Id</div>
                {resolutionItem.dispute_id}
              </p>
              <p>
                <div className="text-mint">Settled</div>
                {resolutionItem.settled ? "True" : "False"}
              </p>
              <p>
                <div className="text-mint">Settled caller</div>
                {resolutionItem.settle_caller}
              </p>
              <p>
                <div className="text-mint">Settlement Resolution</div>
                {resolutionItem.settlement_resolution}
              </p>
            </div>
          </>
        ) : (
          <div className="py-2 font-mono text-xs text-lightGreen">
            Fetching ...
          </div>
        )}
        <div className="flex items-center justify-start space-x-4 py-4 pl-12">
          {!isLoading && !resolutionItem.settled && (
            <>
              <WalletConnection network={network} />
              <button
                type="submit"
                className="w-fit rounded-full border border-darkGreen bg-mint py-4 px-6 text-sm uppercase tracking-wider text-darkGreen transition-colors hover:border-mint hover:bg-darkGreen hover:text-mint"
                onClick={() => handleSettle(assessment.assertion_id)}
              >
                Settle
              </button>
            </>
          )}
          {!isLoading && !resolutionItem.disputed && !resolutionItem.settled && (
            <button
              type="submit"
              className="w-fit rounded-full border border-darkGreen bg-lightGreen py-4 px-6 text-sm uppercase tracking-wider text-darkGreen transition-colors hover:border-mint hover:bg-darkGreen hover:text-mint"
              onClick={() =>
                handleDispute(assessment.assertion_id, assessment.bond)
              }
            >
              Dispute
            </button>
          )}
          {!isLoading && resolutionItem.disputed && !resolutionItem.settled && (
            <>
              <button
                type="submit"
                className="w-fit rounded-full border border-darkGreen bg-lightGreen py-4 px-6 text-sm uppercase tracking-wider text-darkGreen transition-colors hover:border-mint hover:bg-darkGreen hover:text-mint"
                onClick={() =>
                  handleResolveDispute(
                    assessment.assertion_id,
                    resolutionItem.dispute_id,
                    true
                  )
                }
              >
                Resolve True
              </button>
              <button
                type="submit"
                className="w-fit rounded-full border border-darkGreen bg-lightGreen py-4 px-6 text-sm uppercase tracking-wider text-darkGreen transition-colors hover:border-mint hover:bg-darkGreen hover:text-mint"
                onClick={() =>
                  handleResolveDispute(
                    assessment.assertion_id,
                    resolutionItem.dispute_id,
                    false
                  )
                }
              >
                Resolve False
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentPopup;
