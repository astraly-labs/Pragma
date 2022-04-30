%lang starknet

from starkware.cairo.common.math_cmp import is_le
from starkware.cairo.common.pow import pow

from contracts.IOracle import IOracle

const ORACLE_ADDRESS = 0x039d1bb4904cef28755c59f081cc88a576ecdf42240fb73dd44ddd003848ce33
const KEY = 28556963469423460  # str_to_felt("eth/usd")

@view
func check_eth_usd_threshold{syscall_ptr : felt*, range_check_ptr}(threshold : felt) -> (
        is_above_threshold : felt):
    alloc_locals

    let (decimals) = IOracle.get_decimals(ORACLE_ADDRESS)
    let (multiplier) = pow(10, decimals)

    let (eth_price, timestamp) = IOracle.get_value(ORACLE_ADDRESS, KEY)

    let shifted_threshold = threshold * multiplier
    let (is_above_3k) = is_le(shifted_threshold, eth_price)
    return (is_above_3k)
end
