%lang starknet

from starkware.cairo.common.math_cmp import is_le, is_not_zero
from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.registers import get_label_location, get_ap
from starkware.cairo.common.invoke import invoke

from time_series.structs import TickElem
from time_series.utils import modulo

func get_ticks_array{pedersen_ptr : HashBuiltin*, range_check_ptr}(
    get_tick : codeoffset,
    extract_fields : codeoffset,
    tick_array_elem_size : felt,
    tick_array_len : felt,
    tick_array : felt*,
    offset_index : felt,
) -> (output_len : felt, output_array : TickElem**):
    alloc_locals
    let (output_tick_array : felt*) = alloc()
    let (local get_tick_func_pc) = get_label_location(get_tick)
    let (local extract_fields_func_pc) = get_label_location(extract_fields)

    get_ticks_array_loop(
        get_tick_func_pc,
        extract_fields_func_pc,
        tick_array_elem_size,
        tick_array_len,
        tick_array,
        offset_index,
        output_tick_array,
        0,
    )
    return (tick_array_len, cast(output_tick_array, TickElem**))
end

func get_ticks_array_loop{pedersen_ptr : HashBuiltin*, range_check_ptr}(
    get_tick : felt*,
    extract_fields : felt*,
    tick_array_elem_size : felt,
    tick_array_len : felt,
    tick_array : felt*,
    offset_index : felt,
    output_tick_array : felt*,
    idx : felt,
):
    alloc_locals
    if idx == tick_array_len:
        return ()
    end

    let (_mod) = modulo(idx + offset_index, tick_array_len)
    let (args) = alloc()
    assert args[0] = cast(tick_array, felt)
    assert args[1] = _mod
    invoke(get_tick, 2, args)
    let (ap_val) = get_ap()

    let tick_loc = ap_val - 1

    let (args : felt*) = alloc()
    assert args[0] = cast(tick_loc, felt)
    invoke(extract_fields, 1, args)
    let (ap_val) = get_ap()
    assert output_tick_array[idx] = cast(ap_val - 2, felt)
    return get_ticks_array_loop(
        get_tick,
        extract_fields,
        tick_array_elem_size,
        tick_array_len,
        tick_array,
        offset_index,
        output_tick_array,
        idx + 1,
    )
end
