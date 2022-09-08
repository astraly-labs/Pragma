%lang starknet

from starkware.cairo.common.alloc import alloc

from time_series.structs import Matrix2D

func dot_product(x_len : felt, x : felt*, y : felt*) -> (_product : felt):
    return dot_product_iter(0, 0, x_len, x, y)
end

func dot_product_iter(total : felt, cur_ix : felt, x_len : felt, x : felt*, y : felt*) -> (
    _product : felt
):
    if cur_ix == x_len:
        return (total)
    end
    let tmp1 = x[cur_ix]
    let tmp2 = y[cur_ix]
    return dot_product_iter(total + x[cur_ix] * y[cur_ix], cur_ix + 1, x_len, x, y)
end

func matrix_vector_mult(matrix : Matrix2D, arr_len : felt, arr : felt*) -> (
    vector_len : felt, vector : felt*
):
    alloc_locals
    assert matrix.y_dim = arr_len
    let (output) = alloc()
    matrix_vector_mult_iter(0, matrix, arr, output)
    return (matrix.y_dim, output)
end

func matrix_vector_mult_iter(idx : felt, matrix : Matrix2D, arr : felt*, output : felt*):
    if idx == matrix.x_dim:
        return ()
    end
    let (_prod) = dot_product(matrix.y_dim, matrix.m[idx], arr)
    assert output[idx] = _prod
    return matrix_vector_mult_iter(idx + 1, matrix, arr, output)
end

func vector_matrix_mult(arr_len : felt, arr : felt*, matrix : Matrix2D) -> (
    vector_len : felt, vector : felt*
):
    alloc_locals
    assert matrix.x_dim = arr_len
    let (output) = alloc()
    vector_matrix_mult_iter(0, arr, matrix, output)
    return (matrix.y_dim, output)
end

func vector_matrix_mult_iter(idx : felt, arr : felt*, matrix : Matrix2D, output : felt*) -> ():
    if idx == matrix.y_dim:
        return ()
    end
    let (_vec) = get_vec_by_index(idx, matrix)
    let (_prod) = dot_product(matrix.x_dim, arr, _vec)
    assert output[idx] = _prod
    return vector_matrix_mult_iter(idx + 1, arr, matrix, output)
end

func get_vec_by_index(idx : felt, matrix : Matrix2D) -> (vec_ : felt*):
    alloc_locals
    let (output : felt*) = alloc()
    get_arr_by_index_iter(0, idx, output, matrix)
    return (output)
end

func get_arr_by_index_iter(idx : felt, j : felt, output : felt*, matrix : Matrix2D):
    if idx == matrix.x_dim:
        return ()
    end
    assert output[idx] = matrix.m[idx][j]
    return get_arr_by_index_iter(idx + 1, j, output, matrix)
end

func matrix_mult(matrix : Matrix2D, r_matrix : Matrix2D) -> (_m : Matrix2D):
    alloc_locals
    assert matrix.y_dim = r_matrix.x_dim
    let (output : felt**) = alloc()
    matrix_mult_iter(0, matrix, r_matrix, output)
    return (Matrix2D(matrix.x_dim, r_matrix.y_dim, output))
end

func matrix_mult_iter(idx : felt, matrix : Matrix2D, r_matrix : Matrix2D, output : felt**):
    if idx == r_matrix.y_dim:
        return ()
    end
    let _vec = matrix.m[idx]

    let (_, _vec) = vector_matrix_mult(matrix.y_dim, _vec, r_matrix)

    assert output[idx] = _vec

    return matrix_mult_iter(idx + 1, matrix, r_matrix, output)
end
