use pragma_lib::abi::{ISummaryStatsABIDispatcher, ISummaryStatsABIDispatcherTrait};
use pragma_lib::types::{AggregationMode, DataType};
use starknet::{ContractAddress, contract_address_const};

fn compute_volatility(
    data_type: DataType, aggregation_mode: AggregationMode
) -> u128 {
    let SUMMARY_STATS_ADDRESS: ContractAddress = contract_address_const::<
        0x6421fdd068d0dc56b7f5edc956833ca0ba66b2d5f9a8fea40932f226668b5c4
    >();

    let start_tick = starknet::get_block_timestamp() - 604800;
    let end_tick = starknet::get_block_timestamp();
    let num_samples = 200;

    let summary_dispatcher = ISummaryStatsABIDispatcher {
        contract_address: SUMMARY_STATS_ADDRESS
    };

    let (volatility, decimals) = summary_dispatcher
        .calculate_volatility(
            data_type, start_tick, end_tick, num_samples, aggregation_mode
        );

    return volatility;
}
