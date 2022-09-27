%lang starknet

from time_series.prelude import (
    Matrix2D,
    PAIRWISE_OPERATION,
    range,
    reshape,
    dot_product,
    pairwise_1D,
    matrix_vector_mult,
    matrix_mult,
    vector_matrix_mult,
    get_vec_by_index,
)

@view
func test_vector_mult() {
    alloc_locals;
    let arr_len = 15;
    let (r) = range(0, 15);
    let (matrix_) = reshape(arr_len, r, 3, 5);
    let arr_len = 5;

    let (arr) = range(10, 15);
    let (output_len, output) = matrix_vector_mult(matrix_, arr_len, arr);
    assert output[0] = 130;
    assert output[1] = 430;
    assert output[2] = 730;
    return ();
}

@view
func test_matmul() {
    alloc_locals;
    let arr_len = 15;
    let (r) = range(0, 15);
    let (matrix_) = reshape(arr_len, r, 3, 5);
    let (arr) = range(10, 25);
    let (r_matrix) = reshape(arr_len, arr, 5, 3);

    let (arr) = range(0, 5);

    let (_vec) = get_vec_by_index(0, r_matrix);
    assert _vec[0] = 10;
    assert _vec[1] = 13;
    assert _vec[2] = 16;
    assert _vec[3] = 19;
    assert _vec[4] = 22;
    let (_prod) = dot_product(5, arr, _vec);
    assert _prod = 190;
    let (output_len, output) = vector_matrix_mult(5, arr, r_matrix);
    assert output[0] = 190;
    assert output[1] = 200;
    assert output[2] = 210;

    let (output_matrix) = matrix_mult(matrix_, r_matrix);
    assert output_matrix.m[0][0] = 190;
    assert output_matrix.m[0][1] = 200;
    assert output_matrix.m[0][2] = 210;

    assert output_matrix.m[1][0] = 590;
    assert output_matrix.m[1][1] = 625;
    assert output_matrix.m[1][2] = 660;

    assert output_matrix.m[2][0] = 990;
    assert output_matrix.m[2][1] = 1050;
    assert output_matrix.m[2][2] = 1110;

    return ();
}

@view
func test_pairwise_1D{range_check_ptr}() {
    alloc_locals;
    let arr_len = 5;
    let (arr1) = range(0, 5);
    let (arr2) = range(10, 15);
    let (output) = pairwise_1D(PAIRWISE_OPERATION.ADDITION, arr_len, arr1, arr2);
    assert output[0] = 10;
    assert output[1] = 12;
    assert output[2] = 14;
    assert output[3] = 16;
    assert output[4] = 18;
    return ();
}
