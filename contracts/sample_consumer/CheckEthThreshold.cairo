%lang starknet

from starkware.cairo.common.math_cmp import is_le
from starkware.cairo.common.pow import pow

from contracts.oracle_controller.IOracleController import IOracleController

const ORACLE_CONTROLLER_ADDRESS = 0x04a05a68317edb37d34d29f34193829d7363d51a37068f32b142c637e43b47a2
const KEY = 28556963469423460  # str_to_felt("eth/usd")
const AGGREGATION_MODE = 0  # default

@view
func check_eth_usd_threshold{syscall_ptr : felt*, range_check_ptr}(threshold : felt) -> (
        is_above_threshold : felt):
    alloc_locals

    let (decimals) = IOracleController.get_decimals(ORACLE_CONTROLLER_ADDRESS, KEY)
    let (multiplier) = pow(10, decimals)

    let (eth_price, timestamp) = IOracleController.get_value(
        ORACLE_CONTROLLER_ADDRESS, KEY, AGGREGATION_MODE)

    let shifted_threshold = threshold * multiplier
    let (is_above_3k) = is_le(shifted_threshold, eth_price)
    return (is_above_3k)
end
