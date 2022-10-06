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

    func get_pair_id(idx: felt) -> (pair_id: felt) {
    }

    func get_pair_id_is_active(pair_id: felt) -> (pair_id_is_active: felt) {
    }

    func get_pair_ids() -> (pair_ids_len: felt, pair_ids: felt*) {
    }

    func get_future_expiry_timestamp(pair_id: felt, idx: felt) -> (future_expiry_timestamp: felt) {
    }

    func get_future_expiry_timestamps(pair_id: felt) -> (
        get_future_expiry_timestamps_len: felt, get_future_expiry_timestamps: felt*
    ) {
    }

    func get_on_key(idx: felt) -> (on_key: felt) {
    }

    func get_on_key_is_active(on_key: felt) -> (on_key_is_active: felt) {
    }

    func get_on_keys() -> (on_keys_len: felt, on_keys: felt*) {
    }

    func get_future_expiry_timestamp_status(pair_id: felt, future_expiry_timestamp: felt) -> (
        future_expiry_timestamp_status: FutureExpiryTimestampStatus
    ) {
    }

    func get_future_expiry_timestamp_is_active(pair_id: felt, future_expiry_timestamp: felt) -> (
        future_expiry_timestamp_is_active: felt
    ) {
    }

    func get_future_expiry_timestamp_expiry(pair_id: felt, future_expiry_timestamp: felt) -> (
        future_expiry_timestamp_expiry: felt
    ) {
    }

    //
    // Setters
    //

    func set_admin_address(new_address: felt) {
    }

    func set_oracle_address(oracle_address: felt) {
    }

    func add_pair_id(pair_id: felt, is_active: felt) {
    }

    func set_pair_id_is_active(pair_id: felt, is_active: felt) {
    }

    func add_future_expiry_timestamp(
        pair_id: felt, future_expiry_timestamp: felt, is_active: felt, expiry_timestamp: felt
    ) {
    }

    func set_future_expiry_timestamp_status(
        pair_id: felt,
        future_expiry_timestamp: felt,
        new_future_expiry_timestamp_status: FutureKeyStatus,
    ) {
    }

    func set_future_expiry_timestamp_is_active(
        pair_id: felt, future_expiry_timestamp: felt, new_is_active: felt
    ) {
    }

    func add_on_key(on_key: felt, is_active: felt) {
    }

    func set_on_key_is_active(on_key: felt, is_active: felt) {
    }
}
