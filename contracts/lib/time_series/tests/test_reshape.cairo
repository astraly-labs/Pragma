%lang starknet

from time_series.reshape import linspace, range, reshape, transpose, fill_2d, identity

@view
func test_reshape():
    let (z_len, z) = range(0, 15)
    let (matrix_) = reshape(z_len, z, 3, 5)
    assert matrix_.m[0][0] = 0
    assert matrix_.m[1][0] = 5
    assert matrix_.m[2][0] = 10

    let (t_matrix) = transpose(matrix_)
    assert t_matrix.m[0][0] = 0
    assert t_matrix.m[0][1] = 5
    assert t_matrix.m[0][2] = 10

    return ()
end

@view
func test_linspace{range_check_ptr}():
    let (v) = linspace(0, 30, 3)
    assert v[0] = 0
    assert v[1] = 10
    assert v[2] = 20
    assert v[3] = 30
    return ()
end

@view
func test_fill_2d():
    let (v) = fill_2d(2, 3, 100)
    assert v.m[0][0] = 100
    assert v.m[1][1] = 100
    assert v.m[1][2] = 100
    return ()
end

@view
func test_identity():
    let (v) = identity(3)
    assert v.m[0][0] = 1
    assert v.m[1][0] = 0
    assert v.m[0][1] = 0
    assert v.m[1][1] = 1
    assert v.m[2][2] = 1
    return ()
end
