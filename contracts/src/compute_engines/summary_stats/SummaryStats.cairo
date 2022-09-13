%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.cairo_builtins import HashBuiltin

from time_series.prelude import TickElem
from time_series.stats.metrics import extract_values
from oracle.IOracle import IOracle, EmpiricAggregationModes
from compute_engines.summary_stats.library import SummaryStats

@storage_var
func SummaryStats__oracle_address() -> (res : felt):
end

@constructor
func constructor{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    oracle_address : felt
):
    SummaryStats__oracle_address.write(oracle_address)
    return ()
end

@view
func calculate_mean{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    key : felt, start : felt, stop : felt, num_datapoints : felt
) -> (mean_ : felt):
    let (oracle_address) = SummaryStats__oracle_address.read()
    let (_mean) = SummaryStats.calculate_mean(oracle_address, key, start, stop, num_datapoints)
    return (_mean)
end

@view
func scaled_arr{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    key : felt, start : felt, stop : felt, num_datapoints : felt
) -> (arr_len : felt, arr : felt*):
    alloc_locals
    let (oracle_address) = SummaryStats__oracle_address.read()
    let (scaled_arr_len, scaled_arr) = SummaryStats._make_scaled_array(
        oracle_address, key, start, stop, num_datapoints, 10
    )
    let (scaled_arr_values_) = extract_values(scaled_arr_len, scaled_arr)
    return (scaled_arr_len, scaled_arr_values_)
end

@view
func arr_values{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    key : felt, start : felt, stop : felt, num_datapoints : felt
) -> (arr_len : felt, arr : felt*):
    alloc_locals
    let (oracle_address) = SummaryStats__oracle_address.read()
    let (tick_arr : TickElem**) = alloc()
    SummaryStats._make_array(0, oracle_address, key, 10, 0, tick_arr)
    let (tick_arr_values_) = extract_values(10, tick_arr)
    return (10, tick_arr_values_)
end
