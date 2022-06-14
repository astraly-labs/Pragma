%lang starknet

@contract_interface
namespace IOracleController:
    #
    # Getters
    #

    func get_yield_points(decimals : felt) -> (yield_points_len : felt, yield_points : YieldPoint*):
    end

    #
    # Admin
    #
end
