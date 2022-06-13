%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.bool import TRUE, FALSE
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.math_cmp import is_le
from starkware.cairo.common.pow import pow
from starkware.starknet.common.syscalls import get_block_timestamp
from starkware.cairo.common.math import unsigned_div_rem

from contracts.admin.library import (
    Admin_initialize_admin_address, Admin_get_admin_address, Admin_set_admin_address,
    Admin_only_admin)
from contracts.oracle_controller.IOracleController import IOracleController

const DEFAULT_AGGREGATION_MODE = 0  # median
const ON_SOURCE_KEY = 28526
const FUTURE_SPOT_SOURCE_KEY = 123865098764438378875219828

#
# Structs
#
struct FutureKeyStatus:
    member is_active : felt  #boolean if included expiry in structure
    member expiry_timestamp : felt 
end

struct YieldPoint:
    member capture_timestamp : felt  # timestamp of data capture
    member expiry_timestamp : felt  # timestamp of expiry of the instrument
    # (1 day for overnight rates and expiration date for futures)
    member rate : felt  # The calculated yield rate: either overnight rate
    member source : felt  # An indicator for the source (str_to_felt encode lowercase one of:
    # "on" (overnight rate aave),
    # "fut/spot" (deribit future/sport rate),
    # "other" (for future additional data sources))
end

#
# Storage
#
@storage_var
func oracle_controller_address_storage() -> (oracle_controller_address : felt):
end

@storage_var
func spot_key_len_storage() -> (spot_key_len : felt):
end

@storage_var
func spot_key_storage(idx : felt) -> (spot_key : felt):
end

@storage_var
func spot_key_status_storage(spot_key : felt) -> (spot_key_is_active : felt):
end

@storage_var
func future_key_len_storage(spot_key : felt) -> (future_key_len : felt):
end

@storage_var
func future_key_storage(spot_key : felt, idx : felt) -> (future_key : felt):
end

@storage_var
func future_key_status_storage(spot_key : felt, future_key : felt) -> (future_key_status : FutureKeyStatus):
end

@storage_var
func on_key_len_storage() -> (spot_key_len : felt):
end

@storage_var
func on_key_storage(idx : felt) -> (on_key : felt):
end

@storage_var
func on_key_status_storage(on_key : felt) -> (on_key_is_active : felt):
end

#
# Constructor
#

@constructor
func constructor{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        admin_address : felt, oracle_controller_address : felt):
    Admin_initialize_admin_address(admin_address)
    oracle_controller_address_storage.write(oracle_controller_address)
    return ()
end

#
# Getters
#

@view
func get_yield_points{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        decimals : felt) -> (yield_points_len : felt, yield_points : YieldPoint*):
    alloc_locals

    let (yield_points : YieldPoint*) = alloc()

    let (oracle_controller_address) = oracle_controller_address_storage.read()

    # ON rate
    let (on_keys_len, on_keys) = get_on_keys()
    let (on_yield_points_len, on_yield_points) = _build_on_yield_points(
        decimals, oracle_controller_address, yield_points, on_keys_len, on_keys, 0, 0)

    # Spot & Futures
    # For each spot key
    #   for each future key
    #   Calculate max(0, ((fut/spot) - 1) * (365/days to fut expiry))
    #   Add that
    #   TODO: How to get days to fut expiry
    # For on, simply get rate and timestamp from oracle
    #   assume expiry is 24*60*60 (1 day) ahead of capture
    return (on_yield_points_len, on_yield_points)
end

