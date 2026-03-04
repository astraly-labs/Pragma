"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import CopyButtonComponent from "../common/CopyCode";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import cb from "./cb";
import { useHasMounted } from "@/lib/has-mounted";

interface Category {
  title: string;
}

export default function CodeSnippet() {
  const hasMounted = useHasMounted();
  const [activeTab, setActiveTab] = useState(0);
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

  if (!hasMounted) {
    return null;
  }

  return (
    <div
      className="relative h-auto w-full border border-lightGreen/20 rounded-2xl p-6 pb-40 lg:min-h-[650px] lg:w-5/12"
    >
      <div className="w-full">
        <div className="flex rounded-full bg-lightBlur md:space-x-1">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={clsx(
                "w-full rounded-full p-2 text-sm font-medium leading-5 tracking-wider sm:p-4 md:p-6",
                "focus:outline-none",
                activeTab === index
                  ? "bg-mint text-darkGreen"
                  : "text-lightGreen hover:text-white"
              )}
            >
              {category.title}
            </button>
          ))}
        </div>
        <div className="h-full">
          <AnimatePresence mode="wait">
            {activeTab === 0 && (
              <motion.div
                key="tab-0"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="h-full pt-6 font-mono leading-7 text-codeColor"
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
              </motion.div>
            )}
            {activeTab === 1 && (
              <motion.div
                key="tab-1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="h-full pt-6 font-mono leading-7 text-codeColor"
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
              </motion.div>
            )}
            {activeTab === 2 && (
              <motion.div
                key="tab-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="h-full pt-6 font-mono leading-7 text-codeColor"
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
