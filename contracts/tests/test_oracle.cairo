%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.starknet.common.syscalls import get_block_timestamp

from oracle.IOracle import IOracle
from publisher_registry.IPublisherRegistry import IPublisherRegistry
from compute_engines.summary_stats.ISummaryStats import ISummaryStats
from entry.structs import Currency, Pair, SpotEntry, BaseEntry
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
        ids.oracle_address = deploy_contract("./contracts/src/oracle/Oracle.cairo", []).contract_address
        ids.publisher_registry_address = deploy_contract("./contracts/src/publisher_registry/PublisherRegistry.cairo", [1234]).contract_address
        ids.summary_stats_address = deploy_contract("./contracts/src/compute_engines/summary_stats/SummaryStats.cairo", [ids.oracle_address]).contract_address

        context.oracle_address = ids.oracle_address
        context.summary_stats_address = ids.summary_stats_address
    %}

    %{ stop_prank_callable = start_prank(ids.oracle_admin_address, ids.publisher_registry_address) %}
    IPublisherRegistry.add_publisher(publisher_registry_address, 1, oracle_admin_address);
    IPublisherRegistry.add_source_for_publisher(publisher_registry_address, 1, 1);
    %{ stop_prank_callable() %}

    %{ stop_prank_callable = start_prank(ids.oracle_admin_address, ids.oracle_address) %}
    %{ stop_warp = warp(100000, ids.oracle_address) %}
    let (currencies: Currency*) = alloc();
    let (pairs: Pair*) = alloc();
    assert currencies[0] = Currency(111, 18, 0, 0, 0);
    assert currencies[1] = Currency(222, 18, 0, 0, 0);
    assert currencies[2] = Currency(USD_CURRENCY_ID, 6, 0, 0, 0);
    assert pairs[0] = Pair(1, 111, 222);
    assert pairs[1] = Pair(2, 111, USD_CURRENCY_ID);
    assert pairs[2] = Pair(3, 222, USD_CURRENCY_ID);

    IOracle.initializer(oracle_address, 1234, publisher_registry_address, 3, currencies, 3, pairs);
    IOracle.publish_spot_entry(
        oracle_address,
        SpotEntry(
        BaseEntry(
            now,
            1,
            1,
            ),
        2,
        2 * 10 ** 6,
        0,
        ),
    );
    IOracle.publish_spot_entry(
        oracle_address,
        SpotEntry(
        BaseEntry(
            now,
            1,
            1,
            ),
        3,
        8 * 10 ** 6,
        0,
        ),
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
    assert price = 0;
    let (price, decimals, last_updated, num_sources) = IOracle.get_spot(oracle_address, 2, 0);
    assert price = 2000000;
    let (price, decimals, last_updated, num_sources) = IOracle.get_spot(oracle_address, 3, 0);
    assert price = 8000000;

    let (price, decimals, last_updated, num_sources) = IOracle.get_spot_with_USD_hop(
        oracle_address, 111, 222, 0
    );
    assert price = 250000000000000000;
    assert decimals = 18;
    assert last_updated = 100000;
    assert num_sources = 1;

    return ();
}
