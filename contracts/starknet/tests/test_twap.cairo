%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.starknet.common.syscalls import get_block_timestamp
// from time_series.prelude import TickElem, mean, variance, volatility, scale_data, FixedPoint, twap

from oracle.IOracle import IOracle
from publisher_registry.IPublisherRegistry import IPublisherRegistry
from compute_engines.summary_stats.ISummaryStats import ISummaryStats
from entry.structs import Currency, Pair, SpotEntry, BaseEntry, FutureEntry, GenericEntry
from time_series.prelude import ONE

const ONE_ETH = 10 ** 18;
const USD_CURRENCY_ID = 5591876;  // str_to_felt("USD")
const MEDIAN = 84959893733710;

@external
func __setup__{syscall_ptr: felt*, range_check_ptr}() {
    alloc_locals;

    let oracle_admin_address = 1234;
    let now = 100000;

    local oracle_address;
    local publisher_registry_address;
    local summary_stats_address;

    %{
        ids.oracle_address = deploy_contract("./contracts/starknet/src/oracle/Oracle.cairo", []).contract_address
        ids.publisher_registry_address = deploy_contract("./contracts/starknet/src/publisher_registry/PublisherRegistry.cairo", [1234]).contract_address
        ids.summary_stats_address = deploy_contract("./contracts/starknet/src/compute_engines/summary_stats/SummaryStats.cairo", [ids.oracle_address]).contract_address

        context.oracle_address = ids.oracle_address
        context.summary_stats_address = ids.summary_stats_address
    %}

    %{ stop_prank_callable = start_prank(ids.oracle_admin_address, ids.publisher_registry_address) %}
    IPublisherRegistry.add_publisher(publisher_registry_address, 1, oracle_admin_address);
    IPublisherRegistry.add_source_for_publisher(publisher_registry_address, 1, 1);
    IPublisherRegistry.add_source_for_publisher(publisher_registry_address, 1, 2);
    IPublisherRegistry.add_source_for_publisher(publisher_registry_address, 1, 3);
    %{ stop_prank_callable() %}

    %{ stop_prank_callable = start_prank(ids.oracle_admin_address, ids.oracle_address) %}
    %{ stop_warp = warp(100000, ids.oracle_address) %}
    let (currencies: Currency*) = alloc();
    let (pairs: Pair*) = alloc();
    assert currencies[0] = Currency(111, 18, 0, 0, 0);
    assert currencies[1] = Currency(222, 18, 0, 0, 0);
    assert currencies[2] = Currency(USD_CURRENCY_ID, 6, 0, 0, 0);
    assert currencies[3] = Currency(333, 18, 0, 0, 0);
    assert pairs[0] = Pair(1, 111, 222);
    assert pairs[1] = Pair(2, 111, USD_CURRENCY_ID);
    assert pairs[2] = Pair(3, 222, USD_CURRENCY_ID);
    assert pairs[3] = Pair(4, 111, 333);
    assert pairs[4] = Pair(5, 333, 222);

    IOracle.initializer(oracle_address, 1234, publisher_registry_address, 4, currencies, 5, pairs);

    IOracle.publish_future_entry(
        oracle_address, FutureEntry(BaseEntry(now, 1, 1), 2, 2 * 10 ** 6, 11111110, 100)
    );
    IOracle.set_future_checkpoint(oracle_address, 2, 11111110, MEDIAN);

    IOracle.publish_future_entry(
        oracle_address, FutureEntry(BaseEntry(now + 200, 1, 1), 2, 8 * 10 ** 6, 11111110, 100)
    );
    IOracle.set_future_checkpoint(oracle_address, 2, 11111110, MEDIAN);

    IOracle.publish_future_entry(
        oracle_address, FutureEntry(BaseEntry(now + 400, 1, 1), 2, 3 * 10 ** 6, 11111110, 100)
    );
    IOracle.set_future_checkpoint(oracle_address, 2, 11111110, MEDIAN);

    IOracle.publish_future_entry(
        oracle_address, FutureEntry(BaseEntry(now + 600, 1, 1), 2, 5 * 10 ** 6, 11111110, 100)
    );
    IOracle.set_future_checkpoint(oracle_address, 2, 11111110, MEDIAN);

    IOracle.publish_future_entry(
        oracle_address, FutureEntry(BaseEntry(now, 1, 1), 3, 2 * 10 ** 6, 11111110, 100)
    );
    IOracle.publish_future_entry(
        oracle_address, FutureEntry(BaseEntry(now, 2, 1), 3, 4 * 10 ** 6, 11111110, 100)
    );
    IOracle.publish_future_entry(
        oracle_address, FutureEntry(BaseEntry(now, 3, 1), 3, 6 * 10 ** 6, 11111110, 100)
    );
    IOracle.set_future_checkpoint(oracle_address, 3, 11111110, MEDIAN);  // 4 *10**6
    IOracle.publish_future_entry(
        oracle_address, FutureEntry(BaseEntry(now + 200, 1, 1), 3, 8 * 10 ** 6, 11111110, 100)
    );
    IOracle.publish_future_entry(
        oracle_address, FutureEntry(BaseEntry(now + 200, 2, 1), 3, 8 * 10 ** 6, 11111110, 100)
    );
    IOracle.set_future_checkpoint(oracle_address, 3, 11111110, MEDIAN);  // 8 *10**6
    IOracle.publish_future_entry(
        oracle_address, FutureEntry(BaseEntry(now + 400, 1, 1), 3, 2 * 10 ** 6, 11111110, 100)
    );
    IOracle.publish_future_entry(
        oracle_address, FutureEntry(BaseEntry(now + 400, 2, 1), 3, 3 * 10 ** 6, 11111110, 100)
    );
    IOracle.publish_future_entry(
        oracle_address, FutureEntry(BaseEntry(now + 400, 3, 1), 3, 4 * 10 ** 6, 11111110, 100)
    );
    IOracle.set_future_checkpoint(oracle_address, 3, 11111110, MEDIAN);  // 3 *10**6
    IOracle.publish_future_entry(
        oracle_address, FutureEntry(BaseEntry(now + 600, 1, 1), 3, 5 * 10 ** 6, 11111110, 100)
    );
    IOracle.set_future_checkpoint(oracle_address, 3, 11111110, MEDIAN);  // 5 *10**6

    
    //------SPOT
    
    IOracle.publish_spot_entry(
        oracle_address, SpotEntry(BaseEntry(now, 1, 1), 2, 2 * 10 ** 6, 100)
    );
    IOracle.set_checkpoint(oracle_address, 2, MEDIAN);

    IOracle.publish_spot_entry(
        oracle_address, SpotEntry(BaseEntry(now + 200, 1, 1), 2, 8 * 10 ** 6, 100)
    );
    IOracle.set_checkpoint(oracle_address, 2, MEDIAN);

    IOracle.publish_spot_entry(
        oracle_address, SpotEntry(BaseEntry(now + 400, 1, 1), 2, 3 * 10 ** 6, 100)
    );
    IOracle.set_checkpoint(oracle_address, 2, MEDIAN);

    IOracle.publish_spot_entry(
        oracle_address, SpotEntry(BaseEntry(now + 600, 1, 1), 2, 5 * 10 ** 6, 100)
    );
    IOracle.set_checkpoint(oracle_address, 2, MEDIAN);

    IOracle.publish_spot_entry(
        oracle_address, SpotEntry(BaseEntry(now, 1, 1), 3, 2 * 10 ** 6, 100)
    );
    IOracle.publish_spot_entry(
        oracle_address, SpotEntry(BaseEntry(now, 2, 1), 3, 4 * 10 ** 6, 100)
    );
    IOracle.publish_spot_entry(
        oracle_address, SpotEntry(BaseEntry(now, 3, 1), 3, 6 * 10 ** 6, 100)
    );
    IOracle.set_checkpoint(oracle_address, 3, MEDIAN);  // 4 *10**6
    IOracle.publish_spot_entry(
        oracle_address, SpotEntry(BaseEntry(now + 200, 1, 1), 3, 8 * 10 ** 6, 100)
    );
    IOracle.publish_spot_entry(
        oracle_address, SpotEntry(BaseEntry(now + 200, 2, 1), 3, 8 * 10 ** 6, 100)
    );
    IOracle.set_checkpoint(oracle_address, 3, MEDIAN);  // 8 *10**6
    IOracle.publish_spot_entry(
        oracle_address, SpotEntry(BaseEntry(now + 400, 1, 1), 3, 2 * 10 ** 6, 100)
    );
    IOracle.publish_spot_entry(
        oracle_address, SpotEntry(BaseEntry(now + 400, 2, 1), 3, 3 * 10 ** 6, 100)
    );
    IOracle.publish_spot_entry(
        oracle_address, SpotEntry(BaseEntry(now + 400, 3, 1), 3, 4 * 10 ** 6, 100)
    );
    IOracle.set_checkpoint(oracle_address, 3, MEDIAN);  // 3 *10**6
    IOracle.publish_spot_entry(
        oracle_address, SpotEntry(BaseEntry(now + 600, 1, 1), 3, 5 * 10 ** 6, 100)
    );
    IOracle.set_checkpoint(oracle_address, 3, MEDIAN);  // 5 *10**6

    return ();
}

