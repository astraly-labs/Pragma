%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.bool import TRUE, FALSE
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.math_cmp import is_le
from starkware.cairo.common.pow import pow
from starkware.starknet.common.syscalls import get_block_timestamp
from starkware.cairo.common.math import unsigned_div_rem

from contracts.admin.library import (
    Admin_initialize_admin_address,
    Admin_get_admin_address,
    Admin_set_admin_address,
    Admin_only_admin,
)

from contracts.entry.structs import Entry
from contracts.oracle_controller.IOracleController import IOracleController
from contracts.compute_engines.yield_curve.structs import YieldPoint

#
# Consts
#

const DEFAULT_AGGREGATION_MODE = 0  # median
const ON_SOURCE_KEY = 28526  # str_to_felt("on")
const FUTURE_SPOT_SOURCE_KEY = 123865098764438378875219828  # str_to_felt("future/spot")
const AAVE_PONTIS_SOURCE_KEY = 1633777253  # str_to_felt("aave")
const SECONDS_IN_YEAR = 31536000  # 365 * 24 * 60 * 60

#
# Structs
#

struct FutureKeyStatus:
    member is_active : felt
    member expiry_timestamp : felt
end

#
# Storage
#

@storage_var
func oracle_controller_address_storage() -> (oracle_controller_address : felt):
end

@storage_var
func future_spot_pontis_source_key_storage() -> (future_spot_pontis_source_key : felt):
end

@storage_var
func spot_key_len_storage() -> (spot_key_len : felt):
end

@storage_var
func spot_key_storage(idx : felt) -> (spot_key : felt):
end

@storage_var
func spot_key_is_active_storage(spot_key : felt) -> (spot_key_is_active : felt):
end

@storage_var
func future_key_len_storage(spot_key : felt) -> (future_key_len : felt):
end

@storage_var
func future_key_storage(spot_key : felt, idx : felt) -> (future_key : felt):
end

@storage_var
func future_key_status_storage(spot_key : felt, future_key : felt) -> (
    future_key_status : FutureKeyStatus
):
end

@storage_var
func on_key_len_storage() -> (spot_key_len : felt):
end

@storage_var
func on_key_storage(idx : felt) -> (on_key : felt):
end

@storage_var
func on_key_is_active_storage(on_key : felt) -> (on_key_is_active : felt):
end

#
# Constructor
#

@constructor
func constructor{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    admin_address : felt, oracle_controller_address : felt
):
    Admin_initialize_admin_address(admin_address)
    oracle_controller_address_storage.write(oracle_controller_address)
    return ()
end

#
# Getters
#

@view
func get_yield_points{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    decimals : felt
) -> (yield_points_len : felt, yield_points : YieldPoint*):
    alloc_locals

    let (yield_points_init : YieldPoint*) = alloc()

    let (oracle_controller_address) = oracle_controller_address_storage.read()

    # ON rate
    let (on_keys_len, on_keys) = get_on_keys()
    let (on_yield_points_len, on_yield_points) = YieldCurve.build_on_yield_points(
        decimals, oracle_controller_address, yield_points_init, on_keys_len, on_keys, 0, 0
    )

    # Spot & Futures
    let (spot_keys_len, spot_keys) = get_spot_keys()
    let (future_spot_pontis_source_key) = future_spot_pontis_source_key_storage.read()
    let (yield_points_len, yield_points) = YieldCurve.build_future_spot_yield_points(
        decimals,
        oracle_controller_address,
        future_spot_pontis_source_key,
        on_yield_points,
        spot_keys_len,
        spot_keys,
        on_yield_points_len,
        0,
    )

    return (yield_points_len, yield_points)
end

@view
func get_admin_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
    admin_address : felt
):
    let (admin_address) = Admin_get_admin_address()
    return (admin_address)
end

@view
func get_oracle_controller_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}() -> (oracle_controller_address : felt):
    let (oracle_controller_address) = oracle_controller_address_storage.read()
    return (oracle_controller_address)
end

