%lang starknet

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
