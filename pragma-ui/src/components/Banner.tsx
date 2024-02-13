import React, { useEffect, useState } from "react";
import StyledTransition from "./common/StyledTransition";
import { ExclamationIcon, XIcon } from "@heroicons/react/outline";
import { getStarknetStatus } from "../services/starknetStatus.service";

const Banner = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    /**
     * Checks whether Starknet's status is okay.
     */
    async function checkStatus() {
      const { status } = await getStarknetStatus();
      if (status !== "ok") {
        setIsOpen(true);
      }
    }
    checkStatus();
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 pb-2 sm:pb-5">
      <StyledTransition show={isOpen}>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="item-center flex flex-wrap justify-between rounded-lg bg-yellow-400 p-2 shadow-lg sm:p-3">
            <div className="flex w-0 flex-1 items-center">
              <ExclamationIcon
                className="m-2 h-6 w-6 text-slate-700"
                aria-hidden="true"
              />
              <p className="ml-3 text-slate-700">
                <span>Starknet is experiencing delays.</span>
                <span className="hidden md:inline">
                  {" "}
                  The network is taking longer to process our updates.
                </span>
              </p>
            </div>
            <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
              <a
                href="https://starknet.checklyhq.com/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center rounded-md border border-transparent bg-slate-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-600"
              >
                Check status
              </a>
            </div>
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
              <button
                type="button"
                className="flex rounded-lg p-2 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="sr-only">Dismiss</span>
                <XIcon className="h-6 w-6 text-slate-700" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </StyledTransition>
    </div>
  );
};

export default Banner;