@view
func get_future_spot_pontis_source_key{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}() -> (future_spot_pontis_source_key : felt):
    let (future_spot_pontis_source_key) = future_spot_pontis_source_key_storage.read()
    return (future_spot_pontis_source_key)
end

@view
func get_spot_key{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    idx : felt
) -> (spot_key : felt):
    let (spot_key) = spot_key_storage.read(idx)
    return (spot_key)
end

@view
func get_spot_key_is_active{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    spot_key : felt
) -> (spot_key_is_active : felt):
    let (spot_key_is_active) = spot_key_is_active_storage.read(spot_key)
    return (spot_key_is_active)
end

@view
func get_spot_keys{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
    spot_keys_len : felt, spot_keys : felt*
):
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
    spot_key : felt, idx : felt
) -> (future_key : felt):
    let (future_key) = future_key_storage.read(spot_key, idx)
    return (future_key)
end

@view
func get_future_keys{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    spot_key : felt
) -> (future_keys_len : felt, future_keys : felt*):
    let (future_keys) = alloc()

    let (total_future_keys_len) = future_key_len_storage.read(spot_key)

    if total_future_keys_len == 0:
        return (0, future_keys)
    end

    let (future_keys_len, future_keys) = _build_future_keys_array(
        spot_key, total_future_keys_len, future_keys, 0, 0
    )

    return (future_keys_len, future_keys)
end

@view
func get_on_key{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(idx : felt) -> (
    on_key : felt
):
    let (on_key) = on_key_storage.read(idx)
    return (on_key)
end

@view
func get_on_key_is_active{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    on_key : felt
) -> (on_key_is_active : felt):
    let (on_key_is_active) = on_key_is_active_storage.read(on_key)
    return (on_key_is_active)
end

@view
func get_on_keys{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
    on_keys_len : felt, on_keys : felt*
):
    let (on_keys) = alloc()

    let (total_on_keys_len) = on_key_len_storage.read()

    if total_on_keys_len == 0:
        return (0, on_keys)
    end

    let (on_keys_len, on_keys) = _build_on_keys_array(total_on_keys_len, on_keys, 0, 0)

    return (on_keys_len, on_keys)
end

@view
func get_future_key_status{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    spot_key : felt, future_key : felt
) -> (future_key_status : FutureKeyStatus):
    let (future_key_status) = future_key_status_storage.read(spot_key, future_key)
    return (future_key_status)
end

@view
func get_future_key_is_active{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    spot_key : felt, future_key : felt
) -> (future_key_is_active : felt):
    let (future_key_status) = get_future_key_status(spot_key, future_key)
    let future_key_is_active = future_key_status.is_active
    return (future_key_is_active)
end

@view
func get_future_key_expiry{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    spot_key : felt, future_key : felt
) -> (future_key_expiry : felt):
    let (future_key_status) = get_future_key_status(spot_key, future_key)
    let future_key_expiry = future_key_status.expiry_timestamp
    return (future_key_expiry)
end

#
# Setters
#

@external
func set_admin_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    new_address : felt
):
    Admin_only_admin()
    Admin_set_admin_address(new_address)
    return ()
end

@external
func set_oracle_controller_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(oracle_controller_address : felt) -> ():
    Admin_only_admin()
    oracle_controller_address_storage.write(oracle_controller_address)
    return ()
end

