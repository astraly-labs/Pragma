%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin
from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.signature import verify_ecdsa_signature
from starkware.cairo.common.hash import hash2

#
# Storage
#

@storage_var
func Publisher_admin_public_key_storage() -> (admin_public_key : felt):
end

@storage_var
func Publisher_public_key_storage(publisher : felt) -> (publisher_public_key : felt):
end

@storage_var
func Publisher_publishers_len_storage() -> (publishers_len : felt):
end

@storage_var
func Publisher_publishers_storage(idx : felt) -> (publisher : felt):
end

#
# Initializer
#

func Publisher_initialize_admin_public_key{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(admin_public_key : felt):
    let (existing_admin_public_key) = Publisher_admin_public_key_storage.read()
    with_attr error_message("Admin public key is already initialized"):
        assert existing_admin_public_key = 0
    end

    Publisher_admin_public_key_storage.write(admin_public_key)
    return ()
end

#
# Getters
#

func Publisher_get_publisher_public_key{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(publisher : felt) -> (
        publisher_public_key : felt):
    let (publisher_public_key) = Publisher_public_key_storage.read(publisher)
    return (publisher_public_key)
end

func Publisher_get_all_publishers{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
        publishers_len : felt, publishers : felt*):
    alloc_locals

    let (publishers_len) = Publisher_publishers_len_storage.read()
    let (local publishers) = alloc()

    if publishers_len == 0:
        return (publishers_len, publishers)
    end

    Publisher_build_publishers_array(publishers_len, 0, publishers)

    return (publishers_len, publishers)
end

#
# Guards
#

func Publisher_assert_valid_admin_signature{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(
        publisher_public_key : felt, publisher : felt, signature_r : felt, signature_s : felt):
    alloc_locals

    let (local admin_public_key) = Publisher_admin_public_key_storage.read()
    let (publisher_hash) = Publisher_hash_publisher(publisher_public_key, publisher)

    with_attr error_message("Publisher admin signature is invalid"):
        verify_ecdsa_signature(publisher_hash, admin_public_key, signature_r, signature_s)
    end

    return ()
end

#
# Setters
#

func Publisher_rotate_admin_public_key{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(new_key : felt, old_key : felt, signature_r : felt, signature_s : felt):
    with_attr error_message("Signature on admin public key rotation is invalid"):
        verify_ecdsa_signature(new_key, old_key, signature_r, signature_s)
    end
    Publisher_admin_public_key_storage.write(new_key)
    return ()
end

func Publisher_register_publisher{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(
        publisher_public_key : felt, publisher : felt, signature_r : felt, signature_s : felt):
    alloc_locals

    Publisher_assert_valid_admin_signature(
        publisher_public_key, publisher, signature_r, signature_s)

    let (existing_publisher_public_key) = Publisher_get_publisher_public_key(publisher)

    with_attr error_message("Publisher with this name already registered"):
        assert existing_publisher_public_key = 0
    end

    Publisher_add_publisher(publisher, publisher_public_key)

    return ()
end

func Publisher_rotate_publisher_public_key{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(
        publisher : felt, new_key : felt, old_key : felt, signature_r : felt, signature_s : felt):
    let (old_stored_publisher_key) = Publisher_public_key_storage.read(publisher)
    with_attr error_message("Old key does not match current public key for publisher"):
        assert old_stored_publisher_key = old_key
    end

    with_attr error_message("Publisher signature on new key invalid"):
        verify_ecdsa_signature(new_key, old_key, signature_r, signature_s)
    end

    Publisher_public_key_storage.write(publisher, new_key)
    return ()
end

#
# Helpers
#

func Publisher_hash_publisher{pedersen_ptr : HashBuiltin*}(
        publisher_public_key : felt, publisher : felt) -> (publisher_hash : felt):
    let (publisher_hash) = hash2{hash_ptr=pedersen_ptr}(publisher_public_key, publisher)
    return (publisher_hash)
end

func Publisher_add_publisher{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        publisher : felt, publisher_public_key : felt):
    let (publishers_len) = Publisher_publishers_len_storage.read()

    Publisher_publishers_len_storage.write(publishers_len + 1)
    Publisher_publishers_storage.write(publishers_len, publisher)  # 0-indexed, so write at old_len (not new_len=len+1)
    Publisher_public_key_storage.write(publisher, publisher_public_key)
    return ()
end

func Publisher_build_publishers_array{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        num_publishers : felt, idx : felt, publisher_ptr : felt*) -> (publisher_ptr : felt*):
    let (new_value) = Publisher_publishers_storage.read(idx)
    assert [publisher_ptr + idx] = new_value

    if idx == num_publishers:
        return (publisher_ptr)
    end

    Publisher_build_publishers_array(num_publishers, idx + 1, publisher_ptr)

    return (publisher_ptr)
end
