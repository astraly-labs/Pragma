import React from "react";
import styles from "./styles.module.scss";
import GreenBox from "../common/GreenBox";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import CopyButtonComponent from "../common/CopyCode";

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

  return (
    <GreenBox className="relative w-full pb-40 lg:w-5/12">
      <div className=" w-full">
        <Tab.Group>
          <Tab.List className="flex rounded-full bg-lightBlur md:space-x-1">
            {categories.map((category, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-full p-2 text-sm font-medium leading-5 tracking-wider sm:p-4 md:p-6",
                    "focus:outline-none",
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
          <Tab.Panels className={"h-full overflow-x-auto"}>
            <Tab.Panel
              className={"h-full pt-6 font-mono leading-7 text-codeColor"}
              key={1}
            >
              <span className={"italic"}>fn </span>
              <span className={classNames(styles.purpleCode)}>
                get_asset_price_median
              </span>
              (<span className={"italic"}>oracle_address: </span>
              <span className={classNames(styles.greenCode)}>
                ContractAddress
              </span>
              ,<span className={"italic"}> asset: </span>{" "}
              <span className={classNames(styles.greenCode)}>DataType</span> ){" "}
              {"->"} u128 {"{"}
              <br />
              <span className={"pl-5 italic"}>let </span> oracle_dispatcher =
              <span className={classNames(styles.greenCode)}>
                IOracleABIDispatcher
              </span>
              {"{"}contract_address : oracle_address{"}"}; <br />
              <span className={"pl-5 italic"}>let </span> output :{" "}
              <span className={classNames(styles.greenCode)}>
                PragmaPricesResponse
              </span>{" "}
              = oracle_dispatcher.
              <span className={classNames(styles.purpleCode)}>get_data</span>
              (asset,{" "}
              <span className={classNames(styles.greenCode)}>
                AggregationMode
              </span>
              :: <span className={classNames(styles.greenCode)}>Median</span>
              (()));
              <br />
              <span className={"pl-5 italic"}>return </span> output.price;
              <br />
              {"}"}
              <div className="absolute bottom-9">
                <CopyButtonComponent
                  textToCopy={`fn get_asset_price_median(oracle_address: ContractAddress, asset : DataType) -> u128  { 
                    let oracle_dispatcher = IOracleABIDispatcher{contract_address : oracle_address};
                    let output : PragmaPricesResponse= oracle_dispatcher.get_data(asset, AggregationMode::Median(()));
                    return output.price;
                }`}
                />
              </div>
            </Tab.Panel>
            <Tab.Panel
              className={"h-full pt-6 font-mono leading-7 text-codeColor"}
              key={2}
            >
              <span className={"italic"}>fn </span>
              <span className={classNames(styles.purpleCode)}>
                compute_volatility
              </span>
              (data_type:{" "}
              <span className={classNames(styles.greenCode)}>DataType</span>,
              aggregation_mode:{" "}
              <span className={classNames(styles.greenCode)}>
                AggregationMode
              </span>
              ) {"->"} u128 <br />
              {"{"}
              <br />
              <span className={"pl-5 italic"}>let </span> start_tick = {""}
              starknet::
              <span className={classNames(styles.purpleCode)}>
                get_block_timestamp
              </span>
              () - <span className={classNames(styles.greenCode)}>604800</span>;
              <br />
              <span className={"pl-5 italic"}>let </span> end_tick = {""}
              starknet::
              <span className={classNames(styles.purpleCode)}>
                get_block_timestamp
              </span>
              (); <br />
              [...]
              <br />
              <span className={"pl-5 italic"}>let </span> (volatility, decimals)
              = summary_dispatcher.
              <span className={classNames(styles.purpleCode)}>
                calculate_volatility
              </span>
              (data_type, start_tick, end_tick, num_samples, aggregation_mode);
              <br />
              <span className={"pl-5 italic"}>return </span> summary_dispatcher
              = volatility;
              <br />
              {"}"}
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
              <span className={"italic"}>fn </span>
              <span className={classNames(styles.purpleCode)}>
                get_last_random
              </span>
              (<span className={"italic"}>self: </span>@
              <span className={classNames(styles.greenCode)}>
                TContractState
              </span>
              ) {"->"} felt252;
              <br />
              <span className={"italic"}>fn </span>{" "}
              <span className={classNames(styles.purpleCode)}>
                request_my_randomness(
              </span>
              <br /> <span className={"pl-5 italic"}>ref self: </span>{" "}
              <span className={classNames(styles.greenCode)}>
                TContractState
              </span>
              ,
              <br />
              <span className={"pl-5 italic"}>seed: </span> u64,
              <br />
              <span className={"pl-5 italic"}>callback_address: </span>
              <span className={classNames(styles.greenCode)}>
                ContractAddress
              </span>
              ,<br />
              <span className={"pl-5 italic"}>callback_fee_limit: </span> u128,
              <br />
              <span className={"pl-5 italic"}>publish_delay: </span> u64,
              <br />
              <span className={"pl-5 italic"}>num_words: </span> u64,
              <br />
              );
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
    </GreenBox>
  );
}
