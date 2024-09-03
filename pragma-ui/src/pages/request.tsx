import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import BoxContainer from "../components/common/BoxContainer";
import classNames from "classnames";
import { Listbox, Transition } from "@headlessui/react";
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { CallData, byteArray } from "starknet";
import WalletConnection from "../components/common/WalletConnection";
import { OO_CONTRACT_ADDRESS, CURRENCIES } from "../utils/constants";
import {
  useAccount,
  useContractWrite,
  useContractRead,
  useWaitForTransaction,
  useNetwork,
} from "@starknet-react/core";
import OOAbi from "../abi/OO.json";
import { uint256, shortString } from "starknet";
import NetworkSelection from "../components/common/NetworkSelection";
import Toast, { ToastType } from "../components/common/Toast";

/**
 * Generates a formatted timestamp string in the format `DD/MM/YYYY, HH:MM`.
 *
 * @return {string} A formatted string representing the current date and time.
 */
const generateTimestamp = () => {
  const currentTimestamp = new Date();
  return `${currentTimestamp.getDate().toString().padStart(2, "0")}/${(
    currentTimestamp.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${currentTimestamp.getFullYear()}, ${currentTimestamp
    .getHours()
    .toString()
    .padStart(2, "0")}:${currentTimestamp
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
};

/**
 * Builds an assertion string using the provided title, description, and timestamp.
 *
 * @param {string} title - The title of the assertion.
 * @param {string} description - The description of the assertion.
 * @param {string} timestamp - The timestamp of when the assertion was created.
 * @return {string} A formatted assertion string.
 */
function buildAssertion(
  title: string,
  description: string,
  timestamp: string
): string {
  return `An assertion was published at ${timestamp}. The title of the assertion is: ${title}, the description is: ${description}.`;
}
/**
 * A React component that provides a form for submitting requests, interacting with the Starknet blockchain.
 * Users can submit assertions with specific titles, descriptions, bonds, and other details.
 *
 * @component
 * @return {JSX.Element} The rendered component.
 */
const Request = () => {
  const { address } = useAccount();
  const [network, setNetwork] = useState<string>("sepolia");
  const IDENTIFIER = "ASSERT_TRUTH";
  const currency = CURRENCIES[network];
  const [isProcessing, setIsProcessing] = useState(false);
  const [assertHash, setAssertHash] = useState<string | undefined>();
  const [calls, setCalls] = useState<any[] | undefined>(undefined);
  const ONE_DOLLAR_FEE = 1000000000000000000;
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isNetworkMismatch, setIsNetworkMismatch] = useState(false);
  const { chain } = useNetwork();
  const [activeSection, setActiveSection] = useState("details");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);
  const [isMinimumChallengePeriodChecked, setIsMinimumChallengePeriodChecked] =
    useState(false);

  const [toastContent, setToastContent] = useState({
    title: "",
    text: "",
    txhash: "",
    type: "" as ToastType,
  });
  const [toastKey, setToastKey] = useState(0);

  const showToast = (title, text, txhash, type) => {
    setToastContent({ title, text, txhash, type });
    setToastKey((prevKey) => prevKey + 1);
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    timestamp: "",
    bond: "",
    currency: currency[0],
    challengePeriod: "",
    expirationTime: "",
  });
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const handleMinimumChallengePeriodCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setIsMinimumChallengePeriodChecked(e.target.checked);
  };

  const handleCurrencyChange = (selectedCurrency) => {
    setFormData((prevState) => ({
      ...prevState,
      currency: selectedCurrency,
    }));
  };
  // Get minimum bond
  const { data: minimumBond, isLoading: isMinimumBondLoading } =
    useContractRead({
      address:
        network == "sepolia"
          ? OO_CONTRACT_ADDRESS.sepolia
          : OO_CONTRACT_ADDRESS.mainnet,
      abi: OOAbi,
      functionName: "get_minimum_bond",
      args: [formData.currency.address],
      watch: true,
    });

  const sectionOptions = [
    { id: "details", name: "General information" },
    { id: "currency", name: "Currency" },
    { id: "bond", name: "Bond" },
    { id: "challengePeriod", name: "Challenge Period" },
    { id: "review", name: "Review and Submit" },
  ];

  const sectionRefs = {
    details: useRef(null),
    currency: useRef(null),
    bond: useRef(null),
    challengePeriod: useRef(null),
    review: useRef(null),
  };

  const scrollToSection = (sectionName) => {
    sectionRefs[sectionName].current.scrollIntoView({ behavior: "smooth" });
    setActiveSection(sectionName);
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    Object.entries(sectionRefs).forEach(([id, ref]) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  useEffect(() => {
    if (
      address &&
      formData.title &&
      formData.description &&
      formData.bond &&
      formData.challengePeriod &&
      formData.currency
    ) {
      const currentTimestamp = generateTimestamp();
      const newAssertion = buildAssertion(
        formData.title,
        formData.description,
        currentTimestamp
      );

      const newCalls = [
        {
          contractAddress: formData.currency.address,
          entrypoint: "approve",
          calldata: [
            network == "sepolia"
              ? OO_CONTRACT_ADDRESS.sepolia
              : OO_CONTRACT_ADDRESS.mainnet,
            uint256.bnToUint256(formData.bond + ONE_DOLLAR_FEE).low,
            uint256.bnToUint256(formData.bond).high,
          ],
        },
        {
          contractAddress:
            network == "sepolia"
              ? OO_CONTRACT_ADDRESS.sepolia
              : OO_CONTRACT_ADDRESS.mainnet,
          entrypoint: "assert_truth",
          calldata: CallData.compile([
            byteArray.byteArrayFromString(newAssertion),
            address,
            0,
            0,
            formData.challengePeriod,
            formData.currency.address,
            uint256.bnToUint256(formData.bond).low,
            uint256.bnToUint256(formData.bond).high,
            shortString.encodeShortString(IDENTIFIER),
            0,
            0,
          ]),
        },
      ];
      setCalls(newCalls);
      console.log("Calls updated:", newCalls);
    } else {
      setCalls(undefined);
      console.log("Calls reset to undefined");
    }
  }, [address, formData, network]);

  const { writeAsync: approveAndAssert } = useContractWrite({
    calls: calls,
  });
  // Wait for assert transaction
  const {
    isLoading: isAssertLoading,
    isError: isAssertError,
    error: assertError,
  } = useWaitForTransaction({
    hash: assertHash,
    watch: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the address is connected
    if (!address) {
      showToast(
        "Wallet Not Connected",
        "Please connect your wallet first",
        "",
        "fail"
      );
      return;
    }

    // Check if all required fields are filled
    const requiredFields = ["title", "description", "bond", "challengePeriod"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        showToast(
          "Incomplete Form",
          `Please complete the ${field} field.`,
          "",
          "fail"
        );
        return;
      }
    }

    // Ensure bond is greater than or equal to minimumBond
    if (minimumBond && Number(formData.bond) < Number(minimumBond)) {
      showToast(
        "Invalid Bond",
        `The bond must be greater than or equal to the minimum bond: ${minimumBond}`,
        "",
        "fail"
      );

      return;
    }
    // Check if challenge period is at least 7200 seconds
    if (parseInt(formData.challengePeriod) < 7200) {
      showToast(
        "Invalid Challenge Period",
        "The challenge period must be at least 7200 seconds (2 hours).",
        "",
        "fail"
      );
      return;
    }
    if (!calls) {
      console.log("Calls are not ready yet");
      showToast(
        "Not Ready",
        "Please wait a moment and try again. If the issue persists, refresh the page.",
        "",
        "fail"
      );

      return;
    }

    const currentTimestamp = generateTimestamp();

    const submissionData = {
      ...formData,
      timestamp: currentTimestamp,
    };

    console.log("Form submitted:", submissionData);

    setFormData((prevState) => ({
      ...prevState,
      timestamp: currentTimestamp,
    }));

    try {
      const result = await approveAndAssert();
      console.log("Transaction hash:", result.transaction_hash);
      setAssertHash(result.transaction_hash);

      const timeout = 120000; // 2 minutes timeout
      const startTime = Date.now();

      while (isAssertLoading && Date.now() - startTime < timeout) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
      }

      if (isAssertError) {
        showToast(
          "Failure",
          `Transaction failed: ${assertError?.message}`,
          "",
          "fail"
        );
        throw new Error();
      }
      showToast(
        "Success",
        `Assertion submitted successfully`,
        `${result.transaction_hash}`,
        "success"
      );
    } catch (error) {
      console.error("Error:", error);
      showToast(
        "Failure",
        `Failed to process the assertion. ${error}`,
        "",
        "fail"
      );
    } finally {
      setIsProcessing(false);
      setAssertHash(undefined);
    }
  };

  useEffect(() => {
    setIsWalletConnected(!!address);
  }, [address]);

  useEffect(() => {
    if (isWalletConnected && chain) {
      console.log(chain.network);
      setIsNetworkMismatch(
        (network === "sepolia" && chain.network !== "sepolia") ||
          (network === "mainnet" && chain.network !== "mainnet")
      );
      console.log(network);
    } else {
      setIsNetworkMismatch(false);
    }
  }, [isWalletConnected, chain, network, address]);

  const router = useRouter();

  return (
    <div className={classNames("relative w-full", styles.bigScreen)}>
      <BoxContainer>
        <div className="pb-20"></div>
      </BoxContainer>
      <BoxContainer modeOne={false}>
        <div className="flex w-full flex-col gap-4 md:flex-row md:pb-10">
          <div className="flex flex-row gap-4">
            <button
              onClick={() => router.back()}
              className="my-auto flex cursor-pointer items-center gap-2 rounded-full border border-lightGreen p-2 text-left text-sm uppercase tracking-widest text-lightGreen hover:bg-lightGreen hover:text-darkGreen"
            >
              <ArrowLeftIcon className="w-4" />
            </button>
            <h2 className="text-lightGreen">Submit a request</h2>
          </div>
          <div className="relative flex flex-row gap-3 pb-4 md:ml-auto md:items-center md:justify-center md:pb-0">
            <NetworkSelection setNetwork={setNetwork} />
            <WalletConnection />
          </div>
        </div>
      </BoxContainer>
      <BoxContainer modeOne={false}>
        <div className="flex w-full flex-col md:flex-row md:gap-10">
          {/* Navigation Sidebar for large screens */}
          <div className=" hidden rounded-xl border border-whiteTrans bg-green md:block md:w-1/4 md:px-8 md:py-5 md:pr-8">
            <nav
              className="sticky top-8"
              style={{ position: "sticky", top: "2rem", alignSelf: "start" }}
            >
              <ul className="space-y-4">
                {sectionOptions.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`text-left focus:outline-none ${
                        activeSection === section.id
                          ? "text-mint"
                          : "text-lightGreen hover:text-mint"
                      }`}
                    >
                      {section.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Listbox for small screens */}
          <div className="mb-6 md:hidden">
            <Listbox value={activeSection} onChange={scrollToSection}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-lightBlur py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate text-lightGreen">
                    {
                      sectionOptions.find(
                        (section) => section.id === activeSection
                      )?.name
                    }
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={React.Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-darkGreen py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {sectionOptions.map((section) => (
                      <Listbox.Option
                        key={section.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-lightGreen text-darkGreen"
                              : "text-lightGreen"
                          }`
                        }
                        value={section.id}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {section.name}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          {/* Form Sections */}
          <div className="w-full space-y-5 md:w-3/4 md:space-y-16">
            {/* Details Section */}
            <section
              ref={sectionRefs.details}
              id="details"
              className="relative scroll-mt-8 rounded-xl border border-whiteTrans bg-greenFooter p-6 md:p-8"
            >
              <img
                src="/assets/vectors/lightDot.svg"
                className="absolute top-0 right-10 h-6 w-6 -translate-y-3"
              />
              <h3 className="mb-6 text-2xl font-bold text-mint">
                General information
              </h3>
              <div className="space-y-6">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="title"
                    className="block text-xl tracking-wider text-lightGreen"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter request title"
                    className="w-full rounded-full bg-lightBlur px-4 py-2 text-lightGreen placeholder-lightGreen focus:outline-none md:w-3/4"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="description"
                    className="block text-xl tracking-wider text-lightGreen"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter request description"
                    className="w-full rounded-md bg-lightBlur px-4 py-2 text-lightGreen placeholder-lightGreen focus:outline-none"
                    rows={4}
                  />
                </div>
              </div>
            </section>

            {/* Currency Section */}
            <section
              ref={sectionRefs.currency}
              id="currency"
              className="relative scroll-mt-8 overflow-hidden rounded-xl border border-whiteTrans bg-lightBackground p-6 pb-24 md:px-8 md:pt-8"
            >
              <img
                src={"/assets/vectors/opCurrency.svg"}
                className="absolute bottom-0 right-0 w-full"
              />
              <h3 className="mb-6 text-2xl font-bold text-mint">Currency</h3>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="currency"
                  className="block text-xl tracking-wider text-lightGreen"
                >
                  Select Currency
                </label>
                <Listbox
                  value={formData.currency}
                  onChange={handleCurrencyChange}
                >
                  <div className="relative mt-1">
                    <Listbox.Button className="relative flex w-full cursor-pointer flex-row rounded-full bg-lightBlur py-3 px-6 text-center text-sm text-lightGreen focus:outline-none md:w-1/2">
                      <span className="block truncate">
                        {formData.currency.name}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronDownIcon
                          className="h-5 w-5 text-lightGreen"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full cursor-pointer overflow-auto rounded-md bg-greenFooter py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-sm focus:outline-none sm:text-sm md:w-1/2">
                        {currency.map((currency) => (
                          <Listbox.Option
                            key={currency.id}
                            className={({ active }) =>
                              `relative cursor-pointer select-none py-2 pl-6 pr-4 ${
                                active ? "text-mint" : "text-lightGreen"
                              }`
                            }
                            value={currency}
                          >
                            {({ selected }) => (
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {currency.name}
                              </span>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </section>

            {/* Bond Section */}
            <section
              ref={sectionRefs.bond}
              id="bond"
              className="relative scroll-mt-8 overflow-hidden rounded-xl border border-whiteTrans bg-greenFooter p-6 md:px-8 md:pt-8"
            >
              <img
                src={"/assets/ceorstv / opBond.svg"}
                className="absolute right-0 top-0 z-0 w-full translate-x-16 -translate-y-20"
              />
              <h3 className="z-20 mb-6 text-2xl font-bold text-mint">Bond</h3>
              <div className="z-20 space-y-6">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="bond"
                    className="block text-xl tracking-wider text-lightGreen"
                  >
                    Bond Amount (in Wei)
                  </label>
                  <input
                    id="bond"
                    name="bond"
                    value={formData.bond}
                    onChange={handleInputChange}
                    placeholder={
                      isMinimumBondLoading
                        ? "Loading minimum bond..."
                        : `Minimum bond: ${minimumBond}`
                    }
                    className="z-20 w-full rounded-full bg-lightBlur px-4 py-2 text-lightGreen placeholder-lightGreen focus:outline-none md:w-1/2"
                  />
                </div>
                <div className="flex items-center">
                  <label
                    className={classNames("flex gap-3 pt-4", styles.checkbox)}
                  >
                    <input
                      type="checkbox"
                      id="useMinimumBond"
                      name="useMinimumBond"
                      checked={isCheckboxChecked}
                      onChange={(e) => {
                        handleCheckboxChange(e);
                        if (e.target.checked && minimumBond) {
                          setFormData((prev) => ({
                            ...prev,
                            bond: minimumBond.toString(),
                          }));
                        }
                      }}
                      className={styles.checkbox}
                    />
                    <span className={styles.checkmark}></span>
                    <label
                      htmlFor="useMinimumBond"
                      className="cursor-pointer text-sm text-lightGreen"
                    >
                      Use minimum bond
                    </label>
                  </label>
                </div>
              </div>
            </section>

            {/* Challenge Period Section */}
            <section
              ref={sectionRefs.challengePeriod}
              id="challengePeriod"
              className="relative scroll-mt-8 rounded-xl border border-whiteTrans bg-lightBackground p-6 md:px-8 md:pt-8"
            >
              <img
                src="/assets/vectors/lightDot.svg"
                className="absolute bottom-0 left-10 h-6 w-6 translate-y-3"
              />
              <h3 className="mb-6 text-2xl font-bold text-mint">
                Challenge Period
              </h3>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="challengePeriod"
                  className="block text-xl tracking-wider text-lightGreen"
                >
                  Challenge Period Duration (in seconds)
                </label>
                <input
                  id="challengePeriod"
                  name="challengePeriod"
                  value={formData.challengePeriod}
                  onChange={handleInputChange}
                  placeholder="Minimum: 7200 sec"
                  className="w-full rounded-full bg-lightBlur px-4 py-2 text-lightGreen placeholder-lightGreen focus:outline-none md:w-1/2"
                />
              </div>
              <div className="mt-4 flex items-center">
                <label
                  className={classNames("flex gap-3 pt-4", styles.checkbox)}
                >
                  <input
                    type="checkbox"
                    id="useMinimumChallengePeriod"
                    name="useMinimumChallengePeriod"
                    checked={isMinimumChallengePeriodChecked}
                    onChange={(e) => {
                      handleMinimumChallengePeriodCheckboxChange(e);
                      if (e.target.checked) {
                        setFormData((prev) => ({
                          ...prev,
                          challengePeriod: "7200",
                        }));
                      }
                    }}
                    className={styles.checkbox}
                  />
                  <span className={styles.checkmark}></span>
                  <label
                    htmlFor="useMinimumChallengePeriod"
                    className="cursor-pointer text-sm text-lightGreen"
                  >
                    Use minimum challenge period (7200 seconds)
                  </label>
                </label>
              </div>
            </section>

            {/* Review and Submit Section */}
            <section
              ref={sectionRefs.review}
              id="review"
              className="relative scroll-mt-8 rounded-xl border border-whiteTrans bg-greenFooter p-6 md:px-8 md:pt-8"
            >
              <h3 className="mb-6 text-2xl font-bold text-mint">
                Review and Submit
              </h3>
              <div className="space-y-6">
                <div className="rounded-lg border border-whiteTrans bg-xlightBlur p-6">
                  <h4 className="mb-4 text-lg font-semibold text-lightGreen">
                    Request Summary
                  </h4>
                  <ul className="space-y-2 text-sm text-lightGreen">
                    <li>
                      <strong>Title:</strong> {formData.title || "N/A"}
                    </li>
                    <li>
                      <strong>Description:</strong>{" "}
                      {formData.description || "N/A"}
                    </li>
                    <li>
                      <strong>Currency:</strong>{" "}
                      {formData.currency?.name || "N/A"}
                    </li>
                    <li>
                      <strong>Bond Amount:</strong>{" "}
                      {formData.bond ? `${formData.bond} Wei` : "N/A"}
                    </li>
                    <li>
                      <strong>Challenge Period:</strong>{" "}
                      {formData.challengePeriod
                        ? `${formData.challengePeriod} seconds`
                        : "N/A"}
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-3">
                  {!isWalletConnected && <WalletConnection />}
                  {isWalletConnected && (
                    <button
                      type="submit"
                      className="w-fit rounded-full border border-darkGreen bg-mint py-4 px-6 text-sm uppercase tracking-wider text-darkGreen transition-colors hover:border-mint hover:bg-darkGreen hover:text-mint"
                      onClick={handleSubmit}
                    >
                      {!isProcessing ? "Submit Request" : "Processing..."}
                    </button>
                  )}
                  {isNetworkMismatch && (
                    <div className="font-bold text-redDown">
                      Please change network to{" "}
                      {chain.network === "sepolia" ? "Mainnet" : "Testnet"}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </BoxContainer>

      {toastContent.title && (
        <Toast
          key={toastKey}
          title={toastContent.title}
          text={toastContent.text}
          txHash={toastContent.txhash}
          type={toastContent.type as ToastType}
        />
      )}
    </div>
  );
};

export default Request;
