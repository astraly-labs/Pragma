%lang starknet

from starkware.cairo.common.bool import TRUE, FALSE
from starkware.cairo.common.math import unsigned_div_rem, abs_value, sqrt
from starkware.cairo.common.math_cmp import is_le, is_nn

from time_series.utils import is_positive, greater_than, safe_div

# https://www.johndcook.com/blog/standard_deviation/
# https://onlinegdb.com/V6FwrXOKA

struct RunningStats:
    member m_n : felt
    member m_oldM : felt
    member m_newM : felt
    member m_oldS : felt
    member m_newS : felt
end

func new_running_stats() -> (rs : RunningStats):
    return (RunningStats(0, 0, 0, 0, 0))
end

func push{range_check_ptr}(s : RunningStats, x : felt) -> (r : RunningStats):
    alloc_locals
    let m_n = s.m_n + 1
    if m_n == 1:
        let m_oldM = x
        let m_newM = x
        let m_oldS = 0
        return (RunningStats(m_n, m_oldM, m_newM, m_oldS, s.m_newS))
    end
    let (_newM) = safe_div(x - s.m_oldM, m_n)
    let m_newM = s.m_oldM + _newM
    let m_newS = s.m_oldS + (x - s.m_oldM) * (x - m_newM)
    let m_oldM = m_newM
    let m_oldS = m_newS

    return (RunningStats(m_n, m_oldM, m_newM, m_oldS, m_newS))
end

func mean{range_check_ptr}(rs : RunningStats) -> (m : felt, rs : RunningStats):
    let (above_zero_) = is_positive(rs.m_n)
    if above_zero_ == TRUE:
        return (rs.m_newM, rs)
    else:
        return (0, rs)
    end
end

func variance{range_check_ptr}(rs : RunningStats) -> (_v : felt, rs : RunningStats):
    let (above_one) = greater_than(rs.m_n, 1)
    if above_one == TRUE:
        let (q, _) = unsigned_div_rem(rs.m_newS, rs.m_n - 1)
        return (q, rs)
    else:
        return (0, rs)
    end
end

func standard_deviation{range_check_ptr}(rs : RunningStats) -> (_sd : felt, rs : RunningStats):
    let (_v, rs) = variance(rs)
    let (_sd) = sqrt(_v)
    return (_sd, rs)
end
