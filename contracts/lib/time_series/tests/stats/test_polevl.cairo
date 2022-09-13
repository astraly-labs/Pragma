%lang starknet

from starkware.cairo.common.registers import get_label_location
from time_series.stats.polevl import polevl
from time_series.stats.ndtri import getP0
from cairo_math_64x61.math64x61 import FixedPoint

@view
func test_polevl{range_check_ptr}() {
    alloc_locals;
    let y = 691752902764108160;
    let (P0) = getP0();
    let (z) = polevl(y, P0, 4);
    assert z = -754872579558213;
    return ();
}
