%lang starknet

@contract_interface
namespace IOracleController:
    #
    # Getters
    #

    func get_rebased_value(quote_currency : felt, base_currency : felt) -> (
        value : felt, decimals : felt, last_updated_timestamp : felt, num_sources_aggregated : felt
    ):
    end

    #
    # Admin
    #

    #
    # Getters
    #

    func get_admin_address() -> (admin_address : felt):
    end

    func get_oracle_controller_address() -> (oracle_controller_address : felt):
    end

    #
    # Setters
    #

    func set_admin_address(new_address : felt):
    end

    func set_oracle_controller_address(oracle_controller_address : felt) -> ():
    end
end
