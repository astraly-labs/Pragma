%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin

from contracts.entry.library import Entry
from contracts.oracle.library import (
    Oracle_set_decimals, Oracle_submit_entry, Oracle_get_entries_for_key, Oracle_get_value,
    Oracle_submit_many_entries, Oracle_get_decimals)
from contracts.publisher.registration_library import (
    Publisher_Registration_rotate_key, Publisher_Registration_initialize_key)
from contracts.publisher.library import (
    Publisher_register_publisher, Publisher_get_publisher_public_key,
    Publisher_rotate_publisher_key)

const DECIMALS = 10

@constructor
func constructor{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        publisher_registration_key : felt):
    Oracle_set_decimals(DECIMALS)
    Publisher_Registration_initialize_key(publisher_registration_key)
    return ()
end

#
# Publisher
#

@view
func get_publisher_public_key{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        publisher : felt) -> (publisher_public_key : felt):
    let (publisher_public_key) = Publisher_get_publisher_public_key(publisher)
    return (publisher_public_key)
end

@external
func rotate_publisher_registration_key{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(old_key : felt, new_key : felt, signature_r : felt, signature_s : felt):
    Publisher_Registration_rotate_key(old_key, new_key, signature_r, signature_s)
    return ()
end

@external
func rotate_publisher_key{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(
        publisher : felt, old_key : felt, new_key : felt, signature_r : felt, signature_s : felt):
    Publisher_rotate_publisher_key(publisher, old_key, new_key, signature_r, signature_s)
    return ()
end

@external
func register_publisher{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(
        publisher_public_key : felt, publisher : felt, publisher_signature_r : felt,
        publisher_signature_s : felt, registration_signature_r : felt,
        registration_signature_s : felt):
    Publisher_register_publisher(
        publisher_public_key,
        publisher,
        publisher_signature_r,
        publisher_signature_s,
        registration_signature_r,
        registration_signature_s)
    return ()
end

#
# Oracle
#

@view
func get_decimals{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
        decimals : felt):
    let (decimals) = Oracle_get_decimals()
    return (decimals)
end

@view
func get_entries_for_key{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        key : felt) -> (entries_len : felt, entries : Entry*):
    let (entries_len, entries) = Oracle_get_entries_for_key(key)
    return (entries_len, entries)
end

@view
func get_value{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(key : felt) -> (
        value : felt, last_updated_timestamp : felt):
    let (value, last_updated_timestamp) = Oracle_get_value(key)
    return (value, last_updated_timestamp)
end

@external
func submit_entry{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(new_entry : Entry, signature_r : felt, signature_s : felt):
    Oracle_submit_entry(new_entry, signature_r, signature_s)
    return ()
end

@external
func submit_many_entries{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(
        new_entries_len : felt, new_entries : Entry*, signatures_r_len : felt, signatures_r : felt*,
        signatures_s_len : felt, signatures_s : felt*):
    Oracle_submit_many_entries(
        new_entries_len,
        new_entries,
        signatures_r_len,
        signatures_r,
        signatures_s_len,
        signatures_s)
    return ()
end
