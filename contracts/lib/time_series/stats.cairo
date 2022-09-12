%lang starknet

from time_series.structs import TickElem
from utils import safe_div

func sum_array{range_check_ptr}(tick_arr_len : felt, tick_arr : TickElem**) -> (sum_ : felt):
    let (sum_) = sum_array_iter(0, 0, tick_arr_len, tick_arr)
    return (sum_)
end

func sum_array_iter{range_check_ptr}(
    idx : felt, total : felt, tick_arr_len : felt, tick_arr : TickElem**
) -> (sum_ : felt):
    if idx == tick_arr_len:
        return (total)
    end
    return sum_array_iter(idx + 1, total + tick_arr[idx].value, tick_arr_len, tick_arr)
end

func mean{range_check_ptr}(tick_arr_len : felt, tick_arr : TickElem**) -> (mean : felt):
    let (sum_) = sum_array(tick_arr_len, tick_arr)
    let (mean_) = safe_div(sum_, tick_arr_len)
    return (mean_)
end
