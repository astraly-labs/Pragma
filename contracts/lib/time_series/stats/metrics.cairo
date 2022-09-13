%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.math import sqrt

from time_series.matmul import pairwise_1D, dot_product
from time_series.reshape import fill_1d
from time_series.structs import TickElem, PAIRWISE_OPERATION
from time_series.utils import safe_div

from time_series.stats.polevl import polevl

func extract_values{range_check_ptr}(tick_arr_len: felt, tick_arr: TickElem**) -> (output_: felt*) {
    alloc_locals;
    let (output) = alloc();
    _extract_values_iter(0, tick_arr_len, tick_arr, output);
    return (output,);
}

func _extract_values_iter{range_check_ptr}(
    cur_idx: felt, tick_arr_len: felt, tick_arr: TickElem**, output: felt*
) {
    alloc_locals;
    if (cur_idx == tick_arr_len) {
        return ();
    }
    assert output[cur_idx] = tick_arr[cur_idx].value;
    return _extract_values_iter(cur_idx + 1, tick_arr_len, tick_arr, output);
}

func sum_tick_array{range_check_ptr}(tick_arr_len: felt, tick_arr: TickElem**) -> (sum_: felt) {
    let (sum_) = sum_tick_array_iter(0, 0, tick_arr_len, tick_arr);
    return (sum_,);
}

func sum_tick_array_iter{range_check_ptr}(
    idx: felt, total: felt, tick_arr_len: felt, tick_arr: TickElem**
) -> (sum_: felt) {
    if (idx == tick_arr_len) {
        return (total,);
    }
    return sum_tick_array_iter(idx + 1, total + tick_arr[idx].value, tick_arr_len, tick_arr);
}

func sum_array{range_check_ptr}(tick_arr_len: felt, tick_arr: felt*) -> (sum_: felt) {
    let (sum_) = sum_array_iter(0, 0, tick_arr_len, tick_arr);
    return (sum_,);
}

func sum_array_iter{range_check_ptr}(
    idx: felt, total: felt, tick_arr_len: felt, tick_arr: felt*
) -> (sum_: felt) {
    if (idx == tick_arr_len) {
        return (total,);
    }
    return sum_array_iter(idx + 1, total + tick_arr[idx], tick_arr_len, tick_arr);
}

func mean{range_check_ptr}(tick_arr_len: felt, tick_arr: TickElem**) -> (mean: felt) {
    let (sum_) = sum_tick_array(tick_arr_len, tick_arr);
    let (mean_) = safe_div(sum_, tick_arr_len);
    return (mean_,);
}

func variance{range_check_ptr}(arr_len: felt, arr: TickElem**) -> (var: felt) {
    alloc_locals;
    let (mean_) = mean(arr_len, arr);
    let (mean_arr) = fill_1d(arr_len, mean_);

    let (arr_) = extract_values(arr_len, arr);
    let (diff_arr) = pairwise_1D(PAIRWISE_OPERATION.SUBTRACTION, arr_len, arr_, mean_arr);
    let (diff_squared) = dot_product(arr_len, diff_arr, diff_arr);
    let (variance_) = safe_div(diff_squared, arr_len - 1);

    return (variance_,);
}

func standard_deviation{range_check}(arr_len, arr: felt*) -> (std: felt) {
    let (variance_) = variance(arr_len, arr);
    let std_ = sqrt(variance_);
    return (std_,);
}
