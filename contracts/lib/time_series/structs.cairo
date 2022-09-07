%lang starknet

using NEVER = felt

struct TickElem:
    member tick : felt
    member value : felt
end

struct Matrix2D:
    member x_dim : felt
    member y_dim : felt
    member m : felt**
end

struct List:
    member length : felt
    member size : felt
    member arr : felt*
end

struct PAIRWISE_OPERATION:
    member ADDITION : NEVER  # DEFAULT
    member SUBTRACTION : NEVER
    member MULTIPLICATION : NEVER
    member DIVISION : NEVER
end
