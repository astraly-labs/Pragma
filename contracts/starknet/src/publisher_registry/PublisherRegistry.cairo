%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin

from publisher_registry.library import Publisher
from admin.library import Admin

//
// Constructor
//

// @notice initialize the publisher registry
// @dev only the admin can add publisher's or change admin
// @param admin_address: the administrator's address
@constructor
func constructor{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    admin_address: felt
) {
    Admin.initialize_admin_address(admin_address);
    return ();
}

//
// Getters
//

// @notice get address for admin
// @return admin_address: returns admin's address
@view
func get_admin_address{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
    admin_address: felt
) {
    let (admin_address) = Admin.get_admin_address();
    return (admin_address,);
}

// @notice get address for publisher
// @param publisher: identifier for publisher
// @return publisher_address: publisher's address
@view
func get_publisher_address{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    publisher: felt
) -> (publisher_address: felt) {
    let (publisher_address) = Publisher.get_publisher_address(publisher);
    return (publisher_address,);
}

// @notice get array of all publishers
// @return publishers_len: length of publisher's array
// @return publishers: pointer to first publisher in array
@view
func get_all_publishers{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
    publishers_len: felt, publishers: felt*
) {
    let (publishers_len, publishers) = Publisher.get_all_publishers();
    return (publishers_len, publishers);
}

@view
func get_publisher_sources{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    publisher
) -> (sources_len: felt, sources: felt*) {
    let (sources_len, sources) = Publisher.get_publisher_sources(publisher);
    return (sources_len, sources);
}

@view
func can_publish_source{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    publisher, source
) -> (is_valid: felt) {
    let (is_valid) = Publisher.can_publish_source(publisher, source);
    return (is_valid,);
}

//
// Setters
//

// @notice set the admin address for the contract
// @dev only admin can set this
// @param new_address: new address to set admin to
@external
func set_admin_address{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    new_address: felt
) {
    Admin.only_admin();
    Admin.set_admin_address(new_address);
    return ();
}

// @notice add a new publisher
// @param publisher: name of publisher
// @param publisher_address: address of publisher
@external
func add_publisher{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    publisher: felt, publisher_address: felt
) {
    Admin.only_admin();
    Publisher.add_publisher(publisher, publisher_address);
    return ();
}

@external
func remove_publisher{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    publisher: felt
) {
    Admin.only_admin();
    Publisher.remove_publisher(publisher);
    return ();
}

// @notice update the address for a publisher
// @param publisher: the name of the publisher
// @param new_publisher_address: new address to set publisher to
@external
func update_publisher_address{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    publisher: felt, new_publisher_address: felt
) {
    Publisher.update_publisher_address(publisher, new_publisher_address);
    return ();
}

@external
func add_source_for_publisher{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    publisher, source
) {
    Admin.only_admin();
    Publisher.add_source_for_publisher(publisher, source);
    return ();
}

@external
func add_sources_for_publisher{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    publisher, sources_len, sources: felt*
) {
    Admin.only_admin();
    Publisher.add_sources_for_publisher(publisher, sources_len, sources);
    return ();
}

@external
func remove_source_for_publisher{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    publisher, source
) {
    Admin.only_admin();
    Publisher.remove_source_for_publisher(publisher, source);
    return ();
}
