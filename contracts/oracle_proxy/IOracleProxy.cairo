%lang starknet

@contract_interface
namespace IOracleProxy:
    #
    # Getters
    #

    func get_admin_public_key() -> (admin_public_key : felt):
    end

    func get_nonce() -> (nonce : felt):
    end

    func get_publisher_registry_address() -> (publisher_registry_address : felt):
    end

    func get_active_oracle_implementation_addresses() -> (
            oracle_addresses_len : felt, oracle_addresses : felt*):
    end

    func get_oracle_implementation_status(oracle_implementation_address : felt) -> (
            oracle_implementation_status : OracleProxy_OracleImplementationStatus):
    end

    func get_oracle_implementation_address(idx : felt) -> (oracle_implementation_address : felt):
    end

    func get_primary_oracle_implementation_address() -> (
            primary_oracle_implementation_address : felt):
    end

    #
    # Setters
    #

    func rotate_admin_public_key(new_key : felt, signature_r : felt, signature_s : felt):
    end

    func update_publisher_registry_address(
            publisher_registry_address : felt, signature_r : felt, signature_s : felt):
    end

    func add_oracle_implementation_address(
            oracle_implementation_address : felt, signature_r : felt, signature_s : felt):
    end

    func update_oracle_implementation_active_status(
            oracle_implementation_address : felt, is_active : felt, signature_r : felt,
            signature_s : felt):
    end

    func set_primary_oracle(
            primary_oracle_implementation_address : felt, signature_r : felt, signature_s : felt):
    end

    #
    # Oracle Implementation Proxy Functions
    #

    func get_decimals(key : felt) -> (decimals : felt):
    end

    func get_entries_for_key(key : felt) -> (entries_len : felt, entries : Entry*):
    end

    func get_value(key : felt, aggregation_mode : felt) -> (
            value : felt, last_updated_timestamp : felt):
    end

    #
    # Setters
    #

    func set_decimals(key : felt, decimals : felt, signature_r : felt, signature_s : felt):
    end

    func submit_entry(new_entry : Entry, signature_r : felt, signature_s : felt):
    end

    func submit_many_entries(
            new_entries_len : felt, new_entries : Entry*, signatures_r_len : felt,
            signatures_r : felt*, signatures_s_len : felt, signatures_s : felt*):
    end
end
