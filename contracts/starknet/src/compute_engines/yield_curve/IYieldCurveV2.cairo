#[contract]
use array::ArrayTrait;
use option::OptionTrait;
use yield_curve::structs::YieldPoint;

trait IYieldCurve {
    //
    // Getters
    //

    fn get_yield_points(decimals: felt) -> (felt, Array::<YieldPoint>);
    //
    // Admin
    //

    //
    // Getters
    //

    fn get_admin_address() -> felt;
    fn get_oracle_address() -> felt;
    fn get_pair_id(idx: felt) -> felt;
    fn get_pair_id_is_active(pair_id: felt) -> felt;
    fn get_pair_ids() -> Array::<felt>;
    fn get_future_expiry_timestamp(pair_id: felt, idx: felt) -> felt;
    fn get_future_expiry_timestamps(pair_id: felt) -> Array::<felt>;
    fn get_on_key(idx: felt) -> felt;
    fn get_on_key_is_active(on_key: felt) -> felt;
    fn get_on_keys() -> Array::<felt>;
    fn get_future_expiry_timestamp_status(
        pair_id: felt, future_expiry_timestamp: felt
    ) -> FutureExpiryTimestampStatus;
    fn get_future_expiry_timestamp_is_active(pair_id: felt, future_expiry_timestamp: felt) -> felt;
    fn get_future_expiry_timestamp_expiry(pair_id: felt, future_expiry_timestamp: felt) -> felt;
    //
    // Setters
    //

    fn set_admin_address(new_address: felt);
    fn set_oracle_address(oracle_address: felt);
    fn add_pair_id(pair_id: felt, is_active: felt);
    fn set_pair_id_is_active(pair_id: felt, is_active: felt);
    fn add_future_expiry_timestamp(
        pair_id: felt, future_expiry_timestamp: felt, is_active: felt, expiry_timestamp: felt
    );
    fn set_future_expiry_timestamp_status(
        pair_id: felt,
        future_expiry_timestamp: felt,
        new_future_expiry_timestamp_status: FutureKeyStatus,
    );
    fn set_future_expiry_timestamp_is_active(
        pair_id: felt, future_expiry_timestamp: felt, new_is_active: felt
    );
    fn add_on_key(on_key: felt, is_active: felt);
    fn set_on_key_is_active(on_key: felt, is_active: felt);
}
