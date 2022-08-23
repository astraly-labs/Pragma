%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin

from contracts.publisher_registry.library import (
    Publisher_get_publisher_address,
    Publisher_get_all_publishers,
    Publisher_update_publisher_address,
    Publisher_register_publisher,
)
from contracts.admin.library import Admin

#
# Constructor
#

# @notice initialize the publisher registry
# @dev only the admin can add publisher's or change admin
# @param admin_address: the administrator's address
@constructor
func constructor{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    admin_address : felt
):
    Admin.initialize_admin_address(admin_address)
    return ()
end

#
# Getters
#

# @notice get address for admin
# @return admin_address: returns admin's address
@view
func get_admin_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
    admin_address : felt
):
    let (admin_address) = Admin.get_admin_address()
    return (admin_address)
end

# @notice get address for publisher
# @param publisher: identifier for publisher
# @return publisher_address: publisher's address
@view
func get_publisher_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    publisher : felt
) -> (publisher_address : felt):
    let (publisher_address) = Publisher_get_publisher_address(publisher)
    return (publisher_address)
end

# @notice get array of all publishers
# @return publishers_len: length of publisher's array
# @return publishers: pointer to first publisher in array
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

# @notice set the admin address for the contract
# @dev only admin can set this
# @param new_address: new address to set admin to
@external
func set_admin_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    new_address : felt
):
    Admin.only_admin()
    Admin.set_admin_address(new_address)
    return ()
end

# @notice register a new publisher
# @param publisher: name of publisher
# @param publisher_address: address of publisher
@external
func register_publisher{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    publisher : felt, publisher_address : felt
):
    Admin.only_admin()
    Publisher_register_publisher(publisher, publisher_address)
    return ()
end

# @notice update the address for a publisher
# @param publisher: the name of the publisher
# @param new_publisher_address: new address to set publisher to
@external
func update_publisher_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    publisher : felt, new_address : felt
):
    Publisher_update_publisher_address(publisher, new_address)
    return ()
end
