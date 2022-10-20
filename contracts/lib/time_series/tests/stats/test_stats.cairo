%lang starknet

from starkware.cairo.common.alloc import alloc

from time_series.prelude import FixedPoint, ONE, sum_tick_array, mean, norm
from time_series.structs import TickElem

@view
func test_sum_tick_array{range_check_ptr}() {
    alloc_locals;
    let (arr: TickElem**) = alloc();
    let (first: TickElem*) = alloc();
    let (second: TickElem*) = alloc();
    let (third: TickElem*) = alloc();
    assert first[0] = TickElem(100, 100);
    assert second[0] = TickElem(204, 200);
    assert third[0] = TickElem(305, 300);
    assert arr[0] = first;
    assert arr[1] = second;
    assert arr[2] = third;

    let y = sum_tick_array(3, arr);
    assert y = 600;
    let (mean_) = mean(3, arr);
    assert mean_ = 200;

    return ();
}

@view
func test_norm{range_check_ptr}() {
    let two = FixedPoint.fromFelt(2);
    let (x) = norm.pdf(two);
    assert x = 124494689016914193;
    return ();
}

@view
func test_cdf{range_check_ptr}() {
    let (x) = norm.erf(ONE);
    assert x = 1943135515416033133;
    let (x2) = norm.cdf(ONE);
    assert x2 = 1940008856356186113;
    return ();
}

@view
func test_erfinv{range_check_ptr}() {
    let x = 691752902764108160;
    let (x2) = norm.erfinv(x);
    assert x2 = 628256246024071477;
    return ();
}
