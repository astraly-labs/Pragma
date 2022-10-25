%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.math import sqrt, unsigned_div_rem

from time_series.matmul import pairwise_1D, dot_product
from time_series.reshape import fill_1d
from time_series.structs import TickElem, PAIRWISE_OPERATION
from time_series.utils import safe_div
from cairo_math_64x61.math64x61 import ONE, FixedPoint

from time_series.stats.polevl import polevl

const ONE_YEAR_IN_SECONDS = 31536000;

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

func sum_tick_array{range_check_ptr}(tick_arr_len: felt, tick_arr: TickElem**) -> felt {
    return sum_tick_array_iter(0, 0, tick_arr_len, tick_arr);
}

func sum_tick_array_iter{range_check_ptr}(
    idx: felt, total: felt, tick_arr_len: felt, tick_arr: TickElem**
) -> felt {
    if (idx == tick_arr_len) {
        return total;
    }
    return sum_tick_array_iter(idx + 1, total + tick_arr[idx].value, tick_arr_len, tick_arr);
}

func sum_array{range_check_ptr}(tick_arr_len: felt, tick_arr: felt*) -> felt {
    let (sum_) = sum_array_iter(0, 0, tick_arr_len, tick_arr);
    return sum_;
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
    let sum_ = sum_tick_array(tick_arr_len, tick_arr);
    let (mean_) = safe_div(sum_, tick_arr_len);
    return (mean_,);
}

func variance{range_check_ptr}(arr_len: felt, arr: TickElem**) -> (var: felt) {
    alloc_locals;
    let (__v) = extract_values(arr_len, arr);

    let (mean_) = mean(arr_len, arr);
    let (mean_arr) = fill_1d(arr_len, mean_);

    let (arr_) = extract_values(arr_len, arr);

    let (diff_arr) = pairwise_1D(PAIRWISE_OPERATION.SUBTRACTION, arr_len, arr_, mean_arr);

    let (diff_squared) = pairwise_1D(
        PAIRWISE_OPERATION.FIXED_POINT_MULTIPLICATION, arr_len, diff_arr, diff_arr
    );

    let sum_ = sum_array(arr_len, diff_squared);
    let (variance_) = safe_div(sum_, arr_len - 1);

    return (variance_,);
}

func standard_deviation{range_check}(arr_len, arr: felt*) -> (std: felt) {
    let (variance_) = variance(arr_len, arr);
    let std_ = sqrt(variance_);
    return (std_,);
}

func volatility{range_check_ptr}(arr_len, arr: TickElem**) -> felt {
    // def volatility(N: int, S: list[int], T: list[int]):
    //     summation = 0
    //     for i in range(1, N):
    //         numerator = log(S[i] / S[i - 1]) ** 2
    //         denominator = ((T[i] - T[i - 1]) / (3600 * 24 * 365)
    //         summation += numerator / denominator
    //     return (1 / (N - 1)) * summation * 100

    let _volatility_sum = _sum_volatility(0, 1, arr_len, arr);
    let _volatility = FixedPoint.div(_volatility_sum, (arr_len - 1) * ONE);
    let sqrt_vol = FixedPoint.sqrt(_volatility);
    return sqrt_vol;
}

func _sum_volatility{range_check_ptr}(total, cur_idx, arr_len, arr: TickElem**) -> felt {
    alloc_locals;
    if (cur_idx == arr_len) {
        return total;
    }
    let cur_val = arr[cur_idx];
    let prev_val = arr[cur_idx - 1];

    let cur_value = cur_val.value;
    let prev_value = prev_val.value;

    let cur_timestamp = cur_val.tick;
    let prev_timestamp = prev_val.tick;

    let numerator_value = FixedPoint.ln(FixedPoint.div(cur_value, prev_value));
    let numerator = FixedPoint.pow(numerator_value, ONE * 2);
    let (denominator, _) = unsigned_div_rem(
        (cur_timestamp - prev_timestamp) * ONE, ONE_YEAR_IN_SECONDS
    );
    let fraction_ = FixedPoint.div(numerator, denominator);
    let summation = FixedPoint.add(total, fraction_);

    return _sum_volatility(summation, cur_idx + 1, arr_len, arr);
}
