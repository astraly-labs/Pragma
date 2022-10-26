%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.math import unsigned_div_rem

from time_series.prelude import TickElem
from time_series.stats.metrics import extract_values
from oracle.IOracle import IOracle, EmpiricAggregationModes
from compute_engines.summary_stats.library import SummaryStats

@storage_var
func SummaryStats__oracle_address() -> (res: felt) {
}

@constructor
func constructor{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    oracle_address: felt
) {
    SummaryStats__oracle_address.write(oracle_address);
    return ();
}

@view
func calculate_mean{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    key: felt, start: felt, stop: felt
) -> (mean_: felt) {
    let (oracle_address) = SummaryStats__oracle_address.read();
    let _mean = SummaryStats.calculate_mean(oracle_address, key, start, stop);
    return (_mean,);
}

@view
func calculate_volatility{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    key: felt, start: felt, stop: felt, num_samples: felt
) -> (volatility_: felt) {
    let (oracle_address) = SummaryStats__oracle_address.read();
    let _volatility = SummaryStats.calculate_volatility(
        oracle_address, key, start, stop, num_samples
    );
    // Reporting in percentage
    let percentage_ = _volatility * 100;
    return (percentage_,);
}
