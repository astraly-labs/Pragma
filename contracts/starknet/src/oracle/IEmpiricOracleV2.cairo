use array::ArrayTrait;
use option::OptionTrait;
use integer::u256;


struct BaseEntry {
    timestamp: u256, // Timestamp of the most recent update, UTC epoch
    source: u256, // UTF-8 encoded uppercased string, e.g. "GEMINI"
    publisher: u256, // UTF-8 encoded uppercased string, e.g. "CONSENSYS"
// Publisher of the data (usually the source, but occasionally a third party)
}

struct SpotEntry {
    base: BaseEntry,
    pair_id: u256, // UTF-8 encoded uppercased string, e.g. "ETH/USD"
    price: u256, // Price shifted to the left by decimals
    volume: u256, // Volume aggregated into this market price
}

struct FutureEntry {
    base: BaseEntry,
    pair_id: u256,
    price: u256,
    expiry_timestamp: u256,
}

struct GenericEntry {
    base: BaseEntry,
    key: u256, //may be renamed to pair_id ? 
    value: u256,
}

struct Checkpoint {
    timestamp: u256,
    value: u256,
    aggregation_mode: u256,
    num_sources_aggregated: u256,
}

struct PragmaPricesResponse {
    price: u256,
    decimals: u256,
    last_updated_timestamp: u256,
    num_sources_aggregated: u256,
}

/// Data Types
/// The value is the `pair_id` of the data
///
/// * `Spot` - Spot price
/// * `Future` - Future price
/// * `Generic` - Generic price
enum DataType {
    Spot: u256,
    Future: u256,
    Generic: u256,
}

#[abi]
trait IPragmaOracle {

    /// Get info about some data e.g spot, future, generic
    /// Queried data should implement the `Query` trait
    ///
    /// # Arguments
    ///
    /// * `aggregation_mode` - Aggregation mode to use for the price
    /// * `expiry_timestamp` - Expiry timestamp if applicable (Futures)
    /// * `data_type` - Type of the data to get
    ///
    /// # Returns
    ///
    /// * `price` - Price of the pair
    /// * `decimals` - Number of decimals of the price
    /// * `last_updated_timestamp` - Timestamp of the most recent update, UTC epoch
    /// * `num_sources_aggregated` - Number of sources aggregated into this price
    fn get_data(
        pair_id: u256, expiry_timestamp: Option::<u256>, data_type: DataType
    ) -> PragmaPricesResponse;

    /// Get a specific data entry e.g spot, future, generic
    /// 
    /// # Arguments
    ///
    /// * `source` - UTF-8 encoded uppercased string, e.g. "GEMINI"
    /// * `data_type` - Type of the price to get
    ///
    /// # Returns
    ///
    /// * `T` - Data entry
    fn get_data_entry<T>(source: u256, data_type: DataType, aggregation_mode: u256) -> T;

    /// Get the median of some data e.g spot, future, generic
    ///
    /// # Arguments
    ///
    /// * `pair_id` - UTF-8 encoded uppercased string, e.g. "ETH/USD"
    /// * `data_type` - Type of the data to get
    ///
    /// # Returns
    ///
    /// * `price` - Median price of the pair
    fn get_data_median(data_type: DataType) -> PragmaPricesResponse;
    fn get_data_entries<T>(data_type: DataType) -> Array::<T>;
    fn get_data_entries_for_sources<T>(
        sources: Array::<u256>, data_type: DataType, aggregation_mode: u256
    ) -> Array::<T>;
    fn get_data_decimals(data_type: DataType) -> u256;
    fn get_last_data_checkpoint_before(
        timestamp: u256, data_type: DataType
    ) -> (Checkpoint, u256);
}
