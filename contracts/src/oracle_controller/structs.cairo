%lang starknet

from entry.structs import Currency, Pair

struct OracleController_OracleImplementationStatus:
    member was_registered : felt
    member is_active : felt
end
