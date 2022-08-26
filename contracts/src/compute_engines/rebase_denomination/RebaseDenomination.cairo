%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.bool import TRUE, FALSE
from starkware.cairo.common.pow import pow
from starkware.cairo.common.math_cmp import is_le
from starkware.cairo.common.math import unsigned_div_rem, assert_not_zero

from admin.library import Admin
from oracle_controller.IOracleController import IOracleController, EmpiricAggregationModes

#
# Consts
#

const SLASH_USD = 796226404  # str_to_felt("/usd")
const SLASH_USD_BITS = 32

@storage_var
func oracle_controller_address_storage() -> (oracle_controller_address : felt):
end

#
# Constructor
#

# @param admin_address: admin for contract
# @param oracle_controller_address: address of oracle controller
@constructor
func constructor{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    admin_address : felt, oracle_controller_address : felt
):
    Admin.initialize_admin_address(admin_address)
    oracle_controller_address_storage.write(oracle_controller_address)
    return ()
end

#
# Getters
#

# @notice Given a quote currency Q and a base currency B returns the value of Q/B
# @notice Answer has the higher number of decimals of the two currencies
# @param quote_currency the quote currency: (ex. felt for ETH)
# @param base_currency the base currency: (ex. felt for BTC)
# @return value: the aggregated value
# @return decimals: the number of decimals in the Entry
# @return last_updated_timestamp: timestamp the Entries were last updated
# @return num_sources_aggregated: number of sources used in aggregation
@view
func get_rebased_value_via_usd{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    quote_currency : felt, base_currency : felt
) -> (value : felt, decimals : felt, last_updated_timestamp : felt, num_sources_aggregated : felt):
    alloc_locals

    with_attr error_message("The quote currency can't be 0."):
        assert_not_zero(quote_currency)
    end
    with_attr error_message("The base currency can't be 0."):
        assert_not_zero(base_currency)
    end

    let (local oracle_controller_address) = oracle_controller_address_storage.read()

    let (quote_asset_key) = _convert_currency_to_asset_key(
        quote_currency, SLASH_USD, SLASH_USD_BITS
    )
    let (
        quote_value, quote_decimals, quote_last_updated_timestamp, quote_num_sources_aggregated
    ) = IOracleController.get_value(
        oracle_controller_address, quote_asset_key, EmpiricAggregationModes.MEDIAN
    )
    if quote_last_updated_timestamp == 0:
        return (0, 0, 0, 0)
    end

    let (base_asset_key) = _convert_currency_to_asset_key(base_currency, SLASH_USD, SLASH_USD_BITS)
    let (
        base_value, base_decimals, base_last_updated_timestamp, base_num_sources_aggregated
    ) = IOracleController.get_value(
        oracle_controller_address, base_asset_key, EmpiricAggregationModes.MEDIAN
    )
    if base_last_updated_timestamp == 0:
        return (0, 0, 0, 0)
    end

    let (rebased_value, rebased_decimals) = _decimal_div(
        quote_value, quote_decimals, base_value, base_decimals
    )
    let (last_updated_timestamp) = _max(quote_last_updated_timestamp, base_last_updated_timestamp)
    let (num_sources_aggregated) = _max(quote_num_sources_aggregated, base_num_sources_aggregated)
    return (rebased_value, rebased_decimals, last_updated_timestamp, num_sources_aggregated)
end

# @notice get address for admin
# @return admin_address: returns admin's address
@view
func get_admin_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
    admin_address : felt
):
    let (admin_address) = Admin.get_admin_address()
    return (admin_address)
end

# @notice get oracle controller for admin
# @return oracle_controller_address: address for oracle controller
@view
func get_oracle_controller_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}() -> (oracle_controller_address : felt):
    let (oracle_controller_address) = oracle_controller_address_storage.read()
    return (oracle_controller_address)
end

#
# Setters
#

