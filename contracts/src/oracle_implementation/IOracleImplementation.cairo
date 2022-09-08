%lang starknet

from entry.structs import Entry

@contract_interface
namespace IOracleImplementation:
    #
    # Getters
    #

    func get_entries(key : felt, sources_len : felt, sources : felt*) -> (
        entries_len : felt, entries : Entry*
    ):
    end

    func get_value(key : felt, aggregation_mode : felt, sources_len : felt, sources : felt*) -> (
        value : felt, last_updated_timestamp : felt, num_sources_aggregated : felt
    ):
    end

    func get_entry(key : felt, source : felt) -> (entry : Entry):
    end

    func get_all_sources(key : felt) -> (sources_len : felt, sources : felt*):
    end

    func get_latest_checkpoint(key : felt) -> (latest : Checkpoint):
    end

    func get_sources_threshold() -> (threshold : felt):
    end

    #
    # Setters
    #

    func set_oracle_controller_address(oracle_controller_address : felt):
    end

    func publish_entry(new_entry : Entry):
    end

    func set_checkpoint(key : felt, aggregation_mode : felt):
    end

    func set_sources_threshold(threshold : felt):
    end
end
