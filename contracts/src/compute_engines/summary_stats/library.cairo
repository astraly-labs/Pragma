%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.bool import TRUE
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.math import assert_nn, unsigned_div_rem, assert_not_equal
from starkware.cairo.common.math_cmp import is_le, is_nn

from time_series.prelude import TickElem, mean, variance, volatility, scale_data, FixedPoint
from oracle.IOracle import IOracle, EmpiricAggregationModes

const SCALED_ARR_SIZE = 25;

namespace SummaryStats {
    func calculate_mean{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        oracle_address: felt, key: felt, start_tick: felt, end_tick: felt
    ) -> felt {
        alloc_locals;
        let (latest_checkpoint_index) = IOracle.get_latest_checkpoint_index(
            contract_address=oracle_address, key=key
        );
        let start_index = find_startpoint(oracle_address, key, start_tick);
        with_attr error_message("Not enough data") {
            assert_not_equal(start_index, latest_checkpoint_index);
        }

        let (_, _scaled_arr) = _make_scaled_array(
            oracle_address,
            key,
            start_tick,
            end_tick,
            latest_checkpoint_index - start_index,
            latest_checkpoint_index,
        );
        let (_mean) = mean(SCALED_ARR_SIZE, _scaled_arr);

        return _mean;
    }

    func calculate_volatility{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        oracle_address: felt, key: felt, start_tick: felt, end_tick: felt
    ) -> felt {
        alloc_locals;
        let (latest_checkpoint_index) = IOracle.get_latest_checkpoint_index(
            contract_address=oracle_address, key=key
        );
        let start_index = find_startpoint(oracle_address, key, start_tick);
        with_attr error_message("Not enough data") {
            assert_not_equal(start_index, latest_checkpoint_index);
        }
        let (tick_arr: TickElem**) = alloc();
        _make_array(0, oracle_address, key, latest_checkpoint_index, start_index, tick_arr);

        // let (_variance) = variance(SCALED_ARR_SIZE, _scaled_arr);
        // return _variance;
        let volatility_ = volatility(latest_checkpoint_index - start_index, tick_arr);
        return volatility_;
    }

    func find_startpoint{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        oracle_address: felt, key: felt, start_tick: felt
    ) -> felt {
        let (latest_checkpoint_index) = IOracle.get_latest_checkpoint_index(
            contract_address=oracle_address, key=key
        );

        let (cp) = IOracle.get_checkpoint(oracle_address, key, latest_checkpoint_index - 1);
        let (first_cp) = IOracle.get_checkpoint(oracle_address, key, 0);
        with_attr error_message("start_tick is in future") {
            assert_nn(cp.timestamp - start_tick);
        }
        if (is_le(start_tick, first_cp.timestamp) == TRUE) {
            return 0;
        }

        let startpoint = _binary_search(
            oracle_address, key, 0, latest_checkpoint_index, start_tick
        );
        return startpoint;
    }

    func _binary_search{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        oracle_address, key, low, high, target
    ) -> felt {
        alloc_locals;
        let (midpoint, _) = unsigned_div_rem(low + high - 1, 2);

        if (high + low == 1) {
            return midpoint;
        }

        if (midpoint == 0) {
            return 0;
        }

        let (cp) = IOracle.get_checkpoint(oracle_address, key, midpoint);
        let timestamp = cp.timestamp;
        if (timestamp == target) {
            return midpoint;
        }

        if (is_le(target, timestamp) == TRUE) {
            let (prev_cp) = IOracle.get_checkpoint(oracle_address, key, midpoint - 1);
            if (is_le(prev_cp.timestamp, target) == TRUE) {
                return midpoint - 1;
            }
            return _binary_search(oracle_address, key, low, midpoint, target);
        } else {
            let (next_cp) = IOracle.get_checkpoint(oracle_address, key, midpoint + 1);
            if (is_le(target, next_cp.timestamp) == TRUE) {
                return midpoint;
            }
            return _binary_search(oracle_address, key, midpoint, high, target);
        }
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

        // TODO (rlkelly): get datapoints from time since first tick :-(
        _make_array(
            0,
            oracle_address,
            key,
            latest_checkpoint_index,
            latest_checkpoint_index - num_datapoints,
            tick_arr,
        );
        let first = tick_arr[0].value;
        let first_t = tick_arr[0].tick;
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
        assert tick_arr[idx] = new TickElem(cp.timestamp, FixedPoint.from_wei(cp.value));
        return _make_array(idx + 1, oracle_address, key, last_idx, offset, tick_arr);
    }
}