func _build_on_yield_points{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        output_decimals : felt, oracle_controller_address : felt, yield_points : YieldPoint*,
        on_keys_len : felt, on_keys : felt*, yield_points_idx : felt, on_keys_idx : felt) -> (
        on_yield_points_len : felt, on_yield_points : YieldPoint*):
    alloc_locals

    if on_keys_idx == on_keys_len:
        return (yield_points_idx, yield_points)
    end
    let on_key = [on_keys + on_keys_idx]
    let (on_decimals) = IOracleController.get_decimals(oracle_controller_address, on_key)
    let on_entry = IOracleController.get_value(
        oracle_controller_address, on_key, DEFAULT_AGGREGATION_MODE)
    if on_entry.last_updated_timestamp == 0:
        # Entry was empty to skip to next one
        let (recursed_on_yield_points_len, recursed_on_yield_points) = _build_on_yield_points(
            output_decimals,
            oracle_controller_address,
            yield_points,
            on_keys_len,
            on_keys,
            yield_points_idx,
            on_keys_idx + 1)

        return (recursed_on_yield_points_len, recursed_on_yield_points)
    else:
        let (shifted_on_value) = change_decimals(on_entry.value, on_decimals, output_decimals)

        # Add to on_yield_points and recurse
        # Assume expiry is 24 hours into the future
        let expiry_timestamp = on_entry.last_updated_timestamp + 1 * 24 * 60 * 60 
        assert [yield_points + yield_points_idx * YieldPoint.SIZE] = YieldPoint(on_entry.last_updated_timestamp, expiry_timestamp, shifted_on_value, ON_SOURCE_KEY)

        let (recursed_on_yield_points_len, recursed_on_yield_points) = _build_on_yield_points(
            output_decimals,
            oracle_controller_address,
            yield_points,
            on_keys_len,
            on_keys,
            yield_points_idx + 1,
            on_keys_idx + 1)

        return (recursed_on_yield_points_len, recursed_on_yield_points)
    end
end

func change_decimals{range_check_ptr}(value : felt, old_decimals : felt, new_decimals : felt) -> (
        shifted_value : felt):
    let (should_increase_decimals) = is_le(old_decimals, new_decimals)
    if should_increase_decimals == TRUE:
        # Multiply on_entry by 10 ^ (new_decimals - old_decimals)
        # which is guaranteed to be an integer > 0 by the if statement
        let (shift_by) = pow(10, new_decimals - old_decimals)
        let shifted_value = value * shift_by
        return (shifted_value)
    else:
        # Divide on_entry by 10 ^ (old_decimals - new_decimals)
        # Doing the same operation as in the last branch, so
        # changed both multiplication/division and sign of the exponent
        let (shift_by) = pow(10, old_decimals - new_decimals)
        let (shifted_value, r) = unsigned_div_rem(value, shift_by)
        return (shifted_value)
    end
end

@view
func get_admin_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
        admin_address : felt):
    let (admin_address) = Admin_get_admin_address()
    return (admin_address)
end

@view
func get_oracle_controller_address{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
        oracle_controller_address : felt):
    let (oracle_controller_address) = oracle_controller_address_storage.read()
    return (oracle_controller_address)
end

@view
func get_spot_key{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        idx : felt) -> (spot_key : felt):
    let (spot_key) = spot_key_storage.read(idx)
    return (spot_key)
end

@view
func get_spot_key_is_active{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        spot_key : felt) -> (spot_key_is_active : felt):
    let (spot_key_is_active) = spot_key_status_storage.read(spot_key)
    return (spot_key_is_active)
end

@view
func get_spot_keys{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
        spot_keys_len : felt, spot_keys : felt*):
    let (spot_keys) = alloc()

    let (total_spot_keys_len) = spot_key_len_storage.read()

    if total_spot_keys_len == 0:
        return (0, spot_keys)
    end

    let (spot_keys_len, spot_keys) = _build_spot_keys_array(total_spot_keys_len, spot_keys, 0, 0)

    return (spot_keys_len, spot_keys)
end

@view
func get_future_key{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        spot_key : felt, idx : felt) -> (future_key : felt):
    let (future_key) = future_key_storage.read(spot_key, idx)
    return (future_key)
end

@view
func get_future_keys{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        spot_key : felt) -> (future_keys_len : felt, future_keys : felt*):
    let (future_keys) = alloc()

    let (total_future_keys_len) = future_key_len_storage.read(spot_key)

    if total_future_keys_len == 0:
        return (0, future_keys)
    end

    let (future_keys_len, future_keys) = _build_future_keys_array(
        spot_key, total_future_keys_len, future_keys, 0, 0)

    return (future_keys_len, future_keys)
end

