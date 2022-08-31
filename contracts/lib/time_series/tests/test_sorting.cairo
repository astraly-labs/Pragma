%lang starknet

from starkware.cairo.common.alloc import alloc
from time_series.structs import TickElem
from time_series.sorting import mergesort_elements

@view
func test_sort_tickelem_arr{range_check_ptr}():
    let elem1 = TickElem(tick=1, value=4)
    let elem2 = TickElem(tick=3, value=5)
    let elem3 = TickElem(tick=2, value=2)
    let (arr: TickElem*) = alloc()
    assert arr[0] = elem1
    assert arr[1] = elem2
    assert arr[2] = elem3
    
    let (sorted_arr) = mergesort_elements(3, arr)
    assert sorted_arr[0].tick = 1
    assert sorted_arr[1].tick = 2
    assert sorted_arr[2].tick = 3

    return ()
end
