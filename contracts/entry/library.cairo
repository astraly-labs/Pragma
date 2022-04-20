from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin
from starkware.cairo.common.hash import hash2
from starkware.cairo.common.math_cmp import is_le
from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.math import unsigned_div_rem
from starkware.cairo.common.signature import verify_ecdsa_signature
from starkware.cairo.common.bool import TRUE, FALSE

#
# Structs
#

struct Entry:
    member key : felt  # UTF-8 encoded lowercased string, e.g. "eth/usd"
    member value : felt
    member timestamp : felt
    member publisher : felt
end

#
# Helpers
#

func Entry_hash_entry{pedersen_ptr : HashBuiltin*}(entry : Entry) -> (hash : felt):
    let (h1) = hash2{hash_ptr=pedersen_ptr}(entry.key, entry.value)
    let (h2) = hash2{hash_ptr=pedersen_ptr}(h1, entry.timestamp)
    let (h3) = hash2{hash_ptr=pedersen_ptr}(h2, entry.publisher)
    return (h3)
end

func Entry_aggregate_entries{range_check_ptr}(num_entries : felt, entries_ptr : Entry*) -> (
        value : felt):
    let (value) = Entry_entries_median(num_entries, entries_ptr)
    return (value)
end

func Entry_aggregate_timestamps_max{range_check_ptr}(num_entries : felt, entries_ptr : Entry*) -> (
        last_updated_timestamp : felt):
    alloc_locals

    let entry_timestamp = [entries_ptr].timestamp
    if num_entries == 1:
        return (entry_timestamp)
    end

    let (rec_last_updated_timestamp) = Entry_aggregate_timestamps_max(
        num_entries - 1, entries_ptr + Entry.SIZE)
    let (is_current_entry_last) = is_le(rec_last_updated_timestamp, entry_timestamp)
    if is_current_entry_last == TRUE:
        return (entry_timestamp)
    end
    return (rec_last_updated_timestamp)
end

func Entry_entries_median{range_check_ptr}(num_entries : felt, entries_ptr : Entry*) -> (
        value : felt):
    let (sorted_entries_ptr) = Entry_sort_entries_by_value(num_entries, entries_ptr)

    let (q, r) = unsigned_div_rem(num_entries, 2)
    let is_even = 1 - r

    if is_even == FALSE:
        let median_idx = num_entries - q - 1  # 0-indexed
        let median_entry = [sorted_entries_ptr + median_idx * Entry.SIZE]
        return (median_entry.value)
    end

    let median_idx_1 = num_entries - q - 1
    let median_entry_1 = [sorted_entries_ptr + median_idx_1 * Entry.SIZE]
    let median_idx_2 = median_idx_1 + 1
    let median_entry_2 = [sorted_entries_ptr + median_idx_2 * Entry.SIZE]

    let (mean_value) = Entry_average_entries_value(median_entry_1, median_entry_2)
    return (mean_value)
end

func Entry_sort_entries_by_value{range_check_ptr}(num_entries : felt, entries_ptr : Entry*) -> (
        sorted_entries_ptr : Entry*):
    let (entries_ptr_input : Entry*) = alloc()
    let (sorted_entries_ptr) = Entry_bubble_sort_entries_by_value(
        num_entries, entries_ptr, 0, 1, entries_ptr_input, 0)
    return (sorted_entries_ptr)
end

func Entry_bubble_sort_entries_by_value{range_check_ptr}(
        num_entries : felt, entries_ptr : Entry*, idx1 : felt, idx2 : felt,
        sorted_entries_ptr : Entry*, sorted_this_iteration : felt) -> (sorted_entries_ptr : Entry*):
    alloc_locals
    local entries_ptr : Entry* = entries_ptr
    local range_check_ptr = range_check_ptr

    if idx2 == num_entries:
        assert [sorted_entries_ptr + (idx2 - 1) * Entry.SIZE] = [entries_ptr + idx1 * Entry.SIZE]
        if sorted_this_iteration == 0:
            return (sorted_entries_ptr)
        end

        let (new_sorted_ptr : Entry*) = alloc()
        let (recursive_sorted_ptr) = Entry_bubble_sort_entries_by_value(
            num_entries, sorted_entries_ptr, 0, 1, new_sorted_ptr, 0)
        return (recursive_sorted_ptr)
    end
    let (is_ordered) = is_le(
        [entries_ptr + idx1 * Entry.SIZE].value, [entries_ptr + idx2 * Entry.SIZE].value)
    if is_ordered == TRUE:
        assert [sorted_entries_ptr + (idx2 - 1) * Entry.SIZE] = [entries_ptr + idx1 * Entry.SIZE]
        let (recursive_sorted_ptr) = Entry_bubble_sort_entries_by_value(
            num_entries, entries_ptr, idx2, idx2 + 1, sorted_entries_ptr, sorted_this_iteration)
        return (recursive_sorted_ptr)
    end
    assert [sorted_entries_ptr + (idx2 - 1) * Entry.SIZE] = [entries_ptr + idx2 * Entry.SIZE]
    let (recursive_sorted_ptr) = Entry_bubble_sort_entries_by_value(
        num_entries, entries_ptr, idx1, idx2 + 1, sorted_entries_ptr, 1)
    return (recursive_sorted_ptr)
end

func Entry_entries_mean{range_check_ptr}(
        num_entries : felt, entries_ptr : Entry*, idx : felt, remainder : felt) -> (
        value : felt, remainder : felt):
    alloc_locals
    let running_value = [entries_ptr + idx * Entry.SIZE].value
    let (local summand, new_remainder) = unsigned_div_rem(running_value + remainder, num_entries)
    if idx + 1 == num_entries:
        return (summand, new_remainder)
    end
    let (recursive_summand, recursive_remainder) = Entry_entries_mean(
        num_entries, entries_ptr, idx + 1, new_remainder)
    let value = summand + recursive_summand
    return (value, recursive_remainder)
end

func Entry_average_entries_value{range_check_ptr}(entry_1 : Entry, entry_2 : Entry) -> (
        value : felt):
    let (summand_1, r1) = unsigned_div_rem(entry_1.value, 2)
    let (summand_2, r2) = unsigned_div_rem(entry_2.value, 2)
    let (summand_3, r3) = unsigned_div_rem(r1 + r2, 2)

    let value = summand_1 + summand_2 + summand_3
    return (value)
end

func Entry_assert_valid_entry_signature{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(
        publisher_public_key : felt, signature_r : felt, signature_s : felt, entry : Entry):
    alloc_locals

    let (local hash) = Entry_hash_entry(entry)

    verify_ecdsa_signature(hash, publisher_public_key, signature_r, signature_s)
    return ()
end
