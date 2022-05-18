%lang starknet

from contracts.account.library import (
    Admin_get_admin_address, Admin_only_admin, Admin_set_admin_address)

#
# Getters
#

@view
func get_admin_address{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}() -> (admin_address : felt):
    let (admin_address) = Admin_get_admin_address()
    return (admin_address)
end

#
# Setters
#

@external
func set_admin_address{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(new_address : felt):
    Admin_only_admin()
    Admin_set_admin_address(new_address)
    return ()
end
