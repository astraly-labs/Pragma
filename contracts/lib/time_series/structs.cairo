%lang starknet

using NEVER = felt;

struct TickElem {
    tick: felt,
    value: felt,
}

struct Matrix2D {
    x_dim: felt,
    y_dim: felt,
    m: felt**,
}

struct List {
    length: felt,
    size: felt,
    arr: felt*,
}

struct PAIRWISE_OPERATION {
    ADDITION: NEVER,  // DEFAULT
    SUBTRACTION: NEVER,
    MULTIPLICATION: NEVER,
    DIVISION: NEVER,
    FIXED_POINT_MULTIPLICATION: NEVER,
}
