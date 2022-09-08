%lang starknet

from starkware.cairo.common.alloc import alloc

from time_series.structs import Matrix2D
from time_series.utils import safe_div

using Matrix2DArray = felt**

func range(start : felt, end_ : felt) -> (arr_len : felt, arr : felt*):
    let (arr) = alloc()
    let (arr) = range_iter(start, end_, arr, 0)
    return (end_ - start, arr)
end

func range_iter(start : felt, end_ : felt, arr : felt*, cur_ix : felt) -> (arr : felt*):
    if cur_ix == end_ - start:
        return (arr)
    end

    assert arr[cur_ix] = start + cur_ix
    return range_iter(start, end_, arr, cur_ix + 1)
end

func linspace{range_check_ptr}(start : felt, end_ : felt, num_ : felt) -> (arr : felt*):
    alloc_locals
    let (arr) = alloc()
    let (interval) = safe_div(end_ - start, num_)
    let (arr) = linspace_iter(start, end_, interval, num_, arr, 0)
    return (arr)
end

func linspace_iter(
    start : felt, end_ : felt, interval : felt, num_ : felt, arr : felt*, cur_ix : felt
) -> (arr : felt*):
    if cur_ix == num_ + 1:
        return (arr)
    end
    assert arr[cur_ix] = start + cur_ix * interval

    return linspace_iter(start, end_, interval, num_, arr, cur_ix + 1)
end

func reshape(arr_len : felt, arr : felt*, x_dim : felt, y_dim : felt) -> (output_matrix : Matrix2D):
    alloc_locals
    let (output : Matrix2DArray) = alloc()
    let (x_dim_arr) = alloc()
    reshape_iter(0, 0, arr, x_dim, y_dim, output, x_dim_arr)
    return (Matrix2D(x_dim, y_dim, output))
end

func reshape_iter(
    cur_x_index : felt,
    cur_y_index : felt,
    arr : felt*,
    x_dim : felt,
    y_dim : felt,
    output : Matrix2DArray,
    x_dim_arr : felt*,
):
    alloc_locals
    if cur_x_index == x_dim:
        return ()
    end
    if cur_y_index == y_dim:
        assert output[cur_x_index] = x_dim_arr
        let (new_x_dim_arr) = alloc()
        return reshape_iter(cur_x_index + 1, 0, arr, x_dim, y_dim, output, new_x_dim_arr)
    end
    assert x_dim_arr[cur_y_index] = arr[cur_x_index * y_dim + cur_y_index]
    return reshape_iter(cur_x_index, cur_y_index + 1, arr, x_dim, y_dim, output, x_dim_arr)
end

func transpose(matrix : Matrix2D) -> (output_matrix : Matrix2D):
    alloc_locals
    let (output : Matrix2DArray) = alloc()
    let (x_dim_arr) = alloc()
    transpose_iter(0, 0, matrix.m, matrix.x_dim, matrix.y_dim, output, x_dim_arr)
    return (Matrix2D(matrix.x_dim, matrix.y_dim, output))
end

func transpose_iter(
    cur_x_index : felt,
    cur_y_index : felt,
    arr : Matrix2DArray,
    x_dim : felt,
    y_dim : felt,
    output : Matrix2DArray,
    x_dim_arr : felt*,
):
    alloc_locals
    if cur_x_index == y_dim:
        return ()
    end
    if cur_y_index == x_dim:
        assert output[cur_x_index] = x_dim_arr
        let (new_x_dim_arr) = alloc()
        return transpose_iter(cur_x_index + 1, 0, arr, x_dim, y_dim, output, new_x_dim_arr)
    end
    assert x_dim_arr[cur_y_index] = arr[cur_y_index][cur_x_index]
    return transpose_iter(cur_x_index, cur_y_index + 1, arr, x_dim, y_dim, output, x_dim_arr)
end

func fill_2d(x_dim : felt, y_dim : felt, fill_value : felt) -> (m : Matrix2D):
    alloc_locals
    let (output : Matrix2DArray) = alloc()
    let (x_dim_arr) = alloc()
    fill_2d_iter(0, 0, x_dim, y_dim, output, x_dim_arr, fill_value)
    return (Matrix2D(x_dim, y_dim, output))
end

func fill_2d_iter(
    cur_x_index : felt,
    cur_y_index : felt,
    x_dim : felt,
    y_dim : felt,
    output : Matrix2DArray,
    x_dim_arr : felt*,
    fill_value : felt,
):
    alloc_locals
    if cur_x_index == x_dim:
        return ()
    end
    if cur_y_index == y_dim:
        assert output[cur_x_index] = x_dim_arr
        let (new_x_dim_arr) = alloc()
        return fill_2d_iter(cur_x_index + 1, 0, x_dim, y_dim, output, new_x_dim_arr, fill_value)
    end
    assert x_dim_arr[cur_y_index] = fill_value
    return fill_2d_iter(cur_x_index, cur_y_index + 1, x_dim, y_dim, output, x_dim_arr, fill_value)
end

func identity(n : felt) -> (m : Matrix2D):
    alloc_locals
    let (output : Matrix2DArray) = alloc()
    let (x_dim_arr) = alloc()
    identity_iter(0, 0, n, output, x_dim_arr)
    return (Matrix2D(n, n, output))
end

func identity_iter(
    cur_x_index : felt, cur_y_index : felt, dim_ : felt, output : Matrix2DArray, x_dim_arr : felt*
):
    alloc_locals
    if cur_x_index == dim_:
        return ()
    end
    if cur_y_index == dim_:
        assert output[cur_x_index] = x_dim_arr
        let (new_x_dim_arr) = alloc()
        return identity_iter(cur_x_index + 1, 0, dim_, output, new_x_dim_arr)
    end
    if cur_x_index == cur_y_index:
        assert x_dim_arr[cur_y_index] = 1
    else:
        assert x_dim_arr[cur_y_index] = 0
    end
    return identity_iter(cur_x_index, cur_y_index + 1, dim_, output, x_dim_arr)
end
