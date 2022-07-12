%lang starknet

from starkware.cairo.common.math_cmp import is_le
from starkware.cairo.common.pow import pow

from contracts.oracle_controller.IEmpiricOracle import IEmpiricOracle

const EMPIRIC_ORACLE_ADDRESS = 0x012fadd18ec1a23a160cc46981400160fbf4a7a5eed156c4669e39807265bcd4
const KEY = 28556963469423460  # str_to_felt("eth/usd")
const AGGREGATION_MODE = 0  # default

@view
func check_eth_usd_threshold{syscall_ptr : felt*, range_check_ptr}(threshold : felt) -> (
    is_above_threshold : felt
):
    alloc_locals

    let (eth_price, decimals, timestamp, num_sources_aggregated) = IEmpiricOracle.get_value(
        EMPIRIC_ORACLE_ADDRESS, KEY, AGGREGATION_MODE
    )
    let (multiplier) = pow(10, decimals)

    let shifted_threshold = threshold * multiplier
    let (is_above_threshold) = is_le(shifted_threshold, eth_price)
    return (is_above_threshold)
end
