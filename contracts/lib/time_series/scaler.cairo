%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.bool import TRUE
from starkware.cairo.common.math import unsigned_div_rem, abs_value
from starkware.cairo.common.math_cmp import is_le, is_nn

from time_series.structs import TickElem

func calculate_slope{range_check_ptr}(x1 : felt, x2 : felt, y1 : felt, y2 : felt) -> (
    slope_ : felt
):
    alloc_locals
    let (x_neg) = is_nn(x2 - x1)
    let (y_neg) = is_nn(y2 - y1)
    let (y_diff) = abs_value(y2 - y1)
    let (x_diff) = abs_value(x2 - x1)
    if y_neg != x_neg:
        let (response_, _) = unsigned_div_rem(y_diff, x_diff)
        return (0 - response_)
    end
    let (response_, _) = unsigned_div_rem(y_diff, x_diff)
    return (response_)
end

func scale_data{range_check_ptr}(
    start_tick : felt,
    end_tick : felt,
    tick_arr_len : felt,
    tick_arr : TickElem**,
    num_intervals : felt,
) -> (output_len : felt, output : TickElem*):
    alloc_locals
    let (interval, _) = unsigned_div_rem(end_tick - start_tick, num_intervals)
    let (output : TickElem*) = alloc()
    scale_data_iter(
        start_tick, end_tick, tick_arr_len, tick_arr, 0, num_intervals, interval, output, 0
    )

    return (num_intervals, output)
end

func scale_data_iter{range_check_ptr}(
    start_tick : felt,
    end_tick : felt,
    tick_arr_len : felt,
    tick_arr : TickElem**,
    index : felt,
    num_intervals : felt,
    interval : felt,
    output : TickElem*,
    cur_index : felt,
):
    alloc_locals

    if cur_index == num_intervals + 1:
        return ()
    end
    let tick = cur_index * interval + start_tick
    let (_is_le) = is_le(tick_arr[index].tick, tick)
    if _is_le == TRUE:
        return scale_data_iter(
            start_tick,
            end_tick,
            tick_arr_len,
            tick_arr,
            index + 1,
            num_intervals,
            interval,
            output,
            cur_index,
        )
    end
    # # index > tick_arr_len - 1
    let (_after_end) = is_le(tick_arr_len - 1, index)
    local slope
    if _after_end == TRUE:
        let z = tick_arr_len - 1
        let (local _slope) = calculate_slope(
            tick_arr[z - 1].tick, tick_arr[z].tick, tick_arr[z - 1].value, tick_arr[z].value
        )
        slope = _slope
        tempvar range_check_ptr = range_check_ptr
    else:
        let (local _slope) = calculate_slope(
            tick_arr[index].tick,
            tick_arr[index + 1].tick,
            tick_arr[index].value,
            tick_arr[index + 1].value,
        )
        slope = _slope
        tempvar range_check_ptr = range_check_ptr
    end
    let offset = tick_arr[index].value - slope * tick_arr[index].tick
    assert output[cur_index] = TickElem(tick, slope * tick + offset)

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
    )
end
