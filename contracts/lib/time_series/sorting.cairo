%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.math import unsigned_div_rem
from starkware.cairo.common.math_cmp import is_le
from starkware.cairo.common.bool import TRUE, FALSE

from time_series.structs import TickElem

func mergesort_elements{range_check_ptr}(felt_arr_len : felt, felt_arr : TickElem*) -> (
    sorted_entries_ptr : TickElem*
):
    alloc_locals

    # step 1. if len == 1 => return lst
    if felt_arr_len == 1:
        return (felt_arr)
    end

    # step 2. split list at middle
    let (left_arr_len, _) = unsigned_div_rem(felt_arr_len, 2)
    let right_arr_len = felt_arr_len - left_arr_len

    # step 3. create left and right
    let left_arr = felt_arr
    let right_arr = felt_arr + left_arr_len * TickElem.SIZE

    # step 4. recurse left and right
    let (sorted_left_arr) = mergesort_elements(left_arr_len, left_arr)
    let (sorted_right_arr) = mergesort_elements(right_arr_len, right_arr)
    let (result_arr : TickElem*) = alloc()

    # step 5. merge left and right
    let (sorted_arr) = _merge(
        left_arr_len, sorted_left_arr, right_arr_len, sorted_right_arr, result_arr, 0, 0, 0
    )
    return (sorted_arr)
end

func _merge{range_check_ptr}(
    left_arr_len : felt,
    left_arr : TickElem*,
    right_arr_len : felt,
    right_arr : TickElem*,
    sorted_arr : TickElem*,
    current_ix : felt,
    left_arr_ix : felt,
    right_arr_ix : felt,
) -> (sorted_arr : TickElem*):
    alloc_locals

    if (current_ix) == (left_arr_len + right_arr_len):
        return (sorted_arr)
    end

    if left_arr_len == left_arr_ix:
        assert sorted_arr[current_ix] = right_arr[right_arr_ix]
        return _merge(
            left_arr_len,
            left_arr,
            right_arr_len,
            right_arr,
            sorted_arr,
            current_ix + 1,
            left_arr_ix,
            right_arr_ix + 1,
        )
    end

    if right_arr_len == right_arr_ix:
        assert sorted_arr[current_ix] = left_arr[left_arr_ix]
        return _merge(
            left_arr_len,
            left_arr,
            right_arr_len,
            right_arr,
            sorted_arr,
            current_ix + 1,
            left_arr_ix + 1,
            right_arr_ix,
        )
    end

    let left_val = left_arr[left_arr_ix].tick
    let right_val = right_arr[right_arr_ix].tick
    let (is_left) = is_le(left_val, right_val)

    if is_left == 1:
        assert sorted_arr[current_ix] = left_arr[left_arr_ix]
        return _merge(
            left_arr_len,
            left_arr,
            right_arr_len,
            right_arr,
            sorted_arr,
            current_ix + 1,
            left_arr_ix + 1,
            right_arr_ix,
        )
    else:
        assert sorted_arr[current_ix] = right_arr[right_arr_ix]
        return _merge(
            left_arr_len,
            left_arr,
            right_arr_len,
            right_arr,
            sorted_arr,
            current_ix + 1,
            left_arr_ix,
            right_arr_ix + 1,
        )
    end
end

func bubble_sort_elements{range_check_ptr}(
    entries_len : felt,
    entries : TickElem*,
    idx1 : felt,
    idx2 : felt,
    sorted_entries : TickElem*,
    sorted_this_iteration : felt,
) -> (sorted_entries : TickElem*):
    alloc_locals
    local entries : TickElem* = entries
    local range_check_ptr = range_check_ptr

    if idx2 == entries_len:
        assert [sorted_entries + (idx2 - 1) * TickElem.SIZE] = [entries + idx1 * TickElem.SIZE]
        if sorted_this_iteration == 0:
            return (sorted_entries)
        end

        let (new_sorted_ptr : TickElem*) = alloc()
        let (recursive_sorted_ptr) = bubble_sort_elements(
            entries_len, sorted_entries, 0, 1, new_sorted_ptr, 0
        )
        return (recursive_sorted_ptr)
    end
    let (is_ordered) = is_le(
        [entries + idx1 * TickElem.SIZE].tick, [entries + idx2 * TickElem.SIZE].tick
    )
    if is_ordered == TRUE:
        assert [sorted_entries + (idx2 - 1) * TickElem.SIZE] = [entries + idx1 * TickElem.SIZE]
        let (recursive_sorted_ptr) = bubble_sort_elements(
            entries_len, entries, idx2, idx2 + 1, sorted_entries, sorted_this_iteration
        )
        return (recursive_sorted_ptr)
    end
    assert [sorted_entries + (idx2 - 1) * TickElem.SIZE] = [entries + idx2 * TickElem.SIZE]
    let (recursive_sorted_ptr) = bubble_sort_elements(
        entries_len, entries, idx1, idx2 + 1, sorted_entries, 1
    )
    return (recursive_sorted_ptr)
end
