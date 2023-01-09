%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.bool import TRUE, FALSE
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.math import assert_nn
from starkware.cairo.common.math_cmp import is_le
from starkware.cairo.common.math import assert_le
from starkware.cairo.common.pow import pow
from starkware.starknet.common.syscalls import get_block_timestamp
from starkware.cairo.common.math import unsigned_div_rem

from admin.library import Admin

from entry.structs import FutureEntry, SpotEntry
from oracle.IOracle import IOracle
from compute_engines.yield_curve.structs import YieldPoint

//
// Consts
//

const ON_SOURCE_KEY = 20302;  // str_to_felt("ON")
const FUTURE_SPOT_SOURCE_KEY = 85027764198622664552632148;  // str_to_felt("FUTURE/SPOT")
const THEGRAPH_EMPIRIC_SOURCE_KEY = 6073180270134120520;  // str_to_felt("THEGRAPH")
const SECONDS_IN_YEAR = 31536000;  // 365 * 24 * 60 * 60
const DEFAULT_DECIMALS = 18;

//
// Structs
//

struct FutureKeyStatus {
    is_active: felt,
    expiry_timestamp: felt,
}

//
// Storage
//

@storage_var
func oracle_address_storage() -> (oracle_address: felt) {
}

@storage_var
func future_spot_empiric_source_key_storage() -> (future_spot_empiric_source_key: felt) {
}

@storage_var
func pair_id_len_storage() -> (pair_id_len: felt) {
}

@storage_var
func pair_id_storage(idx: felt) -> (pair_id: felt) {
}

@storage_var
func pair_id_is_active_storage(pair_id: felt) -> (pair_id_is_active: felt) {
}

@storage_var
func future_expiry_timestamp_len_storage(pair_id: felt) -> (future_expiry_timestamp_len: felt) {
}

@storage_var
func future_expiry_timestamp_storage(pair_id: felt, idx: felt) -> (future_expiry_timestamp: felt) {
}

@storage_var
func future_expiry_timestamp_status_storage(pair_id: felt, future_expiry_timestamp: felt) -> (
    future_expiry_timestamp_status: FutureKeyStatus
) {
}

@storage_var
func on_key_len_storage() -> (on_key_len: felt) {
}

@storage_var
func on_key_storage(idx: felt) -> (on_key: felt) {
}

@storage_var
func on_key_is_active_storage(on_key: felt) -> (on_key_is_active: felt) {
}

//
// Constructor
//

// @param admin_address: address of account with special privileges
// @param oracle_address: address from which to read input data
@constructor
func constructor{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    admin_address: felt, oracle_address: felt
) {
    Admin.initialize_admin_address(admin_address);
    oracle_address_storage.write(oracle_address);
    return ();
}

//
// Getters
//

// @notice get the yield curve points (x: time to maturity, y: interest rate)
// @return decimals: number of decimals for each yield curve point's int rate
// @return yield_points_len: length of yield points array
// @param yield_points: pointer to first YieldPoint in array
@view
func get_yield_points{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    decimals: felt
) -> (yield_points_len: felt, yield_points: YieldPoint*) {
    alloc_locals;

    let (yield_points_init: YieldPoint*) = alloc();

    let (oracle_address) = oracle_address_storage.read();

    // ON rate
    let (on_keys_len, on_keys) = get_on_keys();
    let (on_yield_points_len, on_yield_points) = YieldCurve.build_on_yield_points(
        decimals, oracle_address, yield_points_init, on_keys_len, on_keys, 0, 0
    );

    // Spot & Futures
    let (pair_ids_len, pair_ids) = get_pair_ids();
    let (future_spot_empiric_source_key) = future_spot_empiric_source_key_storage.read();
    let (yield_points_len, yield_points) = YieldCurve.build_future_spot_yield_points(
        decimals,
        oracle_address,
        future_spot_empiric_source_key,
        on_yield_points,
        pair_ids_len,
        pair_ids,
        on_yield_points_len,
        0,
    );

    return (yield_points_len, yield_points);
}

// @notice get address for admin
// @return admin_address: address of current admin
@view
func get_admin_address{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
    admin_address: felt
) {
    let (admin_address) = Admin.get_admin_address();
    return (admin_address,);
}

// @notice get address for oracle controller
// @return oracle_address: address for oracle controller
@view
func get_oracle_address{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
    oracle_address: felt
) {
    let (oracle_address) = oracle_address_storage.read();
    return (oracle_address,);
}

// @notice get the key/id of the source for which we get spot and futures data
// @return future_spot_empiric_source_key: Empiric key for the source used to bootstrap the yield curve
@view
func get_future_spot_empiric_source_key{
    syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}() -> (future_spot_empiric_source_key: felt) {
    let (future_spot_empiric_source_key) = future_spot_empiric_source_key_storage.read();
    return (future_spot_empiric_source_key,);
}

