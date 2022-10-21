%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.pow import pow
from protostar.asserts import assert_eq, assert_signed_lt
from compute_engines.rebase_denomination.RebaseDenomination import (
    SLASH_USD,
    SLASH_USD_BITS,
    _convert_currency_to_asset_key,
    _decimal_div,
    _shift_left,
)
from compute_engines.rebase_denomination.IRebaseDenomination import IOracleRebaser

const ETH = 4543560;  // str_to_felt("ETH")
const BTC = 4346947;  // str_to_felt("BTC")
const AVAX = 1096171864;  // str_to_felt("AVAX")

@external
func test_rebase_mock{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() {
    alloc_locals;

    local rebase_address: felt;
    const oracle_address = 1234;
    local contract_address: felt;
    // We deploy contract and put its address into a local variable. Second argument is calldata array
    %{ ids.contract_address = deploy_contract("./contracts/starknet/src/compute_engines/rebase_denomination/RebaseDenomination.cairo", [1, ids.oracle_address]).contract_address %}

    // TODO: test multiple values by having mock call return two different values
    %{ stop_mock = mock_call(ids.oracle_address, "get_value", [3000000, 6, 10000, 4]) %}
    let (
        value, decimals, last_updated_timestamp, num_sources_aggregated
    ) = IOracleRebaser.get_rebased_value_via_usd(contract_address, ETH, BTC);
    %{ stop_mock() %}
    assert_eq(value, 1000000);
    assert_eq(decimals, 6);
    assert_eq(last_updated_timestamp, 10000);
    assert_eq(num_sources_aggregated, 4);
    return ();
}

@external
func test_convert_to_asset_key{range_check_ptr}() {
    // ETH/USD
    let (eth_usd) = _convert_currency_to_asset_key(ETH, SLASH_USD, SLASH_USD_BITS);
    assert_eq(eth_usd, 19514442401534788);  // str_to_felt("ETH/USD")

    // BTC/USD
    let (btc_usd) = _convert_currency_to_asset_key(BTC, SLASH_USD, SLASH_USD_BITS);
    assert_eq(btc_usd, 18669995996566340);  // str_to_felt("BTC/USD")

    // AVAX/USD
    let (avax_usd) = _convert_currency_to_asset_key(AVAX, SLASH_USD, SLASH_USD_BITS);
    assert_eq(avax_usd, 4708022307469480772);  // str_to_felt("AVAX/USD")
    return ();
}

@external
func test_decimal_div{range_check_ptr}() {
    let (res_a, dec_a) = _decimal_div(250, 2, 24000, 4);
    assert_eq(res_a, 10416);
    assert_eq(dec_a, 4);

    let (res_b, dec_b) = _decimal_div(2500, 3, 10, 1);
    assert_eq(res_b, 2500);
    assert_eq(dec_b, 3);

    let (res_c, dec_c) = _decimal_div(2000, 3, 2000, 3);
    assert_eq(res_c, 1000);
    assert_eq(dec_c, 3);

    let (res_d, dec_d) = _decimal_div(6000, 3, 2000, 3);
    assert_eq(res_d, 3000);
    assert_eq(dec_d, 3);

    let (res_e, dec_e) = _decimal_div(10000, 4, 2000000, 5);  // 1 / 20
    assert_eq(res_e, 5000);
    assert_eq(dec_e, 5);

    %{ expect_revert("TRANSACTION_FAILED") %}
    let (res_f, dec_f) = _decimal_div(6000, 3, 0, 8);
    return ();
}

// This test currently expects an overflow and still passes.
// TODO: Make this test fail
@external
func test_todo{range_check_ptr}() {
    alloc_locals;
    const dec_a = 60;
    const shift_by_dec = 16;
    let (local big_a) = pow(10, dec_a);
    let (shifted) = _shift_left(big_a, 10, shift_by_dec);
    %{ expect_revert("TRANSACTION_FAILED") %}
    assert_signed_lt(big_a, shifted);
    return ();
}
