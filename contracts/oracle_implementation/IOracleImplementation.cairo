%lang starknet

from contracts.entry.structs import Entry

@contract_interface
namespace IOracleImplementation:
    #
    # Getters
    #

    func get_decimals(key : felt) -> (decimals : felt):
    end

    func get_entries(publishers_len : felt, publishers : felt*, key : felt) -> (
            entries_len : felt, entries : Entry*):
    end

    func get_value(
            publishers_len : felt, publishers : felt*, key : felt, aggregation_mode : felt) -> (
            value : felt, last_updated_timestamp : felt):
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
