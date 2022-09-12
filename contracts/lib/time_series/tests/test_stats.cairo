%lang starknet

from starkware.cairo.common.alloc import alloc

from time_series.stats import sum_array, mean
from time_series.structs import TickElem

@view
func test_sum_array{range_check_ptr}():
    alloc_locals
    let (arr : TickElem**) = alloc()
    let (first : TickElem*) = alloc()
    let (second : TickElem*) = alloc()
    let (third : TickElem*) = alloc()
    assert first[0] = TickElem(100, 100)
    assert second[0] = TickElem(204, 200)
    assert third[0] = TickElem(305, 300)
    assert arr[0] = first
    assert arr[1] = second
    assert arr[2] = third

    let (y) = sum_array(3, arr)
    assert y = 600
    let (mean_) = mean(3, arr)
    assert mean_ = 200

    return ()
end
