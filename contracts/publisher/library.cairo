%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin
from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.signature import verify_ecdsa_signature

from contracts.publisher.registration_library import (
    Publisher_Registration_assert_valid_registration_signature)

#
# Storage
#

@storage_var
func Publisher_publishers_storage(idx : felt) -> (publisher : felt):
end

@storage_var
func Publisher_num_publishers_storage() -> (num_publishers : felt):
end

@storage_var
func Publisher_public_key_storage(publisher : felt) -> (publisher_public_key : felt):
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
        num_publishers : felt, publisher_ptr : felt*):
    alloc_locals

    let (num_publishers) = Publisher_num_publishers_storage.read()
    let (local publisher_ptr) = alloc()

    if num_publishers == 0:
        return (num_publishers, publisher_ptr)
    end

    Publisher_build_publishers_array(num_publishers, 0, publisher_ptr)

    return (num_publishers, publisher_ptr)
end

#
# Setters
#

func Publisher_register_publisher{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(
        publisher_public_key : felt, publisher : felt, publisher_signature_r : felt,
        publisher_signature_s : felt, registration_signature_r : felt,
        registration_signature_s : felt):
    alloc_locals
    local ecdsa_ptr : SignatureBuiltin* = ecdsa_ptr

    with_attr error_message("Publisher registration signature is invalid"):
        Publisher_Registration_assert_valid_registration_signature(
            publisher_public_key, publisher, registration_signature_r, registration_signature_s)
    end

    verify_ecdsa_signature(
        publisher, publisher_public_key, publisher_signature_r, publisher_signature_s)

    let (existing_publisher_public_key) = Publisher_get_publisher_public_key(publisher)

    with_attr error_message("Publisher with this name already registered"):
        assert existing_publisher_public_key = 0
    end

    Publisher_add_publisher(publisher, publisher_public_key)

    return ()
end

#
# Helpers
#

func Publisher_add_publisher{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        publisher : felt, publisher_public_key : felt):
    let (num_publishers) = Publisher_num_publishers_storage.read()

    Publisher_num_publishers_storage.write(num_publishers + 1)
    Publisher_publishers_storage.write(num_publishers, publisher)  # 0-indexed, so write at len (not len+1)
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
