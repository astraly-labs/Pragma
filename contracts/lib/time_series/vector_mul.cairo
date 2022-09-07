%lang starknet

func dot_product(total : felt, cur_ix : felt, x_len : felt, x : felt*, y : felt*) -> (
    _product : felt
):
    if cur_ix == x_len:
        return (total)
    end
    return dot_product(total + x[cur_ix] * y[cur_ix], cur_ix + 1, x_len, x, y)
end
