%lang starknet

@contract_interface
namespace IPublisherRegistry {
    //
    // Getters
    //
    func get_admin_address() -> (admin_address: felt) {
    }

    func get_publisher_address(publisher: felt) -> (publisher_address: felt) {
    }

    func get_all_publishers() -> (publishers_len: felt, publishers: felt*) {
    }

    func get_publisher_sources(publisher) -> (sources_len: felt, sources: felt*) {
    }

    func can_publish_source(publisher, source) -> (is_valid: felt) {
    }

    //
    // Setters
    //

    func set_admin_address(new_address: felt) {
    }

    func add_publisher(publisher: felt, publisher_address: felt) {
    }

    func update_publisher_address(publisher: felt, new_publisher_address: felt) {
    }

    func remove_publisher(publisher: felt) {
    }

    func add_source_for_publisher(publisher, source) {
    }

    func add_sources_for_publisher(publisher, sources_len, sources: felt*) {
    }

    func remove_source_for_publisher(publisher, source) {
    }
}
