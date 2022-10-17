%lang starknet

from starkware.cairo.common.registers import get_label_location
from starkware.cairo.common.bool import TRUE, FALSE
from starkware.cairo.common.math import assert_lt, assert_nn, assert_not_zero

from cairo_math_64x61.math64x61 import FixedPoint, ONE

from time_series.utils import greater_than, less_than
from time_series.stats.polevl import polevl, p1evl

using Float = felt;

const S2PI = 5779891283755276288;

func getP0() -> (data: felt*) {
    let (_l) = get_label_location(P0);
    return (_l,);

    P0:
    dw -138266071640371314688;
    dw 225975094649402720256;
    dw -130686617277703290880;
    dw 32123300645097689088;
    dw -2857321886362434560;
}

func getQ0() -> (data: felt*) {
    let (_l) = get_label_location(QO);
    return (_l,);

    QO:
    dw 4506743836578017792;
    dw 10782765538710761472;
    dw 199133160610420359168;
    dw -519881562626950365184;
    dw 461768610740212531200;
    dw -189164963183861727232;
    dw 36675868477919473664;
    dw -2728541413315422720;
}

func getP1() -> (data: felt*) {
    let (_l) = get_label_location(P1);
    return (_l,);

    P1:
    dw 9351228548460238848;
    dw 72691953263013019648;
    dw 131808487096087199744;
    dw 101642729806256291840;
    dw 33861203577975070720;
    dw 5042032574734435328;
    dw -323408499656990144;
    dw -80802417602731120;
    dw -1977160733751779;
}

func getQ1() -> (data: felt*) {
    let (_l) = get_label_location(Q1);
    return (_l,);

    Q1:
    dw 36386175766166089728;
    dw 104663974729064628224;
    dw 95270985601210843136;
    dw 34685732400826437632;
    dw 5775328452675141632;
    dw -327851498694282368;
    dw -87807979303940560;
    dw -2151949849805191;
}

func getP2() -> (data: felt*) {
    let (_l) = get_label_location(P2);
    return (_l,);

    P2:
    dw 7465740707627913216;
    dw 15945432194709739520;
    dw 9082278086325743616;
    dw 3073768532261214208;
    dw 464593676950672448;
    dw 28527113751811380;
    dw 695399716864770;
    dw 6129091543816;
    dw 14387873291;
}

func getQ2() -> (data: felt*) {
    let (_l) = get_label_location(Q2);
    return (_l,);

    Q2:
    dw 13891021772804931584;
    dw 8485123282232694784;
    dw 3175194234609467392;
    dw 498608560013256384;
    dw 30945336924773932;
    dw 756349860308256;
    dw 6669601668531;
    dw 15657121550;
}

const EXP_NEG2 = 312061916751098624;
const ONE_HALF = 1152921504606846976;
const NEG_TWO = -4611686018427387904;

func ndtri{range_check_ptr}(y0: Float) -> (ans: Float) {
    //
    // Inverse of Normal distribution function
    //
    alloc_locals;

    with_attr error_message("-INFINITY") {
        assert_not_zero(y0);
    }
    with_attr error_message("INFINITY") {
        assert_not_zero(y0 - ONE);
    }

    with_attr error_message("ndtri") {
        assert_nn(y0);
        assert_lt(y0, ONE);
    }

    let (y_is_greater) = greater_than(y0, ONE - EXP_NEG2);

    local y;
    local code;
    if (y_is_greater == TRUE) {
        assert y = ONE - y0;
        code = 0;
    } else {
        code = 1;
        y = y0;
    }

    let (y_is_greater) = greater_than(y, EXP_NEG2);
    if (y_is_greater == TRUE) {
        // y = y - 0.5;
        // y2 = y * y;
        // x = y + y * (y2 * polevl(y2, P0, 4) / p1evl(y2, Q0, 8));
        // x = x * s2pi;

        let (P0) = getP0();
        let (Q0) = getQ0();
        let y = y - ONE_HALF;
        let y2 = FixedPoint.mul(y, y);

        let (pol_p0_) = polevl(y2, P0, 4);
        let (p1_q0_) = p1evl(y2, Q0, 8);

        let _quot = FixedPoint.div(pol_p0_, p1_q0_);
        let _quot2 = FixedPoint.mul(y2, _quot);

        let x_ = FixedPoint.mul(y, _quot2);
        let x_ = FixedPoint.add(y, x_);
        let x = FixedPoint.mul(x_, S2PI);

        return (x,);
    }

    let lny = FixedPoint.ln(y);
    let _f = FixedPoint.mul(NEG_TWO, lny);

    // x = sqrt(-2 * log(x))
    let x = FixedPoint.sqrt(_f);

    let _lnx = FixedPoint.ln(x);
    let _x2 = FixedPoint.div(_lnx, x);
    let x0 = FixedPoint.sub(x, _x2);

    // x0 = x - log(x) / x
    let z = FixedPoint.div(ONE, x);

    let (x_below_8) = less_than(x, ONE * 8);
    local x1;
    if (x_below_8 == TRUE) {
        let (P1) = getP1();
        let (Q1) = getQ1();
        let (_pol) = polevl(z, P1, 8);
        let (_p1) = p1evl(z, Q1, 8);
        let _quot = FixedPoint.div(_pol, _p1);
        let _x1 = FixedPoint.mul(z, _quot);

        x1 = _x1;
        tempvar range_check_ptr = range_check_ptr;
    } else {
        let (P2) = getP2();
        let (Q2) = getQ2();
        let (_pol) = polevl(z, P2, 8);
        let (_p1) = p1evl(z, Q2, 8);
        let _quot = FixedPoint.div(_pol, _p1);
        let _x1 = FixedPoint.mul(z, _quot);

        x1 = _x1;
        tempvar range_check_ptr = range_check_ptr;
    }

    let x = FixedPoint.sub(x0, x1);
    if (code == TRUE) {
        return (-x,);
    } else {
        return (x,);
    }
}
