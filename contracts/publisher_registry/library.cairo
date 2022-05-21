%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.signature import verify_ecdsa_signature
from starkware.cairo.common.hash import hash2
from starkware.starknet.common.syscalls import get_caller_address
from starkware.cairo.common.math import assert_not_zero

#
# Storage
#

@storage_var
func Publisher_publisher_address_storage(publisher : felt) -> (publisher_address : felt):
end

@storage_var
func Publisher_publishers_len_storage() -> (publishers_len : felt):
end

@storage_var
func Publisher_publishers_storage(idx : felt) -> (publisher : felt):
end

#
# Getters
#

func Publisher_get_publisher_address{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(publisher : felt) -> (
        publisher_address : felt):
    let (publisher_address) = Publisher_publisher_address_storage.read(publisher)
    return (publisher_address)
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

    Publisher_build_publishers_array(publishers_len, publishers, 0)

    return (publishers_len, publishers)
end

#
# Setters
#

func Publisher_register_publisher{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        publisher : felt, publisher_address : felt):
    let (existing_publisher_address) = Publisher_get_publisher_address(publisher)

    with_attr error_message("PublisherRegistry: Publisher with this name already registered"):
        assert existing_publisher_address = 0
    end

    Publisher_add_publisher(publisher, publisher_address)

    return ()
end

func Publisher_update_publisher_address{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        publisher : felt, new_publisher_address : felt):
    let (existing_publisher_address) = Publisher_get_publisher_address(publisher)
    let (caller_address) = get_caller_address()

    with_attr error_message("PublisherRegistry: Publisher with this name has not been registered"):
        assert_not_zero(existing_publisher_address)
    end

    with_attr error_message("PublisherRegistry: Only publisher can rotate their key"):
        assert caller_address = existing_publisher_address
    end

    Publisher_publisher_address_storage.write(publisher, new_publisher_address)
    return ()
end

#
# Helpers
#

func Publisher_add_publisher{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        publisher : felt, publisher_address : felt):
    let (publishers_len) = Publisher_publishers_len_storage.read()

    Publisher_publishers_len_storage.write(publishers_len + 1)
    Publisher_publishers_storage.write(publishers_len, publisher)  # 0-indexed, so write at old_len (not new_len=len+1)
    Publisher_publisher_address_storage.write(publisher, publisher_address)
    return ()
end

func Publisher_build_publishers_array{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        publishers_len : felt, publishers : felt*, idx : felt) -> (publishers : felt*):
    let (new_value) = Publisher_publishers_storage.read(idx)
    assert [publishers + idx] = new_value

    if idx == publishers_len:
        return (publishers)
    end

    Publisher_build_publishers_array(publishers_len, publishers, idx + 1)

    return (publishers)
end
