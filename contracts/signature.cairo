from contracts.entry import Entry, hash_entry
from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin
from starkware.cairo.common.signature import verify_ecdsa_signature
from starkware.cairo.common.hash import hash2

func assert_valid_entry_signature{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(
        publisher_public_key : felt, signature_r : felt, signature_s : felt, entry : Entry):
    alloc_locals

    let (local hash) = hash_entry(entry)

    verify_ecdsa_signature(hash, publisher_public_key, signature_r, signature_s)
    return ()
end

func assert_valid_publisher_registration_signature{ecdsa_ptr : SignatureBuiltin*}(
        publisher_public_key : felt, publisher : felt, signature_r : felt, signature_s : felt):
    verify_ecdsa_signature(publisher, publisher_public_key, signature_r, signature_s)
    return ()
end
