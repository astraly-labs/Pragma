%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.registers import get_label_location, get_ap
from starkware.cairo.common.invoke import invoke
from starkware.cairo.common.memcpy import memcpy

from time_series.structs import TickElem

func transform_arr(
    get_tick_and_value : codeoffset, arr_len : felt, arr : felt*, element_size : felt
) -> (mapped_array : TickElem*):
    alloc_locals
    let (local func_pc) = get_label_location(get_tick_and_value)
    let (mapped_array : felt*) = alloc()

    let (implicit_args) = alloc()
    map_loop(func_pc, arr_len, arr, element_size, 0, implicit_args, mapped_array)
    return (cast(mapped_array, TickElem*))
end

func map_loop(
    func_pc : felt*,
    array_len : felt,
    array : felt*,
    element_size : felt,
    implicit_args_len : felt,
    implicit_args : felt*,
    new_array : felt*,
) -> (implicit_args : felt*):
    alloc_locals

    if array_len == 0:
        return (implicit_args)
    end

    # Call the function
    invoke(func_pc, element_size, array)

    # Retrieve results
    let (ap_val) = get_ap()

    append_element(new_array, [ap_val - 2], 1)
    append_element(new_array + 1, [ap_val - 1], 1)

    # Process next element
    return map_loop(
        func_pc,
        array_len - 1,
        array + element_size,
        element_size,
        implicit_args_len,
        implicit_args,
        new_array + 2,
    )
end

# Append an element to an array
#    - if element_size == 1, element is a felt, just setting it
#    - if element_size > 1, element is a struct, using memcpy to copy the entire struct into the array
func append_element(array : felt*, element : felt, element_size : felt):
    if element_size == 1:
        [array] = element
    else:
        memcpy(array, cast(element, felt*), element_size)
    end

    return ()
end
