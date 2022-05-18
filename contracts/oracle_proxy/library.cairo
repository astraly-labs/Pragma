%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.bool import TRUE, FALSE
from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin
from starkware.cairo.common.hash import hash2
from starkware.cairo.common.math import assert_not_equal

from contracts.entry.library import Entry_assert_valid_entry_signature
from contracts.entry.structs import Entry
from contracts.oracle_implementation.IOracleImplementation import IOracleImplementation
from contracts.oracle_proxy.structs import OracleProxy_OracleImplementationStatus
from contracts.publisher_registry.IPublisherRegistry import IPublisherRegistry

#
# Storage
#

@storage_var
func OracleProxy_publisher_registry_address_storage() -> (publisher_registry_address : felt):
end

@storage_var
func OracleProxy_oracle_implementations_len_storage() -> (oracle_implementations_len : felt):
end

@storage_var
func OracleProxy_oracle_implementation_address_storage(idx : felt) -> (oracle_address : felt):
end

@storage_var
func OracleProxy_oracle_implementation_status_storage(oracle_address : felt) -> (
        oracle_implementation_status : OracleProxy_OracleImplementationStatus):
end

@storage_var
func OracleProxy_primary_oracle_implementation_address_storage() -> (oracle_address : felt):
end

#
# Constructor
#

func OracleProxy_initialize_oracle_proxy{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        publisher_registry_address : felt):
    OracleProxy_publisher_registry_address_storage.write(publisher_registry_address)
    return ()
end

#
# Getters
#

func OracleProxy_get_publisher_registry_address{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
        publisher_registry_address : felt):
    let (publisher_registry_address) = OracleProxy_publisher_registry_address_storage.read()
    return (publisher_registry_address)
end

func OracleProxy_get_active_oracle_implementation_addresses{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
        oracle_addresses_len : felt, oracle_addresses : felt*):
    alloc_locals

    let (total_oracle_addresses_len) = OracleProxy_oracle_implementations_len_storage.read()
    let (local oracle_addresses) = alloc()

    if total_oracle_addresses_len == 0:
        return (total_oracle_addresses_len, oracle_addresses)
    end

    let (oracle_addresses_len,
        oracle_addresses) = OracleProxy_build_active_oracle_implementation_addresses(
        total_oracle_addresses_len, oracle_addresses, 0, 0)

    return (oracle_addresses_len, oracle_addresses)
end

func OracleProxy_get_oracle_implementation_status{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        oracle_implementation_address : felt) -> (
        oracle_implementation_status : OracleProxy_OracleImplementationStatus):
    let (oracle_implementation_status) = OracleProxy_oracle_implementation_status_storage.read(
        oracle_implementation_address)
    return (oracle_implementation_status)
end

