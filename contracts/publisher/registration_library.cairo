%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin
from starkware.cairo.common.signature import verify_ecdsa_signature
from starkware.cairo.common.hash import hash2

#
# Storage
#

@storage_var
func Publisher_Registration_key_storage() -> (publisher_registration_key : felt):
end

#
# Guards
#

func Publisher_Registration_assert_valid_registration_signature{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(
        publisher_public_key : felt, publisher : felt, signature_r : felt, signature_s : felt):
    alloc_locals

    let (local publisher_registration_key) = Publisher_Registration_key_storage.read()
    let (publisher_hash) = Publisher_Registration_hash_publisher(publisher_public_key, publisher)
    verify_ecdsa_signature(publisher_hash, publisher_registration_key, signature_r, signature_s)
    return ()
end

#
# Initializer
#

func Publisher_Registration_initialize_key{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        publisher_registration_key : felt):
    Publisher_Registration_key_storage.write(publisher_registration_key)
    return ()
end

#
# Setters
#

func Publisher_Registration_rotate_key{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(old_key : felt, new_key : felt, signature_r : felt, signature_s : felt):
    verify_ecdsa_signature(new_key, old_key, signature_r, signature_s)
    Publisher_Registration_key_storage.write(new_key)
    return ()
end

#
# Helpers
#

func Publisher_Registration_hash_publisher{pedersen_ptr : HashBuiltin*}(
        publisher_public_key : felt, publisher : felt) -> (publisher_hash : felt):
    let (publisher_hash) = hash2{hash_ptr=pedersen_ptr}(publisher_public_key, publisher)
    return (publisher_hash)
end
