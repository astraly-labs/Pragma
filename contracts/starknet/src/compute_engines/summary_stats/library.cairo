%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.bool import TRUE
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.math import assert_nn, unsigned_div_rem, assert_not_equal
from starkware.cairo.common.math_cmp import is_le, is_nn

from time_series.prelude import TickElem, mean, variance, volatility, scale_data, FixedPoint
from oracle.IOracle import IOracle, EmpiricAggregationModes

const SCALED_ARR_SIZE = 30;

namespace SummaryStats {
    func calculate_mean{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        oracle_address: felt, key: felt, start_tick: felt, end_tick: felt
    ) -> felt {
        alloc_locals;
        let (latest_checkpoint_index) = IOracle.get_latest_checkpoint_index(
            contract_address=oracle_address, key=key
        );
        let (cp, start_index) = IOracle.get_last_spot_checkpoint_before(
            oracle_address, key, start_tick
        );
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
            1,
        );
        let (_mean) = mean(SCALED_ARR_SIZE, _scaled_arr);
        let _mean = FixedPoint.to_wei{range_check_ptr=range_check_ptr}(_mean);
        tempvar range_check_ptr = range_check_ptr;

        return _mean;
    }

    func calculate_skip_frequency{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        total_samples: felt, num_samples: felt
    ) -> felt {
        alloc_locals;
        local skip_frequency;

        let (q, r) = unsigned_div_rem(total_samples, num_samples);
        if (q == 0) {
            return 1;
        }

        let is_valid = is_le(r * 2, num_samples);
        if (is_valid == 1) {
            skip_frequency = q;
        } else {
            skip_frequency = q + 1;
        }
        return skip_frequency;
    }

    func calculate_volatility{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        oracle_address: felt, key: felt, start_tick: felt, end_tick: felt, num_samples: felt
    ) -> felt {
        alloc_locals;
        let is_valid_size = is_le(num_samples, 200);

        with_attr error_message("num_samples is too large.  Must be <= 200") {
            assert is_valid_size = TRUE;
        }

        let (latest_checkpoint_index) = IOracle.get_latest_checkpoint_index(
            contract_address=oracle_address, key=key
        );
        let (_start_cp, start_index) = IOracle.get_last_spot_checkpoint_before(
            oracle_address, key, start_tick
        );
        local end_index;
        if (end_tick == 0) {
            end_index = latest_checkpoint_index;
        } else {
            let (_end_cp, _end_idx) = IOracle.get_last_spot_checkpoint_before(
                oracle_address, key, end_tick
            );
            end_index = _end_idx;
        }

        with_attr error_message("Not enough data") {
            assert_not_equal(start_index, latest_checkpoint_index);
        }

        let (tick_arr: TickElem**) = alloc();
        // TODO: why is end index first?
        let skip_frequency = calculate_skip_frequency(end_index - start_index, num_samples);
        let (total_samples, _) = unsigned_div_rem(end_index - start_index, skip_frequency);
        let arr_len = _make_array(
            0, oracle_address, key, end_index, start_index, tick_arr, skip_frequency
        );

        let volatility_ = volatility(arr_len, tick_arr);
        let _decs = FixedPoint.to_decimals(volatility_);
        return _decs;
    }

    func _make_scaled_array{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        oracle_address: felt,
        key: felt,
        start_tick: felt,
        end_tick: felt,
        num_datapoints: felt,
        latest_checkpoint_index: felt,
        skip_frequency: felt,
    ) -> (scaled_arr_len: felt, scaled_arr: TickElem**) {
        alloc_locals;
        let (tick_arr: TickElem**) = alloc();

        _make_array(
            0,
            oracle_address,
            key,
            latest_checkpoint_index,
            latest_checkpoint_index - num_datapoints,
            tick_arr,
            skip_frequency,
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
        skip_frequency: felt,
    ) -> felt {
        // returns length
        let is_final = is_le(last_idx, idx * skip_frequency + offset);
        if (is_final == TRUE) {
            return (idx);
        }
        let (cp) = IOracle.get_checkpoint(oracle_address, key, idx * skip_frequency + offset);
        // TODO: generalize decimals to use IOracle.get_decimals

        assert tick_arr[idx] = new TickElem(cp.timestamp, FixedPoint.from_decimals(cp.value));
        return _make_array(
            idx + 1, oracle_address, key, last_idx, offset, tick_arr, skip_frequency
        );
    }
}
