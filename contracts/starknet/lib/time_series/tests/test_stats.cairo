%lang starknet

from starkware.cairo.common.alloc import alloc

from time_series.prelude import ONE
from time_series.stats import sum_array, mean
from time_series.stats.metrics import variance
from time_series.structs import TickElem

@view
func test_sum_array{range_check_ptr}() {
    alloc_locals;
    let (arr: TickElem**) = alloc();
    let (first: TickElem*) = alloc();
    let (second: TickElem*) = alloc();
    let (third: TickElem*) = alloc();
    assert first[0] = TickElem(100, ONE * 100);
    assert second[0] = TickElem(204, ONE * 200);
    assert third[0] = TickElem(305, ONE * 300);
    assert arr[0] = first;
    assert arr[1] = second;
    assert arr[2] = third;

    let y = sum_array(3, arr);
    assert y = ONE * 600;
    let mean_ = mean(3, arr);
    assert mean_ = 461168601842738790400;  // 200 * 2 ** 61

    let (variance_) = variance(3, arr);
    assert variance_ = 23058430092136939520000;  // 10000.0 * 2 ** 61

    return ();
}
