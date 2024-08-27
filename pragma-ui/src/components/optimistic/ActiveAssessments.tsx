import React, { Fragment, useMemo, useState, useEffect } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import SearchBar from "../Navigation/SearchBar";
import AssessmentPopup from "./AssessmentPopup";
import Assessment from "./Assessment";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";
import {
  OO_CONTRACT_ADDRESS,
  ORACLE_ANCILLARY_ADDRESS,
  CURRENCIES,
} from "../../pages/constants";
import {
  useAccount,
  useContractWrite,
  useContractRead,
  useNetwork,
  useWaitForTransaction,
} from "@starknet-react/core";
import AncillaryABI from "../../abi/Ancillary.json";
import { uint256, shortString } from "starknet";
import dotenv from "dotenv";
import { ChevronDownIcon } from "@heroicons/react/outline";
import NetworkSelection from "../common/NetworkSelection";

dotenv.config();

const NUMERICAL_TRUE = 1000000000000000000;

const ActiveAssessments = ({
  assessments,
  loading,
  onAssertionTypeChange,
  onLoadMore,
  hasMore,
}) => {
  const options = ["Active", "Settled", "Disputed"];
  const NETWORKS = ["sepolia", "mainnet"];
  const [filteredValue, setFilteredValue] = useState<string | undefined>(
    undefined
  );
  const { address, isConnected } = useAccount();
  const [network, setNetwork] = useState<string>("sepolia");
  console.log(network);
  const currency = CURRENCIES[network];
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [disputeHash, setDisputeHash] = useState<string | undefined>();
  const [pushPriceHash, setPushPriceHash] = useState<string | undefined>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [requestId, setRequestId] = useState<number | null>(null);

  const handleInputChange = (value) => {
    setFilteredValue(value || undefined);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    onAssertionTypeChange(option);
  };

  const filteredAssessments = filteredValue
    ? assessments.filter((assessment) =>
        assessment?.title?.toLowerCase().includes(filteredValue.toLowerCase())
      )
    : assessments;

  const handleAssessmentClick = (assessment) => {
    setSelectedAssessment(assessment);
  };

  const handleClosePopup = () => {
    setSelectedAssessment(null);
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
  // Dispute assertion
  const { writeAsync: approveAndDispute } = useContractWrite({
    calls: [
      {
        contractAddress: currency[0].address,
        entrypoint: "approve",
        calldata: [],
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

  // Wait for dispute transaction
  const {
    isLoading: isDisputeLoading,
    isError: isDisputeError,
    error: disputeError,
  } = useWaitForTransaction({
    hash: disputeHash,
    watch: true,
  });

  // Wait for resolve transaction
  const {
    isLoading: isResolveLoading,
    isError: isResolveError,
    error: resolveError,
  } = useWaitForTransaction({
    hash: pushPriceHash,
    watch: true,
  });

  const handleSettle = async (assertionId: number) => {
    try {
      await settleAssertion({
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
      });
      console.log(`Settled assertion with ID: ${assertionId}`);
      // fetchData();
    } catch (error) {
      console.error("Error settling assertion:", error);
    }
  };

  const handleDispute = async (assertionId: number, bond: string) => {
    console.log(`Disputing item with ID: ${assertionId}`);

    if (!address) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      const result = await approveAndDispute({
        calls: [
          {
            contractAddress: currency[0].address,
            entrypoint: "approve",
            calldata: [
              OO_CONTRACT_ADDRESS,
              uint256.bnToUint256(bond).low,
              uint256.bnToUint256(bond).high,
            ],
          },
          {
            contractAddress: OO_CONTRACT_ADDRESS,
            entrypoint: "dispute_assertion",
            calldata: [assertionId.toString(), address],
          },
        ],
      });

      console.log("Transaction hash:", result.transaction_hash);
      setDisputeHash(result.transaction_hash);

      const timeout = 120000; // 2 minutes timeout
      const startTime = Date.now();

      while (isDisputeLoading && Date.now() - startTime < timeout) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
      }

      if (isDisputeError) {
        throw new Error(`Transaction failed: ${disputeError?.message}`);
      }

      alert("Assertion disputed successfully!");
      // fetchData();
    } catch (error) {
      console.error("Error disputing assertion:", error);
      alert("Failed to dispute the assertion. Check console for details.");
    } finally {
      setDisputeHash(undefined);
    }
  };

  const handleResolveDispute = async (
    assertionId: number,
    request_id: number,
    resolution: boolean
  ) => {
    console.log(`Resolve dispute item with ID: ${assertionId}`);

    try {
      let resolutionInt = resolution ? NUMERICAL_TRUE : 0;

      const result = await push_price({
        calls: [
          {
            contractAddress:
              network == "sepolia"
                ? ORACLE_ANCILLARY_ADDRESS.sepolia
                : ORACLE_ANCILLARY_ADDRESS.mainnet,
            entrypoint: "push_price_by_request_id",
            calldata: [request_id, resolutionInt],
          },
        ],
      });
      console.log("Transaction hash:", result.transaction_hash);
      setPushPriceHash(result.transaction_hash);

      const timeout = 120000; // 2 minutes timeout
      const startTime = Date.now();

      while (isResolveLoading && Date.now() - startTime < timeout) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
      }

      if (isResolveError) {
        throw new Error(`Transaction failed: ${resolveError?.message}`);
      }

      handleSettle(assertionId);
    } catch (error) {
      console.error("Error resolving assertion:", error);
    } finally {
      setPushPriceHash(undefined);
    }
  };

  const openModal = (assertion_id: number, request_id: number) => {
    if (owner == address) {
      setSelectedItem(assertion_id);
      setRequestId(request_id);
      setIsModalOpen(true);
    } else {
      console.log(owner?.toString(16));
      alert("Must be the owner");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setRequestId(null);
  };

  return (
    <>
      <div
        className={classNames("w-full text-lightGreen", styles.darkGreenBox)}
      >
        <h3 className="pb-3 text-lightGreen">Assessments</h3>
        <div className="flex w-full flex-col-reverse gap-3 py-3 sm:flex-row">
          <div className="flex flex-col gap-3 smolScreen:flex-row">
            <div className="my-auto flex w-full flex-row justify-center rounded-full border border-lightBlur py-3 px-6 text-center text-sm text-lightGreen md:w-auto">
              Nb assessments: {filteredAssessments.length}
            </div>
            <Listbox value={selectedOption} onChange={handleOptionChange}>
              <div className="relative w-full md:w-auto">
                <Listbox.Button className="relative flex w-full cursor-pointer flex-row justify-center rounded-full border border-lightBlur py-3 px-6 text-center text-sm text-lightGreen focus:outline-none">
                  <span className="block truncate">{selectedOption}</span>
                  <Image
                    className="my-auto pl-2"
                    height={16}
                    width={16}
                    alt="arrowDown"
                    src="/assets/vectors/arrowDown.svg"
                  />
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-green py-1 text-sm text-lightGreen ring-1 backdrop-blur focus:outline-none">
                    {options.map((option, optionIdx) => (
                      <Listbox.Option
                        key={optionIdx}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-2 pr-4 text-lightGreen ${
                            active ? "opacity-50 " : ""
                          }`
                        }
                        value={option}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate text-lightGreen ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {option}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            <NetworkSelection setNetwork={setNetwork} />
          </div>
          <div className="sm:ml-auto">
            <SearchBar onInputChange={handleInputChange} />
          </div>
        </div>
        <div className="w-full overflow-auto">
          <div className={styles.assessment}>
            <div className="flex cursor-pointer flex-row gap-2	 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Assertion
            </div>
            <div className="flex translate-x-2 cursor-pointer flex-row gap-1 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Identifier{" "}
            </div>
            <div className="flex translate-x-2 cursor-pointer flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Bond
            </div>
            <div className="flex cursor-pointer flex-row gap-2 font-mono text-sm text-LightGreenFooter md:tracking-wider">
              Challenge Period
            </div>
          </div>
          {!loading &&
            filteredAssessments.map((element, index) => (
              <Assessment
                assessment={element}
                key={index}
                loading={loading}
                onClick={() => handleAssessmentClick(element)}
              />
            ))}
          {/* {!loading && (
    filteredValue
      ? filteredAssessments.map((assessment, assetIdx) => (
        <div
          key={assetIdx}
          onClick={() => handleAssessmentClick(assessment)}
          className="cursor-pointer"
        >
        </div>
      ))
    : assessments.map((assessment, assetIdx) => (
        <div
          key={assetIdx}
          onClick={() => handleAssessmentClick(assessment)}
          className="cursor-pointer"
        >
        </div>
      ))
)} */}
          {!loading && filteredAssessments.length === 0 && (
            <div className="py-2 font-mono text-xs text-lightGreen">
              No assessments for your search
            </div>
          )}
        </div>
        {hasMore && (
          <div className="mt-4 flex justify-center">
            <div
              onClick={onLoadMore}
              className={`text-light-green cursor-pointer underline transition-colors duration-200 hover:opacity-50 ${
                loading ? "cursor-wait" : ""
              }`}
            >
              {loading ? "Loading..." : "Load More"}
            </div>
          </div>
        )}
      </div>{" "}
      {selectedAssessment && (
        <AssessmentPopup
          assessment={selectedAssessment}
          network={network}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};

export default ActiveAssessments;
