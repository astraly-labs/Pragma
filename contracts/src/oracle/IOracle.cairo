%lang starknet

from entry.structs import Checkpoint, Entry, Pair, Currency

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

    func get_decimals(pair_id: felt) -> (decimals: felt) {
    }

    func get_spot_entries_for_sources(pair_id: felt, sources_len: felt, sources: felt*) -> (
        entries_len: felt, entries: Entry*
    ) {
    }

    func get_spot_entries(pair_id: felt) -> (entries_len: felt, entries: Entry*) {
    }

    func get_spot_entry(pair_id: felt, source: felt) -> (entry: Entry) {
    }

    func get_spot_median(pair_id: felt) -> (
        value: felt, decimals: felt, last_updated_timestamp: felt, num_sources_aggregated: felt
    ) {
    }

    func get_spot(pair_id: felt, aggregation_mode: felt) -> (
        value: felt, decimals: felt, last_updated_timestamp: felt, num_sources_aggregated: felt
    ) {
    }

    func get_future_entry(pair_id: felt, source: felt) -> (entry: Entry) {
    }

    // TODO (rlkelly): add adapters for currency conversion
    // func get_spot_with_hops(
    //     currency_ids_len : felt, currency_ids : felt*, aggregation_mode : felt
    // ) -> (
    //     value : felt, decimals : felt, last_updated_timestamp : felt, num_sources_aggregated : felt
    // ):
    // end

    // func get_spot_with_USD_hop(
    //     base_currency_id : felt, quote_currency_id : felt, aggregation_mode : felt
    // ) -> (
    //     value : felt, decimals : felt, last_updated_timestamp : felt, num_sources_aggregated : felt
    // ):
    // end

    func get_spot_for_sources(
        pair_id: felt, aggregation_mode: felt, sources_len: felt, sources: felt*
    ) -> (value: felt, decimals: felt, last_updated_timestamp: felt, num_sources_aggregated: felt) {
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

    func publish_spot_entry(new_entry: Entry) {
    }

    func publish_spot_entries(new_entries_len: felt, new_entries: Entry*) {
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
}