@view
func get_on_key{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(idx : felt) -> (
        on_key : felt):
    let (on_key) = on_key_storage.read(idx)
    return (on_key)
end

@view
func get_on_key_status{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        on_key : felt) -> (on_key_is_active : felt):
    let (on_key_is_active) = on_key_status_storage.read(on_key)
    return (on_key_is_active)
end

@view
func get_on_keys{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
        on_keys_len : felt, on_keys : felt*):
    let (on_keys) = alloc()

    let (total_on_keys_len) = on_key_len_storage.read()

    if total_on_keys_len == 0:
        return (0, on_keys)
    end

    let (on_keys_len, on_keys) = _build_on_keys_array(total_on_keys_len, on_keys, 0, 0)

    return (on_keys_len, on_keys)
end

#TODO, setters for FutureKeyStatus which gets us the expiry timestamp for a particular future
#TODO update frontend referencing the new setters

@view
func get_future_key_status{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        spot_key : felt, future_key : felt) -> (future_key_status : FutureKeyStatus):
    let (future_key_status) = future_key_status_storage.read(spot_key, future_key)
    return (future_key_status)
end

@view
func get_future_key_is_active{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        spot_key : felt, future_key : felt) -> (future_key_is_active : felt):
    let (future_key_status) = get_future_key_status(spot_key, future_key)
    let future_key_is_active = future_key_status.is_active
    return (future_key_is_active)
end

@view
func get_future_key_status_expiry{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        spot_key : felt, future_key : felt) -> (future_key_status_expiry : felt):
    let (Future_Key_Status) = get_future_key_status(spot_key, future_key)
    let future_key_status_expiry = Future_Key_Status.expiry_timestamp
    return(future_key_status_expiry)
end


#
# Setters
#

@external
func set_admin_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        new_address : felt):
    Admin_only_admin()
    Admin_set_admin_address(new_address)
    return ()
end

@external
func set_oracle_controller_address{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        oracle_controller_address : felt) -> ():
    Admin_only_admin()
    oracle_controller_address_storage.write(oracle_controller_address)
    return ()
end

@external
func add_spot_key{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        spot_key : felt) -> ():
    Admin_only_admin()
    let (spot_key_len) = spot_key_len_storage.read()
    spot_key_storage.write(spot_key_len, spot_key)
    spot_key_status_storage.write(spot_key, TRUE)
    spot_key_len_storage.write(spot_key_len + 1)
    return ()
end

@external
func set_spot_key_status{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        spot_key : felt, is_active : felt) -> ():
    Admin_only_admin()
    spot_key_status_storage.write(spot_key, is_active)
    return ()
end

@external
func add_future_key{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        spot_key : felt, future_key : felt, is_active : felt, expiry_timestamp : felt ) -> ():
    Admin_only_admin()
    # Check that spot key is active
    with_attr error_message("YieldCurve: Spot key provided is not active"):
        let (spot_key_is_active) = spot_key_status_storage.read(spot_key)
        assert spot_key_is_active = TRUE
    end
    let (future_key_len) = future_key_len_storage.read(spot_key)
    future_key_storage.write(spot_key, future_key_len, future_key)
    let future_key_status = FutureKeyStatus(is_active, expiry_timestamp) 
    future_key_status_storage.write(spot_key, future_key, future_key_status)
    future_key_len_storage.write(spot_key, future_key_len + 1)
    return ()
end

@external
func add_on_key{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        on_key : felt) -> ():
    Admin_only_admin()
    let (on_key_len) = on_key_len_storage.read()
    on_key_storage.write(on_key_len, on_key)
    on_key_status_storage.write(on_key, TRUE)
    on_key_len_storage.write(on_key_len + 1)
    return ()
end

@external
func set_on_key_status{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        on_key : felt, is_active : felt) -> ():
    Admin_only_admin()
    on_key_status_storage.write(on_key, is_active)
    return ()
end


@external
func set_future_key_status_struct{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        spot_key: felt, future_key: felt, new_future_key_status: FutureKeyStatus) -> ():
    Admin_only_admin()
     # Check that spot key is active
    with_attr error_message("YieldCurve: Spot key provided is not active"):
        let (spot_key_is_active) = spot_key_status_storage.read(spot_key)
        assert spot_key_is_active = TRUE
    end
    future_key_status_storage.write(spot_key, future_key, new_future_key_status)
    return ()
end 

