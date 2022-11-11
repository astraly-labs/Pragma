%lang starknet

from entry.structs import Checkpoint, SpotEntry, FutureEntry, GenericEntry, Pair, Currency

namespace EmpiricAggregationModes {
    const MEDIAN = 84959893733710;  // str_to_felt("MEDIAN")
}

@contract_interface
namespace IOracle {
    func initializer(
        proxy_admin: felt,
        publisher_registry_address: felt,
        currencies_len: felt,
        currencies: Currency*,
        pairs_len: felt,
        pairs: Pair*,
    ) {
    }
    //
    // Getters
    //

    func get_spot_decimals(pair_id: felt) -> (decimals: felt) {
    }

    func get_spot_median(pair_id: felt) -> (
        price: felt, decimals: felt, last_updated_timestamp: felt, num_sources_aggregated: felt
    ) {
    }

    func get_spot_median_for_sources(pair_id: felt, sources_len: felt, sources: felt*) -> (
        price: felt, decimals: felt, last_updated_timestamp: felt, num_sources_aggregated: felt
    ) {
    }

    func get_spot(pair_id: felt, aggregation_mode: felt) -> (
        price: felt, decimals: felt, last_updated_timestamp: felt, num_sources_aggregated: felt
    ) {
    }

    func get_spot_for_sources(
        pair_id: felt, aggregation_mode: felt, sources_len: felt, sources: felt*
    ) -> (value: felt, decimals: felt, last_updated_timestamp: felt, num_sources_aggregated: felt) {
    }

    func get_spot_entries_for_sources(pair_id: felt, sources_len: felt, sources: felt*) -> (
        entries_len: felt, entries: SpotEntry*
    ) {
    }

    func get_spot_entries(pair_id: felt) -> (entries_len: felt, entries: SpotEntry*) {
    }

    func get_spot_entry(pair_id: felt, source: felt) -> (entry: SpotEntry) {
    }

    func get_future_entry(pair_id: felt, expiry_timestamp, source: felt) -> (entry: FutureEntry) {
    }

    func get_value(key) -> (
        price: felt, decimals: felt, last_updated_timestamp: felt, num_sources_aggregated: felt
    ) {
    }

    // TODO (rlkelly): add adapters for currency conversion
    // func get_spot_with_hops(
    //     currency_ids_len : felt, currency_ids : felt*, aggregation_mode : felt
    // ) -> (
    //     value : felt, decimals : felt, last_updated_timestamp : felt, num_sources_aggregated : felt
    // ):
    // end

    func get_spot_with_USD_hop(base_currency_id, quote_currency_id, aggregation_mode) -> (
        price: felt, decimals: felt, last_updated_timestamp: felt, num_sources_aggregated: felt
    ) {
    }

    func get_admin_address() -> (admin_address: felt) {
    }

    func get_publisher_registry_address() -> (publisher_registry_address: felt) {
    }

    func get_latest_checkpoint_index(key: felt) -> (latest: felt) {
    }

    func get_checkpoint(key: felt, index: felt) -> (checkpoint: Checkpoint) {
    }

    func get_sources_threshold() -> (threshold: felt) {
    }

    //
    // Setters
    //
    func publish_entry(new_entry: GenericEntry) {
    }

    func publish_entries(new_entries_len, new_entries: GenericEntry*) {
    }

    func publish_future_entry(new_entry: FutureEntry) {
    }

    func publish_future_entries(new_entries_len: felt, new_entries: FutureEntry*) {
    }

    func publish_spot_entry(new_entry: SpotEntry) {
    }

    func publish_spot_entries(new_entries_len: felt, new_entries: SpotEntry*) {
    }

    func set_admin_address(new_admin_address: felt) {
    }

    func update_publisher_registry_address(publisher_registry_address: felt) {
    }

    func add_currency(currency: Currency) {
    }

    func update_currency(currency: Currency) {
    }

    func add_pair(pair: Pair) {
    }

    func set_checkpoint(pair_id: felt, aggregation_mode: felt) {
    }

    func set_sources_threshold(threshold: felt) {
    }

    func get_last_spot_checkpoint_before(pair_id: felt, timestamp: felt) -> (
        checkpoint: Checkpoint, idx: felt
    ) {
    }
}
