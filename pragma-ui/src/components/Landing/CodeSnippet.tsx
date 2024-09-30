import React from "react";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import CopyButtonComponent from "../common/CopyCode";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import cb from "./cb";
import sharedStyles from "../../pages/styles.module.scss";

interface Category {
  title: string;
}

/**
 * Renders a code snippet component with tabs.
 * @return {JSX.Element} JSX for the code snippet component.
 */
export default function CodeSnippet() {
  const [categories] = useState<Category[]>([
    {
      title: "Price Feed",
    },
    {
      title: "Realized Vol",
    },
    {
      title: "VRF",
    },
  ]);
  const codeString = `fn get_asset_price_median(oracle_address: ContractAddress, asset : DataType) -> u128  { 
    let oracle_dispatcher = IOracleABIDispatcher{contract_address : oracle_address};
    let output : PragmaPricesResponse= oracle_dispatcher.get_data(asset, AggregationMode::Median(()));
    return output.price;
};`;
  const codeString1 = `fn compute_volatility(data_type: DataType, aggregation_mode: AggregationMode) -> u128 {
    let SUMMARY_STATS_ADDRESS: ContractAddress =
        contract_address_const::<0x6421fdd068d0dc56b7f5edc956833ca0ba66b2d5f9a8fea40932f226668b5c4>();

    let start_tick = starknet::get_block_timestamp() - 604800;
    let end_tick = starknet::get_block_timestamp();

    let num_samples = 200;
    let summary_dispatcher = ISummaryStatsABIDispatcher { contract_address: SUMMARY_STATS_ADDRESS };
    let (volatility, decimals) = summary_dispatcher
        .calculate_volatility(data_type, start_tick, end_tick, num_samples, aggregation_mode);

    return volatility; // will return the volatility multiplied by 10^decimals
}`;
  const codeString2 = `fn get_last_random(self: @TContractState) -> felt252;
  fn request_my_randomness(
      ref self: TContractState,
      seed: u64,
      callback_address: ContractAddress,
      callback_fee_limit: u128,
      publish_delay: u64,
      num_words: u64
  );
  fn receive_random_words(
      ref self: TContractState,
      requestor_address: ContractAddress,
      request_id: u64,
      random_words: Span<felt252>
  );`;

  return (
    <div
      className={classNames(
        sharedStyles.greenBox,
        "relative h-auto w-full pb-40 lg:min-h-[650px] lg:w-5/12"
      )}
    >
      <div className=" w-full">
        <Tab.Group>
          <Tab.List className="flex rounded-full bg-lightBlur md:space-x-1">
            {categories.map((category, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-full p-2 text-sm font-medium leading-5 tracking-wider sm:p-4 md:p-6",
                    "focus:outline-none ",
                    selected
                      ? "bg-mint text-darkGreen"
                      : "text-lightGreen hover:text-white"
                  )
                }
              >
                {category.title}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className={"h-full "}>
            <Tab.Panel
              className={"h-full pt-6 font-mono leading-7 text-codeColor"}
              key={1}
            >
              <SyntaxHighlighter style={cb} language="rust">
                {codeString}
              </SyntaxHighlighter>
              <div className="absolute bottom-9">
                <CopyButtonComponent
                  textToCopy={`fn get_asset_price_median(oracle_address: ContractAddress, asset : DataType) -> u128  { 
                    let oracle_dispatcher = IOracleABIDispatcher{contract_address : oracle_address};
                    let output : PragmaPricesResponse= oracle_dispatcher.get_data(asset, AggregationMode::Median(()));
                    return output.price;
                };`}
                />
              </div>
            </Tab.Panel>
            <Tab.Panel
              className={"h-full pt-6 font-mono leading-7 text-codeColor"}
              key={2}
            >
              <SyntaxHighlighter style={cb} language="rust">
                {codeString1}
              </SyntaxHighlighter>
              <div className="absolute bottom-9">
                <CopyButtonComponent
                  textToCopy={`fn compute_volatility(data_type: DataType, aggregation_mode: AggregationMode) -> u128 {
    let SUMMARY_STATS_ADDRESS: ContractAddress =
        contract_address_const::<0x6421fdd068d0dc56b7f5edc956833ca0ba66b2d5f9a8fea40932f226668b5c4>();

    let start_tick = starknet::get_block_timestamp() - 604800;
    let end_tick = starknet::get_block_timestamp();

    let num_samples = 200;
    let summary_dispatcher = ISummaryStatsABIDispatcher { contract_address: SUMMARY_STATS_ADDRESS };
    let (volatility, decimals) = summary_dispatcher
        .calculate_volatility(data_type, start_tick, end_tick, num_samples, aggregation_mode);

    return volatility; // will return the volatility multiplied by 10^decimals
}`}
                />
              </div>
            </Tab.Panel>
            <Tab.Panel
              className={"h-full pt-6 font-mono leading-7 text-codeColor"}
              key={3}
            >
              <SyntaxHighlighter style={cb} language="rust">
                {codeString2}
              </SyntaxHighlighter>

              <div className="absolute bottom-9">
                <CopyButtonComponent
                  textToCopy={`fn get_last_random(self: @TContractState) -> felt252;
    fn request_my_randomness(
        ref self: TContractState,
        seed: u64,
        callback_address: ContractAddress,
        callback_fee_limit: u128,
        publish_delay: u64,
        num_words: u64
    );
    fn receive_random_words(
        ref self: TContractState,
        requestor_address: ContractAddress,
        request_id: u64,
        random_words: Span<felt252>
    );`}
                />
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
