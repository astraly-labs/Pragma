%lang starknet

@contract_interface
namespace IOracleRebaser {
    //
    // Getters
    //

    func get_rebased_value_via_usd(quote_currency: felt, base_currency: felt) -> (
        value: felt, decimals: felt, last_updated_timestamp: felt, num_sources_aggregated: felt
    ) {
    }

    //
    // Admin
    //

    //
    // Getters
    //

    func get_admin_address() -> (admin_address: felt) {
    }

    func get_oracle_address() -> (oracle_address: felt) {
    }

    //
    // Setters
    //

    func set_admin_address(new_address: felt) {
    }

    func set_oracle_address(oracle_address: felt) -> () {
    }
}
