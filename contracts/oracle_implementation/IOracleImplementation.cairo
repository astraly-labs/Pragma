%lang starknet

from contracts.entry.structs import Entry

@contract_interface
namespace IOracleImplementation:
    #
    # Getters
    #

    func get_decimals() -> (decimals : felt):
    end

    func get_entries_for_key(publishers_len : felt, publishers : felt*, key : felt) -> (
            entries_len : felt, entries : Entry*):
    end

    func get_value(publishers_len : felt, publishers : felt*, key : felt) -> (
            value : felt, last_updated_timestamp : felt):
    end

    #
    # Setters
    #

    func set_oracle_proxy_address(oracle_proxy_address : felt):
    end

    func submit_entry(new_entry : Entry):
    end

    func submit_entry_no_assert(new_entry : Entry):
    end
end
