%lang starknet

from starkware.cairo.common.math import unsigned_div_rem, abs_value
from starkware.cairo.common.math_cmp import is_le, is_nn

using Bool = felt

func modulo{range_check_ptr}(x : felt, y : felt) -> (z : felt):
    alloc_locals
    let (_, _mod) = unsigned_div_rem(x, y)
    return (_mod)
end

func is_positive{range_check_ptr}(num : felt) -> (_positive : Bool):
    let (is_pos) = is_le(1, num)
    return (is_pos)
end

func greater_than{range_check_ptr}(num1 : felt, num2 : felt) -> (_is_greater : Bool):
    let (is_greater) = is_le(num2 + 1, num1)
    return (is_greater)
end

func safe_div{range_check_ptr}(num : felt, denom : felt) -> (quotient_ : felt):
    alloc_locals
    let (num_neg) = is_nn(num)
    let (denom_neg) = is_nn(denom)
    let (abs_num) = abs_value(num)
    let (abs_denom) = abs_value(denom)
    if num_neg != denom_neg:
        let (response_, _) = unsigned_div_rem(abs_num, abs_denom)
        return (0 - response_)
    end
    let (response_, _) = unsigned_div_rem(abs_num, abs_denom)
    return (response_)
end
