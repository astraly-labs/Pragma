#[contract]
use array::ArrayTrait;
use option::OptionTrait;

trait IPublisherRegistry {
    //
    //Getters
    //

    fn get_admin_address() -> felt;
    fn get_publisher_address(publisher: felt) -> felt;
    fn get_all_publishers() -> Array::<felt>;
    fn get_publisher_sources(publisher: felt) -> Array::<felt>;
    fn can_publish_source(publisher: felt, source: felt) -> bool;
    //
    //Setters
    //

    fn set_admin_address(new_address: felt);
    fn add_publisher(publisher: felt, publisher_address: felt);
    fn update_publisher_address(publisher: felt, new_publisher_address: felt);
    fn remove_publisher(publisher: felt);
    fn add_source_for_publisher(publisher: felt, source: felt);
    fn addsources_for_publisher(publisher: felt, sources: Array::<felt>);
    fn remove_source_for_publisher(publisher: felt, source: felt);
}
