%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.starknet.common.syscalls import get_block_timestamp

from oracle.IOracle import IOracle
from publisher_registry.IPublisherRegistry import IPublisherRegistry
from compute_engines.summary_stats.ISummaryStats import ISummaryStats
from entry.structs import (
    Currency,
    Pair,
    SpotEntry,
    BaseEntry,
    PragmaPricesResponse,
    FutureEntry,
    GenericEntry,
)
from time_series.prelude import ONE

const ONE_ETH = 10 ** 18;
const USD_CURRENCY_ID = 5591876;  // str_to_felt("USD")

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
    IOracle.publish_spot_entry(oracle_address, SpotEntry(BaseEntry(now, 1, 1), 2, 2 * 10 ** 6, 0));
    IOracle.publish_spot_entry(oracle_address, SpotEntry(BaseEntry(now, 2, 1), 2, 3 * 10 ** 6, 0));

    // 1:baseEntry: timestamp, source, publisher,pair_id, pirce, expiry_timestamp
    IOracle.publish_spot_entry(oracle_address, SpotEntry(BaseEntry(now, 1, 1), 3, 8 * 10 ** 6, 0));
    IOracle.publish_spot_entry(oracle_address, SpotEntry(BaseEntry(now, 1, 1), 4, 3 * 10 ** 6, 0));
    IOracle.publish_spot_entry(oracle_address, SpotEntry(BaseEntry(now, 1, 1), 5, 5 * 10 ** 6, 0));
    IOracle.publish_entry(oracle_address, GenericEntry(BaseEntry(now, 1, 1), 2, 1 * 10 ** 6));
    IOracle.publish_entry(oracle_address, GenericEntry(BaseEntry(now, 2, 1), 2, 3 * 10 ** 6));
    IOracle.publish_entry(oracle_address, GenericEntry(BaseEntry(now, 1, 1), 3, 2 * 10 ** 6));
    IOracle.publish_entry(oracle_address, GenericEntry(BaseEntry(now, 1, 1), 4, 4 * 10 ** 6));
    IOracle.publish_entry(oracle_address, GenericEntry(BaseEntry(now, 1, 1), 5, 8 * 10 ** 6));
    IOracle.publish_future_entry(
        oracle_address, FutureEntry(BaseEntry(now, 1, 1), 2, 2 * 10 ** 6, 11111110)
    );
    IOracle.publish_future_entry(
        oracle_address, FutureEntry(BaseEntry(now, 1, 1), 3, 8 * 10 ** 6, 11111110)
    );
    IOracle.publish_future_entry(
        oracle_address, FutureEntry(BaseEntry(now, 1, 1), 4, 3 * 10 ** 6, 11111110)
    );
    IOracle.publish_future_entry(
        oracle_address, FutureEntry(BaseEntry(now, 1, 1), 5, 5 * 10 ** 6, 11111110)
    );

    return ();
}

@external
func test_set_decimals{syscall_ptr: felt*, range_check_ptr}() {
    alloc_locals;

    local oracle_address;
    %{ ids.oracle_address = context.oracle_address %}

    let (decimals_) = IOracle.get_spot_decimals(oracle_address, 1);
    assert decimals_ = 18;

    return ();
}

@external
func test_get_spot_with_USD_hop{syscall_ptr: felt*, range_check_ptr}() {
    alloc_locals;
    local oracle_address;
    %{ ids.oracle_address = context.oracle_address %}

    %{ stop_warp = warp(100000, ids.oracle_address) %}
    let (price, decimals, last_updated, num_sources) = IOracle.get_spot(oracle_address, 1, 0);
    // key, aggregation_mode
    assert price = 0;
    assert num_sources = 0;
    let (price, decimals, last_updated, num_sources) = IOracle.get_spot(oracle_address, 2, 0);
    assert price = 2500000;
    let (price, decimals, last_updated, num_sources) = IOracle.get_spot(oracle_address, 3, 0);
    assert price = 8000000;
    assert num_sources = 1;

    let (price, decimals, last_updated, num_sources) = IOracle.get_spot_with_USD_hop(
        oracle_address, 111, 222, 0
    );
    assert price = 312500000000000000;
    assert decimals = 18;
    assert last_updated = 100000;
    assert num_sources = 2;

    return ();
}

@external
func test_get_spot_with_hop{syscall_ptr: felt*, range_check_ptr}() {
    alloc_locals;
    local oracle_address;
    %{ ids.oracle_address = context.oracle_address %}

    %{ stop_warp = warp(1665539813, ids.oracle_address) %}
    // let price = 0;
    // let decimals = 0;
    // let last_updated = 0;
    // let num_sources = 0;
    // let (currency_ids: felt*) = alloc();
    // assert currency_ids[0] = 111;  // first pair
    // assert currency_ids[1] = USD_CURRENCY_ID;  // first pair
    // assert currency_ids[2] = 222;  // second pair
    // assert currency_ids[3] = USD_CURRENCY_ID;  // second pair
    // let (new_price, new_decimals, new_last_updated, new_num_sources) = IOracle.get_spot_with_hop(
    //     oracle_address, 4, currency_ids, 0, 0, 0, 0, 0, 0
    // );
    //
    // assert new_price = 250000000000000000;
    // assert new_decimals = 18;
    // assert new_last_updated = 100000;
    // assert new_num_sources = 1;
    // return ();
    let (second_currency_ids: felt*) = alloc();
    assert second_currency_ids[0] = 111;
    assert second_currency_ids[1] = USD_CURRENCY_ID;  // first pair
    assert second_currency_ids[2] = 222;  // second pair
    assert second_currency_ids[3] = USD_CURRENCY_ID;  // second pair
    assert second_currency_ids[4] = 333;  // second pair
    assert second_currency_ids[5] = 222;  // second pair
    let (new_price, new_decimals, new_last_updated, new_num_sources) = IOracle.get_spot_with_hop(
        oracle_address, 6, second_currency_ids, 0, 0, 0, 0, 0, 0
    );
    assert new_price = 62500000000;
    return ();
}

