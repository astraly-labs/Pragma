%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.bool import TRUE, FALSE
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.hash import hash2
from starkware.cairo.common.math import assert_not_equal, assert_not_zero
from starkware.starknet.common.syscalls import get_caller_address

from contracts.entry.structs import Entry
from contracts.oracle_implementation.IOracleImplementation import IOracleImplementation
from contracts.oracle_controller.structs import OracleController_OracleImplementationStatus
from contracts.publisher_registry.IPublisherRegistry import IPublisherRegistry

#
# Storage
#

@storage_var
func OracleController_publisher_registry_address_storage() -> (publisher_registry_address : felt):
end

@storage_var
func OracleController_oracle_implementations_len_storage() -> (oracle_implementations_len : felt):
end

@storage_var
func OracleController_oracle_implementation_address_storage(idx : felt) -> (oracle_address : felt):
end

@storage_var
func OracleController_oracle_implementation_status_storage(oracle_address : felt) -> (
    oracle_implementation_status : OracleController_OracleImplementationStatus
):
end

@storage_var
func OracleController_primary_oracle_implementation_address_storage() -> (oracle_address : felt):
end

#
# Events
#

@event
func UpdatedPublisherRegistryAddress(
    old_publisher_registry_address : felt, new_publisher_registry_address : felt
):
end

@event
func AddedOracleImplementation(oracle_implementation_address : felt):
end

@event
func UpdatedOracleImplementation(
    oracle_implementation_address : felt, old_is_active : felt, new_is_active : felt
):
end

@event
func UpdatedPrimaryOracleImplementation(
    old_primary_oracle_implementation_address : felt,
    new_primary_oracle_implementation_address : felt,
):
end

@event
func SubmittedEntry(new_entry : Entry):
end

#
# Constructor
#

func OracleController_initialize_oracle_controller{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(publisher_registry_address : felt):
    OracleController_publisher_registry_address_storage.write(publisher_registry_address)
    return ()
end

#
# Getters
#

func OracleController_get_publisher_registry_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}() -> (publisher_registry_address : felt):
    let (publisher_registry_address) = OracleController_publisher_registry_address_storage.read()
    return (publisher_registry_address)
end

func OracleController_get_active_oracle_implementation_addresses{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}() -> (oracle_addresses_len : felt, oracle_addresses : felt*):
    alloc_locals

    let (total_oracle_addresses_len) = OracleController_oracle_implementations_len_storage.read()
    let (local oracle_addresses) = alloc()

    if total_oracle_addresses_len == 0:
        return (total_oracle_addresses_len, oracle_addresses)
    end

    let (
        oracle_addresses_len, oracle_addresses
    ) = OracleController_build_active_oracle_implementation_addresses(
        total_oracle_addresses_len, oracle_addresses, 0, 0
    )

    return (oracle_addresses_len, oracle_addresses)
end

func OracleController_get_oracle_implementation_status{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(oracle_implementation_address : felt) -> (
    oracle_implementation_status : OracleController_OracleImplementationStatus
):
    let (oracle_implementation_status) = OracleController_oracle_implementation_status_storage.read(
        oracle_implementation_address
    )
    return (oracle_implementation_status)
end

func OracleController_get_oracle_implementation_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(idx : felt) -> (oracle_implementation_address : felt):
    let (
        oracle_implementation_address
    ) = OracleController_oracle_implementation_address_storage.read(idx)
    return (oracle_implementation_address)
end

func OracleController_get_primary_oracle_implementation_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}() -> (primary_oracle_implementation_address : felt):
    let (
        primary_oracle_implementation_address
    ) = OracleController_primary_oracle_implementation_address_storage.read()
    with_attr error_message(
            "OracleController: Primary oracle implementation address must be set first"):
        assert_not_zero(primary_oracle_implementation_address)
    end
    return (primary_oracle_implementation_address)
end

#
# Setters
#

func OracleController_update_publisher_registry_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(publisher_registry_address : felt):
    let (old_publisher_registry_address) = OracleController_publisher_registry_address_storage.read(
        )
    OracleController_publisher_registry_address_storage.write(publisher_registry_address)
    UpdatedPublisherRegistryAddress.emit(old_publisher_registry_address, publisher_registry_address)
    return ()
end