func OracleProxy_get_oracle_implementation_address{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(idx : felt) -> (
        oracle_implementation_address : felt):
    let (oracle_implementation_address) = OracleProxy_oracle_implementation_address_storage.read(
        idx)
    return (oracle_implementation_address)
end

func OracleProxy_get_primary_oracle_implementation_address{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
        primary_oracle_implementation_address : felt):
    let (
        primary_oracle_implementation_address) = OracleProxy_primary_oracle_implementation_address_storage.read(
        )
    return (primary_oracle_implementation_address)
end

#
# Setters
#

func OracleProxy_update_publisher_registry_address{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        publisher_registry_address : felt):
    OracleProxy_publisher_registry_address_storage.write(publisher_registry_address)
    return ()
end

func OracleProxy_add_oracle_implementation_address{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        oracle_implementation_address : felt):
    alloc_locals

    let (oracle_implementation_status) = OracleProxy_oracle_implementation_status_storage.read(
        oracle_implementation_address)
    with_attr error_message("Oracle implementation with this address already registered"):
        assert oracle_implementation_status.was_registered = FALSE
    end

    let (oracle_implementations_len) = OracleProxy_oracle_implementations_len_storage.read()

    OracleProxy_oracle_implementations_len_storage.write(oracle_implementations_len + 1)
    OracleProxy_oracle_implementation_address_storage.write(
        oracle_implementations_len, oracle_implementation_address)  # 0-indexed, so write at old_len (not new_len=len+1)
    let new_oracle_implementation_status = OracleProxy_OracleImplementationStatus(
        was_registered=TRUE, is_active=TRUE)
    OracleProxy_oracle_implementation_status_storage.write(
        oracle_implementation_address, new_oracle_implementation_status)
    let (
        primary_oracle_implementation_address) = OracleProxy_get_primary_oracle_implementation_address(
        )
    if primary_oracle_implementation_address == 0:
        OracleProxy_primary_oracle_implementation_address_storage.write(
            oracle_implementation_address)
        tempvar syscall_ptr = syscall_ptr
        tempvar pedersen_ptr = pedersen_ptr
        tempvar range_check_ptr = range_check_ptr
    else:
        tempvar syscall_ptr = syscall_ptr
        tempvar pedersen_ptr = pedersen_ptr
        tempvar range_check_ptr = range_check_ptr
    end
    return ()
end

func OracleProxy_update_oracle_implementation_active_status{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        oracle_implementation_address : felt, is_active : felt):
    alloc_locals

    let (oracle_implementation_status) = OracleProxy_oracle_implementation_status_storage.read(
        oracle_implementation_address)
    with_attr error_message("Oracle implementation with this address has not been registered yet"):
        assert oracle_implementation_status.was_registered = TRUE
    end

    let (
        primary_oracle_implementation_address) = OracleProxy_primary_oracle_implementation_address_storage.read(
        )
    with_attr error_message("Cannot update is_active for pimary oracle implementation address"):
        assert_not_equal(oracle_implementation_address, primary_oracle_implementation_address)
    end

    let new_oracle_implementation_status = OracleProxy_OracleImplementationStatus(
        was_registered=TRUE, is_active=is_active)
    OracleProxy_oracle_implementation_status_storage.write(
        oracle_implementation_address, new_oracle_implementation_status)
    return ()
end

func OracleProxy_set_primary_oracle{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        primary_oracle_implementation_address : felt):
    alloc_locals

    let (oracle_implementation_status) = OracleProxy_oracle_implementation_status_storage.read(
        primary_oracle_implementation_address)
    with_attr error_message("Oracle implementation with this address has not been registered yet"):
        assert oracle_implementation_status.was_registered = TRUE
    end

    with_attr error_message("Cannot set inactive address as primary implementation address"):
        assert oracle_implementation_status.is_active = TRUE
    end

    OracleProxy_primary_oracle_implementation_address_storage.write(
        primary_oracle_implementation_address)
    return ()
end

#
# Helpers
#

func OracleProxy_build_active_oracle_implementation_addresses{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        oracle_addresses_len : felt, oracle_addresses : felt*, storage_idx : felt,
        output_idx : felt) -> (oracle_addresses_len : felt, oracle_addresses : felt*):
    let (oracle_address) = OracleProxy_oracle_implementation_address_storage.read(storage_idx)
    let (oracle_implementation_status) = OracleProxy_oracle_implementation_status_storage.read(
        oracle_address)

    if storage_idx == oracle_addresses_len:
        return (output_idx, oracle_addresses)
    end

    if oracle_implementation_status.is_active == TRUE:
        assert [oracle_addresses + output_idx] = oracle_address
        let (recursed_oracle_addresses_len,
            recursed_oracle_addresses) = OracleProxy_build_active_oracle_implementation_addresses(
            oracle_addresses_len, oracle_addresses, storage_idx + 1, output_idx + 1)
        return (recursed_oracle_addresses_len, recursed_oracle_addresses)
    else:
        let (recursed_oracle_addresses_len,
            recursed_oracle_addresses) = OracleProxy_build_active_oracle_implementation_addresses(
            oracle_addresses_len, oracle_addresses, storage_idx + 1, output_idx)
        return (recursed_oracle_addresses_len, recursed_oracle_addresses)
    end
end

#
# Oracle Implementation Proxy Functions
#

func OracleProxy_get_decimals{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        key : felt) -> (decimals : felt):
    let (
        primary_oracle_implementation_address) = OracleProxy_primary_oracle_implementation_address_storage.read(
        )
    with_attr error_message("Primary oracle implementation address must be set first"):
        assert_not_equal(primary_oracle_implementation_address, 0)
    end

    let (decimals) = IOracleImplementation.get_decimals(primary_oracle_implementation_address, key)
    return (decimals)
end

func OracleProxy_get_entries{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        key : felt) -> (entries_len : felt, entries : Entry*):
    alloc_locals

    let (
        primary_oracle_implementation_address) = OracleProxy_primary_oracle_implementation_address_storage.read(
        )
    with_attr error_message("Primary oracle implementation address must be set first"):
        assert_not_equal(primary_oracle_implementation_address, 0)
    end

    let (publisher_registry_address) = OracleProxy_get_publisher_registry_address()
    let (publishers_len, publishers) = IPublisherRegistry.get_all_publishers(
        publisher_registry_address)

    let (entries_len, entries) = IOracleImplementation.get_entries(
        primary_oracle_implementation_address, publishers_len, publishers, key)
    return (entries_len, entries)
end

func OracleProxy_get_value{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        key : felt, aggregation_mode : felt) -> (value : felt, last_updated_timestamp : felt):
    alloc_locals

    let (publisher_registry_address) = OracleProxy_get_publisher_registry_address()
    let (publishers_len, publishers) = IPublisherRegistry.get_all_publishers(
        publisher_registry_address)
    let (
        primary_oracle_implementation_address) = OracleProxy_primary_oracle_implementation_address_storage.read(
        )
    let (value, last_updated_timestamp) = IOracleImplementation.get_value(
        primary_oracle_implementation_address, publishers_len, publishers, key, aggregation_mode)
    return (value, last_updated_timestamp)
end

func OracleProxy_set_decimals{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        key : felt, decimals : felt):
    alloc_locals

    let (total_oracle_addresses_len) = OracleProxy_oracle_implementations_len_storage.read()
    if total_oracle_addresses_len == 0:
        return ()
    end
    let (local oracle_addresses) = alloc()
    let (oracle_addresses_len,
        oracle_addresses) = OracleProxy_build_active_oracle_implementation_addresses(
        total_oracle_addresses_len, oracle_addresses, 0, 0)

    _OracleProxy_set_decimals(oracle_addresses_len, oracle_addresses, 0, key, decimals)
    return ()
end

func _OracleProxy_set_decimals{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        oracle_addresses_len : felt, oracle_addresses : felt*, idx : felt, key : felt,
        decimals : felt):
    if oracle_addresses_len == 0:
        return ()
    end

    if idx == oracle_addresses_len:
        return ()
    end

    let oracle_address = [oracle_addresses + idx]
    IOracleImplementation.set_decimals(oracle_address, key, decimals)
    _OracleProxy_set_decimals(oracle_addresses_len, oracle_addresses, idx + 1, key, decimals)
    return ()
end

func OracleProxy_submit_entry{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(new_entry : Entry, signature_r : felt, signature_s : felt):
    _OracleProxy_submit_entry(new_entry, signature_r, signature_s, TRUE)
    return ()
end

func _OracleProxy_submit_entry{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(
        new_entry : Entry, signature_r : felt, signature_s : felt, should_assert : felt):
    alloc_locals

    let (publisher_registry_address) = OracleProxy_get_publisher_registry_address()
    let (publisher_public_key) = IPublisherRegistry.get_publisher_public_key(
        publisher_registry_address, new_entry.publisher)
    Entry_assert_valid_entry_signature(new_entry, publisher_public_key, signature_r, signature_s)
    let (total_oracle_addresses_len) = OracleProxy_oracle_implementations_len_storage.read()
    if total_oracle_addresses_len == 0:
        return ()
    end
    let (local oracle_addresses) = alloc()
    let (oracle_addresses_len,
        oracle_addresses) = OracleProxy_build_active_oracle_implementation_addresses(
        total_oracle_addresses_len, oracle_addresses, 0, 0)
    _OracleProxy_submit_entry_for_oracle_addresses(
        oracle_addresses_len, oracle_addresses, 0, new_entry, should_assert)
    return ()
end

func _OracleProxy_submit_entry_for_oracle_addresses{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        oracle_addresses_len : felt, oracle_addresses : felt*, idx : felt, new_entry : Entry,
        should_assert : felt):
    if oracle_addresses_len == 0:
        return ()
    end

    if idx == oracle_addresses_len:
        return ()
    end

    let oracle_address = [oracle_addresses + idx]
    if should_assert == TRUE:
        IOracleImplementation.submit_entry(oracle_address, new_entry)
    else:
        IOracleImplementation.submit_entry_no_assert(oracle_address, new_entry)
    end
    _OracleProxy_submit_entry_for_oracle_addresses(
        oracle_addresses_len, oracle_addresses, idx + 1, new_entry, should_assert)
    return ()
end

func OracleProxy_submit_many_entries{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(
        new_entries_len : felt, new_entries : Entry*, signatures_r_len : felt, signatures_r : felt*,
        signatures_s_len : felt, signatures_s : felt*):
    alloc_locals

    with_attr error_message(
            "Array of entries, signatures_r and signatures_s must all have the same length."):
        assert new_entries_len = signatures_r_len
        assert signatures_r_len = signatures_s_len
    end

    if new_entries_len == 0:
        return ()
    end

    _OracleProxy_submit_entry([new_entries], [signatures_r], [signatures_s], FALSE)
    OracleProxy_submit_many_entries(
        new_entries_len - 1,
        new_entries + Entry.SIZE,
        signatures_r_len - 1,
        signatures_r + 1,
        signatures_s_len - 1,
        signatures_s + 1)

    return ()
end
