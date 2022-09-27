%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.starknet.common.syscalls import get_caller_address

from admin.library import Admin

//
// Getters
//

// @notice get current admin address
// @return admin_address: address of current admin
@view
func get_admin_address{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
    admin_address: felt
) {
    let (admin_address) = Admin.get_admin_address();
    return (admin_address,);
}

@view
func test_only_admin{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
    caller_address: felt
) {
    let (caller_address) = get_caller_address();
    Admin.only_admin();
    return (caller_address,);
}

//
// Setters
//

// @notice set admin address for contract
// @param new_address: address to set admin to
@external
func set_admin_address{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    new_address: felt
) {
    Admin.only_admin();
    Admin.set_admin_address(new_address);
    return ();
}
