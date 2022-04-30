%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin
from starkware.cairo.common.bool import TRUE, FALSE

from contracts.entry.structs import Entry
from contracts.oracle.library import (
    Oracle_set_decimals, Oracle_set_oracle_proxy_address, Oracle_get_decimals,
    Oracle_get_entries_for_key, Oracle_get_value, Oracle_submit_entry)

const DECIMALS = 18

#
# Constructor
#

@constructor
func constructor{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        admin_public_key : felt):
    Oracle_set_decimals(DECIMALS)
    Oracle_set_oracle_proxy_address(admin_public_key)
    return ()
end

#
# Getters
#

@view
func get_decimals{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
        decimals : felt):
    let (decimals) = Oracle_get_decimals()
    return (decimals)
end

@view
func get_entries_for_key{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        publishers_len : felt, publishers : felt*, key : felt) -> (
        entries_len : felt, entries : Entry*):
    let (entries_len, entries) = Oracle_get_entries_for_key(publishers_len, publishers, key)
    return (entries_len, entries)
end

@view
func get_value{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        publishers_len : felt, publishers : felt*, key : felt) -> (
        value : felt, last_updated_timestamp : felt):
    let (value, last_updated_timestamp) = Oracle_get_value(publishers_len, publishers, key)
    return (value, last_updated_timestamp)
end

#
# Setters
#

@external
func set_oracle_proxy_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        oracle_proxy_address : felt):
    Oracle_set_oracle_proxy_address(oracle_proxy_address)
    return ()
end

@external
func submit_entry{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(new_entry : Entry):
    Oracle_submit_entry(new_entry, TRUE)
    return ()
end

# For when the caller wants to submit many and not fail if one of them fails
@external
func submit_entry_no_assert{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(new_entry : Entry):
    Oracle_submit_entry(new_entry, FALSE)
    return ()
end
