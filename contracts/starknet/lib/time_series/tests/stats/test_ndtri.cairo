%lang starknet

from starkware.cairo.common.registers import get_label_location
from time_series.stats.ndtri import ndtri
from cairo_math_64x61.math64x61 import FixedPoint

@view
func test_ndtri{range_check_ptr}() {
    alloc_locals;
    let y = 230584300921369408;  // 0.1
    let (z) = ndtri(y);
    assert z = -2955056672250870995;  // _norm_ppf(0.1) == -1.2815515655446004

    return ();
}

@view
func test_ndtri2{range_check_ptr}() {
    alloc_locals;
    let y = 691752902764108160;  // 0.3
    let (z) = ndtri(y);
    assert z = -1209185256255912873;  // _norm_ppf(0.3) == -0.5244005127080409

    return ();
}

@view
func test_ndtri3{range_check_ptr}() {
    alloc_locals;
    let y = 1614090106449585664;  // 0.7
    let (z) = ndtri(y);
    assert z = 1209185256255912501;  // _norm_ppf(0.7) == 0.5244005127080409

    let (z1) = ndtri(2075258708292324608);  // 0.9
    let (z2) = ndtri(230584300921369408);  // 0.1
    assert z1 + z2 = 0;

    return ();
}
