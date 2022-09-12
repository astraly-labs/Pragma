%lang starknet

from starkware.cairo.common.alloc import alloc

from time_series.scaler import scale_data
from time_series.structs import TickElem

@view
func test_scaler{range_check_ptr}():
    alloc_locals
    let (x : TickElem**) = alloc()
    let (first : TickElem*) = alloc()
    let (second : TickElem*) = alloc()
    let (third : TickElem*) = alloc()
    assert first[0] = TickElem(100, 2558)
    assert second[0] = TickElem(204, 5791)
    assert third[0] = TickElem(305, 3717)
    assert x[0] = first
    assert x[1] = second
    assert x[2] = third

    let (output_len, output) = scale_data(0, 300, 3, x, 5)

    assert output[0].tick = 0
    assert output[0].value = -542
    assert output[1].tick = 60
    assert output[1].value = 1318
    assert output[2].tick = 120
    assert output[2].value = 7471
    assert output[3].tick = 180
    assert output[3].value = 6271
    assert output[4].tick = 240
    assert output[4].value = 5017
    assert output[5].tick = 300
    assert output[5].value = 3817

    return ()
end
