%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.bool import FALSE, TRUE
from starkware.cairo.common.math import unsigned_div_rem, abs_value
from starkware.cairo.common.math_cmp import is_le, is_nn

from time_series.structs import TickElem
from time_series.utils import are_equal

func calculate_slope{range_check_ptr}(x1: felt, x2: felt, y1: felt, y2: felt) -> (slope_: felt) {
    alloc_locals;
    let x_neg = is_nn(x2 - x1);
    let y_neg = is_nn(y2 - y1);
    let y_diff = abs_value(y2 - y1);
    let x_diff = abs_value(x2 - x1);
    if (y_neg != x_neg) {
        let (response_, _) = unsigned_div_rem(y_diff, x_diff);
        return (0 - response_,);
    }
    let (response_, _) = unsigned_div_rem(y_diff, x_diff);
    return (response_,);
}

func scale_data{range_check_ptr}(
    start_tick: felt, end_tick: felt, tick_arr_len: felt, tick_arr: TickElem**, num_intervals: felt
) -> (output: TickElem**) {
    alloc_locals;

    let (interval, _) = unsigned_div_rem(end_tick - start_tick, num_intervals - 1);
    let (output: TickElem**) = alloc();
    scale_data_iter(
        start_tick, end_tick, tick_arr_len, tick_arr, 0, num_intervals, interval, output, 0
    );

    return (output,);
}

func get_bounded_tick_idx{range_check_ptr}(
    cur_position: felt, cur_index: felt, tick_arr_len: felt, tick_arr: TickElem**
) -> (below_index: felt, is_start: felt, is_end: felt) {
    alloc_locals;
    if (cur_index == tick_arr_len) {
        return (tick_arr_len - 1, FALSE, TRUE);
    }

    if (cur_index == tick_arr_len - 1) {
        return (tick_arr_len - 1, FALSE, TRUE);
    }

    let _is_before_start = is_le(cur_position, tick_arr[0].tick);
    let (_is_zero) = are_equal(cur_position, 0);
    if (_is_before_start + _is_zero == 2) {
        return (0, TRUE, FALSE);
    }

    let _is_less_than = is_le(tick_arr[cur_index].tick, cur_position);
    let _is_less_than2 = is_le(cur_position, tick_arr[cur_index + 1].tick);

    if (_is_less_than + _is_less_than2 == 2) {
        return (cur_index, FALSE, FALSE);
    }

    return get_bounded_tick_idx(cur_position, cur_index + 1, tick_arr_len, tick_arr);
}

func scale_data_iter{range_check_ptr}(
    start_tick: felt,
    end_tick: felt,
    tick_arr_len: felt,
    tick_arr: TickElem**,
    index: felt,
    num_intervals: felt,
    interval: felt,
    output: TickElem**,
    cur_index: felt,
) {
    alloc_locals;

    if (cur_index == num_intervals) {
        return ();
    }

    local tick;
    tempvar _l = cur_index * interval + start_tick;
    if (cur_index == num_intervals - 1) {
        tick = end_tick;
    } else {
        tick = _l;
    }

    let (index, _before_beginning, _after_end) = get_bounded_tick_idx(
        tick, index, tick_arr_len, tick_arr
    );

    if (tick_arr[index].tick == tick) {
        assert output[cur_index] = tick_arr[index];

        return scale_data_iter(
            start_tick,
            end_tick,
            tick_arr_len,
            tick_arr,
            index,
            num_intervals,
            interval,
            output,
            cur_index + 1,
        );
    }

    local slope;
    if (_after_end == TRUE) {
        let z = tick_arr_len - 1;
        let (local _slope) = calculate_slope(
            tick_arr[z - 1].tick, tick_arr[z].tick, tick_arr[z - 1].value, tick_arr[z].value
        );
        slope = _slope;

        tempvar range_check_ptr = range_check_ptr;
    } else {
        let x1 = tick_arr[index].tick;
        let y1 = tick_arr[index].value;
        let x2 = tick_arr[index + 1].tick;
        let y2 = tick_arr[index + 1].value;
        let (local _slope) = calculate_slope(
            tick_arr[index].tick,
            tick_arr[index + 1].tick,
            tick_arr[index].value,
            tick_arr[index + 1].value,
        );
        slope = _slope;
        tempvar range_check_ptr = range_check_ptr;
    }

    let offset = tick_arr[index].value - slope * tick_arr[index].tick;
    let sl = slope * tick;
    let z = sl + offset;

    assert output[cur_index] = new TickElem(tick, z);

    return scale_data_iter(
        start_tick,
        end_tick,
        tick_arr_len,
        tick_arr,
        index,
        num_intervals,
        interval,
        output,
        cur_index + 1,
    );
}
