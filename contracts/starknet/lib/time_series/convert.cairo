%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.bool import TRUE, FALSE
from starkware.cairo.common.pow import pow
from starkware.cairo.common.math_cmp import is_le
from starkware.cairo.common.math import unsigned_div_rem, assert_not_zero, assert_le

func convert_via_usd{range_check_ptr}(a_price_in_usd, b_price_in_usd, output_decimals) -> felt {
    let (pow_) = pow(10, output_decimals);

    with_attr error_message("Conversion overflow") {
        assert_le(pow_, 10 ** 36);
        assert_le(a_price_in_usd, 10 ** 36);
    }

    let (output_, _) = unsigned_div_rem(a_price_in_usd * pow_, b_price_in_usd);
    return (output_);
}

func div_decimals{range_check_ptr}(a_price, b_price, output_decimals) -> felt {
    let (pow_) = pow(10, output_decimals);

    with_attr error_message("Conversion overflow") {
        assert_le(pow_, 10 ** 36);
        assert_le(a_price, 10 ** 36);
    }

    let (output_, _) = unsigned_div_rem(a_price * pow_, b_price);
    return (output_);
}

func mult_decimals{range_check_ptr}(a_price, b_price, output_decimals) -> felt {
    let (pow_) = pow(10, output_decimals);

    with_attr error_message("Conversion overflow") {
        assert_le(pow_, 10 ** 36);
        assert_le(a_price, 10 ** 36);
    }

    let output_ = a_price * b_price * pow_;
    return (output_);
}
// @dev divides two felts that represent decimal numbers
// @dev the result has the higher number of decimals and is not rounded
// @dev we shift the value first and then divide, which leads to higher accuracy but can lead to overflow
//      if either x+y or 2y is greater than log(FIELD_PRIME), or about 76.
// @param a_value: the dividend
// @param a_decimals: the dividend's number of decimals
// @param b_value: the divisor
// @param b_decimals: the divisor's number of decimals
// @return value: the quotient
// @return decimals: the quotient's number of decimals
func _decimal_div{range_check_ptr}(a_value, a_decimals, b_value, b_decimals) -> (
    value: felt, decimals: felt
) {
    // TODO: Convert to safe version that explicitly errors if overflow
    // Use that (a * 10^x) / (b * 10^y) = (a / b) * 10^(x - y)
    alloc_locals;
    local a_to_shift;
    local result_decimals;
    let b_fewer_dec = is_le(b_decimals, a_decimals);
    if (b_fewer_dec == FALSE) {
        // x <= y
        if (a_decimals != b_decimals) {
            // Pad a to have same number of decimals as b
            let (a_same_dec) = _shift_left(a_value, 10, b_decimals - a_decimals);
            a_to_shift = a_same_dec;
            tempvar range_check_ptr = range_check_ptr;
        } else {
            a_to_shift = a_value;
            tempvar range_check_ptr = range_check_ptr;
        }
        // x == y
        result_decimals = b_decimals;
        tempvar range_check_ptr = range_check_ptr;
    } else {
        // x > y
        a_to_shift = a_value;
        result_decimals = a_decimals;
        tempvar range_check_ptr = range_check_ptr;
    }

    // If x > y:  (a / b) * 10^((x + y) - y)
    // Otherwise: (a / b) * 10^(2y - y)
    let (a_shifted) = _shift_left(a_to_shift, 10, b_decimals);

    let (result, _) = unsigned_div_rem(a_shifted, b_value);
    return (result, result_decimals);
}

// @dev left shifts value by specified amount given a base
// @param value: the value to be shifted
// @param base: the base for the shift, e.g., 2 for bits and 10 for decimals
// @param shift_by: the number of places to shift by
// @return shifted: the shifted felt
func _shift_left{range_check_ptr}(value: felt, base: felt, shift_by: felt) -> (shifted: felt) {
    // TODO: Check for overflow
    let is_le_ = is_le(shift_by, 0);
    if (is_le_ == TRUE) {
        let (shifted, _) = unsigned_div_rem(value, shift_by * (-1) * base);
        return (shifted,);
    } else {
        let (multiplier) = pow(base, shift_by);
        let shifted = value * multiplier;
        return (shifted,);
    }
}

// @param a: the first felt
// @param b: the second felt
// @return min_val: the bigger felt
func _max{range_check_ptr}(a: felt, b: felt) -> (max_val: felt) {
    let a_is_less = is_le(a, b);
    if (a_is_less == TRUE) {
        return (b,);
    }
    return (a,);
}

// @param a: the first felt
// @param b: the second felt
// @return min_val: the smaller felt
func _min{range_check_ptr}(a: felt, b: felt) -> (min_val: felt) {
    let a_is_less = is_le(a, b);
    if (a_is_less == FALSE) {
        return (b,);
    }
    return (a,);
}
