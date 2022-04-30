%lang starknet

struct OracleProxy_AdminAuth:
    member public_key : felt
    member nonce : felt
end

struct OracleProxy_OracleImplementationStatus:
    member was_registered : felt
    member is_active : felt
end
