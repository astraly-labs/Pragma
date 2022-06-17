%lang starknet

from contracts.compute_engines.yield_curve.structs import YieldPoint

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

    #
    # Getters
    #

    func get_admin_address() -> (admin_address : felt):
    end

    func get_oracle_controller_address() -> (oracle_controller_address : felt):
    end

    func get_publisher_key() -> (publisher_key : felt):
    end

    func get_spot_key(idx : felt) -> (spot_key : felt):
    end

    func get_spot_key_is_active(spot_key : felt) -> (spot_key_is_active : felt):
    end

    func get_spot_keys() -> (spot_keys_len : felt, spot_keys : felt*):
    end

    func get_future_key(spot_key : felt, idx : felt) -> (future_key : felt):
    end

    func get_future_keys(spot_key : felt) -> (future_keys_len : felt, future_keys : felt*):
    end

    func get_on_key(idx : felt) -> (on_key : felt):
    end

    func get_on_key_is_active(on_key : felt) -> (on_key_is_active : felt):
    end

    func get_on_keys() -> (on_keys_len : felt, on_keys : felt*):
    end

    func get_future_key_status(spot_key : felt, future_key : felt) -> (
        future_key_status : FutureKeyStatus
    ):
    end

    func get_future_key_is_active(spot_key : felt, future_key : felt) -> (
        future_key_is_active : felt
    ):
    end

    func get_future_key_expiry(spot_key : felt, future_key : felt) -> (future_key_expiry : felt):
    end

    #
    # Setters
    #

    func set_admin_address(new_address : felt):
    end

    func set_oracle_controller_address(oracle_controller_address : felt) -> ():
    end

    func set_publisher_key(publisher_key : felt) -> ():
    end

    func add_spot_key(spot_key : felt, is_active : felt) -> ():
    end

    func set_spot_key_is_active(spot_key : felt, is_active : felt) -> ():
    end

    func add_future_key(
        spot_key : felt, future_key : felt, is_active : felt, expiry_timestamp : felt
    ) -> ():
    end

    func set_future_key_status(
        spot_key : felt, future_key : felt, new_future_key_status : FutureKeyStatus
    ) -> ():
    end

    func set_future_key_is_active(spot_key : felt, future_key : felt, new_is_active : felt) -> ():
    end

    func add_on_key(on_key : felt, is_active : felt) -> ():
    end

    func set_on_key_is_active(on_key : felt, is_active : felt) -> ():
    end
end
