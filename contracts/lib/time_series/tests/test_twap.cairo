%lang starknet

from starkware.cairo.common.alloc import alloc

from time_series.prelude import (
    TickElem,
    safe_div,
    modulo,
    fill_1d,
    subsample,
    pairwise_1D,
    PAIRWISE_OPERATION,
    sum_array,
    dot_product,
)

using none = felt;
using Bool = felt;

func generate_random_time_series_vec{range_check_ptr}(
    size: felt, start: felt, end_: felt, min_: felt, max_: felt
) -> (output: TickElem*) {
    alloc_locals;
    let (tick_arr: TickElem*) = alloc();
    generate_random_time_series_vec_iter(0, size, start, end_, min_, max_, tick_arr);
    return (tick_arr,);
}

func generate_random_time_series_vec_iter{range_check_ptr}(
    cur_ix: felt, size: felt, start: felt, end_: felt, min_: felt, max_: felt, output: TickElem*
) {
    alloc_locals;
    if (cur_ix == size) {
        return ();
    }
    let (interval) = safe_div(end_ - start, size);
    let range_ = max_ - min_;
    if (cur_ix == 0) {
        let (rand_) = modulo(12345 ** 3 + end_ + 3141, range_);
    } else {
        let (rand_) = modulo(output[cur_ix - 1].value * 16139 + 999999, max_);
    }

    assert output[cur_ix] = TickElem(tick=interval * cur_ix + start, value=rand_);
    return generate_random_time_series_vec_iter(cur_ix + 1, size, start, end_, min_, max_, output);
}

func log_array(arr_len: felt, arr: felt*) {
    %{ print('Array(', end='') %}
    log_array_iter(0, arr_len, arr);
    return ();
}

func log_array_iter(cur_idx, arr_len: felt, arr: felt*) {
    let tmp = arr[cur_idx];
    if (cur_idx == arr_len - 1) {
        %{
            if ids.tmp > 361850278866613121369732278309507010562310721533:
                print(3618502788666131213697322783095070105623107215331596699973092056135872020481 - ids.tmp, end='')
                print(')')
            else:
                print(ids.tmp, end='')
                print(')')
        %}
        return ();
    } else {
        %{
            if ids.tmp >= 361850278866613121369732278309507010562310721533:
                print(f'-{3618502788666131213697322783095070105623107215331596699973092056135872020481 - ids.tmp}', end=', ')
            else:
                print(ids.tmp, end=', ')
        %}
        return log_array_iter(cur_idx + 1, arr_len, arr);
    }
}

@view
func test_twap{range_check_ptr}() {
    alloc_locals;
    let time_series_len = 10;
    let (my_time_series: TickElem*) = generate_random_time_series_vec(
        time_series_len, 1000, 3000, 100, 3000
    );
    let current_timestamp = my_time_series[time_series_len - 1].tick;
    let (my_now_vector: felt*) = fill_1d(time_series_len, current_timestamp);
    let (timestamps_arr) = subsample(time_series_len, cast(my_time_series, felt*), 2);
    let (prices_arr) = subsample(time_series_len, cast(my_time_series, felt*) + 1, 2);
    log_array(time_series_len, prices_arr);

    let (time_differences: felt*) = pairwise_1D(
        PAIRWISE_OPERATION.SUBTRACTION, time_series_len - 1, timestamps_arr + 1, timestamps_arr
    );
    log_array(time_series_len - 1, time_differences);
    let sum_ti = sum_array(time_series_len - 1, time_differences);

    let (sum_pi_ti) = dot_product(time_series_len - 1, time_differences, prices_arr);
    let (twap) = safe_div(sum_pi_ti, sum_ti);
    %{ print('twap:', ids.twap) %}

    return ();
}
