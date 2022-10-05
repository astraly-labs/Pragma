%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.math import unsigned_div_rem
from starkware.cairo.common.math_cmp import is_le
from starkware.cairo.common.bool import TRUE, FALSE

from entry.structs import SpotEntry, Checkpoint

namespace Entries {
    //
    // Helpers
    //

    // @notice Aggregates entries for a specific value
    // @param entries_len: length of entries array
    // @param entries: pointer to first Entry in array
    // @return value: the aggregation value
    func aggregate_spot_entries{range_check_ptr}(entries_len: felt, entries: SpotEntry*) -> (
        value: felt
    ) {
        let (value) = spot_entries_median(entries_len, entries);
        return (value,);
    }

    // @notice returns the max timestamp of an entries array
    // @param entries_len: length of entries array
    // @param entries: pointer to first Entry in array
    // @return last_updated_timestamp: the latest timestamp from the array
    func aggregate_timestamps_max{range_check_ptr}(entries_len: felt, entries: SpotEntry*) -> (
        last_updated_timestamp: felt
    ) {
        alloc_locals;

        let entry_timestamp = [entries].base.timestamp;
        if (entries_len == 1) {
            return (entry_timestamp,);
        }

        let (rec_last_updated_timestamp) = aggregate_timestamps_max(
            entries_len - 1, entries + SpotEntry.SIZE
        );
        let is_current_entry_last = is_le(rec_last_updated_timestamp, entry_timestamp);
        if (is_current_entry_last == TRUE) {
            return (entry_timestamp,);
        }
        return (rec_last_updated_timestamp,);
    }

    // @notice returns the median value from an entries array
    // @param entries_len: length of entries array
    // @param entries: pointer to first Entry in array
    // @return value: the median value from the array of entries
    func spot_entries_median{range_check_ptr}(entries_len: felt, entries: SpotEntry*) -> (
        price: felt
    ) {
        let (sorted_entries) = sort_entries_by_value(entries_len, entries);

        let (q, r) = unsigned_div_rem(entries_len, 2);
        let is_even = 1 - r;

        if (is_even == FALSE) {
            let median_idx = entries_len - q - 1;  // 0-indexed
            let median_entry = [sorted_entries + median_idx * SpotEntry.SIZE];
            return (median_entry.price,);
        }

        let median_idx_1 = entries_len - q - 1;
        let median_entry_1 = [sorted_entries + median_idx_1 * SpotEntry.SIZE];
        let median_idx_2 = median_idx_1 + 1;
        let median_entry_2 = [sorted_entries + median_idx_2 * SpotEntry.SIZE];

        let (mean_price) = average_spot_entries_value(median_entry_1, median_entry_2);
        return (mean_price,);
    }

    // @notice returns a copy of the entries array sorted by value
    // @param entries_len: length of entries array
    // @param entries: pointer to first Entry in array
    // @return sorted_entries: a pointer to a sorted array of entries
    func sort_entries_by_value{range_check_ptr}(entries_len: felt, entries: SpotEntry*) -> (
        sorted_entries: SpotEntry*
    ) {
        let (entries_input: SpotEntry*) = alloc();
        let (sorted_entries) = mergesort_spot_entries_by_value(entries_len, entries);
        return (sorted_entries,);
    }

    func mergesort_spot_entries_by_value{range_check_ptr}(
        felt_arr_len: felt, felt_arr: SpotEntry*
    ) -> (sorted_entries_ptr: SpotEntry*) {
        alloc_locals;

        // step 1. if len == 1 => return lst
        if (felt_arr_len == 1) {
            return (felt_arr,);
        }

        // step 2. split list at middle
        let (left_arr_len, _) = unsigned_div_rem(felt_arr_len, 2);
        let right_arr_len = felt_arr_len - left_arr_len;

        // step 3. create left and right
        let left_arr = felt_arr;
        let right_arr = felt_arr + left_arr_len * SpotEntry.SIZE;

        // step 4. recurse left and right
        let (sorted_left_arr) = mergesort_spot_entries_by_value(left_arr_len, left_arr);
        let (sorted_right_arr) = mergesort_spot_entries_by_value(right_arr_len, right_arr);
        let (result_arr: SpotEntry*) = alloc();

        // step 5. merge left and right
        let (sorted_arr) = _merge(
            left_arr_len, sorted_left_arr, right_arr_len, sorted_right_arr, result_arr, 0, 0, 0
        );
        return (sorted_arr,);
    }

