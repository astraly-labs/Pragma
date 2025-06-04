"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormData } from "../../_types";

export function NewFeed() {
  const [validationError, setValidationError] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    type: "api",
    assetAddress: "",
    tokenName: "",
    ticker: "",
    network: "",
    selectedPairs: [],
    sources: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const validateFields = () => {
    if (formData.type === "api") {
      if (!formData.network) {
        setError("Please select a network");
        return false;
      }
      if (formData.network !== "Unknown" && !formData.assetAddress) {
        setError("Please enter an asset address");
        return false;
      }
      if (!formData.tokenName) {
        setError("Please enter a token name");
        return false;
      }
      if (!formData.ticker) {
        setError("Please enter a ticker");
        return false;
      }
    }
    setError("");
    return true;
  };

  const handleFieldChange = (
    name: string,
    value: string | boolean | [],
    isRequired?: boolean
  ) => {
    setFormData({ ...formData, [name]: value });
    isRequired &&
      setValidationError(
        validationError.filter((errorItem) => errorItem !== name)
      );
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const body: Record<string, any> = {
        token_config: {
          name: formData.tokenName,
          ticker: formData.ticker.toUpperCase(),
          decimals: 18,
          addresses: {},
        },
      };

      if (formData.network !== "Unknown" && formData.assetAddress) {
        body.token_config.addresses[formData.network.toLowerCase()] =
          formData.assetAddress;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_OAAS_API}/feeds/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to add token");
      }

      return res.json();
    },
    onSuccess: () => {
      handleFieldChange("sources", []);
      handleFieldChange("selectedPairs", []);
      handleFieldChange("submitSuccess", true);
      queryClient.invalidateQueries({ queryKey: ["FEEDS"] });
    },
    onError: (err: any) => {
      setError(err.message);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async () => {
    if (!validateFields()) return false;

    if (formData.sources?.length > 0) {
      handleFieldChange("sources", []);
      return true;
    }

    setIsSubmitting(true);
    mutation.mutate();
    return true;
  };

  return (
    <DialogContent className="sm:max-w-[500px] bg-[#0a1a14] text-white border-gray-800 max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl font-normal pb-6">
          Create a data feed
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-8">
        <div className="space-y-2">
          <label className="font-semibold text-lightGreen">Network</label>
          <p className="mb-2 text-justify text-sm text-gray-500">
            Select the primary network for the asset (the one with the most
            liquidity). We support multi-networks, but not from the frontend
            yet, so please{" "}
            <a
              href="https://t.me/BGLabs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mint"
            >
              reach out to us
            </a>{" "}
            if you need to add networks or if you need support for another
            network.
          </p>
          <Listbox
            value={formData.network || "Unknown"}
            onChange={(value) => handleFieldChange("network", value)}
          >
            <div className="relative">
              <Listbox.Button className="relative flex w-full cursor-pointer flex-row rounded-full bg-lightBlur py-3 px-6 text-center text-sm text-lightGreen focus:outline-none">
                <span className="block truncate">
                  {formData.network || "Unknown"}
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
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full cursor-pointer overflow-auto rounded-md bg-greenFooter py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-sm focus:outline-none sm:text-sm">
                  {[
                    "Unknown",
                    "Ethereum",
                    "Solana",
                    "Base",
                    "Bnb",
                    "Starknet",
                  ].map((network) => (
                    <Listbox.Option
                      key={network}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-6 pr-4 ${
                          active ? "text-mint" : "text-lightGreen"
                        }`
                      }
                      value={network}
                    >
                      {({ selected }) => (
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {network}
                        </span>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        {formData.network !== "Unknown" && (
          <div className="flex flex-col">
            <label className="pb-2 pt-4 font-semibold text-lightGreen">
              Asset Address
            </label>
            <p className="mb-4 max-w-xl text-sm text-gray-500">
              Enter the address of the asset you want to track.
            </p>
            <div className="relative max-w-xl">
              <input
                type="text"
                value={formData.assetAddress}
                onChange={(e) =>
                  handleFieldChange("assetAddress", e.target.value)
                }
                placeholder="0x..."
                className="w-full rounded-full bg-lightBlur px-6 py-2 text-lightGreen placeholder-lightGreen placeholder-opacity-50 focus:outline-none"
              />
              {formData.assetAddress && (
                <button
                  onClick={() => handleFieldChange("assetAddress", "")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5 text-lightGreen hover:text-mint"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        <div className="flex max-w-xl flex-col">
          <label className="font-semibold text-lightGreen">Token Name</label>
          <p className="mb-4 mt-2 text-sm text-gray-500">
            Provide the official name of the token. This will be used to help us
            scrape the sources available for the token.
          </p>
          <div className="relative">
            <input
              type="text"
              value={formData.tokenName}
              onChange={(e) => handleFieldChange("tokenName", e.target.value)}
              placeholder="bitcoin, ethereum, etc."
              className="w-full rounded-full bg-lightBlur px-6 py-2 text-lightGreen placeholder-lightGreen placeholder-opacity-50 focus:outline-none"
            />
            {formData.tokenName && (
              <button
                onClick={() => handleFieldChange("tokenName", "")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 text-lightGreen hover:text-mint"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="flex max-w-xl flex-col">
          <label className="font-semibold text-lightGreen">Ticker</label>
          <p className="mb-2 text-sm text-gray-500">
            Enter the ticker symbol, e.g., BTC, ETH.
          </p>
          <div className="relative">
            <input
              type="text"
              value={formData.ticker}
              onChange={(e) => handleFieldChange("ticker", e.target.value)}
              placeholder="BTC, ETH, etc."
              className="w-full rounded-full bg-lightBlur px-6 py-2 text-lightGreen placeholder-lightGreen placeholder-opacity-50 focus:outline-none"
            />
            {formData.ticker && (
              <button
                onClick={() => handleFieldChange("ticker", "")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 text-lightGreen hover:text-mint"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        {error && <div className="text-sm text-red-500">{error}</div>}
        {isSubmitting && (
          <div className="text-sm text-mint">Adding token...</div>
        )}
        <div className="pt-2">
          <Button
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
