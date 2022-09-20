%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.starknet.common.syscalls import get_block_timestamp

from oracle.IOracle import IOracle
from publisher_registry.IPublisherRegistry import IPublisherRegistry
from compute_engines.summary_stats.ISummaryStats import ISummaryStats
from entry.structs import Currency, Pair, Entry
from time_series.prelude import ONE

const ONE_ETH = 10 ** 18;

@external
func __setup__{syscall_ptr: felt*, range_check_ptr}() {
    alloc_locals;

    let oracle_admin_address = 1234;
    let (now) = get_block_timestamp();

    local oracle_address;
    local publisher_registry_address;
    local summary_stats_address;

    %{
        ids.oracle_address = deploy_contract("./contracts/src/oracle/Oracle.cairo", []).contract_address
        ids.publisher_registry_address = deploy_contract("./contracts/src/publisher_registry/PublisherRegistry.cairo", [1234]).contract_address
        ids.summary_stats_address = deploy_contract("./contracts/src/compute_engines/summary_stats/SummaryStats.cairo", [ids.oracle_address]).contract_address

        context.oracle_address = ids.oracle_address
        context.summary_stats_address = ids.summary_stats_address
        context.now = ids.now
    %}

    %{ stop_prank_callable = start_prank(ids.oracle_admin_address, ids.publisher_registry_address) %}
    IPublisherRegistry.add_publisher(publisher_registry_address, 1, oracle_admin_address);
    %{ stop_prank_callable() %}

    %{ stop_prank_callable = start_prank(ids.oracle_admin_address, ids.oracle_address) %}
    let (currencies: Currency*) = alloc();
    let (pairs: Pair*) = alloc();
    assert currencies[0] = Currency(111, 18, 0, 0, 0);
    assert currencies[1] = Currency(222, 18, 0, 0, 0);
    assert pairs[0] = Pair(1, 111, 222);

    IOracle.initializer(oracle_address, 1234, publisher_registry_address, 2, currencies, 1, pairs);
    %{ stop_prank_callable %}

    return ();
}
func _iter_prices_and_times{syscall_ptr: felt*, range_check_ptr}(
    cur_idx, arr_len, times: felt*, prices: felt*
) {
    alloc_locals;

    local oracle_address;
    %{ ids.oracle_address = context.oracle_address %}

    if (cur_idx == arr_len) {
        return ();
    }
    let cur_time = times[cur_idx];
    let cur_price = prices[cur_idx];

    %{ stop_warp = warp(ids.cur_time) %}
    IOracle.publish_entry(oracle_address, Entry(1, ONE_ETH * cur_price, cur_time, 123, 1));
    IOracle.set_checkpoint(oracle_address, 1, 120282243752302);

    return _iter_prices_and_times(cur_idx + 1, arr_len, times, prices);
}

@external
func test_volatility{syscall_ptr: felt*, range_check_ptr}() {
    alloc_locals;

    let (prices_arr) = alloc();
    let (times_arr) = alloc();

    assert prices_arr[0] = 64;
    assert times_arr[0] = 100;

    assert prices_arr[1] = 71;
    assert times_arr[1] = 200;

    assert prices_arr[2] = 63;
    assert times_arr[2] = 300;

    assert prices_arr[3] = 67;
    assert times_arr[3] = 400;

    assert prices_arr[4] = 102;
    assert times_arr[4] = 500;

    assert prices_arr[5] = 58;
    assert times_arr[5] = 600;

    assert prices_arr[6] = 38;
    assert times_arr[6] = 700;

    assert prices_arr[7] = 25;
    assert times_arr[7] = 800;

    assert prices_arr[8] = 84;
    assert times_arr[8] = 900;

    assert prices_arr[9] = 73;
    assert times_arr[9] = 1000;

    %{ stop_warp = warp(0) %}
    _iter_prices_and_times(0, 10, times_arr, prices_arr);

    tempvar summary_stats_address;
    %{ ids.summary_stats_address = context.summary_stats_address %}

    let (_volatility) = ISummaryStats.calculate_volatility(summary_stats_address, 1, 100, 1000);
    assert _volatility = 62996268093365884921900;  // returns value in fixedpoint

    return ();
}

@external
func test_mean{syscall_ptr: felt*, range_check_ptr}() {
    alloc_locals;

    let (prices_arr) = alloc();
    let (times_arr) = alloc();

    assert prices_arr[0] = 64;
    assert times_arr[0] = 100;

    assert prices_arr[1] = 71;
    assert times_arr[1] = 200;

    assert prices_arr[2] = 63;
    assert times_arr[2] = 300;

    assert prices_arr[3] = 67;
    assert times_arr[3] = 400;

    assert prices_arr[4] = 102;
    assert times_arr[4] = 500;

    assert prices_arr[5] = 58;
    assert times_arr[5] = 600;

    assert prices_arr[6] = 38;
    assert times_arr[6] = 700;

    assert prices_arr[7] = 25;
    assert times_arr[7] = 800;

    assert prices_arr[8] = 84;
    assert times_arr[8] = 900;

    assert prices_arr[9] = 73;
    assert times_arr[9] = 1000;

    %{ stop_warp = warp(0) %}
    _iter_prices_and_times(0, 10, times_arr, prices_arr);

    tempvar summary_stats_address;
    %{ ids.summary_stats_address = context.summary_stats_address %}

    let (_mean) = ISummaryStats.calculate_mean(summary_stats_address, 1, 100, 1000);

    assert _mean = 64249666666666644613;  // returns value in wei

    return ();
}
