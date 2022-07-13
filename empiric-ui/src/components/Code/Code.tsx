import React, { useState } from "react";
import classNames from "classnames";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CodeLine, { CodeLineProps } from "./CodeLine";

const lines: CodeLineProps[] = [
  {
    text: "Creating local dev environment",
    prefix: "output",
  },
  {
    text: "Checking dev dependencies",
    prefix: "output",
  },
  {
    text: "Successful integration of Empiric",
    prefix: "check",
  },
];

const Code = () => {
  const [isCopied, setIsCopied] = useState(false);

  /**
   * Sets isCopied to true for 1.5 second
   */
  async function copyCode() {
    setIsCopied(true);
    await new Promise((f) => setTimeout(f, 1500));
    setIsCopied(false);
  }

  return (
    <div className="w-full max-w-3xl font-mono">
      <div className="relative rounded-lg bg-slate-700">
        <div className="flex space-x-2 pl-3 pt-3">
          <span className="block h-3 w-3 rounded-full bg-white bg-opacity-40 hover:bg-red-500" />
          <span className="block h-3 w-3 rounded-full bg-white bg-opacity-40 hover:bg-yellow-500" />
          <span className="block h-3 w-3 rounded-full bg-white bg-opacity-40 hover:bg-green-500" />
        </div>
        <pre>
          <code className="flex flex-col space-y-3 overflow-auto py-8 text-lg font-medium leading-normal sm:overflow-visible sm:text-xl">
            <div className="relative w-full px-8 text-white">
              <span className="absolute left-1 flex h-full items-center">
                <ChevronRightIcon className="h-8 w-8 opacity-50" />
              </span>
              <CopyToClipboard
                text="pip install empiric-network"
                onCopy={() => copyCode()}
              >
                <span className="cursor-pointer rounded-md bg-white bg-opacity-10 py-1 px-2 transition-colors duration-150 hover:bg-opacity-20">
                  {`%lang starknet

                  # Oracle Interface Definition
                  const ORACLE_CONTROLLER_ADDRESS = 0x012fadd18ec1a23a160cc46981400160fbf4a7a5eed156c4669e39807265bcd4
                  const KEY = 28556963469423460  # str_to_felt("eth/usd")
                  const AGGREGATION_MODE = 120282243752302  # str_to_felt("median")

                  @contract_interface
                  namespace IEmpiricOracle:
                      func get_value(key : felt, aggregation_mode : felt) -> (
                          value : felt, decimals : felt, last_updated_timestamp : felt, num_sources_aggregated : felt
                      ):
                      end
                  end

                  # Your function
                  @view
                  func my_func() -> ():
                      let (eth_price, decimals, last_updated_timestamp, num_sources_aggregated) = IOracleController.get_value(
                          ORACLE_CONTROLLER_ADDRESS, KEY, AGGREGATION_MODE
                      )
                      # Your smart contract logic!
                      return ()
                  end`}
                </span>
              </CopyToClipboard>
              <div
                className={classNames(
                  isCopied ? "w-20 lg:w-32 xl:w-40" : "w-40 lg:w-64 xl:w-72",
                  "absolute top-1/2 left-full -ml-48 hidden translate-x-2 -translate-y-1/2 whitespace-normal rounded-md bg-indigo-500 p-4 text-base font-normal text-white transition-all duration-300 md:block"
                )}
              >
                {isCopied ? "Copied!" : "Just copy the command to get started."}
                <svg
                  className="absolute right-full top-1/2 -translate-y-1/2 text-indigo-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="22"
                  fill="currentColor"
                  viewBox="0 0 8 22"
                >
                  <path d="M7.414 2.758L.586 9.586a2 2 0 000 2.828l6.828 6.828A2 2 0 018 20.657V1.343a2 2 0 01-.586 1.415z"></path>
                </svg>
              </div>
            </div>
            {lines.map((line, i) => (
              <CodeLine text={line.text} prefix={line.prefix} key={i} />
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default Code;