    func _merge{range_check_ptr}(
        left_arr_len: felt,
        left_arr: SpotEntry*,
        right_arr_len: felt,
        right_arr: SpotEntry*,
        sorted_arr: SpotEntry*,
        current_ix: felt,
        left_arr_ix: felt,
        right_arr_ix: felt,
    ) -> (sorted_arr: SpotEntry*) {
        alloc_locals;

        if ((current_ix) == (left_arr_len + right_arr_len)) {
            return (sorted_arr,);
        }

        if (left_arr_len == left_arr_ix) {
            let right_v = right_arr[right_arr_ix].price;
            assert sorted_arr[current_ix] = right_arr[right_arr_ix];
            return _merge(
                left_arr_len,
                left_arr,
                right_arr_len,
                right_arr,
                sorted_arr,
                current_ix + 1,
                left_arr_ix,
                right_arr_ix + 1,
            );
        }

        if (right_arr_len == right_arr_ix) {
            let left_v = left_arr[left_arr_ix].price;
            assert sorted_arr[current_ix] = left_arr[left_arr_ix];
            return _merge(
                left_arr_len,
                left_arr,
                right_arr_len,
                right_arr,
                sorted_arr,
                current_ix + 1,
                left_arr_ix + 1,
                right_arr_ix,
            );
        }

        let left_val = left_arr[left_arr_ix].price;
        let right_val = right_arr[right_arr_ix].price;
        let is_left = is_le(left_val, right_val);

        if (is_left == 1) {
            assert sorted_arr[current_ix] = left_arr[left_arr_ix];
            return _merge(
                left_arr_len,
                left_arr,
                right_arr_len,
                right_arr,
                sorted_arr,
                current_ix + 1,
                left_arr_ix + 1,
                right_arr_ix,
            );
        } else {
            assert sorted_arr[current_ix] = right_arr[right_arr_ix];
            return _merge(
                left_arr_len,
                left_arr,
                right_arr_len,
                right_arr,
                sorted_arr,
                current_ix + 1,
                left_arr_ix,
                right_arr_ix + 1,
            );
        }
    }

    func bubble_sort_spot_entries_by_price{range_check_ptr}(
        entries_len: felt,
        entries: SpotEntry*,
        idx1: felt,
        idx2: felt,
        sorted_entries: SpotEntry*,
        sorted_this_iteration: felt,
    ) -> (sorted_entries: SpotEntry*) {
        alloc_locals;
        local entries: SpotEntry* = entries;
        local range_check_ptr = range_check_ptr;

        if (idx2 == entries_len) {
            assert [sorted_entries + (idx2 - 1) * SpotEntry.SIZE] = [entries + idx1 * SpotEntry.SIZE];
            if (sorted_this_iteration == 0) {
                return (sorted_entries,);
            }

            let (new_sorted_ptr: SpotEntry*) = alloc();
            let (recursive_sorted_ptr) = bubble_sort_spot_entries_by_price(
                entries_len, sorted_entries, 0, 1, new_sorted_ptr, 0
            );
            return (recursive_sorted_ptr,);
        }
        let is_ordered = is_le(
            [entries + idx1 * SpotEntry.SIZE].price, [entries + idx2 * SpotEntry.SIZE].price
        );
        if (is_ordered == TRUE) {
            assert [sorted_entries + (idx2 - 1) * SpotEntry.SIZE] = [entries + idx1 * SpotEntry.SIZE];
            let (recursive_sorted_ptr) = bubble_sort_spot_entries_by_price(
                entries_len, entries, idx2, idx2 + 1, sorted_entries, sorted_this_iteration
            );
            return (recursive_sorted_ptr,);
        }
        assert [sorted_entries + (idx2 - 1) * SpotEntry.SIZE] = [entries + idx2 * SpotEntry.SIZE];
        let (recursive_sorted_ptr) = bubble_sort_spot_entries_by_price(
            entries_len, entries, idx1, idx2 + 1, sorted_entries, 1
        );
        return (recursive_sorted_ptr,);
    }

    // @notice get the mean of an entries array
    // @param entries_len: length of entries array
    // @param entries: pointer to first Entry in array
    // @param idx: current index
    // @param remainder: remaining entries
    // @return value: mean value
    // @return remainder: euclidean division remainder from mean calculation
    func spot_entries_mean{range_check_ptr}(
        entries_len: felt, entries: SpotEntry*, idx: felt, remainder: felt
    ) -> (price: felt, remainder: felt) {
        alloc_locals;
        let running_price = [entries + idx * SpotEntry.SIZE].price;
        let (local summand, new_remainder) = unsigned_div_rem(
            running_price + remainder, entries_len
        );
        if (idx + 1 == entries_len) {
            return (summand, new_remainder);
        }
        let (recursive_summand, recursive_remainder) = spot_entries_mean(
            entries_len, entries, idx + 1, new_remainder
        );
        let price = summand + recursive_summand;
        return (price, recursive_remainder);
    }

    // @notice get the mean of two entries
    // @param entry_1: left entry
    // @param entry_2: right entry
    // @return value: mean value
    func average_spot_entries_value{range_check_ptr}(entry_1: SpotEntry, entry_2: SpotEntry) -> (
        price: felt
    ) {
        let (summand_1, r1) = unsigned_div_rem(entry_1.price, 2);
        let (summand_2, r2) = unsigned_div_rem(entry_2.price, 2);
        let (summand_3, r3) = unsigned_div_rem(r1 + r2, 2);

        let price = summand_1 + summand_2 + summand_3;
        return (price,);
    }
}
