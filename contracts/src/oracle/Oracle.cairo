%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.math import assert_not_zero

from entry.structs import Currency, Entry, Pair
from oracle.library import Oracle
from proxy.library import Proxy

#
# Constructor
#

# @param proxy_admin: admin for contract
# @param publisher_registry_address: registry for publishers
# @param keys_decimals_len: length of array of keys to decimals
# @param keys_decimals: pointer to first element in an array of structs assigning decimals to each key in Oracle_decimals_storage
@external
func initializer{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    proxy_admin : felt,
    publisher_registry_address : felt,
    currencies_len : felt,
    currencies : Currency*,
    pairs_len : felt,
    pairs : Pair*,
):
    Proxy.initializer(proxy_admin)
    Oracle.initialize_oracle(
        publisher_registry_address, currencies_len, currencies, pairs_len, pairs
    )
    return ()
end

#
# Getters
#

# @notice get array of Entries for a key
# @param sources_len: the length of the array to fetch
# @param sources: array of sources to use when fetching Entries
# @return entries_len: length of array
# @return entries: pointer to first element in Entry array
@view
func get_entries{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    pair_id : felt, sources_len : felt, sources : felt*
) -> (entries_len : felt, entries : Entry*):
    let (entries_len, entries) = Oracle.get_entries(pair_id, sources_len, sources)
    return (entries_len, entries)
end

# @notice get entry by key and source
# @param key: the key to fetch Entries for
# @param source: the source to use for Entry
# @return entry: Entry for key and source
@view
func get_entry{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    pair_id : felt, source : felt
) -> (entry : Entry):
    let (entry) = Oracle.get_entry(pair_id, source)
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
    pair_id : felt, aggregation_mode : felt
) -> (value : felt, decimals : felt, last_updated_timestamp : felt, num_sources_aggregated : felt):
    let (sources) = alloc()
    let (value, decimals, last_updated_timestamp, num_sources_aggregated) = Oracle.get_value(
        pair_id, aggregation_mode, 0, sources
    )
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
    pair_id : felt, aggregation_mode : felt, sources_len : felt, sources : felt*
) -> (value : felt, decimals : felt, last_updated_timestamp : felt, num_sources_aggregated : felt):
    let (value, decimals, last_updated_timestamp, num_sources_aggregated) = Oracle.get_value(
        pair_id, aggregation_mode, sources_len, sources
    )
    return (value, decimals, last_updated_timestamp, num_sources_aggregated)
end

# @notice publish an Entry
# @param new_entry: an Entry to publish
@external
func publish_entry{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    new_entry : Entry
):
    Oracle.publish_entry(new_entry)
    return ()
end

# @notice publish an array of entries
# @param new_entries_len: length of entries array
# @param new_entries: pointer to first Entry in array
@external
func publish_entries{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    new_entries_len : felt, new_entries : Entry*
):
    Oracle.publish_entries(new_entries_len, new_entries)
    return ()
end

#
# Getters
#

# @notice get address of publisher registry
# @return publisher_registry_address: address of the publisher registry
@view
func get_publisher_registry_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}() -> (publisher_registry_address : felt):
    let (publisher_registry_address) = Oracle.get_publisher_registry_address()
    return (publisher_registry_address)
end

# @notice get number of decimals used in the asset value
# @param key: the key of the asset
# @return decimals: the number of decimals
@view
func get_decimals{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    pair_id : felt
) -> (decimals : felt):
    let (decimals) = Oracle.get_decimals(pair_id)
    return (decimals)
end

#
# Setters
#

@external
func update_publisher_registry_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(publisher_registry_address : felt):
    Proxy.assert_only_admin()
    Oracle.update_publisher_registry_address(publisher_registry_address)
    return ()
end

@external
func add_currency{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    currency : Currency
):
    Proxy.assert_only_admin()
    Oracle.add_currency(currency)
    return ()
end

@external
func update_currency{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    currency : Currency
):
    Proxy.assert_only_admin()
    Oracle.update_currency(currency)
    return ()
end

@external
func add_pair{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(pair : Pair):
    Proxy.assert_only_admin()
    Oracle.add_pair(pair)
    return ()
end

#
# Upgrades
#

@external
func upgrade{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    new_implementation : felt
):
    Proxy.assert_only_admin()
    Proxy._set_implementation_hash(new_implementation)
    return ()
end

@external
func set_admin_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    new_admin_address : felt
):
    Proxy.assert_only_admin()
    Proxy._set_admin_address(new_admin_address)
    return ()
end

@view
func get_implementation_hash{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    ) -> (address : felt):
    let (address) = Proxy.get_implementation_hash()
    return (address)
end

# @notice get address for admin
# @return admin_address: returns admin's address
@view
func get_admin_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
    admin_address : felt
):
    let (admin_address) = Proxy.get_admin_address()
    return (admin_address)
end
