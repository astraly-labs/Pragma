#[contract]
use array::ArrayTrait;
use option::OptionTrait;


struct BaseEntry {
    timestamp: felt, // Timestamp of the most recent update, UTC epoch
    source: felt, // UTF-8 encoded uppercased string, e.g. "GEMINI"
    publisher: felt, // UTF-8 encoded uppercased string, e.g. "CONSENSYS"
// Publisher of the data (usually the source, but occasionally a third party)
}

struct SpotEntry {
    base: BaseEntry,
    pair_id: felt, // UTF-8 encoded uppercased string, e.g. "ETH/USD"
    price: felt, // Price shifted to the left by decimals
    volume: felt, // Volume aggregated into this market price
}

struct Checkpoint {
    timestamp: felt,
    value: felt,
    aggregation_mode: felt,
    num_sources_aggregated: felt,
}

struct EmpiricPricesResponse {
    price: felt,
    decimals: felt,
    last_updated_timestamp: felt,
    num_sources_aggregated: felt,
}
struct FutureEntry {
    base: BaseEntry,
    pair_id: felt,
    price: felt,
    expiry_timestamp: felt,
}

struct GenericEntry {
    base: BaseEntry,
    key: felt, //may be renamed to pair_id ? 
    value: felt,
}


trait IEmpiricOracle {
    //
    //Getters
    //

    //type represents the type_of of price, e.g. spot, future, etc.

    fn get_price_info<T>(
        pair_id: felt, aggregation_mode: felt, expiry_timestamp: Option::<T>, type_of: felt
    ) -> EmpiricPricesResponse;
    fn get_price_entry<T>(pair_id: felt, source: felt, type_of: felt) -> Option::<T>;
    fn get_price_median(pair_id: felt, type_of: felt) -> EmpiricPricesResponse;
    fn get_price_entries<T>(pair_id: felt, type_of: felt) -> Array::<T>;
    fn get_price_entries_for_sources<T>(
        pair_id: felt, sources: Array::<felt>, type_of: felt
    ) -> Array::<T>;
    fn get_price_decimals(pair_id: felt, type_of: felt) -> felt;
    fn get_last_price_checkpoint_before(
        pair_id: felt, timestamp: felt, type_of: felt
    ) -> (Checkpoint, felt);
}
