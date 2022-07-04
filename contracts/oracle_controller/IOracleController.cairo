%lang starknet

from contracts.entry.structs import Entry
from contracts.oracle_controller.structs import OracleController_OracleImplementationStatus

@contract_interface
namespace IOracleController:
    #
    # Getters
    #

    func get_admin_address() -> (admin_address : felt):
    end

    func get_publisher_registry_address() -> (publisher_registry_address : felt):
    end

    func get_active_oracle_implementation_addresses() -> (
        oracle_addresses_len : felt, oracle_addresses : felt*
    ):
    end

    func get_oracle_implementation_status(oracle_implementation_address : felt) -> (
        oracle_implementation_status : OracleController_OracleImplementationStatus
    ):
    end

    func get_oracle_implementation_address(idx : felt) -> (oracle_implementation_address : felt):
    end

    func get_primary_oracle_implementation_address() -> (
        primary_oracle_implementation_address : felt
    ):
    end

    func get_decimals(key : felt) -> (decimals : felt):
    end

    #
    # Setters
    #

    func set_admin_address(new_address : felt):
    end

    func update_publisher_registry_address(publisher_registry_address : felt):
    end

    func add_oracle_implementation_address(oracle_implementation_address : felt):
    end

    func update_oracle_implementation_active_status(
        oracle_implementation_address : felt, is_active : felt
    ):
    end

    func set_primary_oracle_implementation_address(primary_oracle_implementation_address : felt):
    end

    #
    # Oracle Implementation Controller Functions
    #

    func get_entries(key : felt, sources_len : felt, sources : felt*) -> (
        entries_len : felt, entries : Entry*
    ):
    end

    func get_entry(key : felt, source : felt) -> (entry : Entry):
    end

    func get_value(key : felt, aggregation_mode : felt, sources_len : felt, sources : felt*) -> (
        value : felt, decimals : felt, last_updated_timestamp : felt, num_sources_aggregated : felt
    ):
    end

    #
    # Setters
    #

    func publish_entry(new_entry : Entry):
    end

    func publish_entries(new_entries_len : felt, new_entries : Entry*):
    end
end
