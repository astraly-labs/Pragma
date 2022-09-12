%lang starknet

from cairo_math_64x61.math64x61 import FixedPoint

from starkware.cairo.common.alloc import alloc

using Float = felt

func polevl{range_check_ptr}(x : Float, coef : felt*, N : felt) -> (_ans : Float):
    let ans = coef[0]
    let (ans) = polevl_iter(ans, x, coef + 1, N)

    return (ans)
end

func polevl_iter{range_check_ptr}(ans : Float, x : Float, coef : felt*, N : felt) -> (_ans : Float):
    if N == 0:
        return (ans)
    end
    let (x_) = FixedPoint.mul(ans, x)
    let (x2_) = FixedPoint.add(x_, coef[0])
    return polevl_iter(x2_, x, coef + 1, N - 1)
end

func p1evl{range_check_ptr}(x : Float, coef : felt*, N : felt) -> (_ans : Float):
    let ans = x + coef[0]
    let (ans) = polevl_iter(ans, x, coef + 1, N - 1)
    return (ans)
end

func p1evl_iter{range_check_ptr}(ans : Float, x : Float, coef : felt*, N : felt) -> (_ans : Float):
    if N == 0:
        return (ans)
    end
    let (x_) = FixedPoint.mul(ans, x)
    let (x2_) = FixedPoint.add(x_, coef[0])
    return p1evl_iter(x2_, x, coef + 1, N - 1)
end