@external
func set_future_key_status_is_active{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        spot_key: felt, future_key: felt, new_is_active: felt) -> ():
    Admin_only_admin()

    with_attr error_message("YieldCurve: Spot key provided is not active"):
        let (spot_key_is_active) = spot_key_status_storage.read(spot_key)
        assert spot_key_is_active = TRUE
    end

    let (old_expiry) = get_future_key_status_expiry(spot_key, future_key)
    #create a new struct with old expiry and move it in to overwrite the storage slot. 
    let new_future_key_status = FutureKeyStatus(new_is_active, old_expiry)
    set_future_key_status_struct(spot_key, future_key, new_future_key_status)
    
    return ()
end 

@external
func set_future_key_status_expiry{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        spot_key: felt, future_key: felt, new_expiry: felt) -> ():
    Admin_only_admin()
     # Check that spot key is active
    with_attr error_message("YieldCurve: Spot key provided is not active"):
        let (spot_key_is_active) = spot_key_status_storage.read(spot_key)
        assert spot_key_is_active = TRUE
    end
    let (old_is_active) = get_future_key_is_active(spot_key, future_key)
    #create a new struct with old expiry and move it in to overwrite the storage slot. 
    let new_future_key_status = FutureKeyStatus(old_is_active, new_expiry)
    set_future_key_status_struct(spot_key, future_key, new_future_key_status)
    
    return ()
end 




#
# Helpers
#

func _build_spot_keys_array{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        spot_keys_len : felt, spot_keys : felt*, output_idx : felt, storage_idx : felt) -> (
        spot_keys_len : felt, spot_keys : felt*):
    if storage_idx == spot_keys_len:
        return (output_idx, spot_keys)
    end

    let (spot_key) = spot_key_storage.read(storage_idx)
    let (spot_key_is_active) = spot_key_status_storage.read(spot_key)
    if spot_key_is_active == TRUE:
        assert [spot_keys + output_idx] = spot_key
        let (recursed_spot_keys_len, recursed_spot_keys) = _build_spot_keys_array(
            spot_keys_len, spot_keys, output_idx + 1, storage_idx + 1)
        return (recursed_spot_keys_len, recursed_spot_keys)
    else:
        let (recursed_spot_keys_len, recursed_spot_keys) = _build_spot_keys_array(
            spot_keys_len, spot_keys, output_idx, storage_idx + 1)
        return (recursed_spot_keys_len, recursed_spot_keys)
    end
end

func _build_future_keys_array{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        spot_key : felt, future_keys_len : felt, future_keys : felt*, output_idx : felt,
        storage_idx : felt) -> (future_keys_len : felt, future_keys : felt*):
    if storage_idx == future_keys_len:
        return (output_idx, future_keys)
    end

    let (future_key) = future_key_storage.read(spot_key, storage_idx)
    let (future_key_is_active) = future_key_status_storage.read(spot_key, future_key)
    if future_key_is_active == TRUE:
        assert [future_keys + output_idx] = future_key
        let (recursed_future_keys_len, recursed_future_keys) = _build_future_keys_array(
            spot_key, future_keys_len, future_keys, output_idx + 1, storage_idx + 1)
        return (recursed_future_keys_len, recursed_future_keys)
    else:
        let (recursed_future_keys_len, recursed_future_keys) = _build_future_keys_array(
            spot_key, future_keys_len, future_keys, output_idx, storage_idx + 1)
        return (recursed_future_keys_len, recursed_future_keys)
    end
end

func _build_on_keys_array{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        on_keys_len : felt, on_keys : felt*, output_idx : felt, storage_idx : felt) -> (
        on_keys_len : felt, on_keys : felt*):
    if storage_idx == on_keys_len:
        return (output_idx, on_keys)
    end

    let (on_key) = on_key_storage.read(storage_idx)
    let (on_key_is_active) = on_key_status_storage.read(on_key)
    if on_key_is_active == TRUE:
        assert [on_keys + output_idx] = on_key
        let (recursed_on_keys_len, recursed_on_keys) = _build_on_keys_array(
            on_keys_len, on_keys, output_idx + 1, storage_idx + 1)
        return (recursed_on_keys_len, recursed_on_keys)
    else:
        let (recursed_on_keys_len, recursed_on_keys) = _build_on_keys_array(
            on_keys_len, on_keys, output_idx, storage_idx + 1)
        return (recursed_on_keys_len, recursed_on_keys)
    end
end
