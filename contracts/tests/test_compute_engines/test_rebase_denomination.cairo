%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from protostar.asserts import assert_eq
from compute_engines.rebase_denomination.RebaseDenomination import SLASH_USD, SLASH_USD_BITS, _convert_currency_to_asset_key, _decimal_div
from compute_engines.rebase_denomination.IRebaseDenomination import IOracleController

const ETH = 6648936 # str_to_felt("eth")
const BTC = 6452323 # str_to_felt("btc")
const AVAX = 1635148152 # str_to_felt("avax")


@external
func test_rebase_mock{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}():
    alloc_locals
    
    local rebase_address : felt
    const oracle_controller_address = 1234
    local contract_address : felt
    # We deploy contract and put its address into a local variable. Second argument is calldata array
    %{ ids.contract_address = deploy_contract("./contracts/src/compute_engines/rebase_denomination/RebaseDenomination.cairo", [1, ids.oracle_controller_address]).contract_address %}

    %{ stop_mock = mock_call(ids.oracle_controller_address, "get_value", [3000000, 6, 10000, 4]) %}
    let (value, decimals, last_updated_timestamp, num_sources_aggregated) = IOracleController.get_rebased_value(contract_address, ETH, BTC)
    %{ stop_mock() %}
    assert_eq(value, 1000000)
    assert_eq(decimals, 6)
    assert_eq(last_updated_timestamp, 10000)
    assert_eq(num_sources_aggregated, 4)
    return ()
end

@external
func test_convert_to_asset_key{range_check_ptr}():
    # ETH/USD
    let (eth_usd) = _convert_currency_to_asset_key(ETH, SLASH_USD, SLASH_USD_BITS)
    assert_eq(eth_usd, 28556963469423460) # str_to_felt("eth/usd")

    # BTC/USD
    let (btc_usd) = _convert_currency_to_asset_key(BTC, SLASH_USD, SLASH_USD_BITS)
    assert_eq(btc_usd, 27712517064455012) # str_to_felt("btc/usd")

    # AVAX/USD
    let (avax_usd) = _convert_currency_to_asset_key(AVAX, SLASH_USD, SLASH_USD_BITS)
    assert_eq(avax_usd, 7022907837751063396) # str_to_felt("avax/usd")
    return ()
end

@external
func test_decimal_div{range_check_ptr}():
    let (res_a, dec_a) = _decimal_div(250, 2, 24000, 4)
    assert_eq(res_a, 10416)
    assert_eq(dec_a, 4)

    let (res_b, dec_b) = _decimal_div(2500, 3, 10, 1)
    assert_eq(res_b, 2500)
    assert_eq(dec_b, 3)

    let (res_c, dec_c) = _decimal_div(2000, 3, 2000, 3)
    assert_eq(res_c, 1000)
    assert_eq(dec_c, 3)

    let (res_d, dec_d) = _decimal_div(6000, 3, 2000, 3)
    assert_eq(res_d, 3000)
    assert_eq(dec_d, 3)
    
    %{ expect_revert("TRANSACTION_FAILED") %}
    let (res_f, dec_f) = _decimal_div(6000, 3, 0, 8)
    return ()
end
