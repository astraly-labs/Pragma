// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts for Cairo v0.3.1 (upgrades/library.cairo)

%lang starknet

from starkware.starknet.common.syscalls import get_caller_address
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.bool import TRUE, FALSE
from starkware.cairo.common.math import assert_not_zero

//
// Events
//

@event
func Upgraded(implementation: felt) {
}

@event
func AdminAddressChanged(previousAdminAddress: felt, newAdminAddress: felt) {
}

//
// Storage variables
//

@storage_var
func Proxy_implementation_hash() -> (class_hash: felt) {
}

@storage_var
func Proxy_admin_address() -> (proxy_admin_address: felt) {
}

@storage_var
func Proxy_initialized() -> (initialized: felt) {
}

namespace Proxy {
    //
    // Initializer
    //

    func initializer{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        proxy_admin_address: felt
    ) {
        let (initialized) = Proxy_initialized.read();
        with_attr error_message("Proxy: contract already initialized") {
            assert initialized = FALSE;
        }

        Proxy_initialized.write(TRUE);
        _set_admin_address(proxy_admin_address);
        return ();
    }

    //
    // Guards
    //

    func assert_only_admin{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() {
        let (caller) = get_caller_address();
        let (admin_address) = Proxy_admin_address.read();
        with_attr error_message("Proxy: caller is not admin") {
            assert admin_address = caller;
        }
        return ();
    }

    //
    // Getters
    //

    func get_implementation_hash{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        ) -> (implementation: felt) {
        let (implementation) = Proxy_implementation_hash.read();
        return (implementation,);
    }

    func get_admin_address{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
        admin_address: felt
    ) {
        let (admin_address) = Proxy_admin_address.read();
        return (admin_address,);
    }

    //
    // Unprotected
    //

    func _set_admin_address{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        new_admin_address: felt
    ) {
        let (previous_admin_address) = get_admin_address();
        Proxy_admin_address.write(new_admin_address);
        AdminAddressChanged.emit(previous_admin_address, new_admin_address);
        return ();
    }

    //
    // Upgrade
    //

    func _set_implementation_hash{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        new_implementation: felt
    ) {
        with_attr error_message("Proxy: implementation hash cannot be zero") {
            assert_not_zero(new_implementation);
        }

        Proxy_implementation_hash.write(new_implementation);
        Upgraded.emit(new_implementation);
        return ();
    }
}
