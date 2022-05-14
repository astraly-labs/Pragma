%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin

from contracts.entry.structs import Entry
from contracts.oracle_proxy.library import (
    OracleProxy_initialize_oracle_proxy, OracleProxy_get_publisher_registry_address,
    OracleProxy_get_active_oracle_implementation_addresses,
    OracleProxy_get_oracle_implementation_status, OracleProxy_get_oracle_implementation_address,
    OracleProxy_get_primary_oracle_implementation_address,
    OracleProxy_update_publisher_registry_address, OracleProxy_add_oracle_implementation_address,
    OracleProxy_update_oracle_implementation_active_status, OracleProxy_set_primary_oracle,
    OracleProxy_get_decimals, OracleProxy_get_entries, OracleProxy_get_value,
    OracleProxy_set_decimals, OracleProxy_submit_entry, OracleProxy_submit_many_entries)
from contracts.oracle_proxy.structs import OracleProxy_OracleImplementationStatus
from contracts.admin.library import (
    Admin_initialize_admin_address, Admin_get_admin_address, Admin_set_admin_address,
    Admin_only_admin)

#
# Constructor
#

@constructor
func constructor{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        admin_address : felt, publisher_registry_address : felt):
    Admin_initialize_admin_address(admin_address)
    OracleProxy_initialize_oracle_proxy(publisher_registry_address)
    return ()
end

#
# Getters
#

@view
func get_admin_address{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}() -> (admin_address : felt):
    let (admin_address) = Admin_get_admin_address()
    return (admin_address)
end

@view
func get_publisher_registry_address{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
        publisher_registry_address : felt):
    let (publisher_registry_address) = OracleProxy_get_publisher_registry_address()
    return (publisher_registry_address)
end

@view
func get_active_oracle_implementation_addresses{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
        oracle_addresses_len : felt, oracle_addresses : felt*):
    let (oracle_addresses_len,
        oracle_addresses) = OracleProxy_get_active_oracle_implementation_addresses()
    return (oracle_addresses_len, oracle_addresses)
end

@view
func get_oracle_implementation_status{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        oracle_implementation_address : felt) -> (
        oracle_implementation_status : OracleProxy_OracleImplementationStatus):
    let (oracle_implementation_status) = OracleProxy_get_oracle_implementation_status(
        oracle_implementation_address)
    return (oracle_implementation_status)
end

@view
func get_oracle_implementation_address{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(idx : felt) -> (
        oracle_implementation_address : felt):
    let (oracle_implementation_address) = OracleProxy_get_oracle_implementation_address(idx)
    return (oracle_implementation_address)
end

@view
func get_primary_oracle_implementation_address{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
        primary_oracle_implementation_address : felt):
    let (
        primary_oracle_implementation_address) = OracleProxy_get_primary_oracle_implementation_address(
        )
    return (primary_oracle_implementation_address)
end

#
# Setters
#

@external
func set_admin_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        new_address : felt):
    Admin_only_admin()
    Admin_set_admin_address(new_address)
    return ()
end

@external
func update_publisher_registry_address{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        publisher_registry_address : felt):
    Admin_only_admin()
    OracleProxy_update_publisher_registry_address(publisher_registry_address)
    return ()
end

@external
func add_oracle_implementation_address{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        oracle_implementation_address : felt):
    Admin_only_admin()
    OracleProxy_add_oracle_implementation_address(oracle_implementation_address)
    return ()
end

@external
func update_oracle_implementation_active_status{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        oracle_implementation_address : felt, is_active : felt):
    Admin_only_admin()
    OracleProxy_update_oracle_implementation_active_status(oracle_implementation_address, is_active)
    return ()
end

@external
func set_primary_oracle{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        primary_oracle_implementation_address : felt):
    Admin_only_admin()
    OracleProxy_set_primary_oracle(primary_oracle_implementation_address)
    return ()
end

#
# Oracle Implementation Proxy Functions
#

@view
func get_decimals{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        key : felt) -> (decimals : felt):
    let (decimals) = OracleProxy_get_decimals(key)
    return (decimals)
end

@view
func get_entries{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(key : felt) -> (
        entries_len : felt, entries : Entry*):
    let (entries_len, entries) = OracleProxy_get_entries(key)
    return (entries_len, entries)
end

@view
func get_value{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        key : felt, aggregation_mode : felt) -> (value : felt, last_updated_timestamp : felt):
    let (value, last_updated_timestamp) = OracleProxy_get_value(key, aggregation_mode)
    return (value, last_updated_timestamp)
end

@external
func set_decimals{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(key : felt, decimals : felt):
    Admin_only_admin()
    OracleProxy_set_decimals(key, decimals)
    return ()
end

@external
func submit_entry{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(new_entry : Entry, signature_r : felt, signature_s : felt):
    OracleProxy_submit_entry(new_entry, signature_r, signature_s)
    return ()
end

@external
func submit_many_entries{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(
        new_entries_len : felt, new_entries : Entry*, signatures_r_len : felt, signatures_r : felt*,
        signatures_s_len : felt, signatures_s : felt*):
    OracleProxy_submit_many_entries(
        new_entries_len,
        new_entries,
        signatures_r_len,
        signatures_r,
        signatures_s_len,
        signatures_s)

    return ()
end
