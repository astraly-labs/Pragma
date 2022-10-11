%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.math import unsigned_div_rem
from starkware.cairo.common.pow import pow

from time_series.convert import _decimal_div, convert_via_usd

@view
func test_conversion{range_check_ptr}() {
    let (output, decs) = _decimal_div(1000000000, 5, 200000000, 5);
    assert output = 500000;
    assert decs = 5;

    let (output, decs) = _decimal_div(3 * 10 ** 6, 6, 10 ** 6, 6);
    assert output = 3 * 10 ** 6;
    assert decs = 6;

    let PRICE_OF_ETH = 1300 * 10 ** 6;
    let PRICE_OF_BTC = 20000 * 10 ** 6;
    let BTC_DECIMALS = 18;
    let converted_btc = convert_via_usd(PRICE_OF_ETH, PRICE_OF_BTC, BTC_DECIMALS);
    assert converted_btc = 65000000000000000;

    let converted_btc = convert_via_usd(PRICE_OF_ETH, PRICE_OF_BTC, 6);
    assert converted_btc = 65000;

    return ();
}
