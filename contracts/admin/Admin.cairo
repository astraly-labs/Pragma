%lang starknet

from contracts.account.library import (
    Admin_get_admin_address, Admin_only_admin, Admin_set_admin_address)

#
# Getters
#

@view
func get_admin_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
        admin_address : felt):
    let (admin_address) = Admin_get_admin_address()
    return (admin_address)
end

@view
func test_only_admin{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
        caller_address : felt):
    let (caller_address) = get_caller_address()
    Admin_only_admin()
    return (caller_address)
end

#
# Setters
#

@external
func set_admin_address{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        new_address : felt):
    Admin_only_admin()
    Admin_set_admin_address(new_address)
    return ()
end
