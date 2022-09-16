%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.starknet.common.syscalls import get_block_timestamp

from oracle.IOracle import IOracle
from publisher_registry.IPublisherRegistry import IPublisherRegistry
from compute_engines.summary_stats.ISummaryStats import ISummaryStats
from entry.structs import Currency, Pair, Entry
from time_series.prelude import ONE

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
    IPublisherRegistry.register_publisher(publisher_registry_address, 1, oracle_admin_address);
    %{ stop_prank_callable() %}

    %{ stop_prank_callable = start_prank(ids.oracle_admin_address, ids.oracle_address) %}
    let (currencies: Currency*) = alloc();
    let (pairs: Pair*) = alloc();
    assert currencies[0] = Currency(111, 18, 0, 0, 0);
    assert currencies[1] = Currency(222, 18, 0, 0, 0);
    assert pairs[0] = Pair(1, 111, 222);

    IOracle.initializer(oracle_address, 1234, publisher_registry_address, 2, currencies, 1, pairs);
    %{ stop_prank_callable %}

    %{ stop_warp = warp(100) %}
    IOracle.publish_entry(oracle_address, Entry(1, ONE * 64, 100, 123, 1));
    IOracle.set_checkpoint(oracle_address, 1, 120282243752302);

    %{ stop_warp(); stop_warp = warp(200) %}
    IOracle.publish_entry(oracle_address, Entry(1, ONE * 71, 200, 123, 1));
    IOracle.set_checkpoint(oracle_address, 1, 120282243752302);

    %{ stop_warp(); stop_warp = warp(300) %}
    IOracle.publish_entry(oracle_address, Entry(1, ONE * 63, 300, 123, 1));
    IOracle.set_checkpoint(oracle_address, 1, 120282243752302);

    %{ stop_warp(); stop_warp = warp(400) %}
    IOracle.publish_entry(oracle_address, Entry(1, ONE * 67, 400, 123, 1));
    IOracle.set_checkpoint(oracle_address, 1, 120282243752302);

    %{ stop_warp(); stop_warp = warp(500) %}
    IOracle.publish_entry(oracle_address, Entry(1, ONE * 102, 500, 123, 1));
    IOracle.set_checkpoint(oracle_address, 1, 120282243752302);

    %{ stop_warp(); stop_warp = warp(600) %}
    IOracle.publish_entry(oracle_address, Entry(1, ONE * 58, 600, 123, 1));
    IOracle.set_checkpoint(oracle_address, 1, 120282243752302);

    %{ stop_warp(); stop_warp = warp(700) %}
    IOracle.publish_entry(oracle_address, Entry(1, ONE * 38, 700, 123, 1));
    IOracle.set_checkpoint(oracle_address, 1, 120282243752302);

    %{ stop_warp(); stop_warp = warp(800) %}
    IOracle.publish_entry(oracle_address, Entry(1, ONE * 25, 800, 123, 1));
    IOracle.set_checkpoint(oracle_address, 1, 120282243752302);

    %{ stop_warp(); stop_warp = warp(900) %}
    IOracle.publish_entry(oracle_address, Entry(1, ONE * 84, 900, 123, 1));
    IOracle.set_checkpoint(oracle_address, 1, 120282243752302);

    %{ stop_warp(); stop_warp = warp(1000) %}
    IOracle.publish_entry(oracle_address, Entry(1, ONE * 73, 1000, 123, 1));
    IOracle.set_checkpoint(oracle_address, 1, 120282243752302);

    return ();
}

@external
func test_volatility{syscall_ptr: felt*, range_check_ptr}() {
    tempvar summary_stats_address;
    tempvar now;
    %{
        ids.summary_stats_address = context.summary_stats_address
        ids.now = context.now
    %}

    let (_volatility) = ISummaryStats.calculate_volatility(summary_stats_address, 1, 100, 1000);
    assert _volatility = 767009143009058947578;  // 332.6371916666667 | steps=8076

    return ();
}
