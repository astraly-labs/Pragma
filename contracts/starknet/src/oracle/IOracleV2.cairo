#[contract]
use array::ArrayTrait;
use option::OptionTrait;
use entry::structs;

trait IOracle {
    //
    //Initializer
    //
    fn initializer(
        proxy_admin: felt,
        publisher_registry_address: felt,
        currencies: Array::<Currency>,
        pairs: Array::<Pair>
    );
    //
    //Getters 
    //

    fn get_price_decimals(pair_id: felt, type_of: felt) -> felt;
    fn get_price_median(pair_id: felt, type_of: felt) -> EmpiricPricesResponse;
    fn get_price_median_for_sources(
        pair_id: felt, sources: Array::<felt>, type_of: felt
    ) -> EmpiricPricesResponse;
    fn get_price_median_multi(
        pair_ids: Array::<Pair>, type_of: felt
    ) -> Array::<EmpiricPricesResponse>;
    fn get_price(pair_id: felt, aggregation_mode: felt, type_of: felt) -> EmpiricPricesResponse;
    fn get_price_for_sources(
        pair_id: felt, aggregation_mode: felt, sources: Array::<felt>, type_of: felt
    ) -> EmpiricPricesResponse;
    fn get_price_entries_for_sources<T>(pair_id: felt, sources: Array::<felt>) -> Array::<T>;
    fn get_price_entries<T>(pair_id: felt, type_of: felt) -> Array::<T>;
    fn get_price_entry<T>(pair_id: felt, source: felt, type_of: felt) -> T;
    fn get_spot_with_USD_hop(
        base_currency_id: felt, quote_currency_id: felt, aggregation_mode: felt
    ) -> EmpiricPricesResponse;
    fn get_spot_with_hop(
        currency_ids: Array::<felt>, aggregation_mode: felt
    ) -> EmpiricPricesResponse;
    fn get_admin_address() -> felt;
    fn get_publisher_registry_address() -> felt;
    fn get_latest_checkpoint_index() -> felt;
    fn get_checkpoint(key: felt, index: felt) -> Checkpoint;
    fn get_sources_threshold() -> felt;
    fn get_last_price_checkpoint_before(
        pair_id: felt, timestamp: felt, type_of: felt
    ) -> (Checkpoint, felt);
    //
    //Setters
    //

    fn publish_price<T>(new_price: T);
    fn publish_entries<T>(new_prices: Array::<T>);
    fn set_admin_address(new_admin_address: felt);
    fn update_publisher_registry_address(new_publisher_registry_address: felt);
    fn add_currency(currency: Currency);
    fn update_currency(currency: Currency);
    fn add_pair(pair: Pair);
    fn set_checkpoint(
        pair_id: felt, aggregation_mode: felt
    ); //TODO: check if this function can be generic
    fn set_sources_threshold(new_sources_threshold: felt);
}

