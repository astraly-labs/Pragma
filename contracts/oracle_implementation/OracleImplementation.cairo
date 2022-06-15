%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.bool import TRUE, FALSE

from contracts.entry.structs import Entry
from contracts.oracle_implementation.library import (
    Oracle_set_default_decimals,
    Oracle_set_oracle_controller_address,
    Oracle_set_decimals,
    Oracle_get_decimals,
    Oracle_get_entries,
    Oracle_get_value,
    Oracle_get_value_for_publisher,
    Oracle_get_entry,
    Oracle_submit_entry,
)

#
# Constructor
#

@constructor
func constructor{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    oracle_controller_address : felt
):
    Oracle_set_default_decimals()
    Oracle_set_oracle_controller_address(oracle_controller_address)
    return ()
end

#
# Getters
#

@view
func get_decimals{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    key : felt
) -> (decimals : felt):
    let (decimals) = Oracle_get_decimals(key)
    return (decimals)
end

@view
func get_entries{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    publishers_len : felt, publishers : felt*, key : felt
) -> (entries_len : felt, entries : Entry*):
    let (entries_len, entries) = Oracle_get_entries(publishers_len, publishers, key)
    return (entries_len, entries)
end

@view
func get_value{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    publishers_len : felt, publishers : felt*, key : felt, aggregation_mode : felt
) -> (value : felt, last_updated_timestamp : felt):
    let (value, last_updated_timestamp) = Oracle_get_value(
        publishers_len, publishers, key, aggregation_mode
    )
    return (value, last_updated_timestamp)
end

@view
func get_value_for_publisher{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    publisher : felt, key : felt
) -> (value : felt, last_updated_timestamp : felt):
    let (value, last_updated_timestamp) = Oracle_get_value_for_publisher(publisher, key)
    return (value, last_updated_timestamp)
end

@view
func get_entry{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    key : felt, publisher : felt
) -> (entry : Entry):
    let (entry) = Oracle_get_entry(key, publisher)
    return (entry)
end

#
# Setters
#

@external
func set_oracle_controller_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(oracle_controller_address : felt):
    Oracle_set_oracle_controller_address(oracle_controller_address)
    return ()
end

@external
func set_decimals{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    key : felt, decimals : felt
):
    Oracle_set_decimals(key, decimals)
    return ()
end

@external
func submit_entry{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    new_entry : Entry
):
    Oracle_submit_entry(new_entry)
    return ()
end
