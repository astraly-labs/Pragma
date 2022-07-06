%lang starknet

struct OracleController_OracleImplementationStatus:
    member was_registered : felt
    member is_active : felt
end

struct KeyDecimalStruct:
    member key : felt
    member decimal : felt
end
