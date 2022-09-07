%lang starknet

from starkware.cairo.common.math_cmp import is_le, is_not_zero
from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.math import unsigned_div_rem
from starkware.cairo.common.registers import get_label_location, get_ap
from starkware.cairo.common.invoke import invoke

from time_series.get_array import get_ticks_array
from time_series.structs import TickElem

struct NotTickElem:
    member tick : felt
    member value : felt
    member other : felt
end

func transform(not_tick_loc : felt*) -> (tick : felt, value : felt):
    alloc_locals
    let t = cast([not_tick_loc], NotTickElem*)
    let tic = t[0].tick
    let val = t[0].value
    return (tick=tic, value=val)
end

func get_tick_loc(t : NotTickElem*, idx : felt) -> (tick_loc : felt):
    return (cast(t, felt) + idx * NotTickElem.SIZE)
end

@view
func test_get_ticks{pedersen_ptr : HashBuiltin*, range_check_ptr}():
    alloc_locals
    let (not_tick_array : NotTickElem*) = alloc()
    assert not_tick_array[0] = NotTickElem(0, 1, 2)
    assert not_tick_array[1] = NotTickElem(2, 3, 4)
    assert not_tick_array[2] = NotTickElem(4, 5, 6)
    let not_tick_array_len = 3

    let (tick_arr_len, tick_arr) = get_ticks_array(
        get_tick_loc, transform, NotTickElem.SIZE, not_tick_array_len, not_tick_array, 1
    )
    let elem0 = cast([tick_arr[2]], TickElem)
    let elem1 = cast([tick_arr[0]], TickElem)
    let elem2 = cast([tick_arr[1]], TickElem)

    assert elem0.tick = 0
    assert elem0.value = 1
    assert elem1.tick = 2
    assert elem1.value = 3
    assert elem2.tick = 4
    assert elem2.value = 5

    return ()
end
