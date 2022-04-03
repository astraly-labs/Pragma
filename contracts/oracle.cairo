%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin
from starkware.cairo.common.math import assert_lt
from starkware.cairo.common.math_cmp import is_not_zero
from starkware.cairo.common.alloc import alloc

from contracts.signature import assert_valid_entry_signature
from contracts.entry import Entry, aggregate_entries
from contracts.publisher import get_publisher_public_key, add_publisher, get_all_publishers

const DECIMALS = 10

@storage_var
func entry_storage(asset : felt, publisher : felt) -> (entry : Entry):
end

@storage_var
func decimals_storage() -> (decimals : felt):
end

@constructor
func constructor{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}():
    decimals_storage.write(DECIMALS)
    return ()
end

@external
func submit_entry{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(new_entry : Entry, signature_r : felt, signature_s : felt):
    let (publisher_public_key) = get_publisher_public_key(new_entry.publisher)
    assert_valid_entry_signature(publisher_public_key, signature_r, signature_s, new_entry)

    let (entry) = entry_storage.read(new_entry.asset, new_entry.publisher)

    with_attr error_message("Received stale price update (timestamp older than current entry)"):
        assert_lt(entry.timestamp, new_entry.timestamp)
    end

    entry_storage.write(new_entry.asset, new_entry.publisher, new_entry)
    return ()
end

@view
func get_entries_for_asset{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        asset : felt) -> (entries_len : felt, entries : Entry*):
    let (num_publishers, publisher_ptr) = get_all_publishers()
    let (entries_len, entries) = get_all_entries_for_asset(asset, num_publishers, publisher_ptr)

    return (entries_len, entries)
end

@view
func get_price{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(asset : felt) -> (
        price : felt):
    alloc_locals
    local syscall_ptr : felt* = syscall_ptr

    let (num_publishers, publisher_ptr) = get_all_publishers()
    let (num_entries, entries_ptr) = get_all_entries_for_asset(asset, num_publishers, publisher_ptr)

    let (price) = aggregate_entries(num_entries, entries_ptr)
    return (price)
end

func get_all_entries_for_asset{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        asset : felt, num_publishers : felt, publisher_ptr : felt*) -> (
        num_entries : felt, entries_ptr : Entry*):
    let (entries_ptr : Entry*) = alloc()

    if num_publishers == 0:
        return (0, entries_ptr)
    end

    let (num_entries, entries_ptr) = build_entries_array(
        asset, num_publishers, 0, publisher_ptr, 0, entries_ptr)

    return (num_entries, entries_ptr)
end

func build_entries_array{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        asset : felt, num_publishers : felt, publishers_idx : felt, publisher_ptr : felt*,
        entries_idx : felt, entries_ptr : Entry*) -> (num_entries : felt, entries_ptr : Entry*):
    alloc_locals
    local syscall_ptr : felt* = syscall_ptr

    let publisher = [publisher_ptr + publishers_idx]
    let (entry) = entry_storage.read(asset, publisher)
    let (is_entry_initialized) = is_not_zero(entry.timestamp)
    if is_entry_initialized == 1:
        assert [entries_ptr + entries_idx * Entry.SIZE] = entry
    end

    if publishers_idx + 1 == num_publishers:
        let num_entries = entries_idx + 1  # 0-indexed
        return (num_entries, entries_ptr)
    end

    let (num_entries, entries_ptr) = build_entries_array(
        asset, num_publishers, publishers_idx + 1, publisher_ptr, entries_idx + 1, entries_ptr)
    return (num_entries, entries_ptr)
end
