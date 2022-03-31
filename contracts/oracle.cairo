%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin
from starkware.starknet.common.syscalls import get_caller_address, get_block_timestamp
from starkware.cairo.common.signature import verify_ecdsa_signature
from starkware.cairo.common.math import assert_lt

from contracts.signature import (
    assert_valid_entry_signature, assert_valid_publisher_registration_signature)
from contracts.entry import Entry

@storage_var
func entry_storage(asset : felt) -> (entry : Entry):
end

@storage_var
func publisher_key_storage(publisher : felt) -> (public_key : felt):
end

@external
func register_publisher{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(
        public_key : felt, publisher : felt, signature_r : felt, signature_s : felt):
    assert_valid_publisher_registration_signature(public_key, publisher, signature_r, signature_s)

    publisher_key_storage.write(publisher, public_key)
    return ()
end

@view
func get_publisher_key{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        publisher : felt) -> (publisher_key : felt):
    let (publisher_key) = publisher_key_storage.read(publisher)
    return (publisher_key)
end

@external
func update_price{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(new_entry : Entry, signature_r : felt, signature_s : felt):
    let (publisher_key) = publisher_key_storage.read(new_entry.publisher)
    assert_valid_entry_signature(publisher_key, signature_r, signature_s, new_entry)

    let (last_entry) = entry_storage.read(new_entry.asset)

    with_attr error_message(
            "Received price update transaction with older timestamp than current entry"):
        assert_lt(last_entry.timestamp, new_entry.timestamp)
    end

    entry_storage.write(new_entry.asset, new_entry)
    return ()
end

@view
func get_price{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(asset : felt) -> (
        entry : Entry):
    let (entry) = entry_storage.read(asset)
    return (entry)
end
