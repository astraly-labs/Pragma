%lang starknet

@contract_interface
namespace IOracleProxy:
    #
    # Getters
    #

    func get_admin_public_key() -> (admin_public_key : felt):
    end

    func get_publisher_registry_address() -> (publisher_registry_address : felt):
    end

    func get_oracle_implementation_addresses() -> (
            oracle_implementations_len : felt, oracle_implementations : felt*):
    end

    func get_primary_oracle_implementation_address() -> (
            primary_oracle_implementation_addresses : felt):
    end

    #
    # Setters
    #

    func rotate_admin_public_key(new_key : felt, signature_r : felt, signature_s : felt):
    end

    func update_publisher_registry_address(
            publisher_registry_address : felt, signature_r, signature_s):
    end

    #
    # Oracle Implementation Proxy Functions
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

    func submit_many_entries(new_entries_len, new_entries):
    end
end