@external
func set_future_spot_pontis_source_key{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(future_spot_pontis_source_key : felt) -> ():
    Admin_only_admin()
    future_spot_pontis_source_key_storage.write(future_spot_pontis_source_key)
    return ()
end

@external
func add_spot_key{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    spot_key : felt, is_active : felt
) -> ():
    Admin_only_admin()
    let (spot_key_len) = spot_key_len_storage.read()
    spot_key_storage.write(spot_key_len, spot_key)
    spot_key_is_active_storage.write(spot_key, is_active)
    spot_key_len_storage.write(spot_key_len + 1)
    return ()
end

@external
func set_spot_key_is_active{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    spot_key : felt, is_active : felt
) -> ():
    Admin_only_admin()
    spot_key_is_active_storage.write(spot_key, is_active)
    return ()
end

@external
func add_future_key{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    spot_key : felt, future_key : felt, is_active : felt, expiry_timestamp : felt
) -> ():
    Admin_only_admin()

    let (future_key_len) = future_key_len_storage.read(spot_key)
    future_key_storage.write(spot_key, future_key_len, future_key)
    let future_key_status = FutureKeyStatus(is_active, expiry_timestamp)
    future_key_status_storage.write(spot_key, future_key, future_key_status)
    future_key_len_storage.write(spot_key, future_key_len + 1)
    return ()
end

@external
func set_future_key_status{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    spot_key : felt, future_key : felt, new_future_key_status : FutureKeyStatus
) -> ():
    Admin_only_admin()

    future_key_status_storage.write(spot_key, future_key, new_future_key_status)
    return ()
end

@external
func set_future_key_is_active{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    spot_key : felt, future_key : felt, new_is_active : felt
) -> ():
    Admin_only_admin()

    let (old_expiry) = get_future_key_expiry(spot_key, future_key)
    let new_future_key_status = FutureKeyStatus(new_is_active, old_expiry)
    set_future_key_status(spot_key, future_key, new_future_key_status)

    return ()
end

@external
func add_on_key{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    on_key : felt, is_active : felt
) -> ():
    Admin_only_admin()
    let (on_key_len) = on_key_len_storage.read()
    on_key_storage.write(on_key_len, on_key)
    on_key_is_active_storage.write(on_key, is_active)
    on_key_len_storage.write(on_key_len + 1)
    return ()
end

@external
func set_on_key_is_active{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    on_key : felt, is_active : felt
) -> ():
    Admin_only_admin()
    on_key_is_active_storage.write(on_key, is_active)
    return ()
end

#
# Helpers
#

func _build_spot_keys_array{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    spot_keys_len : felt, spot_keys : felt*, output_idx : felt, storage_idx : felt
) -> (spot_keys_len : felt, spot_keys : felt*):
    if storage_idx == spot_keys_len:
        return (output_idx, spot_keys)
    end

    let (spot_key) = get_spot_key(storage_idx)
    let (spot_key_is_active) = get_spot_key_is_active(spot_key)
    if spot_key_is_active == TRUE:
        assert spot_keys[output_idx] = spot_key
        let (recursed_spot_keys_len, recursed_spot_keys) = _build_spot_keys_array(
            spot_keys_len, spot_keys, output_idx + 1, storage_idx + 1
        )
        return (recursed_spot_keys_len, recursed_spot_keys)
    else:
        let (recursed_spot_keys_len, recursed_spot_keys) = _build_spot_keys_array(
            spot_keys_len, spot_keys, output_idx, storage_idx + 1
        )
        return (recursed_spot_keys_len, recursed_spot_keys)
    end
end

func _build_future_keys_array{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    spot_key : felt,
    future_keys_len : felt,
    future_keys : felt*,
    output_idx : felt,
    storage_idx : felt,
) -> (future_keys_len : felt, future_keys : felt*):
    if storage_idx == future_keys_len:
        return (output_idx, future_keys)
    end

    let (future_key) = get_future_key(spot_key, storage_idx)
    let (future_key_is_active) = get_future_key_is_active(spot_key, future_key)
    if future_key_is_active == TRUE:
        assert future_keys[output_idx] = future_key
        let (recursed_future_keys_len, recursed_future_keys) = _build_future_keys_array(
            spot_key, future_keys_len, future_keys, output_idx + 1, storage_idx + 1
        )
        return (recursed_future_keys_len, recursed_future_keys)
    else:
        let (recursed_future_keys_len, recursed_future_keys) = _build_future_keys_array(
            spot_key, future_keys_len, future_keys, output_idx, storage_idx + 1
        )
        return (recursed_future_keys_len, recursed_future_keys)
    end
end

func _build_on_keys_array{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    on_keys_len : felt, on_keys : felt*, output_idx : felt, storage_idx : felt
) -> (on_keys_len : felt, on_keys : felt*):
    if storage_idx == on_keys_len:
        return (output_idx, on_keys)
    end

    let (on_key) = get_on_key(storage_idx)
    let (on_key_is_active) = get_on_key_is_active(on_key)
    if on_key_is_active == TRUE:
        assert on_keys[output_idx] = on_key
        let (recursed_on_keys_len, recursed_on_keys) = _build_on_keys_array(
            on_keys_len, on_keys, output_idx + 1, storage_idx + 1
        )
        return (recursed_on_keys_len, recursed_on_keys)
    else:
        let (recursed_on_keys_len, recursed_on_keys) = _build_on_keys_array(
            on_keys_len, on_keys, output_idx, storage_idx + 1
        )
        return (recursed_on_keys_len, recursed_on_keys)
    end
end

#
# Library
#

namespace YieldCurve:
    func build_on_yield_points{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        output_decimals : felt,
        oracle_controller_address : felt,
        yield_points : YieldPoint*,
        on_keys_len : felt,
        on_keys : felt*,
        yield_points_idx : felt,
        on_keys_idx : felt,
    ) -> (on_yield_points_len : felt, on_yield_points : YieldPoint*):
        alloc_locals

        if on_keys_idx == on_keys_len:
            return (yield_points_idx, yield_points)
        end
        let on_key = on_keys[on_keys_idx]
        let (is_active) = get_on_key_is_active(on_key)
        if is_active == FALSE:
            let (recursed_on_yield_points_len, recursed_on_yield_points) = build_on_yield_points(
                output_decimals,
                oracle_controller_address,
                yield_points,
                on_keys_len,
                on_keys,
                yield_points_idx,
                on_keys_idx + 1,
            )

            return (recursed_on_yield_points_len, recursed_on_yield_points)
        end

        let (on_decimals) = IOracleController.get_decimals(oracle_controller_address, on_key)
        let (on_entry) = IOracleController.get_entry(
            oracle_controller_address, on_key, AAVE_PONTIS_SOURCE_KEY
        )
        if on_entry.timestamp == 0:
            # Entry was empty to skip to next one
            let (recursed_on_yield_points_len, recursed_on_yield_points) = build_on_yield_points(
                output_decimals,
                oracle_controller_address,
                yield_points,
                on_keys_len,
                on_keys,
                yield_points_idx,
                on_keys_idx + 1,
            )

            return (recursed_on_yield_points_len, recursed_on_yield_points)
        else:
            let (shifted_on_value) = change_decimals(on_entry.value, on_decimals, output_decimals)

            # Add to on_yield_points and recurse
            # Set expiry to be same as capture timestamp
            assert yield_points[yield_points_idx] = YieldPoint(expiry_timestamp=on_entry.timestamp, capture_timestamp=on_entry.timestamp, rate=shifted_on_value, source=ON_SOURCE_KEY)

            let (recursed_on_yield_points_len, recursed_on_yield_points) = build_on_yield_points(
                output_decimals,
                oracle_controller_address,
                yield_points,
                on_keys_len,
                on_keys,
                yield_points_idx + 1,
                on_keys_idx + 1,
            )

            return (recursed_on_yield_points_len, recursed_on_yield_points)
        end
    end

    func build_future_spot_yield_points{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
    }(
        output_decimals : felt,
        oracle_controller_address : felt,
        future_spot_pontis_source_key : felt,
        yield_points : YieldPoint*,
        spot_keys_len : felt,
        spot_keys : felt*,
        yield_points_idx : felt,
        spot_keys_idx : felt,
    ) -> (yield_points_len : felt, yield_points : YieldPoint*):
        alloc_locals

        if spot_keys_idx == spot_keys_len:
            return (yield_points_idx, yield_points)
        end
        let spot_key = spot_keys[spot_keys_idx]
        let (is_active) = get_spot_key_is_active(spot_key)

        if is_active == FALSE:
            let (
                recursed_spot_yield_points_len, recursed_spot_yield_points
            ) = build_future_spot_yield_points(
                output_decimals,
                oracle_controller_address,
                future_spot_pontis_source_key,
                yield_points,
                spot_keys_len,
                spot_keys,
                yield_points_idx,
                spot_keys_idx + 1,
            )

            return (recursed_spot_yield_points_len, recursed_spot_yield_points)
        end

        let (spot_decimals) = IOracleController.get_decimals(oracle_controller_address, spot_key)
        let (spot_entry) = IOracleController.get_entry(
            oracle_controller_address, spot_key, future_spot_pontis_source_key
        )
        if spot_entry.timestamp == 0:
            # No entry so skip to next one
            let (
                recursed_spot_yield_points_len, recursed_spot_yield_points
            ) = build_future_spot_yield_points(
                output_decimals,
                oracle_controller_address,
                future_spot_pontis_source_key,
                yield_points,
                spot_keys_len,
                spot_keys,
                yield_points_idx,
                spot_keys_idx + 1,
            )

            return (recursed_spot_yield_points_len, recursed_spot_yield_points)
        else:
            # Get all futures, and for each, calculate yield point
            let (future_keys_len, future_keys) = get_future_keys(spot_key)

            let (future_yield_points_len, future_yield_points) = build_future_yield_points(
                output_decimals,
                oracle_controller_address,
                future_spot_pontis_source_key,
                yield_points,
                future_keys_len,
                future_keys,
                yield_points_idx,
                0,
                spot_entry,
                spot_decimals,
            )

            let (
                recursed_spot_yield_points_len, recursed_spot_yield_points
            ) = build_future_spot_yield_points(
                output_decimals,
                oracle_controller_address,
                future_spot_pontis_source_key,
                future_yield_points,
                spot_keys_len,
                spot_keys,
                future_yield_points_len,
                spot_keys_idx + 1,
            )

            return (recursed_spot_yield_points_len, recursed_spot_yield_points)
        end
    end

    func build_future_yield_points{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
    }(
        output_decimals : felt,
        oracle_controller_address : felt,
        future_spot_pontis_source_key : felt,
        yield_points : YieldPoint*,
        future_keys_len : felt,
        future_keys : felt*,
        yield_points_idx : felt,
        future_keys_idx : felt,
        spot_entry : Entry,
        spot_decimals : felt,
    ) -> (yield_points_len : felt, yield_points : YieldPoint*):
        alloc_locals

        if future_keys_idx == future_keys_len:
            return (yield_points_idx, yield_points)
        end

        # Check that future key is active
        let future_key = future_keys[future_keys_idx]
        let (future_key_status) = get_future_key_status(spot_entry.key, future_key)

        if future_key_status.is_active == FALSE:
            let (
                recursed_future_yield_points_len, recursed_future_yield_points
            ) = build_future_yield_points(
                output_decimals,
                oracle_controller_address,
                future_spot_pontis_source_key,
                yield_points,
                future_keys_len,
                future_keys,
                yield_points_idx,
                future_keys_idx + 1,
                spot_entry,
                spot_decimals,
            )

            return (recursed_future_yield_points_len, recursed_future_yield_points)
        end

        let (future_decimals) = IOracleController.get_decimals(
            oracle_controller_address, future_key
        )
        let (future_entry) = IOracleController.get_entry(
            oracle_controller_address, future_key, future_spot_pontis_source_key
        )
        if future_entry.timestamp == 0:
            let (
                recursed_future_yield_points_len, recursed_future_yield_points
            ) = build_future_yield_points(
                output_decimals,
                oracle_controller_address,
                future_spot_pontis_source_key,
                yield_points,
                future_keys_len,
                future_keys,
                yield_points_idx,
                future_keys_idx + 1,
                spot_entry,
                spot_decimals,
            )

            return (recursed_future_yield_points_len, recursed_future_yield_points)
        end
        # TODO: Replace with
        # is_not_zero(future_entry.timestamp - spot_entry.timestamp) == FALSE
        let (is_future_more_recent) = is_le(spot_entry.timestamp, future_entry.timestamp)
        const TIME_TOLERANCE = 10
        if is_future_more_recent == TRUE:
            let (are_future_spot_simultaneous) = is_le(
                future_entry.timestamp - spot_entry.timestamp, TIME_TOLERANCE
            )
        else:
            let (are_future_spot_simultaneous) = is_le(
                spot_entry.timestamp - future_entry.timestamp, TIME_TOLERANCE
            )
        end
        if are_future_spot_simultaneous == FALSE:
            let (
                recursed_future_yield_points_len, recursed_future_yield_points
            ) = build_future_yield_points(
                output_decimals,
                oracle_controller_address,
                future_spot_pontis_source_key,
                yield_points,
                future_keys_len,
                future_keys,
                yield_points_idx,
                future_keys_idx + 1,
                spot_entry,
                spot_decimals,
            )

            return (recursed_future_yield_points_len, recursed_future_yield_points)
        end

        let (yield_point) = calculate_future_spot_yield_point(
            future_entry,
            future_key_status.expiry_timestamp,
            spot_entry,
            spot_decimals,
            future_decimals,
            output_decimals,
        )

        assert yield_points[yield_points_idx] = yield_point

        let (
            recursed_future_yield_points_len, recursed_future_yield_points
        ) = build_future_yield_points(
            output_decimals,
            oracle_controller_address,
            future_spot_pontis_source_key,
            yield_points,
            future_keys_len,
            future_keys,
            yield_points_idx + 1,
            future_keys_idx + 1,
            spot_entry,
            spot_decimals,
        )

        return (recursed_future_yield_points_len, recursed_future_yield_points)
    end

    func calculate_future_spot_yield_point{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
    }(
        future_entry : Entry,
        future_expiry_timestamp : felt,
        spot_entry : Entry,
        spot_decimals : felt,
        future_decimals : felt,
        output_decimals : felt,
    ) -> (yield_point : YieldPoint):
        alloc_locals
        let (is_backwardation) = is_le(future_entry.value, spot_entry.value)

        if is_backwardation == TRUE:
            tempvar time_scaled_value = 0
            tempvar syscall_ptr = syscall_ptr
        else:
            let (current_timestamp) = get_block_timestamp()
            with_attr error_message("YieldCurve: expiry timestamp for future is in the past"):
                let (is_future_expired) = is_le(future_expiry_timestamp, current_timestamp)
                assert is_future_expired = FALSE
            end

            let seconds_to_expiry = future_expiry_timestamp - current_timestamp

            let (decimals_multiplier) = pow(10, output_decimals)
            let (time_multiplier, r) = unsigned_div_rem(
                SECONDS_IN_YEAR * decimals_multiplier, seconds_to_expiry
            )
            let (should_shift_net_left) = is_le(future_decimals, output_decimals + spot_decimals)
            if should_shift_net_left == TRUE:
                # Shift future/spot to the left by output_decimals + spot_decimals - future_decimals
                let (ratio_multiplier) = pow(10, output_decimals + spot_decimals - future_decimals)
                let (shifted_ratio, _) = unsigned_div_rem(
                    future_entry.value * ratio_multiplier, spot_entry.value
                )
            else:
                # Shift future/spot to the right by -1 * (output_decimals + spot_decimals - future_decimals)
                let (ratio_multiplier) = pow(10, future_decimals - output_decimals - spot_decimals)
                let (shifted_ratio, _) = unsigned_div_rem(
                    future_entry.value, spot_entry.value * ratio_multiplier
                )
            end

            let interest_ratio = shifted_ratio - decimals_multiplier
            let (local time_scaled_value, _) = unsigned_div_rem(
                interest_ratio * time_multiplier, decimals_multiplier
            )

            tempvar time_scaled_value = time_scaled_value
            tempvar syscall_ptr = syscall_ptr
        end

        let yield_point = YieldPoint(
            expiry_timestamp=future_expiry_timestamp,
            capture_timestamp=future_entry.timestamp,
            rate=time_scaled_value,
            source=FUTURE_SPOT_SOURCE_KEY,
        )
        return (yield_point)
    end

    func change_decimals{range_check_ptr}(
        value : felt, old_decimals : felt, new_decimals : felt
    ) -> (shifted_value : felt):
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
end
