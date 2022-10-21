%lang starknet

from starkware.cairo.common.alloc import alloc

from time_series.prelude import volatility
from time_series.structs import TickElem
from cairo_math_64x61.math64x61 import FixedPoint

@view
func test_volatility{range_check_ptr}() {
    alloc_locals;
    let (arr: TickElem**) = alloc();

    assert arr[0] = new TickElem(1664805721, FixedPoint.from_decimals(1930620000000));
    assert arr[1] = new TickElem(1664805749, FixedPoint.from_decimals(1929640000000));
    assert arr[2] = new TickElem(1664805780, FixedPoint.from_decimals(1929640000000));
    assert arr[3] = new TickElem(1664805810, FixedPoint.from_decimals(1930950000000));
    assert arr[4] = new TickElem(1664805880, FixedPoint.from_decimals(1930740000000));
    assert arr[5] = new TickElem(1664805911, FixedPoint.from_decimals(1930709999999));
    assert arr[6] = new TickElem(1664805977, FixedPoint.from_decimals(1930709999999));
    assert arr[7] = new TickElem(1664806032, FixedPoint.from_decimals(1930709999999));
    assert arr[8] = new TickElem(1664806063, FixedPoint.from_decimals(1932400000000));
    assert arr[9] = new TickElem(1664806093, FixedPoint.from_decimals(1934270000000));

    let y = volatility(10, arr);
    assert y = 1162671062041993095;
    let converted = FixedPoint.to_decimals(y);
    assert converted = 50422819;

    return ();
}
