%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.starknet.common.syscalls import get_block_timestamp

from oracle.IOracle import IOracle
from publisher_registry.IPublisherRegistry import IPublisherRegistry
from compute_engines.summary_stats.ISummaryStats import ISummaryStats
from entry.structs import Currency, Pair, SpotEntry, Entry, BaseEntry
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
    IPublisherRegistry.add_source_for_publisher(publisher_registry_address, 1, 1);
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

@external
func test_set_decimals{syscall_ptr: felt*, range_check_ptr}() {
    alloc_locals;

    local oracle_address;
    %{ ids.oracle_address = context.oracle_address %}

    let (decimals_) = IOracle.get_spot_decimals(oracle_address, 1);
    assert decimals_ = 18;

    return ();
}
