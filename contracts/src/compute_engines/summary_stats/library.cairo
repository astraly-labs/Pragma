%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.math_cmp import is_le, is_nn

from time_series.prelude import TickElem, mean, volatility, scale_data
from oracle.IOracle import IOracle, EmpiricAggregationModes

const SCALED_ARR_SIZE = 25;

namespace SummaryStats {
    func calculate_mean{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        oracle_address: felt, key: felt, start_tick: felt, end_tick: felt, num_datapoints: felt
    ) -> felt {
        alloc_locals;
        let (latest_checkpoint_index) = IOracle.get_latest_checkpoint_index(
            contract_address=oracle_address, key=key
        );
        let _enough_data = is_nn(latest_checkpoint_index - num_datapoints);
        with_attr error_message("Not enough data") {
            assert _enough_data = 1;
        }

        let (_, _scaled_arr) = _make_scaled_array(
            oracle_address, key, start_tick, end_tick, num_datapoints, latest_checkpoint_index
        );
        let (_mean) = mean(SCALED_ARR_SIZE, _scaled_arr);

        return _mean;
    }

    func calculate_volatility{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        oracle_address: felt, key: felt, start_tick: felt, end_tick: felt, num_datapoints: felt
    ) -> felt {
        alloc_locals;
        let (latest_checkpoint_index) = IOracle.get_latest_checkpoint_index(
            contract_address=oracle_address, key=key
        );
        let _enough_data = is_nn(latest_checkpoint_index - num_datapoints);
        with_attr error_message("Not enough data") {
            assert _enough_data = 1;
        }

        let (_, _scaled_arr) = _make_scaled_array(
            oracle_address, key, start_tick, end_tick, num_datapoints, latest_checkpoint_index
        );

        let (_variance) = variance(SCALED_ARR_SIZE, _scaled_arr);

        return _variance;
    }

    func _make_scaled_array{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        oracle_address: felt,
        key: felt,
        start_tick: felt,
        end_tick: felt,
        num_datapoints: felt,
        latest_checkpoint_index: felt,
    ) -> (scaled_arr_len: felt, scaled_arr: TickElem**) {
        alloc_locals;
        let (tick_arr: TickElem**) = alloc();

        // TODO: get datapoints from time since first tick :-(
        _make_array(
            0,
            oracle_address,
            key,
            latest_checkpoint_index,
            latest_checkpoint_index - num_datapoints,
            tick_arr,
        );
        let (_scaled_arr) = scale_data(
            start_tick, end_tick, num_datapoints, tick_arr, SCALED_ARR_SIZE
        );
        return (SCALED_ARR_SIZE, _scaled_arr);
    }

    func _make_array{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        idx: felt,
        oracle_address: felt,
        key: felt,
        last_idx: felt,
        offset: felt,
        tick_arr: TickElem**,
    ) {
        if (idx == last_idx) {
            return ();
        }
        let (cp) = IOracle.get_checkpoint(oracle_address, key, idx + offset);
        assert tick_arr[idx] = new TickElem(cp.timestamp, cp.value);
        return _make_array(idx + 1, oracle_address, key, last_idx, offset, tick_arr);
    }
}
