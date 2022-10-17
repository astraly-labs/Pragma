%lang starknet

from starkware.starknet.common.syscalls import get_caller_address
from starkware.cairo.common.cairo_builtins import HashBuiltin

//
// Storage
//

@storage_var
func Admin_admin_address_storage() -> (admin_address: felt) {
}

//
// Events
//

@event
func UpdatedAdminAddress(old_admin_address: felt, new_admin_address: felt) {
}

namespace Admin {
    //
    // Initializer
    //

    func initialize_admin_address{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        admin_address: felt
    ) {
        let (existing_admin_address) = Admin_admin_address_storage.read();
        with_attr error_message("Admin: Admin address is already initialized") {
            assert existing_admin_address = 0;
        }

        Admin_admin_address_storage.write(admin_address);
        return ();
    }

    //
    // Getters
    //

    func get_admin_address{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
        admin_address: felt
    ) {
        let (admin_address) = Admin_admin_address_storage.read();
        return (admin_address,);
    }

    //
    // Setters
    //

    func set_admin_address{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        new_address: felt
    ) {
        let (old_admin_address) = Admin_admin_address_storage.read();
        Admin_admin_address_storage.write(new_address);
        UpdatedAdminAddress.emit(old_admin_address, new_address);
        return ();
    }

    //
    // Guards
    //

    // @notice only allow admin address
    // @dev only allow callers with the Admin_admin_address_storage address to call method
    func only_admin{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() {
        let (caller_address) = get_caller_address();
        let (admin_address) = Admin_admin_address_storage.read();
        with_attr error_message("Admin: Called by non-admin contract") {
            assert caller_address = admin_address;
        }
        return ();
    }
}
