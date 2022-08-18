%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.alloc import alloc

from contracts.entry.structs import Entry
from contracts.oracle_controller.library import OracleController

from contracts.oracle_controller.structs import (
    OracleController_OracleImplementationStatus,
    KeyDecimalStruct,
)
from contracts.admin.library import Admin

#
# Constructor
#

@constructor
func constructor{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    admin_address : felt,
    publisher_registry_address : felt,
    keys_decimals_len : felt,
    keys_decimals : KeyDecimalStruct*,
):
    Admin.initialize_admin_address(admin_address)
    OracleController.initialize_oracle_controller(
        publisher_registry_address, keys_decimals_len, keys_decimals
    )
    return ()
end

#
# Oracle Implementation Controller Functions
#

@view
func get_entries{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    key : felt, sources_len : felt, sources : felt*
) -> (entries_len : felt, entries : Entry*):
    let (entries_len, entries) = OracleController.get_entries(key, sources_len, sources)
    return (entries_len, entries)
end

@view
func get_entry{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    key : felt, source : felt
) -> (entry : Entry):
    let (entry) = OracleController.get_entry(key, source)
    return (entry)
end

@view
func get_value{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    key : felt, aggregation_mode : felt
) -> (value : felt, decimals : felt, last_updated_timestamp : felt, num_sources_aggregated : felt):
    let (sources) = alloc()
    let (
        value, decimals, last_updated_timestamp, num_sources_aggregated
    ) = OracleController.get_value(key, aggregation_mode, 0, sources)
    return (value, decimals, last_updated_timestamp, num_sources_aggregated)
end

@view
func get_value_for_sources{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    key : felt, aggregation_mode : felt, sources_len : felt, sources : felt*
) -> (value : felt, decimals : felt, last_updated_timestamp : felt, num_sources_aggregated : felt):
    let (
        value, decimals, last_updated_timestamp, num_sources_aggregated
    ) = OracleController.get_value(key, aggregation_mode, sources_len, sources)
    return (value, decimals, last_updated_timestamp, num_sources_aggregated)
end

@external
func publish_entry{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    new_entry : Entry
):
    OracleController.publish_entry(new_entry)
    return ()
end

@external
func publish_entries{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    new_entries_len : felt, new_entries : Entry*
):
    OracleController.publish_entries(new_entries_len, new_entries)
    return ()
end

#
# Getters
#

@view
func get_admin_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
    admin_address : felt
):
    let (admin_address) = Admin.get_admin_address()
    return (admin_address)
end

@view
func get_publisher_registry_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}() -> (publisher_registry_address : felt):
    let (publisher_registry_address) = OracleController.get_publisher_registry_address()
    return (publisher_registry_address)
end

@view
func get_active_oracle_implementation_addresses{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}() -> (oracle_addresses_len : felt, oracle_addresses : felt*):
    let (
        oracle_addresses_len, oracle_addresses
    ) = OracleController.get_active_oracle_implementation_addresses()
    return (oracle_addresses_len, oracle_addresses)
end

@view
func get_oracle_implementation_status{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(oracle_implementation_address : felt) -> (
    oracle_implementation_status : OracleController_OracleImplementationStatus
):
    let (oracle_implementation_status) = OracleController.get_oracle_implementation_status(
        oracle_implementation_address
    )
    return (oracle_implementation_status)
end

@view
func get_oracle_implementation_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(idx : felt) -> (oracle_implementation_address : felt):
    let (oracle_implementation_address) = OracleController.get_oracle_implementation_address(idx)
    return (oracle_implementation_address)
end

@view
func get_primary_oracle_implementation_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}() -> (primary_oracle_implementation_address : felt):
    let (
        primary_oracle_implementation_address
    ) = OracleController.get_primary_oracle_implementation_address()
    return (primary_oracle_implementation_address)
end

@view
func get_decimals{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    key : felt
) -> (decimals : felt):
    let (decimals) = OracleController.get_decimals(key)
    return (decimals)
end

#
# Setters
#

@external
func set_admin_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    new_address : felt
):
    Admin.only_admin()
    Admin.set_admin_address(new_address)
    return ()
end

@external
func update_publisher_registry_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(publisher_registry_address : felt):
    Admin.only_admin()
    OracleController.update_publisher_registry_address(publisher_registry_address)
    return ()
end

@external
func add_oracle_implementation_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(oracle_implementation_address : felt):
    Admin.only_admin()
    OracleController.add_oracle_implementation_address(oracle_implementation_address)
    return ()
end

@external
func update_oracle_implementation_active_status{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(oracle_implementation_address : felt, is_active : felt):
    Admin.only_admin()
    OracleController.update_oracle_implementation_active_status(
        oracle_implementation_address, is_active
    )
    return ()
end

@external
func set_primary_oracle_implementation_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(primary_oracle_implementation_address : felt):
    Admin.only_admin()
    OracleController.set_primary_oracle_implementation_address(
        primary_oracle_implementation_address
    )
    return ()
end
