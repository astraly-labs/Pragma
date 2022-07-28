%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin

from contracts.publisher_registry.library import (
    Publisher_get_publisher_address,
    Publisher_get_all_publishers,
    Publisher_update_publisher_address,
    Publisher_register_publisher,
)
from contracts.admin.library import (
    Admin_initialize_admin_address,
    Admin_get_admin_address,
    Admin_set_admin_address,
    Admin_only_admin,
)

#
# Constructor
#

@constructor
func constructor{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    admin_address : felt
):
    Admin_initialize_admin_address(admin_address)
    return ()
end

#
# Getters
#

@view
func get_admin_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
    admin_address : felt
):
    let (admin_address) = Admin_get_admin_address()
    return (admin_address)
end

@view
func get_publisher_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    publisher : felt
) -> (publisher_address : felt):
    let (publisher_address) = Publisher_get_publisher_address(publisher)
    return (publisher_address)
end

@view
func get_all_publishers{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
    publishers_len : felt, publishers : felt*
):
    let (publishers_len, publishers) = Publisher_get_all_publishers()
    return (publishers_len, publishers)
end

#
# Setters
#

@external
func set_admin_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    new_address : felt
):
    Admin_only_admin()
    Admin_set_admin_address(new_address)
    return ()
end

@external
func register_publisher{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    publisher : felt, publisher_address : felt
):
    Admin_only_admin()
    Publisher_register_publisher(publisher, publisher_address)
    return ()
end

@external
func update_publisher_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    publisher : felt, new_address : felt
):
    Publisher_update_publisher_address(publisher, new_address)
    return ()
end
