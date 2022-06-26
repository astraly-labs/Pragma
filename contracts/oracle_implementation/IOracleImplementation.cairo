%lang starknet

from contracts.entry.structs import Entry

@contract_interface
namespace IOracleImplementation:
    #
    # Getters
    #

    func get_decimals(key : felt) -> (decimals : felt):
    end

    func get_entries(key : felt, sources_len : felt, sources : felt*) -> (
        entries_len : felt, entries : Entry*
    ):
    end

    func get_value(key : felt, aggregation_mode : felt, sources_len : felt, sources : felt*) -> (
        value : felt, last_updated_timestamp : felt
    ):
    end

    func get_entry(key : felt, source : felt) -> (entry : Entry):
    end

    #
    # Setters
    #

    func set_oracle_controller_address(oracle_controller_address : felt):
    end

    func set_decimals(key : felt, decimals : felt):
    end

    func submit_entry(new_entry : Entry):
    end
end
