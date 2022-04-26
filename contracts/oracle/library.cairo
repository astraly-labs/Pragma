%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin
from starkware.cairo.common.math import assert_lt
from starkware.cairo.common.math_cmp import is_not_zero, is_le
from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.bool import TRUE, FALSE

from contracts.entry.library import (
    Entry, Entry_aggregate_entries, Entry_assert_valid_entry_signature,
    Entry_aggregate_timestamps_max)
from contracts.publisher.library import (
    Publisher_get_publisher_public_key, Publisher_get_all_publishers)

#
# Storage
#

@storage_var
func Oracle_entry_storage(key : felt, publisher : felt) -> (entry : Entry):
end

@storage_var
func Oracle_decimals_storage() -> (decimals : felt):
end

# Constructor
func Oracle_set_decimals{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        decimals : felt):
    Oracle_decimals_storage.write(decimals)
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
        key : felt) -> (entries_len : felt, entries : Entry*):
    let (num_publishers, publisher_ptr) = Publisher_get_all_publishers()
    let (entries_len, entries) = Oracle_get_all_entries_for_key(key, num_publishers, publisher_ptr)

    return (entries_len, entries)
end

func Oracle_get_value{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        key : felt) -> (value : felt, last_updated_timestamp : felt):
    alloc_locals

    let (num_entries, entries_ptr) = Oracle_get_entries_for_key(key)

    if num_entries == 0:
        return (0, 0)
    end

    let (value) = Entry_aggregate_entries(num_entries, entries_ptr)
    let (last_updated_timestamp) = Entry_aggregate_timestamps_max(num_entries, entries_ptr)
    return (value, last_updated_timestamp)
end

#
# Setters
#

func Oracle_submit_entry{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(new_entry : Entry, signature_r : felt, signature_s : felt):
    let (entry) = Oracle_entry_storage.read(new_entry.key, new_entry.publisher)

    with_attr error_message("Received stale update (timestamp not newer than current entry)"):
        assert_lt(entry.timestamp, new_entry.timestamp)
    end

    Oracle_entry_storage.write(new_entry.key, new_entry.publisher, new_entry)
    return ()
end

func Oracle_submit_entry_no_assert{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(new_entry : Entry, signature_r : felt, signature_s : felt):
    alloc_locals

    let (publisher_public_key) = Publisher_get_publisher_public_key(new_entry.publisher)
    Entry_assert_valid_entry_signature(publisher_public_key, signature_r, signature_s, new_entry)

    let (entry) = Oracle_entry_storage.read(new_entry.key, new_entry.publisher)

    # use is_le and -1 to get is_lt
    let (is_new_entry_more_recent) = is_le(entry.timestamp - 1, new_entry.timestamp)
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
        range_check_ptr}(
        new_entries_len : felt, new_entries : Entry*, signatures_r_len : felt, signatures_r : felt*,
        signatures_s_len : felt, signatures_s : felt*):
    with_attr error_message(
            "Array of entries, signatures_r and signatures_s must all have the same length."):
        assert new_entries_len = signatures_r_len
        assert signatures_r_len = signatures_s_len
    end

    if new_entries_len == 0:
        return ()
    end

    Oracle_submit_entry_no_assert([new_entries], [signatures_r], [signatures_s])
    Oracle_submit_many_entries(
        new_entries_len - 1,
        new_entries + Entry.SIZE,
        signatures_r_len - 1,
        signatures_r + 1,
        signatures_s_len - 1,
        signatures_s + 1)

    return ()
end

#
# Helpers
#

func Oracle_get_all_entries_for_key{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        key : felt, num_publishers : felt, publisher_ptr : felt*) -> (
        num_entries : felt, entries_ptr : Entry*):
    let (entries_ptr : Entry*) = alloc()

    if num_publishers == 0:
        return (0, entries_ptr)
    end

    let (num_entries, entries_ptr) = Oracle_build_entries_array(
        key, num_publishers, 0, publisher_ptr, 0, entries_ptr)

    return (num_entries, entries_ptr)
end

func Oracle_build_entries_array{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        key : felt, num_publishers : felt, publishers_idx : felt, publisher_ptr : felt*,
        entries_idx : felt, entries_ptr : Entry*) -> (num_entries : felt, entries_ptr : Entry*):
    alloc_locals
    local syscall_ptr : felt* = syscall_ptr

    if publishers_idx == num_publishers:
        let num_entries = entries_idx  # 0-indexed
        return (num_entries, entries_ptr)
    end

    let publisher = [publisher_ptr + publishers_idx]
    let (entry) = Oracle_entry_storage.read(key, publisher)
    let (is_entry_initialized) = is_not_zero(entry.timestamp)
    if is_entry_initialized == 0:
        let (num_entries, entries_ptr) = Oracle_build_entries_array(
            key, num_publishers, publishers_idx + 1, publisher_ptr, entries_idx, entries_ptr)
        return (num_entries, entries_ptr)
    end

    assert [entries_ptr + entries_idx * Entry.SIZE] = entry

    let (num_entries, entries_ptr) = Oracle_build_entries_array(
        key, num_publishers, publishers_idx + 1, publisher_ptr, entries_idx + 1, entries_ptr)
    return (num_entries, entries_ptr)
end
