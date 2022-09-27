%lang starknet

from compute_engines.yield_curve.structs import YieldPoint

@contract_interface
namespace IYieldCurve {
    //
    // Getters
    //

    func get_yield_points(decimals: felt) -> (yield_points_len: felt, yield_points: YieldPoint*) {
    }

    //
    // Admin
    //

    //
    // Getters
    //

    func get_admin_address() -> (admin_address: felt) {
    }

    func get_oracle_address() -> (oracle_address: felt) {
    }

    func get_spot_key(idx: felt) -> (spot_key: felt) {
    }

    func get_spot_key_is_active(spot_key: felt) -> (spot_key_is_active: felt) {
    }

    func get_spot_keys() -> (spot_keys_len: felt, spot_keys: felt*) {
    }

    func get_future_key(spot_key: felt, idx: felt) -> (future_key: felt) {
    }

    func get_future_keys(spot_key: felt) -> (future_keys_len: felt, future_keys: felt*) {
    }

    func get_on_key(idx: felt) -> (on_key: felt) {
    }

    func get_on_key_is_active(on_key: felt) -> (on_key_is_active: felt) {
    }

    func get_on_keys() -> (on_keys_len: felt, on_keys: felt*) {
    }

    func get_future_key_status(spot_key: felt, future_key: felt) -> (
        future_key_status: FutureKeyStatus
    ) {
    }

    func get_future_key_is_active(spot_key: felt, future_key: felt) -> (
        future_key_is_active: felt
    ) {
    }

    func get_future_key_expiry(spot_key: felt, future_key: felt) -> (future_key_expiry: felt) {
    }

    //
    // Setters
    //

    func set_admin_address(new_address: felt) {
    }

    func set_oracle_address(oracle_address: felt) {
    }

    func add_spot_key(spot_key: felt, is_active: felt) {
    }

    func set_spot_key_is_active(spot_key: felt, is_active: felt) {
    }

    func add_future_key(spot_key: felt, future_key: felt, is_active: felt, expiry_timestamp: felt) {
    }

    func set_future_key_status(
        spot_key: felt, future_key: felt, new_future_key_status: FutureKeyStatus
    ) {
    }

    func set_future_key_is_active(spot_key: felt, future_key: felt, new_is_active: felt) {
    }

    func add_on_key(on_key: felt, is_active: felt) {
    }

    func set_on_key_is_active(on_key: felt, is_active: felt) {
    }
}
