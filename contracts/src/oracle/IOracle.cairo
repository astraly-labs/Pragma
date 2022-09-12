%lang starknet

from entry.structs import Checkpoint, Entry, Pair, Currency

namespace EmpiricAggregationModes:
    const MEDIAN = 120282243752302  # str_to_felt("median")
end

@contract_interface
namespace IOracle:
    #
    # Getters
    #

    func get_decimals(pair_id : felt) -> (decimals : felt):
    end

    func get_entries(pair_id : felt, sources_len : felt, sources : felt*) -> (
        entries_len : felt, entries : Entry*
    ):
    end

    func get_entry(pair_id : felt, source : felt) -> (entry : Entry):
    end

    func get_value(pair_id : felt, aggregation_mode : felt) -> (
        value : felt, decimals : felt, last_updated_timestamp : felt, num_sources_aggregated : felt
    ):
    end

    # TODO (rlkelly): add adapters for currency conversion
    # func get_value_with_hops(
    #     currency_ids_len : felt, currency_ids : felt*, aggregation_mode : felt
    # ) -> (
    #     value : felt, decimals : felt, last_updated_timestamp : felt, num_sources_aggregated : felt
    # ):
    # end

    # func get_value_with_USD_hop(
    #     base_currency_id : felt, quote_currency_id : felt, aggregation_mode : felt
    # ) -> (
    #     value : felt, decimals : felt, last_updated_timestamp : felt, num_sources_aggregated : felt
    # ):
    # end

    func get_value_for_sources(
        pair_id : felt, aggregation_mode : felt, sources_len : felt, sources : felt*
    ) -> (
        value : felt, decimals : felt, last_updated_timestamp : felt, num_sources_aggregated : felt
    ):
    end

    func get_admin_address() -> (admin_address : felt):
    end

    func get_publisher_registry_address() -> (publisher_registry_address : felt):
    end

    func get_latest_checkpoint_index(key : felt) -> (latest : felt):
    end

    func get_checkpoint(key : felt, index : felt) -> (latest : Checkpoint):
    end

    func get_sources_threshold() -> (threshold : felt):
    end

    #
    # Setters
    #

    func publish_entry(new_entry : Entry):
    end

    func publish_entries(new_entries_len : felt, new_entries : Entry*):
    end

    func set_admin_address(new_admin_address : felt):
    end

    func update_publisher_registry_address(publisher_registry_address : felt):
    end

    func add_currency(currency : Currency):
    end

    func update_currency(currency : Currency):
    end

    func add_pair(pair : Pair):
    end

    func set_checkpoint(key : felt, aggregation_mode : felt):
    end

    func set_sources_threshold(threshold : felt):
    end
end
