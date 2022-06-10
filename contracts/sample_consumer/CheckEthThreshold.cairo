%lang starknet

from starkware.cairo.common.math_cmp import is_le
from starkware.cairo.common.pow import pow

from contracts.oracle_controller.IOracleController import IOracleController

const ORACLE_CONTROLLER_ADDRESS = 0x013befe6eda920ce4af05a50a67bd808d67eee6ba47bb0892bef2d630eaf1bba
const KEY = 28556963469423460  # str_to_felt("eth/usd")
const AGGREGATION_MODE = 0  # default

@view
func check_eth_usd_threshold{syscall_ptr : felt*, range_check_ptr}(threshold : felt) -> (
        is_above_threshold : felt):
    alloc_locals

    let (num_decimals) = IOracleController.get_decimals(ORACLE_CONTROLLER_ADDRESS, KEY)
    let (multiplier) = pow(10, num_decimals)

    let (eth_price, timestamp) = IOracleController.get_value(
        ORACLE_CONTROLLER_ADDRESS, KEY, AGGREGATION_MODE)
    #if you accidentally specificy a threshold in gwei and forget we already do the ETH to wei conversion internally, 
    #shifted threshold could overflow. Not much of an issue, and reminds me to resolve create conversion helper function tickets
    let shifted_threshold = threshold * multiplier
    let (is_above_threshold) = is_le(shifted_threshold, eth_price)
    return (is_above_threshold)
end