@external
func test_set_future_checkpoint{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() {
    alloc_locals;
    local oracle_address;
    local summary_stats_address;
    %{ ids.oracle_address = context.oracle_address %}
    %{ ids.summary_stats_address = context.summary_stats_address %}

    // let test = FixedPoint.to_decimals(46116860184273880);

    let (twap_test,decimals) = ISummaryStats.calculate_future_twap(
        summary_stats_address, 2, 11111110, 10000, 100001
    );
    assert twap_test = 4333333;
    assert decimals = 6; 
    let (twap_test_2,decimals) = ISummaryStats.calculate_future_twap(
        summary_stats_address, 2, 11111110, 10000, 100201
    );
    assert twap_test_2 = 5499999;
    assert decimals = 6; 
    let (twap_test_3,decimals) = ISummaryStats.calculate_future_twap(
        summary_stats_address, 2, 11111110, 10000, 100401
    );
    assert twap_test_3 = 2999999;
    assert decimals = 6; 
    let (twap_test_4,decimals) = ISummaryStats.calculate_future_twap(
        summary_stats_address, 3, 11111110, 10000, 100001
    );
    assert twap_test_4 = 4999999;
    assert decimals = 6; 
    let (twap_test_5,decimals) = ISummaryStats.calculate_future_twap(
        summary_stats_address, 3, 11111110, 10000, 100201
    );
    assert twap_test_5 = 5499999;
    assert decimals = 6; 
    let (twap_test_6,decimals) = ISummaryStats.calculate_future_twap(
        summary_stats_address, 3, 11111110, 10000, 100401
    );
    assert twap_test_6 = 2999999;
    return ();
}


@external
func test_set_spot_checkpoint{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() {
    alloc_locals;
    local oracle_address;
    local summary_stats_address;
    %{ ids.oracle_address = context.oracle_address %}
    %{ ids.summary_stats_address = context.summary_stats_address %}

    // let test = FixedPoint.to_decimals(46116860184273880);

    let (twap_test,decimals) = ISummaryStats.calculate_spot_twap(
        summary_stats_address, 2, 10000, 100001
    );
    assert twap_test = 4333333;
    assert decimals = 6; 
    let (twap_test_2,decimals) = ISummaryStats.calculate_spot_twap(
        summary_stats_address, 2, 10000, 100201
    );
    assert twap_test_2 = 5499999;
    assert decimals = 6; 
    let (twap_test_3,decimals) = ISummaryStats.calculate_spot_twap(
        summary_stats_address, 2, 10000, 100401
    );
    assert twap_test_3 = 2999999;
    assert decimals = 6; 
    let (twap_test_4,decimals) = ISummaryStats.calculate_spot_twap(
        summary_stats_address, 3, 10000, 100001
    );
    assert twap_test_4 = 4999999;
    assert decimals = 6; 
    let (twap_test_5,decimals) = ISummaryStats.calculate_spot_twap(
        summary_stats_address, 3, 10000, 100201
    );
    assert twap_test_5 = 5499999;
    assert decimals = 6; 
    let (twap_test_6,decimals) = ISummaryStats.calculate_spot_twap(
        summary_stats_address, 3, 10000, 100401
    );
    assert twap_test_6 = 2999999;
    return ();
}

// PYTHON SCRIPTS FOR TESTS:
// def calculate_twap(prices, timestamps):
//     assert len(prices) == len(timestamps), "The prices and timestamps lists must be the same length."
//     assert sorted(timestamps) == timestamps, "The timestamps must be in chronological order."

// total_weighted_price = 0
//     total_time = 0

// for i in range(1, len(prices)):
//         # Calculate the time difference between the current and the previous timestamp
//         time_diff = timestamps[i] - timestamps[i-1]

// # Calculate the weighted price
//         weighted_price = prices[i-1] * time_diff
//         print(weighted_price)
//         # Add the weighted price to the total weighted price
//         total_weighted_price += weighted_price

// # Add the time difference to the total time
//         total_time += time_diff

// # Return the TWAP
//     return total_weighted_price / total_time if total_time != 0 else 0

// prices = [4 * 10**6, 8 * 10 ** 6, 3 * 10 ** 6, 5 * 10 ** 6]
// timestamps = [100000,100000+200, 100000 + 400, 100000 + 600]

// twap = calculate_twap(prices, timestamps)

// print(f"The TWAP is {twap}")