@external
func test_spot_comparison{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() {
    alloc_locals;
    local oracle_address;
    %{ ids.oracle_address = context.oracle_address %}

    %{ stop_warp = warp(1665539813, ids.oracle_address) %}
    IOracle.publish_spot_entry(
        oracle_address, SpotEntry(BaseEntry(1665539813, 1, 1), 2, 2 * 10 ** 6, 0)
    );
    let (price, decimals, last_updated, num_sources) = IOracle.get_spot(oracle_address, 2, 0);
    assert price = 2 * 10 ** 6;
    assert num_sources = 1;
    %{ stop_warp() %}

    %{ stop_warp = warp(1665606928, ids.oracle_address) %}
    IOracle.publish_spot_entry(
        oracle_address, SpotEntry(BaseEntry(1665606928, 1, 1), 2, 3 * 10 ** 6, 0)
    );

    let (price, decimals, last_updated, num_sources) = IOracle.get_spot(oracle_address, 2, 0);
    assert price = 3 * 10 ** 6;
    assert num_sources = 1;

    %{ stop_warp = warp(1665606930, ids.oracle_address) %}
    IOracle.publish_spot_entry(
        oracle_address, SpotEntry(BaseEntry(1665606930, 2, 1), 2, 5 * 10 ** 6, 0)
    );
    let (price, decimals, last_updated, num_sources) = IOracle.get_spot(oracle_address, 2, 0);
    assert price = 4 * 10 ** 6;
    assert num_sources = 2;
    assert last_updated = 1665606930;

    return ();
}

@external
func test_get_spot_median_multi{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() {
    alloc_locals;
    local oracle_address;
    let now = 100000;
    %{ ids.oracle_address = context.oracle_address %}
    %{ stop_warp = warp(1665539811, ids.oracle_address) %}
    IOracle.publish_spot_entry(oracle_address, SpotEntry(BaseEntry(now, 2, 1), 2, 10 * 10 ** 6, 0));
    IOracle.publish_spot_entry(oracle_address, SpotEntry(BaseEntry(now, 1, 1), 2, 7 * 10 ** 6, 0));
    IOracle.publish_spot_entry(oracle_address, SpotEntry(BaseEntry(now, 2, 1), 2, 6 * 10 ** 6, 0));
    let (pairs_ids) = alloc();
    assert pairs_ids[0] = 2;
    assert pairs_ids[1] = 3;
    let pair_ids_len = 2;
    let (prices_response_len, prices_response) = IOracle.get_spot_median_multi(
        oracle_address, pair_ids_len, pairs_ids, 0
    );
    assert prices_response_len = 2;
    assert prices_response[0].price = 6500000;
    assert prices_response[1].price = 8000000;
    assert prices_response[0].decimals = 6;
    return ();
}

@external
func test_get_entry{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() {
    alloc_locals;
    local oracle_address;
    %{ ids.oracle_address = context.oracle_address %}
    %{ stop_warp = warp(1665539811, ids.oracle_address) %}
    let (entry) = IOracle.get_entry(oracle_address, 2, 1);
    assert entry.value = 1 * 10 ** 6;
    assert entry.base.source = 1;
    return ();
}

@external
func test_get_future_entry{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() {
    alloc_locals;
    local oracle_address;
    %{ ids.oracle_address = context.oracle_address %}
    let (future_entry) = IOracle.get_future_entry(oracle_address, 2, 11111110, 1);
    assert future_entry.price = 2 * 10 ** 6;
    assert future_entry.base.source = 1;

    return ();
}

@external
func test_get_spot_entries{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() {
    alloc_locals;
    local oracle_address;
    %{ ids.oracle_address = context.oracle_address %}
    let (spot_entries_len, spot_entries: SpotEntry*) = IOracle.get_spot_entries(oracle_address, 2);
    assert spot_entries_len = 2;
    return ();
}
@external
func test_get_entries{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() {
    alloc_locals;
    local oracle_address;
    %{ ids.oracle_address = context.oracle_address %}
    %{ stop_warp = warp(1665539811, ids.oracle_address) %}
    let (entries_len, entries: GenericEntry*) = IOracle.get_entries(oracle_address, 2);
    assert entries_len = 2;
    assert entries[0].value = 1 * 10 ** 6;
    assert entries[0].base.source = 1;
    assert entries[1].value = 3 * 10 ** 6;
    return ();
}
