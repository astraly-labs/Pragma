import React, { useState } from "react";
import styles from "./styles.module.scss";
import BoxContainer from "../components/common/BoxContainer";
import classNames from "classnames";
import { Listbox, Transition } from "@headlessui/react";
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useRouter } from "next/router";

const currencies = [
  { id: 1, name: "USDC" },
  { id: 2, name: "STRK" },
  { id: 3, name: "AUSD" },
];

const Request = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    timestamp: "",
    bond: "",
    currency: currencies[0],
    challengePeriod: "",
    expirationTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCurrencyChange = (selectedCurrency) => {
    setFormData((prevState) => ({
      ...prevState,
      currency: selectedCurrency,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  const router = useRouter();

  return (
    <div
      className={classNames(
        "relative w-full overflow-x-hidden",
        styles.bigScreen
      )}
    >
      <BoxContainer>
        <div className="pb-20"></div>
      </BoxContainer>
      <form onSubmit={handleSubmit}>
        <BoxContainer>
          <div className="flex w-full flex-row gap-4">
            <button
              onClick={() => {
                // Go back to the previous page
                router.back();
              }}
              className="my-auto flex cursor-pointer items-center gap-2 rounded-full border border-lightGreen p-2 text-left text-sm uppercase tracking-widest text-lightGreen hover:bg-lightGreen hover:text-darkGreen"
            >
              <ArrowLeftIcon className="w-4" />
            </button>
            <h2 className=" text-lightGreen">Submit a request</h2>
          </div>
        </BoxContainer>
        <BoxContainer>
          <div className="flex w-full flex-col gap-10 lg:w-8/12 xl:w-7/12">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="title"
                className="block pb-3 text-xl tracking-wider text-lightGreen"
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
                className="w-full rounded-full bg-lightBlur px-4 py-2 text-lightGreen placeholder-lightGreen focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label
                htmlFor="description"
                className="block pb-3 text-xl tracking-wider text-lightGreen"
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

            <div className="flex flex-col gap-3">
              <label
                htmlFor="timestamp"
                className="block pb-3 text-xl tracking-wider text-lightGreen"
              >
                Timestamp
              </label>
              <input
                type="datetime-local"
                id="timestamp"
                name="timestamp"
                value={formData.timestamp}
                onChange={handleInputChange}
                className="w-full rounded-full bg-lightBlur px-4 py-2 text-lightGreen placeholder-lightGreen focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label
                htmlFor="bond"
                className="block pb-3 text-xl tracking-wider text-lightGreen"
              >
                Bond
              </label>
              <input
                type="number"
                id="bond"
                name="bond"
                value={formData.bond}
                onChange={handleInputChange}
                placeholder="Enter bond amount"
                className="w-full rounded-full bg-lightBlur px-4 py-2 text-lightGreen placeholder-lightGreen focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label
                htmlFor="currency"
                className="block pb-3 text-xl tracking-wider text-lightGreen"
              >
                Currency
              </label>
              <Listbox
                value={formData.currency}
                onChange={handleCurrencyChange}
              >
                <div className="relative mt-1">
                  <Listbox.Button className="relative flex w-full cursor-pointer  flex-row rounded-full bg-lightBlur py-3 px-6 text-center text-sm text-lightGreen focus:outline-none">
                    <span className="block truncate">
                      {formData.currency.name}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-darkGreen py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {currencies.map((currency) => (
                        <Listbox.Option
                          key={currency.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-lightGreen text-darkGreen"
                                : "text-lightGreen"
                            }`
                          }
                          value={currency}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {currency.name}
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

            <div className="flex flex-col gap-3">
              <label
                htmlFor="challengePeriod"
                className="block pb-3 text-xl tracking-wider text-lightGreen"
              >
                Challenge Period Duration
              </label>
              <input
                type="text"
                id="challengePeriod"
                name="challengePeriod"
                value={formData.challengePeriod}
                onChange={handleInputChange}
                placeholder="Enter challenge period (e.g., 3 days)"
                className="w-full rounded-full bg-lightBlur px-4 py-2 text-lightGreen placeholder-lightGreen focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label
                htmlFor="expirationTime"
                className="block pb-3 text-xl tracking-wider text-lightGreen"
              >
                Expiration Time
              </label>
              <input
                type="datetime-local"
                id="expirationTime"
                name="expirationTime"
                value={formData.expirationTime}
                onChange={handleInputChange}
                className="w-full rounded-full bg-lightBlur px-4 py-2 text-lightGreen placeholder-lightGreen focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="w-fit rounded-full border border-darkGreen bg-mint py-4 px-6 text-sm uppercase tracking-wider text-darkGreen transition-colors hover:border-mint hover:bg-darkGreen hover:text-mint"
              >
                Submit Request
              </button>
            </div>
          </div>
        </BoxContainer>
      </form>
    </div>
  );
};

export default Request;
