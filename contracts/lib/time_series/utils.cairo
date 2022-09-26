%lang starknet

from starkware.cairo.common.math import unsigned_div_rem, abs_value
from starkware.cairo.common.math_cmp import is_le, is_nn
from time_series.structs import TickElem
from starkware.cairo.common.bool import TRUE, FALSE

using Bool = felt;

func modulo{range_check_ptr}(x: felt, y: felt) -> (z: felt) {
    alloc_locals;
    let (_, _mod) = unsigned_div_rem(x, y);
    return (_mod,);
}

func is_positive{range_check_ptr}(num: felt) -> (_positive: Bool) {
    let is_pos = is_le(1, num);
    return (is_pos,);
}

func greater_than{range_check_ptr}(num1: felt, num2: felt) -> (_is_greater: Bool) {
    let is_greater = is_le(num2 + 1, num1);
    return (is_greater,);
}

func less_than{range_check_ptr}(num1: felt, num2: felt) -> (_is_less: Bool) {
    let is_less = is_le(num1 + 1, num2);
    return (is_less,);
}

func are_equal{range_check_ptr}(num1: felt, num2: felt) -> (_are_equal: Bool) {
    if (num1 == num2) {
        return (TRUE,);
    } else {
        return (FALSE,);
    }
}

func safe_div{range_check_ptr}(num: felt, denom: felt) -> (quotient_: felt) {
    alloc_locals;
    let num_neg = is_nn(num);
    let denom_neg = is_nn(denom);
    let abs_num = abs_value(num);
    let abs_denom = abs_value(denom);
    if (num_neg != denom_neg) {
        let (response_, _) = unsigned_div_rem(abs_num, abs_denom);
        return (0 - response_,);
    }
    let (response_, _) = unsigned_div_rem(abs_num, abs_denom);
    return (response_,);
}

func log_array(arr_len: felt, arr: felt*) {
    %{ print('Array(', end='') %}
    log_array_iter(0, arr_len, arr);
    %{ print(')') %}
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

func log_tick_array(arr_len: felt, arr: TickElem**) {
    %{ print('Array(', end='') %}
    _log_tick_array_iter(0, arr_len, arr);
    %{ print(')') %}
    return ();
}

func _log_tick_array_iter(cur_idx, arr_len: felt, arr: TickElem**) {
    let tmp1 = arr[cur_idx].tick;
    let tmp2 = arr[cur_idx].value;
    if (cur_idx == arr_len - 1) {
        %{
            print('(', end='')
            if ids.tmp1 > 361850278866613121369732278309507010562310721533:
                print(3618502788666131213697322783095070105623107215331596699973092056135872020481 - ids.tmp1, end=', ')
                print(ids.tmp2, end='')
            else:
                print(ids.tmp1, end=', ')
                print(ids.tmp2, end='')
            print(')', end='')
        %}
        return ();
    } else {
        %{
            print('(', end='')
            if ids.tmp1 > 361850278866613121369732278309507010562310721533:
                print(3618502788666131213697322783095070105623107215331596699973092056135872020481 - ids.tmp1, end=', ')
                print(ids.tmp2, end='')
            else:
                print(ids.tmp1, end=', ')
                print(ids.tmp2, end='')
            print(')', end=', ')
        %}
        return _log_tick_array_iter(cur_idx + 1, arr_len, arr);
    }
}
