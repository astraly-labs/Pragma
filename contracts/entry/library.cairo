%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.hash import hash2
from starkware.cairo.common.math_cmp import is_le
from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.math import unsigned_div_rem
from starkware.cairo.common.signature import verify_ecdsa_signature
from starkware.cairo.common.bool import TRUE, FALSE

from contracts.entry.structs import Entry

namespace Entries:
    #
    # Helpers
    #

    # @notice Aggregates entries for a specific value
    # @param entries_len: number of entries to use for aggregation
    # @param entries: entries list to use for aggregation
    # @return value: the aggregation value
    func aggregate_entries{range_check_ptr}(entries_len : felt, entries : Entry*) -> (value : felt):
        let (value) = entries_median(entries_len, entries)
        return (value)
    end

    # @notice returns the max timestamp of an entries array
    # @param entries_len: number of entries to use
    # @param entries: pointer to first entry in array
    # @return last_updated_timestamp: the latest timestamp from the array
    func aggregate_timestamps_max{range_check_ptr}(entries_len : felt, entries : Entry*) -> (
        last_updated_timestamp : felt
    ):
        alloc_locals

        let entry_timestamp = [entries].timestamp
        if entries_len == 1:
            return (entry_timestamp)
        end

        let (rec_last_updated_timestamp) = aggregate_timestamps_max(
            entries_len - 1, entries + Entry.SIZE
        )
        let (is_current_entry_last) = is_le(rec_last_updated_timestamp, entry_timestamp)
        if is_current_entry_last == TRUE:
            return (entry_timestamp)
        end
        return (rec_last_updated_timestamp)
    end

    # @notice returns the median value from an entries array
    # @param entries_len: number of entries to use
    # @param entries: pointer to first entry in array
    # @return value: the median value from the array of entries
    func entries_median{range_check_ptr}(entries_len : felt, entries : Entry*) -> (value : felt):
        let (sorted_entries) = sort_entries_by_value(entries_len, entries)

        let (q, r) = unsigned_div_rem(entries_len, 2)
        let is_even = 1 - r

        if is_even == FALSE:
            let median_idx = entries_len - q - 1  # 0-indexed
            let median_entry = [sorted_entries + median_idx * Entry.SIZE]
            return (median_entry.value)
        end

        let median_idx_1 = entries_len - q - 1
        let median_entry_1 = [sorted_entries + median_idx_1 * Entry.SIZE]
        let median_idx_2 = median_idx_1 + 1
        let median_entry_2 = [sorted_entries + median_idx_2 * Entry.SIZE]

        let (mean_value) = average_entries_value(median_entry_1, median_entry_2)
        return (mean_value)
    end

    # @notice returns a copy of the entries array sorted by value
    # @param entries_len: number of entries to use
    # @param entries: pointer to first entry in array
    # @return sorted_entries: a pointer to a sorted array of entries
    func sort_entries_by_value{range_check_ptr}(entries_len : felt, entries : Entry*) -> (
        sorted_entries : Entry*
    ):
        let (entries_input : Entry*) = alloc()
        let (sorted_entries) = bubble_sort_entries_by_value(
            entries_len, entries, 0, 1, entries_input, 0
        )
        return (sorted_entries)
    end

    # @notice perform a bubblesort on an entries array
    # @param entries_len: number of entries to use
    # @param entries: pointer to first entry in array
    # @param idx1: left index
    # @param idx2: right index
    # @param sorted_entries: pointer to initial element in sorted array
    # @param sorted_this_iteration: number of entries sorted so far
    # @return sorted_entries: a pointer to a sorted array of entries
    func bubble_sort_entries_by_value{range_check_ptr}(
        entries_len : felt,
        entries : Entry*,
        idx1 : felt,
        idx2 : felt,
        sorted_entries : Entry*,
        sorted_this_iteration : felt,
    ) -> (sorted_entries : Entry*):
        alloc_locals
        local entries : Entry* = entries
        local range_check_ptr = range_check_ptr

        if idx2 == entries_len:
            assert [sorted_entries + (idx2 - 1) * Entry.SIZE] = [entries + idx1 * Entry.SIZE]
            if sorted_this_iteration == 0:
                return (sorted_entries)
            end

            let (new_sorted_ptr : Entry*) = alloc()
            let (recursive_sorted_ptr) = bubble_sort_entries_by_value(
                entries_len, sorted_entries, 0, 1, new_sorted_ptr, 0
            )
            return (recursive_sorted_ptr)
        end
        let (is_ordered) = is_le(
            [entries + idx1 * Entry.SIZE].value, [entries + idx2 * Entry.SIZE].value
        )
        if is_ordered == TRUE:
            assert [sorted_entries + (idx2 - 1) * Entry.SIZE] = [entries + idx1 * Entry.SIZE]
            let (recursive_sorted_ptr) = bubble_sort_entries_by_value(
                entries_len, entries, idx2, idx2 + 1, sorted_entries, sorted_this_iteration
            )
            return (recursive_sorted_ptr)
        end
        assert [sorted_entries + (idx2 - 1) * Entry.SIZE] = [entries + idx2 * Entry.SIZE]
        let (recursive_sorted_ptr) = bubble_sort_entries_by_value(
            entries_len, entries, idx1, idx2 + 1, sorted_entries, 1
        )
        return (recursive_sorted_ptr)
    end

    # @notice get the mean of an entries array
    # @param entries_len: number of entries to use
    # @param entries: pointer to first entry in array
    # @param idx: current index
    # @param remainder: remaining entries
    # @return value: mean value
    # @return remainder: euclidean division remainder from mean calculation
    func entries_mean{range_check_ptr}(
        entries_len : felt, entries : Entry*, idx : felt, remainder : felt
    ) -> (value : felt, remainder : felt):
        alloc_locals
        let running_value = [entries + idx * Entry.SIZE].value
        let (local summand, new_remainder) = unsigned_div_rem(
            running_value + remainder, entries_len
        )
        if idx + 1 == entries_len:
            return (summand, new_remainder)
        end
        let (recursive_summand, recursive_remainder) = entries_mean(
            entries_len, entries, idx + 1, new_remainder
        )
        let value = summand + recursive_summand
        return (value, recursive_remainder)
    end

    # @notice get the mean of an entries array
    # @param entry_1: left entry
    # @param entry_2: right entry
    # @return value: mean value
    func average_entries_value{range_check_ptr}(entry_1 : Entry, entry_2 : Entry) -> (value : felt):
        let (summand_1, r1) = unsigned_div_rem(entry_1.value, 2)
        let (summand_2, r2) = unsigned_div_rem(entry_2.value, 2)
        let (summand_3, r3) = unsigned_div_rem(r1 + r2, 2)

        let value = summand_1 + summand_2 + summand_3
        return (value)
    end
end
