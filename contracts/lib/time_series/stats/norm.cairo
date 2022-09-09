%lang starknet

from cairo_math_64x61.math64x61 import ONE, E, PI, FixedPoint
from starkware.cairo.common.math import abs_value, sign

using Float = felt

const _norm_pdf_C = 5779891283755275264  # sqrt(2 * PI)

namespace norm:
    func pdf{range_check_ptr}(x : Float) -> (x : Float):
        let TWO = ONE * 2
        let (x2) = FixedPoint.pow(x, TWO)
        let (_e1) = FixedPoint.div(x2, TWO)
        let (_e2) = FixedPoint.exp(0 - _e1)
        let (_e3) = FixedPoint.div(_e2, _norm_pdf_C)
        return (_e3)
    end

    func erf{range_check_ptr}(x : felt) -> (err : felt):
        alloc_locals
        let a1 = 587597033253977856  # 0.254829592
        let a2 = -656004809849713792  # -0.284496736
        let a3 = 3277556937885134336  # 1.421413741
        let a4 = -3350740442782659072  # -1.453152027
        let a5 = 2447434288401111552  # 1.061405429
        let p = 755373647815624192  # 0.3275911
        let (exp_sign) = sign(x)
        let (x) = abs_value(x)
        let (denom) = FixedPoint.mul(p, x)
        let (t) = FixedPoint.div(ONE, ONE + denom)

        let (_y1) = FixedPoint.mul(a5, t)
        let (_y2) = FixedPoint.add(_y1, a4)
        let (_y3) = FixedPoint.mul(_y2, t)
        let (_y4) = FixedPoint.add(_y3, a3)
        let (_y5) = FixedPoint.mul(_y4, t)
        let (_y6) = FixedPoint.add(_y5, a2)
        let (_y7) = FixedPoint.mul(_y6, t)
        let (_y8) = FixedPoint.add(_y7, a1)
        let (_y9) = FixedPoint.mul(_y8, t)

        let (x_prod) = FixedPoint.mul(x, 0 - x)
        let (e_x_prod) = FixedPoint.exp(x_prod)

        let (result) = FixedPoint.mul(_y9, e_x_prod)
        let (result) = FixedPoint.sub(ONE, result)

        if exp_sign == -1:
            return (0 - result)
        else:
            return (result)
        end
    end

    func cdf{range_check_ptr}(x : felt) -> (r : felt):
        alloc_locals
        let TWO = ONE * 2
        let (half) = FixedPoint.div(ONE, TWO)
        let (sqrt_two) = FixedPoint.sqrt(TWO)
        let (erf_input) = FixedPoint.div(x, sqrt_two)
        let (_erf_output) = erf(erf_input)
        let (output) = FixedPoint.mul(half, ONE + _erf_output)
        return (output)
    end
end
