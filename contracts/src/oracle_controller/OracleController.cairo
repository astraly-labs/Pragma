%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.alloc import alloc

from entry.structs import Entry
from oracle_controller.library import OracleController
from oracle_controller.structs import OracleController_OracleImplementationStatus, KeyDecimalStruct

<<<<<<< HEAD
=======
from oracle_controller.structs import OracleController_OracleImplementationStatus, KeyDecimalStruct
>>>>>>> 877cd83 (linted)
from admin.library import Admin

#
# Constructor
#

# @param admin_address: admin for contract
# @param publisher_registry_address: registry for publishers
# @param keys_decimals_len: length of array of keys to decimals
# @param keys_decimals: pointer to first element in an array of structs assigning decimals to each key in OracleController_decimals_storage
@constructor
func constructor{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    admin_address : felt,
    publisher_registry_address : felt,
    keys_decimals_len : felt,
    keys_decimals : KeyDecimalStruct*,
):
    Admin.initialize_admin_address(admin_address)
    OracleController.initialize_oracle_controller(
        publisher_registry_address, keys_decimals_len, keys_decimals
    )
    return ()
end

#
# Oracle Implementation Controller Functions
#

# @notice get array of Entries for a key
# @param sources_len: the length of the array to fetch
# @param sources: array of sources to use when fetching Entries
# @return entries_len: length of array
# @return entries: pointer to first element in Entry array
@view
func get_entries{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    key : felt, sources_len : felt, sources : felt*
) -> (entries_len : felt, entries : Entry*):
    let (entries_len, entries) = OracleController.get_entries(key, sources_len, sources)
    return (entries_len, entries)
end

# @notice get entry by key and source
# @param key: the key to fetch Entries for
# @param source: the source to use for Entry
# @return entry: Entry for key and source
@view
func get_entry{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    key : felt, source : felt
) -> (entry : Entry):
    let (entry) = OracleController.get_entry(key, source)
    return (entry)
end

# @notice get value by key and aggregation mode
# @param key: the key to fetch Entries for
# @param aggregation_mode: the mode of aggregation to use to find value
# @return value: the aggregated value
# @return decimals: the number of decimals in the Entry
# @return last_updated_timestamp: timestamp the Entries were last updated
# @return num_sources_aggregated: number of sources used in aggregation
@view
func get_value{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    key : felt, aggregation_mode : felt
) -> (value : felt, decimals : felt, last_updated_timestamp : felt, num_sources_aggregated : felt):
    let (sources) = alloc()
    let (
        value, decimals, last_updated_timestamp, num_sources_aggregated
    ) = OracleController.get_value(key, aggregation_mode, 0, sources)
    return (value, decimals, last_updated_timestamp, num_sources_aggregated)
end

# @notice get value for key for a set of sources
# @param key: the key to fetch Entries for
# @param aggregation_mode: the mode of aggregation to use to find value
# @param sources_len: the number of sources to use
# @param sources: point to first source in array
# @return value: the aggregated value
# @return decimals: the number of decimals in the Entry
# @return last_updated_timestamp: timestamp the Entries were last updated
# @return num_sources_aggregated: number of sources used in aggregation
@view
func get_value_for_sources{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    key : felt, aggregation_mode : felt, sources_len : felt, sources : felt*
) -> (value : felt, decimals : felt, last_updated_timestamp : felt, num_sources_aggregated : felt):
    let (
        value, decimals, last_updated_timestamp, num_sources_aggregated
    ) = OracleController.get_value(key, aggregation_mode, sources_len, sources)
    return (value, decimals, last_updated_timestamp, num_sources_aggregated)
end

# @notice publish an Entry
# @param new_entry: an Entry to publish
@external
func publish_entry{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    new_entry : Entry
):
    OracleController.publish_entry(new_entry)
    return ()
end

# @notice publish an array of entries
# @param new_entries_len: length of entries array
# @param new_entries: pointer to first Entry in array
@external
func publish_entries{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    new_entries_len : felt, new_entries : Entry*
):
    OracleController.publish_entries(new_entries_len, new_entries)
    return ()
end

#
# Getters
#

# @notice get address for admin
# @return admin_address: returns admin's address
@view
func get_admin_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
    admin_address : felt
):
    let (admin_address) = Admin.get_admin_address()
    return (admin_address)
end

# @notice get address of publisher registry
# @return publisher_registry_address: address of the publisher registry
@view
func get_publisher_registry_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}() -> (publisher_registry_address : felt):
    let (publisher_registry_address) = OracleController.get_publisher_registry_address()
    return (publisher_registry_address)
end

# @notice get list of active oracle implementations
# @return oracle_addresses_len: length of active oracle array
# @return oracle_addresses: pointer to first element in oracle array
@view
func get_active_oracle_implementation_addresses{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}() -> (oracle_addresses_len : felt, oracle_addresses : felt*):
    let (
        oracle_addresses_len, oracle_addresses
    ) = OracleController.get_active_oracle_implementation_addresses()
    return (oracle_addresses_len, oracle_addresses)
end

# @notice get status of an oracle implementation
# @param oracle_implementation_address: the address of an oracle implementation
# @return oracle_implementation_status: check if address is registered and active
@view
func get_oracle_implementation_status{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(oracle_implementation_address : felt) -> (
    oracle_implementation_status : OracleController_OracleImplementationStatus
):
    let (oracle_implementation_status) = OracleController.get_oracle_implementation_status(
        oracle_implementation_address
    )
    return (oracle_implementation_status)
end

# @notice get an oracle implementation by index
# @param idx: the index of the oracle implementation
# @return oracle_implementation_address: address of the oracle at this index
@view
func get_oracle_implementation_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(idx : felt) -> (oracle_implementation_address : felt):
    let (oracle_implementation_address) = OracleController.get_oracle_implementation_address(idx)
    return (oracle_implementation_address)
end

# @notice get the primary oracle implementation address
# @dev this gets the current oracle implementation
# @return primary_oracle_implementation_address: address of primary oracle
@view
func get_primary_oracle_implementation_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}() -> (primary_oracle_implementation_address : felt):
    let (
        primary_oracle_implementation_address
    ) = OracleController.get_primary_oracle_implementation_address()
    return (primary_oracle_implementation_address)
end

# @notice get number of decimals used in the asset value
# @param key: the key of the asset
# @return decimals: the number of decimals
@view
func get_decimals{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    key : felt
) -> (decimals : felt):
    let (decimals) = OracleController.get_decimals(key)
    return (decimals)
end

#
# Setters
#

@external
func set_admin_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    new_address : felt
):
    Admin.only_admin()
    Admin.set_admin_address(new_address)
    return ()
end

@external
func update_publisher_registry_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(publisher_registry_address : felt):
    Admin.only_admin()
    OracleController.update_publisher_registry_address(publisher_registry_address)
    return ()
end

@external
func add_oracle_implementation_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(oracle_implementation_address : felt):
    Admin.only_admin()
    OracleController.add_oracle_implementation_address(oracle_implementation_address)
    return ()
end

@external
func update_oracle_implementation_active_status{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(oracle_implementation_address : felt, is_active : felt):
    Admin.only_admin()
    OracleController.update_oracle_implementation_active_status(
        oracle_implementation_address, is_active
    )
    return ()
end

@external
func set_primary_oracle_implementation_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(primary_oracle_implementation_address : felt):
    Admin.only_admin()
    OracleController.set_primary_oracle_implementation_address(
        primary_oracle_implementation_address
    )
    return ()
end