// @notice get the key of the asset for which we get spot data to compare to futures data
// @param idx: index of the pair_id
// @return pair_id: Empiric key for the spot asset used to bootstrap the yield curve
@view
func get_pair_id{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(idx: felt) -> (
    pair_id: felt
) {
    let (pair_id) = pair_id_storage.read(idx);
    return (pair_id,);
}

// @notice get the status of whether a spot key is used in the yield curve bootstrapping calculations
// @param pair_id: Empiric key for the asset to look up its status
// @return pair_id_is_active: boolean felt for whether the given spot key is active
@view
func get_pair_id_is_active{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    pair_id: felt
) -> (pair_id_is_active: felt) {
    let (pair_id_is_active) = pair_id_is_active_storage.read(pair_id);
    return (pair_id_is_active,);
}

// @notice get the key of the asset for which we get spot data to compare to futures data
// @return pair_ids_len: length of Empiric keys for the spot asset used to bootstrap the yield curve
// @return pair_ids: pointer to the first Empiric key
@view
func get_pair_ids{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
    pair_ids_len: felt, pair_ids: felt*
) {
    let (pair_ids) = alloc();
    let (total_pair_ids_len) = pair_id_len_storage.read();

    if (total_pair_ids_len == 0) {
        return (0, pair_ids);
    }

    let (pair_ids_len, pair_ids) = _build_pair_ids_array(total_pair_ids_len, pair_ids, 0, 0);

    return (pair_ids_len, pair_ids);
}

// @notice get the key of the asset for which we get spot data to compare to futures data
// @param pair_id: Empiric spot key for which this future key is a quarterly future
// @param idx: index of the future_expiry_timestamp
// @return future_expiry_timestamp: Empiric key for the future asset used to bootstrap the yield curve
@view
func get_future_expiry_timestamp{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    pair_id: felt, idx: felt
) -> (future_expiry_timestamp: felt) {
    let (future_expiry_timestamp) = future_expiry_timestamp_storage.read(pair_id, idx);
    return (future_expiry_timestamp,);
}

// @notice get the key of the asset for which we get spot data to compare to futures data
// @param pair_id: Empiric spot key for which this future key is a quarterly future
// @return future_expiry_timestamps_len: length of Empiric keys for the future assets used to bootstrap the yield curve
// @return future_expiry_timestamps: pointer to the first Empiric key
@view
func get_future_expiry_timestamps{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    pair_id: felt
) -> (future_expiry_timestamps_len: felt, future_expiry_timestamps: felt*) {
    let (future_expiry_timestamps) = alloc();

    let (total_future_expiry_timestamps_len) = future_expiry_timestamp_len_storage.read(pair_id);

    if (total_future_expiry_timestamps_len == 0) {
        return (0, future_expiry_timestamps);
    }

    let (
        future_expiry_timestamps_len, future_expiry_timestamps
    ) = _build_future_expiry_timestamps_array(
        pair_id, total_future_expiry_timestamps_len, future_expiry_timestamps, 0, 0
    );

    return (future_expiry_timestamps_len, future_expiry_timestamps);
}

// @notice get the key of the overnight interest rate
// @param idx: index of the overight rate key
// @return on_key: Empiric key for the overnight rate used to bootstrap the yield curve
@view
func get_on_key{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(idx: felt) -> (
    on_key: felt
) {
    let (on_key) = on_key_storage.read(idx);
    return (on_key,);
}

// @notice get the status of whether a overnight rate key is used in the yield curve bootstrapping calculations
// @param on_key: Empiric key for the overnight rate to look up its status
// @return on_key_is_active: boolean felt for whether the given key is active
@view
func get_on_key_is_active{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    on_key: felt
) -> (on_key_is_active: felt) {
    let (on_key_is_active) = on_key_is_active_storage.read(on_key);
    return (on_key_is_active,);
}

// @notice get all overnight keys used to bootstrap the yield curve
// @return on_keys_len: length of Empiric keys for the overnight rates used to bootstrap the yield curve
// @return on_keys: pointer to the first Empiric key
@view
func get_on_keys{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
    on_keys_len: felt, on_keys: felt*
) {
    let (on_keys) = alloc();
    let (total_on_keys_len) = on_key_len_storage.read();

    if (total_on_keys_len == 0) {
        return (0, on_keys);
    }

    let (on_keys_len, on_keys) = _build_on_keys_array(total_on_keys_len, on_keys, 0, 0);

    return (on_keys_len, on_keys);
}

// @notice get the status of whether a future key is used in the yield curve bootstrapping calculations
// @param pair_id: Empiric spot key for which this future key is a quarterly future
// @param future_expiry_timestamp: Empiric key for the asset to look up its status
// @return future_expiry_timestamp_status: struct describing the given future key's status
@view
func get_future_expiry_timestamp_status{
    syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(pair_id: felt, future_expiry_timestamp: felt) -> (
    future_expiry_timestamp_status: FutureKeyStatus
) {
    let (future_expiry_timestamp_status) = future_expiry_timestamp_status_storage.read(
        pair_id, future_expiry_timestamp
    );
    return (future_expiry_timestamp_status,);
}

// @notice get the status of whether a future key is used in the yield curve bootstrapping calculations
// @param pair_id: Empiric spot key for which this future key is a quarterly future
// @param future_expiry_timestamp: Empiric key for the asset to look up its status
// @return future_expiry_timestamp_is_active: whether the given future key is active
@view
func get_future_expiry_timestamp_is_active{
    syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(pair_id: felt, future_expiry_timestamp: felt) -> (future_expiry_timestamp_is_active: felt) {
    let (future_expiry_timestamp_status) = get_future_expiry_timestamp_status(
        pair_id, future_expiry_timestamp
    );
    let future_expiry_timestamp_is_active = future_expiry_timestamp_status.is_active;
    return (future_expiry_timestamp_is_active,);
}

// @notice get the expiry of a quarterly future used in the yield curve bootstrapping calculations
// @param pair_id: Empiric spot key for which this future key is a quarterly future
// @param future_expiry_timestamp: Empiric key for the asset to look up its status
// @return future_expiry_timestamp_status: expiry timestamp of the given future key
@view
func get_future_expiry_timestamp_expiry{
    syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(pair_id: felt, future_expiry_timestamp: felt) -> (future_expiry_timestamp_expiry: felt) {
    let (future_expiry_timestamp_status) = get_future_expiry_timestamp_status(
        pair_id, future_expiry_timestamp
    );
    let future_expiry_timestamp_expiry = future_expiry_timestamp_status.expiry_timestamp;
    return (future_expiry_timestamp_expiry,);
}

//
// Setters
//

// @notice update admin address
// @dev only the admin can set the new address
// @param new_address: new admin address
@external
func set_admin_address{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    new_address: felt
) {
    Admin.only_admin();
    Admin.set_admin_address(new_address);
    return ();
}

// @notice update oracle controller address
// @dev only the admin can update this
// @param oracle_address: new oracle controller address
@external
func set_oracle_address{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    oracle_address: felt
) -> () {
    Admin.only_admin();
    oracle_address_storage.write(oracle_address);
    return ();
}

// @notice set the source key for future and spot assets
// @dev only the admin can update this
// @param future_spot_empiric_source_key: new Empiric source key
@external
func set_future_spot_empiric_source_key{
    syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(future_spot_empiric_source_key: felt) -> () {
    Admin.only_admin();
    future_spot_empiric_source_key_storage.write(future_spot_empiric_source_key);
    return ();
}

// @notice add a new spot key to get data for bootstrapping the yield curve
// @dev only the admin can update this
// @param pair_id: new Empiric spot key
// @param is_active: whether the new key should be active immediately or not
@external
func add_pair_id{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    pair_id: felt, is_active: felt
) -> () {
    Admin.only_admin();
    let (pair_id_len) = pair_id_len_storage.read();
    pair_id_storage.write(pair_id_len, pair_id);
    pair_id_is_active_storage.write(pair_id, is_active);
    pair_id_len_storage.write(pair_id_len + 1);
    return ();
}

// @notice set the is_active status on a spot key
// @dev only the admin can update this
// @param pair_id: Empiric spot key
// @param pair_id: new status of the spot key
@external
func set_pair_id_is_active{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    pair_id: felt, is_active: felt
) -> () {
    Admin.only_admin();
    pair_id_is_active_storage.write(pair_id, is_active);
    return ();
}

// @notice add a new future key to get data for bootstrapping the yield curve
// @dev only the admin can update this
// @dev have to add the spot key first
// @param pair_id: Empiric spot key for which the future key is a quarterly future
// @param future_expiry_timestamp: new Empiric future key
// @param is_active: status of the new future key
// @param expiry_timestamp: expiry timestamp of the new future (used to calculate time to maturity)
@external
func add_future_expiry_timestamp{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    pair_id: felt, future_expiry_timestamp: felt, is_active: felt, expiry_timestamp: felt
) -> () {
    Admin.only_admin();

    let (future_expiry_timestamp_len) = future_expiry_timestamp_len_storage.read(pair_id);
    future_expiry_timestamp_storage.write(
        pair_id, future_expiry_timestamp_len, future_expiry_timestamp
    );
    let future_expiry_timestamp_status = FutureKeyStatus(is_active, expiry_timestamp);
    future_expiry_timestamp_status_storage.write(
        pair_id, future_expiry_timestamp, future_expiry_timestamp_status
    );
    future_expiry_timestamp_len_storage.write(pair_id, future_expiry_timestamp_len + 1);
    return ();
}

// @notice set the status on a future key
// @dev only the admin can update this
// @param pair_id: Empiric spot key
// @param future_expiry_timestamp: Empiric future key
// @param new_future_expiry_timestamp_status: new status for the future key
@external
func set_future_expiry_timestamp_status{
    syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(
    pair_id: felt,
    future_expiry_timestamp: felt,
    new_future_expiry_timestamp_status: FutureKeyStatus,
) -> () {
    Admin.only_admin();

    future_expiry_timestamp_status_storage.write(
        pair_id, future_expiry_timestamp, new_future_expiry_timestamp_status
    );
    return ();
}

// @notice set the is_active status on a future key
// @dev only the admin can update this
// @param pair_id: Empiric spot key
// @param future_expiry_timestamp: Empiric future key
// @param new_is_active: new is_active of the future key
@external
func set_future_expiry_timestamp_is_active{
    syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(pair_id: felt, future_expiry_timestamp: felt, new_is_active: felt) -> () {
    Admin.only_admin();

    let (old_expiry) = get_future_expiry_timestamp_expiry(pair_id, future_expiry_timestamp);
    let new_future_expiry_timestamp_status = FutureKeyStatus(new_is_active, old_expiry);
    set_future_expiry_timestamp_status(
        pair_id, future_expiry_timestamp, new_future_expiry_timestamp_status
    );

    return ();
}

// @notice add a new overnight rate key
// @dev only the admin can update this
// @param on_key: Empiric overnight rate key
// @param is_active: whether the new key should be active immediately or not
@external
func add_on_key{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    on_key: felt, is_active: felt
) -> () {
    Admin.only_admin();
    let (on_key_len) = on_key_len_storage.read();
    on_key_storage.write(on_key_len, on_key);
    on_key_is_active_storage.write(on_key, is_active);
    on_key_len_storage.write(on_key_len + 1);
    return ();
}

// @notice set the is_active status on a overnight key
// @dev only the admin can update this
// @param on_key: Empiric overnight rate key
// @param is_active: new is_active of the overnight rate key
@external
func set_on_key_is_active{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    on_key: felt, is_active: felt
) -> () {
    Admin.only_admin();
    on_key_is_active_storage.write(on_key, is_active);
    return ();
}

//
// Helpers
//

// @notice create an array of all spot keys from storage
// @dev recursive function, set all indices to 0 for external call
// @param pair_ids_len: number of spot keys to iterate over
// @param pair_ids: pointer to the first pair_id
// @param output_idx: offset index in output array (write to array, starts at pair_ids pointer)
// @param storage_idx: index for pair_id in storage (read from array)
// @return pair_ids_len: length of the pair_ids array
// @return pair_ids: pointer to the first pair_id
func _build_pair_ids_array{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    pair_ids_len: felt, pair_ids: felt*, output_idx: felt, storage_idx: felt
) -> (pair_ids_len: felt, pair_ids: felt*) {
    if (storage_idx == pair_ids_len) {
        return (output_idx, pair_ids);
    }

    let (pair_id) = get_pair_id(storage_idx);
    let (pair_id_is_active) = get_pair_id_is_active(pair_id);
    if (pair_id_is_active == TRUE) {
        assert pair_ids[output_idx] = pair_id;
        let (recursed_pair_ids_len, recursed_pair_ids) = _build_pair_ids_array(
            pair_ids_len, pair_ids, output_idx + 1, storage_idx + 1
        );
        return (recursed_pair_ids_len, recursed_pair_ids);
    } else {
        let (recursed_pair_ids_len, recursed_pair_ids) = _build_pair_ids_array(
            pair_ids_len, pair_ids, output_idx, storage_idx + 1
        );
        return (recursed_pair_ids_len, recursed_pair_ids);
    }
}

// @notice create an array of the future keys for a given spot key from storage
// @dev recursive function, set all indices to 0 for external call
// @param pair_id: pair_id for which the future_expiry_timestamps array should be constructed
// @param future_expiry_timestamps_len: number of spot keys to iterate over
// @param future_expiry_timestamps: pointer to the first future_expiry_timestamp
// @param output_idx: offset index in output array (write to array, starts at future_expiry_timestamps pointer)
// @param storage_idx: index for future_expiry_timestamp in storage (read from array)
// @return future_expiry_timestamps_len: length of the future_expiry_timestamps array
// @return future_expiry_timestamps: pointer to the first future_expiry_timestamp
func _build_future_expiry_timestamps_array{
    syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(
    pair_id: felt,
    future_expiry_timestamps_len: felt,
    future_expiry_timestamps: felt*,
    output_idx: felt,
    storage_idx: felt,
) -> (future_expiry_timestamps_len: felt, future_expiry_timestamps: felt*) {
    if (storage_idx == future_expiry_timestamps_len) {
        return (output_idx, future_expiry_timestamps);
    }

    let (future_expiry_timestamp) = get_future_expiry_timestamp(pair_id, storage_idx);
    let (future_expiry_timestamp_is_active) = get_future_expiry_timestamp_is_active(
        pair_id, future_expiry_timestamp
    );
    if (future_expiry_timestamp_is_active == TRUE) {
        assert future_expiry_timestamps[output_idx] = future_expiry_timestamp;
        let (
            recursed_future_expiry_timestamps_len, recursed_future_expiry_timestamps
        ) = _build_future_expiry_timestamps_array(
            pair_id,
            future_expiry_timestamps_len,
            future_expiry_timestamps,
            output_idx + 1,
            storage_idx + 1,
        );
        return (recursed_future_expiry_timestamps_len, recursed_future_expiry_timestamps);
    } else {
        let (
            recursed_future_expiry_timestamps_len, recursed_future_expiry_timestamps
        ) = _build_future_expiry_timestamps_array(
            pair_id,
            future_expiry_timestamps_len,
            future_expiry_timestamps,
            output_idx,
            storage_idx + 1,
        );
        return (recursed_future_expiry_timestamps_len, recursed_future_expiry_timestamps);
    }
}

// @notice create an array of all overnight rate keys from storage
// @dev recursive function, set all indices to 0 for external call
// @param on_keys_len: number of spot keys to iterate over
// @param on_keys: pointer to the first on_key
// @param output_idx: offset index in output array (write to array, starts at on_keys pointer)
// @param storage_idx: index for on_key in storage (read from array)
// @return on_keys_len: length of the on_keys array
// @return on_keys: pointer to the first on_key
func _build_on_keys_array{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    on_keys_len: felt, on_keys: felt*, output_idx: felt, storage_idx: felt
) -> (on_keys_len: felt, on_keys: felt*) {
    if (storage_idx == on_keys_len) {
        return (output_idx, on_keys);
    }

    let (on_key) = get_on_key(storage_idx);
    let (on_key_is_active) = get_on_key_is_active(on_key);
    if (on_key_is_active == TRUE) {
        assert on_keys[output_idx] = on_key;
        let (recursed_on_keys_len, recursed_on_keys) = _build_on_keys_array(
            on_keys_len, on_keys, output_idx + 1, storage_idx + 1
        );
        return (recursed_on_keys_len, recursed_on_keys);
    } else {
        let (recursed_on_keys_len, recursed_on_keys) = _build_on_keys_array(
            on_keys_len, on_keys, output_idx, storage_idx + 1
        );
        return (recursed_on_keys_len, recursed_on_keys);
    }
}

//
// Library
//

namespace YieldCurve {
    // @notice build the subset of yield points based on overnight rate calculations
    // @dev recursive function, set all indices to 0 for external call (except yield_points idx)
    // @param output_decimals: number of decimals to use for output
    // @param oracle_address: address from which to read overnight dataa
    // @param yield_points: pointer to first element in yield_points array to append to
    // @param on_keys_len: number of on keys to iterate over
    // @param on_keys: pointer to the first on_key
    // @param yield_points_idx: index for current yield_point in yield_points array
    // @param on_keys_idx: index for on_key in on_keys array
    // @return on_yield_points_len: number of overnight yield points in the array
    // @return on_yield_points: pointer to the first overnight yield point
    func build_on_yield_points{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        output_decimals: felt,
        oracle_address: felt,
        yield_points: YieldPoint*,
        on_keys_len: felt,
        on_keys: felt*,
        yield_points_idx: felt,
        on_keys_idx: felt,
    ) -> (on_yield_points_len: felt, on_yield_points: YieldPoint*) {
        alloc_locals;

        if (on_keys_idx == on_keys_len) {
            return (yield_points_idx, yield_points);
        }
        let on_key = on_keys[on_keys_idx];
        let (is_active) = get_on_key_is_active(on_key);
        if (is_active == FALSE) {
            let (recursed_on_yield_points_len, recursed_on_yield_points) = build_on_yield_points(
                output_decimals,
                oracle_address,
                yield_points,
                on_keys_len,
                on_keys,
                yield_points_idx,
                on_keys_idx + 1,
            );

            return (recursed_on_yield_points_len, recursed_on_yield_points);
        }

        let (value, decimals, last_updated_timestamp, _) = IOracle.get_value(
            oracle_address, on_key
        );

        if (last_updated_timestamp == 0) {
            // No data so skip to next one
            let (recursed_on_yield_points_len, recursed_on_yield_points) = build_on_yield_points(
                output_decimals,
                oracle_address,
                yield_points,
                on_keys_len,
                on_keys,
                yield_points_idx,
                on_keys_idx + 1,
            );

            return (recursed_on_yield_points_len, recursed_on_yield_points);
        } else {
            let (shifted_on_value) = change_decimals(value, decimals, output_decimals);

            // Add to on_yield_points and recurse
            // Set expiry to be same as capture timestamp
            assert yield_points[yield_points_idx] = YieldPoint(
                expiry_timestamp=last_updated_timestamp,
                capture_timestamp=last_updated_timestamp,
                rate=shifted_on_value,
                source=ON_SOURCE_KEY,
            );

            let (recursed_on_yield_points_len, recursed_on_yield_points) = build_on_yield_points(
                output_decimals,
                oracle_address,
                yield_points,
                on_keys_len,
                on_keys,
                yield_points_idx + 1,
                on_keys_idx + 1,
            );

            return (recursed_on_yield_points_len, recursed_on_yield_points);
        }
    }

    // @notice build the subset of yield points based on future and spot price calculations
    // @dev recursive function, set all indices to 0 for external call (except yield_points idx)
    // @param output_decimals: number of decimals to use for output
    // @param oracle_address: address from which to read overnight dataa
    // @param yield_points: pointer to first element in yield_points array to append to
    // @param pair_ids_len: number of spot keys to iterate over
    // @param pair_ids: pointer to the first pair_id
    // @param yield_points_idx: index for current yield_point in yield_points array
    // @param pair_ids_idx: index for pair_id in pair_ids array
    // @return yield_points_len: number of yield points in the array
    // @return yield_points: pointer to the first yield point
    func build_future_spot_yield_points{
        syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
    }(
        output_decimals: felt,
        oracle_address: felt,
        future_spot_empiric_source_key: felt,
        yield_points: YieldPoint*,
        pair_ids_len: felt,
        pair_ids: felt*,
        yield_points_idx: felt,
        pair_ids_idx: felt,
    ) -> (yield_points_len: felt, yield_points: YieldPoint*) {
        alloc_locals;

        if (pair_ids_idx == pair_ids_len) {
            return (yield_points_idx, yield_points);
        }
        let pair_id = pair_ids[pair_ids_idx];
        let (is_active) = get_pair_id_is_active(pair_id);

        if (is_active == FALSE) {
            let (
                recursed_spot_yield_points_len, recursed_spot_yield_points
            ) = build_future_spot_yield_points(
                output_decimals,
                oracle_address,
                future_spot_empiric_source_key,
                yield_points,
                pair_ids_len,
                pair_ids,
                yield_points_idx,
                pair_ids_idx + 1,
            );

            return (recursed_spot_yield_points_len, recursed_spot_yield_points);
        }

        let (spot_decimals) = IOracle.get_spot_decimals(oracle_address, pair_id);
        let (spot_entry) = IOracle.get_spot_entry(
            oracle_address, pair_id, future_spot_empiric_source_key
        );
        if (spot_entry.base.timestamp == 0) {
            // No entry so skip to next one
            let (
                recursed_spot_yield_points_len, recursed_spot_yield_points
            ) = build_future_spot_yield_points(
                output_decimals,
                oracle_address,
                future_spot_empiric_source_key,
                yield_points,
                pair_ids_len,
                pair_ids,
                yield_points_idx,
                pair_ids_idx + 1,
            );

            return (recursed_spot_yield_points_len, recursed_spot_yield_points);
        } else {
            // Get all futures, and for each, calculate yield point
            let (
                future_expiry_timestamps_len, future_expiry_timestamps
            ) = get_future_expiry_timestamps(pair_id);

            let (future_yield_points_len, future_yield_points) = build_future_yield_points(
                output_decimals,
                oracle_address,
                future_spot_empiric_source_key,
                yield_points,
                future_expiry_timestamps_len,
                future_expiry_timestamps,
                yield_points_idx,
                0,
                spot_entry,
                spot_decimals,
            );

            let (
                recursed_spot_yield_points_len, recursed_spot_yield_points
            ) = build_future_spot_yield_points(
                output_decimals,
                oracle_address,
                future_spot_empiric_source_key,
                future_yield_points,
                pair_ids_len,
                pair_ids,
                future_yield_points_len,
                pair_ids_idx + 1,
            );

            return (recursed_spot_yield_points_len, recursed_spot_yield_points);
        }
    }

    // @notice for a given spot key, build the subset of yield points based on the corresponding future keys
    // @dev recursive function, set all indices to 0 for external call (except yield_points idx)
    // @param output_decimals: number of decimals to use for output
    // @param oracle_address: address from which to read overnight dataa
    // @param future_spot_empiric_source_key: source key for future and spot data
    // @param yield_points: pointer to first element in yield_points array to append to
    // @param future_expiry_timestamps_len: number of future keys to iterate over
    // @param future_expiry_timestamps: pointer to the first future_expiry_timestamp
    // @param yield_points_idx: index for current yield_point in yield_points array
    // @param future_expiry_timestamps_idx: index for future_expiry_timestamp in future_expiry_timestamps array
    // @param spot_entry: the most recent spot price datapoint
    // @param spot_decimals: number of decimals used in the spot_entry
    // @return yield_points_len: number of yield points in the array
    // @return yield_points: pointer to the first yield point
    func build_future_yield_points{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        output_decimals: felt,
        oracle_address: felt,
        future_spot_empiric_source_key: felt,
        yield_points: YieldPoint*,
        future_expiry_timestamps_len: felt,
        future_expiry_timestamps: felt*,
        yield_points_idx: felt,
        future_expiry_timestamps_idx: felt,
        spot_entry: SpotEntry,
        spot_decimals: felt,
    ) -> (yield_points_len: felt, yield_points: YieldPoint*) {
        alloc_locals;

        if (future_expiry_timestamps_idx == future_expiry_timestamps_len) {
            return (yield_points_idx, yield_points);
        }

        // Check that future key is active
        let future_expiry_timestamp = future_expiry_timestamps[future_expiry_timestamps_idx];
        let (future_expiry_timestamp_status) = get_future_expiry_timestamp_status(
            spot_entry.pair_id, future_expiry_timestamp
        );

        if (future_expiry_timestamp_status.is_active == FALSE) {
            let (
                recursed_future_yield_points_len, recursed_future_yield_points
            ) = build_future_yield_points(
                output_decimals,
                oracle_address,
                future_spot_empiric_source_key,
                yield_points,
                future_expiry_timestamps_len,
                future_expiry_timestamps,
                yield_points_idx,
                future_expiry_timestamps_idx + 1,
                spot_entry,
                spot_decimals,
            );

            return (recursed_future_yield_points_len, recursed_future_yield_points);
        }

        let (future_decimals_) = IOracle.get_spot_decimals(oracle_address, future_expiry_timestamp);

        local future_decimals;
        if (future_decimals_ == 0) {
            future_decimals = DEFAULT_DECIMALS;
        } else {
            future_decimals = future_decimals_;
        }

        let (future_entry) = IOracle.get_future_entry(
            oracle_address,
            spot_entry.pair_id,
            future_expiry_timestamps[future_expiry_timestamps_idx],
            future_spot_empiric_source_key,
        );
        if (future_entry.base.timestamp == 0) {
            let (
                recursed_future_yield_points_len, recursed_future_yield_points
            ) = build_future_yield_points(
                output_decimals,
                oracle_address,
                future_spot_empiric_source_key,
                yield_points,
                future_expiry_timestamps_len,
                future_expiry_timestamps,
                yield_points_idx,
                future_expiry_timestamps_idx + 1,
                spot_entry,
                spot_decimals,
            );

            return (recursed_future_yield_points_len, recursed_future_yield_points);
        }
        // TODO: Replace with
        // is_not_zero(future_entry.base.timestamp - spot_entry.base.timestamp) == FALSE
        let is_future_more_recent = is_le(spot_entry.base.timestamp, future_entry.base.timestamp);
        const TIME_TOLERANCE = 10;
        if (is_future_more_recent == TRUE) {
            let are_future_spot_simultaneous = is_le(
                future_entry.base.timestamp - spot_entry.base.timestamp, TIME_TOLERANCE
            );
        } else {
            let are_future_spot_simultaneous = is_le(
                spot_entry.base.timestamp - future_entry.base.timestamp, TIME_TOLERANCE
            );
        }
        if (are_future_spot_simultaneous == FALSE) {
            let (
                recursed_future_yield_points_len, recursed_future_yield_points
            ) = build_future_yield_points(
                output_decimals,
                oracle_address,
                future_spot_empiric_source_key,
                yield_points,
                future_expiry_timestamps_len,
                future_expiry_timestamps,
                yield_points_idx,
                future_expiry_timestamps_idx + 1,
                spot_entry,
                spot_decimals,
            );

            return (recursed_future_yield_points_len, recursed_future_yield_points);
        }

        let (yield_point) = calculate_future_spot_yield_point(
            future_entry,
            future_expiry_timestamp_status.expiry_timestamp,
            spot_entry,
            spot_decimals,
            future_decimals,
            output_decimals,
        );

        assert yield_points[yield_points_idx] = yield_point;

        let (
            recursed_future_yield_points_len, recursed_future_yield_points
        ) = build_future_yield_points(
            output_decimals,
            oracle_address,
            future_spot_empiric_source_key,
            yield_points,
            future_expiry_timestamps_len,
            future_expiry_timestamps,
            yield_points_idx + 1,
            future_expiry_timestamps_idx + 1,
            spot_entry,
            spot_decimals,
        );

        return (recursed_future_yield_points_len, recursed_future_yield_points);
    }

    // @notice given a future and spot entry, calculate the yield point
    // @param future_entry: the most recent future price datapoint
    // @param future_expiry_timestamp: timestamp of future maturity
    // @param spot_entry: the most recent spot price datapoint
    // @param spot_decimals: number of decimals used in the spot_entry
    // @param future_decimals: number of decimals used in the future_entry
    // @param output_decimals: number of decimals to be used in the output
    // @return yield_point: the resulting yield point
    func calculate_future_spot_yield_point{
        syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
    }(
        future_entry: FutureEntry,
        future_expiry_timestamp: felt,
        spot_entry: SpotEntry,
        spot_decimals: felt,
        future_decimals: felt,
        output_decimals: felt,
    ) -> (yield_point: YieldPoint) {
        alloc_locals;
        let is_backwardation = is_le(future_entry.price, spot_entry.price);

        if (is_backwardation == TRUE) {
            tempvar time_scaled_value = 0;
            tempvar syscall_ptr = syscall_ptr;
        } else {
            let (current_timestamp) = get_block_timestamp();
            with_attr error_message("YieldCurve: expiry timestamp for future is in the past") {
                let is_future_expired = is_le(future_expiry_timestamp, current_timestamp);
                assert is_future_expired = FALSE;
            }

            let seconds_to_expiry = future_expiry_timestamp - current_timestamp;

            let (decimals_multiplier) = pow(10, output_decimals);
            let (time_multiplier, r) = unsigned_div_rem(
                SECONDS_IN_YEAR * decimals_multiplier, seconds_to_expiry
            );
            let should_shift_net_left = is_le(future_decimals, output_decimals + spot_decimals);

            // log of big prime is 75.5. making sure ratio multiplier is within bounds.
            let exponent_limit = 75;
            if (should_shift_net_left == TRUE) {
                // Shift future/spot to the left by output_decimals + spot_decimals - future_decimals
                let exponent = output_decimals + spot_decimals - future_decimals;
                with_attr error_message("YieldCurve: Decimals out of range") {
                    assert_le(exponent, exponent_limit);
                }
                let (ratio_multiplier) = pow(10, exponent);
                let (shifted_ratio, _) = unsigned_div_rem(
                    future_entry.price * ratio_multiplier, spot_entry.price
                );
            } else {
                // Shift future/spot to the right by -1 * (output_decimals + spot_decimals - future_decimals)
                let exponent = future_decimals - output_decimals - spot_decimals;
                with_attr error_message("YieldCurve: Decimals out of range") {
                    assert_le(exponent, exponent_limit);
                }
                let (ratio_multiplier) = pow(10, exponent);
                let (shifted_ratio, _) = unsigned_div_rem(
                    future_entry.price, spot_entry.price * ratio_multiplier
                );
            }

            let interest_ratio = shifted_ratio - decimals_multiplier;
            let (local time_scaled_value, _) = unsigned_div_rem(
                interest_ratio * time_multiplier, decimals_multiplier
            );

            tempvar time_scaled_value = time_scaled_value;
            tempvar syscall_ptr = syscall_ptr;
        }

        let yield_point = YieldPoint(
            expiry_timestamp=future_expiry_timestamp,
            capture_timestamp=future_entry.base.timestamp,
            rate=time_scaled_value,
            source=FUTURE_SPOT_SOURCE_KEY,
        );
        return (yield_point,);
    }

    // @notice shift a value from old number of decimals to the new number
    // @param value: the value to be shifted
    // @param old_decimals: the number of decimals value is currently shifted by
    // @param new_decimals: the number of decimals we want value shifted by
    // @return shifted_value: the value shifted by new_decimals from base
    func change_decimals{range_check_ptr}(value: felt, old_decimals: felt, new_decimals: felt) -> (
        shifted_value: felt
    ) {
        let should_increase_decimals = is_le(old_decimals, new_decimals);
        if (should_increase_decimals == TRUE) {
            // Multiply on_entry by 10 ^ (new_decimals - old_decimals)
            // which is guaranteed to be an integer > 0 by the if statement
            let (shift_by) = pow(10, new_decimals - old_decimals);
            let shifted_value = value * shift_by;
            return (shifted_value,);
        } else {
            // Divide on_entry by 10 ^ (old_decimals - new_decimals)
            // Doing the same operation as in the last branch, so
            // changed both multiplication/division and sign of the exponent
            let (shift_by) = pow(10, old_decimals - new_decimals);
            let (shifted_value, r) = unsigned_div_rem(value, shift_by);
            return (shifted_value,);
        }
    }
}