func OracleController_add_oracle_implementation_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(oracle_implementation_address : felt):
    alloc_locals

    let (oracle_implementation_status) = OracleController_oracle_implementation_status_storage.read(
        oracle_implementation_address
    )
    with_attr error_message(
            "OracleController: Oracle implementation with this address already registered"):
        assert oracle_implementation_status.was_registered = FALSE
    end

    let (oracle_implementations_len) = OracleController_oracle_implementations_len_storage.read()

    OracleController_oracle_implementations_len_storage.write(oracle_implementations_len + 1)
    OracleController_oracle_implementation_address_storage.write(
        oracle_implementations_len, oracle_implementation_address
    )  # 0-indexed, so write at old_len (not new_len=len+1)
    let new_oracle_implementation_status = OracleController_OracleImplementationStatus(
        was_registered=TRUE, is_active=TRUE
    )  # Default active when registered
    OracleController_oracle_implementation_status_storage.write(
        oracle_implementation_address, new_oracle_implementation_status
    )
    let (
        primary_oracle_implementation_address
    ) = OracleController_primary_oracle_implementation_address_storage.read()
    if primary_oracle_implementation_address == 0:
        OracleController_primary_oracle_implementation_address_storage.write(
            oracle_implementation_address
        )
        tempvar syscall_ptr = syscall_ptr
        tempvar pedersen_ptr = pedersen_ptr
        tempvar range_check_ptr = range_check_ptr
    else:
        tempvar syscall_ptr = syscall_ptr
        tempvar pedersen_ptr = pedersen_ptr
        tempvar range_check_ptr = range_check_ptr
    end

    AddedOracleImplementation.emit(oracle_implementation_address)
    return ()
end

