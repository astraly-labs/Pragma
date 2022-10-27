%lang starknet

@contract_interface
namespace IAdmin {
    //
    // Getters
    //

    func get_admin_address() -> (admin_address: felt) {
    }

    //
    // Setters
    //

    func set_admin_address(new_address: felt) {
    }
}
