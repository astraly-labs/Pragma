%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin
from starkware.cairo.common.alloc import alloc

from contracts.signature import assert_valid_publisher_registration_signature

@storage_var
func publishers_storage(idx : felt) -> (publisher : felt):
end

@storage_var
func num_publishers_storage() -> (num_publishers : felt):
end

@storage_var
func publisher_public_key_storage(publisher : felt) -> (publisher_public_key : felt):
end

func add_publisher{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        publisher : felt, publisher_public_key : felt):
    let (num_publishers) = num_publishers_storage.read()

    num_publishers_storage.write(num_publishers + 1)
    publishers_storage.write(num_publishers, publisher)  # 0-indexed, so write at len (not len+1)
    publisher_public_key_storage.write(publisher, publisher_public_key)
    return ()
end

@external
func register_publisher{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(
        publisher_public_key : felt, publisher : felt, signature_r : felt, signature_s : felt):
    alloc_locals
    local ecdsa_ptr : SignatureBuiltin* = ecdsa_ptr

    assert_valid_publisher_registration_signature(
        publisher_public_key, publisher, signature_r, signature_s)

    let (existing_publisher_public_key) = get_publisher_public_key(publisher)

    with_attr error_message("Publisher with this name already registered"):
        assert existing_publisher_public_key = 0
    end

    add_publisher(publisher, publisher_public_key)

    return ()
end

@view
func get_publisher_public_key{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        publisher : felt) -> (publisher_public_key : felt):
    let (publisher_public_key) = publisher_public_key_storage.read(publisher)
    return (publisher_public_key)
end

func get_all_publishers{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
        num_publishers : felt, publisher_ptr : felt*):
    alloc_locals

    let (num_publishers) = num_publishers_storage.read()
    let (local publisher_ptr) = alloc()

    if num_publishers == 0:
        return (num_publishers, publisher_ptr)
    end

    build_publishers_array(num_publishers, 0, publisher_ptr)

    return (num_publishers, publisher_ptr)
end

func build_publishers_array{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        num_publishers : felt, idx : felt, publisher_ptr : felt*) -> (publisher_ptr : felt*):
    let (new_value) = publishers_storage.read(idx)
    assert [publisher_ptr + idx] = new_value

    if idx == num_publishers:
        return (publisher_ptr)
    end

    build_publishers_array(num_publishers, idx + 1, publisher_ptr)

    return (publisher_ptr)
end