func OracleController_update_oracle_implementation_active_status{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(oracle_implementation_address : felt, is_active : felt):
    alloc_locals

    let (oracle_implementation_status) = OracleController_oracle_implementation_status_storage.read(
        oracle_implementation_address
    )
    with_attr error_message(
            "OracleController: Oracle implementation with this address has not been registered yet"):
        assert oracle_implementation_status.was_registered = TRUE
    end

    let (
        primary_oracle_implementation_address
    ) = OracleController_primary_oracle_implementation_address_storage.read()
    with_attr error_message(
            "OracleController: Cannot update is_active for primary oracle implementation address"):
        assert_not_equal(oracle_implementation_address, primary_oracle_implementation_address)
    end

    let new_oracle_implementation_status = OracleController_OracleImplementationStatus(
        was_registered=TRUE, is_active=is_active
    )
    OracleController_oracle_implementation_status_storage.write(
        oracle_implementation_address, new_oracle_implementation_status
    )

    UpdatedOracleImplementation.emit(
        oracle_implementation_address, oracle_implementation_status.is_active, is_active
    )
    return ()
end

func OracleController_set_primary_oracle_implementation_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(primary_oracle_implementation_address : felt):
    alloc_locals

    let (
        old_primary_oracle_implementation_address
    ) = OracleController_primary_oracle_implementation_address_storage.read()
    let (oracle_implementation_status) = OracleController_oracle_implementation_status_storage.read(
        primary_oracle_implementation_address
    )
    with_attr error_message(
            "OracleController: Oracle implementation with this address has not been registered yet"):
        assert oracle_implementation_status.was_registered = TRUE
    end

    with_attr error_message(
            "OracleController: Cannot set inactive address as primary implementation address"):
        assert oracle_implementation_status.is_active = TRUE
    end

    OracleController_primary_oracle_implementation_address_storage.write(
        primary_oracle_implementation_address
    )

    UpdatedPrimaryOracleImplementation.emit(
        old_primary_oracle_implementation_address, primary_oracle_implementation_address
    )
    return ()
end

#
# Helpers
#

func OracleController_build_active_oracle_implementation_addresses{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(oracle_addresses_len : felt, oracle_addresses : felt*, storage_idx : felt, output_idx : felt) -> (
    oracle_addresses_len : felt, oracle_addresses : felt*
):
    let (oracle_address) = OracleController_oracle_implementation_address_storage.read(storage_idx)
    let (oracle_implementation_status) = OracleController_oracle_implementation_status_storage.read(
        oracle_address
    )

    if storage_idx == oracle_addresses_len:
        return (output_idx, oracle_addresses)
    end

    if oracle_implementation_status.is_active == TRUE:
        assert [oracle_addresses + output_idx] = oracle_address
        let (
            recursed_oracle_addresses_len, recursed_oracle_addresses
        ) = OracleController_build_active_oracle_implementation_addresses(
            oracle_addresses_len, oracle_addresses, storage_idx + 1, output_idx + 1
        )
        return (recursed_oracle_addresses_len, recursed_oracle_addresses)
    else:
        let (
            recursed_oracle_addresses_len, recursed_oracle_addresses
        ) = OracleController_build_active_oracle_implementation_addresses(
            oracle_addresses_len, oracle_addresses, storage_idx + 1, output_idx
        )
        return (recursed_oracle_addresses_len, recursed_oracle_addresses)
    end
end

#
# Oracle Implementation Controller Functions
#

func OracleController_get_decimals{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(key : felt) -> (decimals : felt):
    let (
        primary_oracle_implementation_address
    ) = OracleController_get_primary_oracle_implementation_address()

    let (decimals) = IOracleImplementation.get_decimals(primary_oracle_implementation_address, key)
    return (decimals)
end

func OracleController_get_entries{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(key : felt, sources_len : felt, sources : felt*) -> (entries_len : felt, entries : Entry*):
    alloc_locals

    let (
        primary_oracle_implementation_address
    ) = OracleController_get_primary_oracle_implementation_address()

    let (entries_len, entries) = IOracleImplementation.get_entries(
        primary_oracle_implementation_address, key, sources_len, sources
    )
    return (entries_len, entries)
end

func OracleController_get_entry{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    key : felt, source
) -> (entry : Entry):
    alloc_locals

    let (
        primary_oracle_implementation_address
    ) = OracleController_get_primary_oracle_implementation_address()

    let (entry) = IOracleImplementation.get_entry(
        primary_oracle_implementation_address, key, source
    )
    return (entry)
end

func OracleController_get_value{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    key : felt, aggregation_mode : felt, sources_len : felt, sources : felt*
) -> (value : felt, last_updated_timestamp : felt, num_sources_aggregated : felt):
    alloc_locals

    let (
        primary_oracle_implementation_address
    ) = OracleController_primary_oracle_implementation_address_storage.read()
    let (value, last_updated_timestamp, num_sources_aggregated) = IOracleImplementation.get_value(
        primary_oracle_implementation_address, key, aggregation_mode, sources_len, sources
    )
    return (value, last_updated_timestamp, num_sources_aggregated)
end

func OracleController_set_decimals{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(key : felt, decimals : felt):
    alloc_locals

    let (total_oracle_addresses_len) = OracleController_oracle_implementations_len_storage.read()
    if total_oracle_addresses_len == 0:
        return ()
    end
    let (local oracle_addresses) = alloc()
    let (
        oracle_addresses_len, oracle_addresses
    ) = OracleController_build_active_oracle_implementation_addresses(
        total_oracle_addresses_len, oracle_addresses, 0, 0
    )

    _OracleController_set_decimals(oracle_addresses_len, oracle_addresses, 0, key, decimals)
    return ()
end

func _OracleController_set_decimals{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(oracle_addresses_len : felt, oracle_addresses : felt*, idx : felt, key : felt, decimals : felt):
    if oracle_addresses_len == 0:
        return ()
    end

    if idx == oracle_addresses_len:
        return ()
    end

    let oracle_address = [oracle_addresses + idx]
    IOracleImplementation.set_decimals(oracle_address, key, decimals)
    _OracleController_set_decimals(oracle_addresses_len, oracle_addresses, idx + 1, key, decimals)
    return ()
end

func OracleController_submit_entry{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(new_entry : Entry):
    alloc_locals

    let (publisher_registry_address) = OracleController_get_publisher_registry_address()
    let (publisher_address) = IPublisherRegistry.get_publisher_address(
        publisher_registry_address, new_entry.publisher
    )
    let (caller_address) = get_caller_address()

    with_attr error_message("OracleController: Transaction not from publisher account"):
        assert caller_address = publisher_address
    end

    let (total_oracle_addresses_len) = OracleController_oracle_implementations_len_storage.read()
    if total_oracle_addresses_len == 0:
        return ()
    end
    let (local oracle_addresses) = alloc()
    let (
        oracle_addresses_len, oracle_addresses
    ) = OracleController_build_active_oracle_implementation_addresses(
        total_oracle_addresses_len, oracle_addresses, 0, 0
    )
    _OracleController_submit_entry_for_oracle_addresses(
        oracle_addresses_len, oracle_addresses, 0, new_entry
    )

    SubmittedEntry.emit(new_entry)
    return ()
end

func _OracleController_submit_entry_for_oracle_addresses{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(oracle_addresses_len : felt, oracle_addresses : felt*, idx : felt, new_entry : Entry):
    if oracle_addresses_len == 0:
        return ()
    end

    if idx == oracle_addresses_len:
        return ()
    end

    let oracle_address = [oracle_addresses + idx]
    IOracleImplementation.submit_entry(oracle_address, new_entry)
    _OracleController_submit_entry_for_oracle_addresses(
        oracle_addresses_len, oracle_addresses, idx + 1, new_entry
    )
    return ()
end

func OracleController_submit_many_entries{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(new_entries_len : felt, new_entries : Entry*):
    if new_entries_len == 0:
        return ()
    end

    OracleController_submit_entry([new_entries])
    OracleController_submit_many_entries(new_entries_len - 1, new_entries + Entry.SIZE)

    return ()
end
