%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin
from starkware.cairo.common.math import assert_lt
from starkware.cairo.common.math_cmp import is_not_zero, is_le
from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.bool import TRUE, FALSE
from starkware.starknet.common.syscalls import get_caller_address

from contracts.entry.library import (
    Entry, Entry_aggregate_entries, Entry_assert_valid_entry_signature,
    Entry_aggregate_timestamps_max)
from contracts.publisher.IPublisherRegistry import IPublisherRegistry

#
# Storage
#

@storage_var
func Oracle_entry_storage(key : felt, publisher : felt) -> (entry : Entry):
end

@storage_var
func Oracle_decimals_storage() -> (decimals : felt):
end

@storage_var
func Oracle_proxy_address_storage() -> (publisher_address : felt):
end

#
# Constructor
#

func Oracle_set_decimals{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        decimals : felt):
    Oracle_decimals_storage.write(decimals)
    return ()
end

#
# Guards
#

func Oracle_assert_oracle_proxy{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        ):
    let (caller_address) = get_caller_address()
    let (oracle_proxy_address) = Oracle_proxy_address_storage.read()
    if oracle_proxy_address == 0:
        # Assume uninitialized
        return ()
    end
    with_attr error_message("This function can only be called by the oracle proxy"):
        assert caller_address = oracle_proxy_address
    end
    return ()
end

#
# Getters
#

func Oracle_get_decimals{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
        decimals : felt):
    let (decimals) = Oracle_decimals_storage.read()
    return (decimals)
end

func Oracle_get_entries_for_key{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        publishers_len : felt, publishers : felt*, key : felt) -> (
        entries_len : felt, entries : Entry*):
    let (entries_len, entries) = Oracle_get_all_entries_for_key(key, publishers_len, publishers)
    return (entries_len, entries)
end

func Oracle_get_value{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        publishers_len : felt, publishers : felt*, key : felt) -> (
        value : felt, last_updated_timestamp : felt):
    alloc_locals

    let (entries_len, entries) = Oracle_get_entries_for_key(publishers_len, publishers, key)

    if entries_len == 0:
        return (0, 0)
    end

    let (value) = Entry_aggregate_entries(entries_len, entries)
    let (last_updated_timestamp) = Entry_aggregate_timestamps_max(entries_len, entries)
    return (value, last_updated_timestamp)
end

#
# Setters
#

func Oracle_set_oracle_proxy_address{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        oracle_proxy_address : felt):
    Oracle_assert_oracle_proxy()
    Oracle_proxy_address_storage.write(oracle_proxy_address)
    return ()
end

func Oracle_submit_entry{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(new_entry : Entry):
    Oracle_assert_oracle_proxy()
    let (entry) = Oracle_entry_storage.read(new_entry.key, new_entry.publisher)

    with_attr error_message("Received stale update (timestamp not newer than current entry)"):
        assert_lt(entry.timestamp, new_entry.timestamp)
    end

    Oracle_entry_storage.write(new_entry.key, new_entry.publisher, new_entry)
    return ()
end

func _Oracle_submit_entry_no_assert{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(new_entry : Entry):
    alloc_locals

    Oracle_assert_oracle_proxy()

    let (entry) = Oracle_entry_storage.read(new_entry.key, new_entry.publisher)

    # use is_le and -1 to get is_lt
    let (is_new_entry_more_recent) = is_le(entry.timestamp, new_entry.timestamp - 1)
    if is_new_entry_more_recent == TRUE:
        Oracle_entry_storage.write(new_entry.key, new_entry.publisher, new_entry)
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

func Oracle_submit_many_entries{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(new_entries_len : felt, new_entries : Entry*):
    Oracle_assert_oracle_proxy()

    if new_entries_len == 0:
        return ()
    end

    _Oracle_submit_entry_no_assert([new_entries])
    Oracle_submit_many_entries(new_entries_len - 1, new_entries + Entry.SIZE)

    return ()
end

#
# Helpers
#

func Oracle_get_all_entries_for_key{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        key : felt, publishers_len : felt, publishers : felt*) -> (
        entries_len : felt, entries : Entry*):
    let (entries : Entry*) = alloc()

    if publishers_len == 0:
        return (0, entries)
    end

    let (entries_len, entries) = Oracle_build_entries_array(
        key, publishers_len, publishers, 0, 0, entries)

    return (entries_len, entries)
end

func Oracle_build_entries_array{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        key : felt, publishers_len : felt, publishers : felt*, publishers_idx : felt,
        entries_idx : felt, entries : Entry*) -> (entries_len : felt, entries : Entry*):
    alloc_locals

    if publishers_idx == publishers_len:
        let entries_len = entries_idx  # 0-indexed
        return (entries_len, entries)
    end

    let publisher = [publishers + publishers_idx]
    let (entry) = Oracle_entry_storage.read(key, publisher)
    let (is_entry_initialized) = is_not_zero(entry.timestamp)
    if is_entry_initialized == 0:
        let (entries_len, entries) = Oracle_build_entries_array(
            key, publishers_len, publishers, publishers_idx + 1, entries_idx, entries)
        return (entries_len, entries)
    end

    assert [entries + entries_idx * Entry.SIZE] = entry

    let (entries_len, entries) = Oracle_build_entries_array(
        key, publishers_len, publishers, publishers_idx + 1, entries_idx + 1, entries)
    return (entries_len, entries)
end
