use pragma_lib::abi::{IOracleABIDispatcher, IOracleABIDispatcherTrait};
use pragma_lib::types::{AggregationMode, DataType, PragmaPricesResponse};
use starknet::ContractAddress;

fn get_asset_price_median(
    oracle_address: ContractAddress, asset: DataType
) -> u128 {
    let oracle_dispatcher = IOracleABIDispatcher {
        contract_address: oracle_address
    };
    let output: PragmaPricesResponse = oracle_dispatcher
        .get_data(asset, AggregationMode::Median(()));
    return output.price;
}
