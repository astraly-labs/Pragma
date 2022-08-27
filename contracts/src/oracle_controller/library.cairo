%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.bool import TRUE, FALSE
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.hash import hash2
from starkware.cairo.common.math import assert_not_equal, assert_not_zero
from starkware.starknet.common.syscalls import get_caller_address

from entry.structs import Entry, Pair, Currency
from oracle_implementation.IOracleImplementation import IOracleImplementation
from oracle_controller.structs import OracleController_OracleImplementationStatus
from publisher_registry.IPublisherRegistry import IPublisherRegistry

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

@storage_var
func OracleController_currencies_storage(key : felt) -> (currency : Currency):
end

@storage_var
func OracleController_pairs_storage(id : felt) -> (pair : Pair):
end

@storage_var
func OracleController_pair_id_storage(quote_currency_id, base_currency_id) -> (pair_id : felt):
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

@event
func SubmittedCurrency(currency : Currency):
end

@event
func SubmittedPair(pair : Pair):
end

namespace OracleController:
    #
    # Constructor
    #

    func initialize_oracle_controller{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
    }(
        publisher_registry_address : felt,
        currencies_len : felt,
        currencies : Currency*,
        pairs_len : felt,
        pairs : Pair*,
    ):
        OracleController_publisher_registry_address_storage.write(publisher_registry_address)
        _set_keys_currencies(currencies_len, currencies, 0)
        _set_keys_pairs(pairs_len, pairs, 0)
        return ()
    end

    #
    # Getters
    #

    func get_publisher_registry_address{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
    }() -> (publisher_registry_address : felt):
        let (publisher_registry_address) = OracleController_publisher_registry_address_storage.read(
            )
        return (publisher_registry_address)
    end

    func get_active_oracle_implementation_addresses{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
    }() -> (oracle_addresses_len : felt, oracle_addresses : felt*):
        alloc_locals

        let (total_oracle_addresses_len) = OracleController_oracle_implementations_len_storage.read(
            )
        let (local oracle_addresses) = alloc()

        if total_oracle_addresses_len == 0:
            return (total_oracle_addresses_len, oracle_addresses)
        end

        let (oracle_addresses_len, oracle_addresses) = build_active_oracle_implementation_addresses(
            total_oracle_addresses_len, oracle_addresses, 0, 0
        )

        return (oracle_addresses_len, oracle_addresses)
    end

    func get_oracle_implementation_status{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
    }(oracle_implementation_address : felt) -> (
        oracle_implementation_status : OracleController_OracleImplementationStatus
    ):
        let (
            oracle_implementation_status
        ) = OracleController_oracle_implementation_status_storage.read(
            oracle_implementation_address
        )
        return (oracle_implementation_status)
    end

    func get_oracle_implementation_address{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
    }(idx : felt) -> (oracle_implementation_address : felt):
        let (
            oracle_implementation_address
        ) = OracleController_oracle_implementation_address_storage.read(idx)
        return (oracle_implementation_address)
    end

    func get_primary_oracle_implementation_address{
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

    func get_decimals{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        currency_id : felt
    ) -> (decimals : felt):
        let (key_currency) = OracleController_currencies_storage.read(currency_id)
        if key_currency.id == 0:
            # TODO (rlkelly): should this be 0?
            return (18)
        end

        let key_decimals = key_currency.decimals
        return (key_decimals)
    end

    #
    # Setters
    #

    func _set_keys_currencies{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        keys_currencies_len : felt, keys_currencies : Currency*, idx : felt
    ):
        if idx == keys_currencies_len:
            return ()
        end

        let key_currency = keys_currencies[idx]
        OracleController_currencies_storage.write(key_currency.id, key_currency)
        _set_keys_currencies(keys_currencies_len, keys_currencies, idx + 1)

        return ()
    end

    func _set_keys_pairs{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        keys_pairs_len : felt, keys_pairs : Pair*, idx : felt
    ):
        if idx == keys_pairs_len:
            return ()
        end

        let key_pair = keys_pairs[idx]
        OracleController_pairs_storage.write(key_pair.id, key_pair)
        _set_keys_pairs(keys_pairs_len, keys_pairs, idx + 1)

        return ()
    end

    func update_publisher_registry_address{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
    }(publisher_registry_address : felt):
        let (
            old_publisher_registry_address
        ) = OracleController_publisher_registry_address_storage.read()
        OracleController_publisher_registry_address_storage.write(publisher_registry_address)
        UpdatedPublisherRegistryAddress.emit(
            old_publisher_registry_address, publisher_registry_address
        )
        return ()
    end

    func add_oracle_implementation_address{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
    }(oracle_implementation_address : felt):
        alloc_locals

        let (
            oracle_implementation_status
        ) = OracleController_oracle_implementation_status_storage.read(
            oracle_implementation_address
        )
        with_attr error_message(
                "OracleController: Oracle implementation with this address already registered"):
            assert oracle_implementation_status.was_registered = FALSE
        end

        let (oracle_implementations_len) = OracleController_oracle_implementations_len_storage.read(
            )

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

    func update_oracle_implementation_active_status{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
    }(oracle_implementation_address : felt, is_active : felt):
        alloc_locals

        let (
            oracle_implementation_status
        ) = OracleController_oracle_implementation_status_storage.read(
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

    func set_primary_oracle_implementation_address{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
    }(primary_oracle_implementation_address : felt):
        alloc_locals

        let (
            old_primary_oracle_implementation_address
        ) = OracleController_primary_oracle_implementation_address_storage.read()
        let (
            oracle_implementation_status
        ) = OracleController_oracle_implementation_status_storage.read(
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

    func build_active_oracle_implementation_addresses{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
    }(
        oracle_addresses_len : felt, oracle_addresses : felt*, storage_idx : felt, output_idx : felt
    ) -> (oracle_addresses_len : felt, oracle_addresses : felt*):
        let (oracle_address) = OracleController_oracle_implementation_address_storage.read(
            storage_idx
        )
        let (
            oracle_implementation_status
        ) = OracleController_oracle_implementation_status_storage.read(oracle_address)

        if storage_idx == oracle_addresses_len:
            return (output_idx, oracle_addresses)
        end

        if oracle_implementation_status.is_active == TRUE:
            assert [oracle_addresses + output_idx] = oracle_address
            let (
                recursed_oracle_addresses_len, recursed_oracle_addresses
            ) = build_active_oracle_implementation_addresses(
                oracle_addresses_len, oracle_addresses, storage_idx + 1, output_idx + 1
            )
            return (recursed_oracle_addresses_len, recursed_oracle_addresses)
        else:
            let (
                recursed_oracle_addresses_len, recursed_oracle_addresses
            ) = build_active_oracle_implementation_addresses(
                oracle_addresses_len, oracle_addresses, storage_idx + 1, output_idx
            )
            return (recursed_oracle_addresses_len, recursed_oracle_addresses)
        end
    end

    #
    # Oracle Implementation Controller Functions
    #

    func get_entries{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        pair_id : felt, sources_len : felt, sources : felt*
    ) -> (entries_len : felt, entries : Entry*):
        alloc_locals

        let (primary_oracle_implementation_address) = get_primary_oracle_implementation_address()

        let (entries_len, entries) = IOracleImplementation.get_entries(
            primary_oracle_implementation_address, pair_id, sources_len, sources
        )
        return (entries_len, entries)
    end

    func get_entry{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        pair_id : felt, source
    ) -> (entry : Entry):
        alloc_locals

        let (primary_oracle_implementation_address) = get_primary_oracle_implementation_address()

        let (entry) = IOracleImplementation.get_entry(
            primary_oracle_implementation_address, pair_id, source
        )
        return (entry)
    end

    func get_value{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        pair_id : felt, aggregation_mode : felt, sources_len : felt, sources : felt*
    ) -> (
        value : felt, decimals : felt, last_updated_timestamp : felt, num_sources_aggregated : felt
    ):
        alloc_locals

        let (
            primary_oracle_implementation_address
        ) = OracleController_primary_oracle_implementation_address_storage.read()
        let (decimals) = get_decimals(pair_id)

        with_attr error_message("OracleController: pair_id not found"):
            assert_not_zero(decimals)
        end

        let (
            value, last_updated_timestamp, num_sources_aggregated
        ) = IOracleImplementation.get_value(
            primary_oracle_implementation_address, pair_id, aggregation_mode, sources_len, sources
        )
        return (value, decimals, last_updated_timestamp, num_sources_aggregated)
    end

    func publish_entry{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        new_entry : Entry
    ):
        alloc_locals

        let (publisher_registry_address) = get_publisher_registry_address()
        let (publisher_address) = IPublisherRegistry.get_publisher_address(
            publisher_registry_address, new_entry.publisher
        )
        let (caller_address) = get_caller_address()

        with_attr error_message("OracleController: Transaction not from publisher account"):
            assert caller_address = publisher_address
        end

        let (total_oracle_addresses_len) = OracleController_oracle_implementations_len_storage.read(
            )
        if total_oracle_addresses_len == 0:
            return ()
        end
        let (local oracle_addresses) = alloc()
        let (oracle_addresses_len, oracle_addresses) = build_active_oracle_implementation_addresses(
            total_oracle_addresses_len, oracle_addresses, 0, 0
        )
        _publish_entry_for_oracle_addresses(oracle_addresses_len, oracle_addresses, 0, new_entry)

        SubmittedEntry.emit(new_entry)
        return ()
    end

    func _publish_entry_for_oracle_addresses{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
    }(oracle_addresses_len : felt, oracle_addresses : felt*, idx : felt, new_entry : Entry):
        if oracle_addresses_len == 0:
            return ()
        end

        if idx == oracle_addresses_len:
            return ()
        end

        let oracle_address = [oracle_addresses + idx]
        IOracleImplementation.publish_entry(oracle_address, new_entry)
        _publish_entry_for_oracle_addresses(
            oracle_addresses_len, oracle_addresses, idx + 1, new_entry
        )
        return ()
    end

    func publish_entries{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        new_entries_len : felt, new_entries : Entry*
    ):
        if new_entries_len == 0:
            return ()
        end

        publish_entry([new_entries])
        publish_entries(new_entries_len - 1, new_entries + Entry.SIZE)

        return ()
    end
end
