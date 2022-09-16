%lang starknet

from starkware.cairo.common.alloc import alloc

from time_series.prelude import scale_data, TickElem
from time_series.utils import log_tick_array

@view
func test_scaler{range_check_ptr}() {
    alloc_locals;
    let (x: TickElem**) = alloc();
    let (first: TickElem*) = alloc();
    let (second: TickElem*) = alloc();
    let (third: TickElem*) = alloc();
    assert first[0] = TickElem(100, 2558);
    assert second[0] = TickElem(204, 5791);
    assert third[0] = TickElem(305, 3717);
    assert x[0] = first;
    assert x[1] = second;
    assert x[2] = third;

    let (output) = scale_data(0, 300, 3, x, 4);
    // log_tick_array(4, output);

    assert output[0].tick = 0;
    assert output[0].value = -542;
    assert output[1].tick = 100;
    assert output[1].value = 2558;
    assert output[2].tick = 200;
    assert output[2].value = 5658;
    assert output[3].tick = 300;
    assert output[3].value = 3871;

    return ();
}

@view
func test_scaler2{range_check_ptr}() {
    alloc_locals;
    let (x: TickElem**) = alloc();

    assert x[0] = new TickElem(1650590820, 19413);
    assert x[1] = new TickElem(1650590893, 10876);
    assert x[2] = new TickElem(1650591000, 10918);
    assert x[3] = new TickElem(1650591060, 16119);
    assert x[4] = new TickElem(1650591240, 13703);
    assert x[5] = new TickElem(1650591300, 14556);
    assert x[6] = new TickElem(1650591360, 12999);

    let (output) = scale_data(1650590800, 1650591360, 7, x, 30);
    // log_tick_array(30, output);

    return ();
}