# @notice update admin address
# @dev only the admin can set the new address
# @param new_address
@external
func set_admin_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    new_address : felt
):
    Admin.only_admin()
    Admin.set_admin_address(new_address)
    return ()
end

# @notice update oracle controller address
# @dev only the admin can update this
# @param oracle_controller_address: new oracle controller address
@external
func set_oracle_controller_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(oracle_controller_address : felt) -> ():
    Admin.only_admin()
    oracle_controller_address_storage.write(oracle_controller_address)
    return ()
end

#
# Helpers
#

# @dev converts a currency to an asset key
#      by constructing felt equivalent of "{currency}{denominator}"
# @param currency: the currency to be turned into an asset_key
# @param denominator: the value the asset is denominated in including the slash
# @param denominator_bits: the number of bits needed to represent the denominator
# @return asset_key: the asset key as felt of "{currency}/{denominator}"
func _convert_currency_to_asset_key{range_check_ptr}(
    currency : felt, denominator : felt, denominator_bits : felt
) -> (asset_key : felt):
    let (shifted) = _shift_left(currency, 2, denominator_bits)
    let asset_key = shifted + denominator
    return (asset_key)
end

# @dev divides two felts that represent decimal numbers
# @dev the result has the higher number of decimals and is not rounded
# @dev we shift the value first and then divide, which leads to higher accuracy but can lead to overflow
#      if either x+y or 2y is greater than log(FIELD_PRIME), or about 76.
# @param a_value: the dividend
# @param a_decimals: the dividend's number of decimals
# @param b_value: the divisor
# @param b_decimals: the divisor's number of decimals
# @return value: the quotient
# @return decimals: the quotient's number of decimals
func _decimal_div{range_check_ptr}(a_value, a_decimals, b_value, b_decimals) -> (
    value : felt, decimals : felt
):
    # TODO: Convert to safe version that explicitly errors if overflow
    # Use that (a * 10^x) / (b * 10^y) = (a / b) * 10^(x - y)
    alloc_locals
    local a_to_shift
    local result_decimals
    let (b_fewer_dec) = is_le(b_decimals, a_decimals)
    if b_fewer_dec == TRUE:
        # x > y
        a_to_shift = a_value
        result_decimals = a_decimals
        tempvar range_check_ptr = range_check_ptr
    else:
        # x <= y
        if a_decimals != b_decimals:
            # Pad a to have same number of decimals as b
            let (a_same_dec) = _shift_left(a_value, 10, b_decimals - a_decimals)
            a_to_shift = a_same_dec
            tempvar range_check_ptr = range_check_ptr
        else:
            a_to_shift = a_value
            tempvar range_check_ptr = range_check_ptr
        end
        # x == y
        result_decimals = b_decimals
        tempvar range_check_ptr = range_check_ptr
    end

    # If x > y:  (a / b) * 10^((x + y) - y)
    # Otherwise: (a / b) * 10^(2y - y)
    let (a_shifted) = _shift_left(a_to_shift, 10, b_decimals)

    let (result, _) = unsigned_div_rem(a_shifted, b_value)
    return (result, result_decimals)
end

# @dev left shifts value by specified amount given a base
# @param value: the value to be shifted
# @param base: the base for the shift, e.g., 2 for bits and 10 for decimals
# @param shift_by: the number of places to shift by
# @return shifted: the shifted felt
func _shift_left{range_check_ptr}(value : felt, base : felt, shift_by : felt) -> (shifted : felt):
    # TODO: Check for overflow
    let (multiplier) = pow(base, shift_by)
    let shifted = value * multiplier
    return (shifted)
end

# @param a: the first felt
# @param b: the second felt
# @return min_val: the bigger felt
func _max{range_check_ptr}(a : felt, b : felt) -> (max_val : felt):
    let (a_is_less) = is_le(a, b)
    if a_is_less == TRUE:
        return (b)
    end
    return (a)
end
