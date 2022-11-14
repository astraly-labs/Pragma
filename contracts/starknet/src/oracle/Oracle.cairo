%lang starknet

from starkware.cairo.common.cairo_builtins import BitwiseBuiltin, HashBuiltin
from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.math import assert_not_zero

from entry.structs import Currency, GenericEntry, FutureEntry, SpotEntry, Pair, Checkpoint
from oracle.library import Oracle
from proxy.library import Proxy

const MEDIAN = 120282243752302;  // str_to_felt("MEDIAN")

//
// Constructor
//

// @param proxy_admin: admin for contract
// @param publisher_registry_address: registry for publishers
// @param keys_decimals_len: length of array of keys to decimals
// @param keys_decimals: pointer to first element in an array of structs assigning decimals to each key in Oracle_decimals_storage
@external
func initializer{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    proxy_admin: felt,
    publisher_registry_address: felt,
    currencies_len: felt,
    currencies: Currency*,
    pairs_len: felt,
    pairs: Pair*,
) {
    Proxy.initializer(proxy_admin);
    Oracle.initialize_oracle(
        publisher_registry_address, currencies_len, currencies, pairs_len, pairs
    );
    return ();
}

//
// Getters
//

// @notice get array of Entries for a key
// @param sources_len: the length of the array to fetch
// @param sources: array of sources to use when fetching Entries
// @return entries_len: length of array
// @return entries: pointer to first element in Entry array
@view
func get_spot_entries_for_sources{
    bitwise_ptr: BitwiseBuiltin*, syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(pair_id: felt, sources_len: felt, sources: felt*) -> (entries_len: felt, entries: SpotEntry*) {
    let (entries_len, entries, _) = Oracle.get_spot_entries(pair_id, sources_len, sources);
    return (entries_len, entries);
}

@view
func get_spot_entries{
    bitwise_ptr: BitwiseBuiltin*, syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(pair_id: felt) -> (entries_len: felt, entries: SpotEntry*) {
    let (all_sources_len, all_sources) = Oracle.get_all_sources(pair_id);
    return get_spot_entries_for_sources(pair_id, all_sources_len, all_sources);
}

// @notice get entry by key and source
// @param key: the key to fetch Entries for
// @param source: the source to use for Entry
// @return entry: Entry for key and source
@view
func get_spot_entry{
    bitwise_ptr: BitwiseBuiltin*, syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(pair_id: felt, source: felt) -> (entry: SpotEntry) {
    let (entry) = Oracle.get_spot_entry(pair_id, source);
    return (entry,);
}

// @notice get entry by key and source
// @param key: the key to fetch Entries for
// @param source: the source to use for Entry
// @return entry: Entry for key and source
@view
func get_future_entry{
    bitwise_ptr: BitwiseBuiltin*, syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(pair_id, expiry_timestamp, source) -> (entry: FutureEntry) {
    let (entry) = Oracle.get_future_entry(pair_id, expiry_timestamp, source);
    return (entry,);
}

@view
func get_spot_median{
    bitwise_ptr: BitwiseBuiltin*, syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(pair_id: felt) -> (
    price: felt, decimals: felt, last_updated_timestamp: felt, num_sources_aggregated: felt
) {
    return get_spot(pair_id, MEDIAN);
}

@view
func get_spot_median_for_sources{
    bitwise_ptr: BitwiseBuiltin*, syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(pair_id: felt, sources_len: felt, sources: felt*) -> (
    price: felt, decimals: felt, last_updated_timestamp: felt, num_sources_aggregated: felt
) {
    return get_spot_for_sources{bitwise_ptr=bitwise_ptr}(pair_id, MEDIAN, sources_len, sources);
}

// @notice get value by key and aggregation mode
// @param key: the key to fetch Entries for
// @param aggregation_mode: the mode of aggregation to use to find value
// @return value: the aggregated value
// @return decimals: the number of decimals in the Entry
// @return last_updated_timestamp: timestamp the Entries were last updated
// @return num_sources_aggregated: number of sources used in aggregation
@view
func get_spot{
    bitwise_ptr: BitwiseBuiltin*, syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(pair_id: felt, aggregation_mode: felt) -> (
    price: felt, decimals: felt, last_updated_timestamp: felt, num_sources_aggregated: felt
) {
    let (all_sources_len, all_sources) = Oracle.get_all_sources(pair_id);
    let (price, decimals, last_updated_timestamp, num_sources_aggregated) = Oracle.get_spot(
        pair_id, aggregation_mode, all_sources_len, all_sources
    );
    return (price, decimals, last_updated_timestamp, num_sources_aggregated);
}

// @notice get value for key for a set of sources
// @param key: the key to fetch Entries for
// @param aggregation_mode: the mode of aggregation to use to find value
// @param sources_len: the number of sources to use
// @param sources: point to first source in array
// @return value: the aggregated value
// @return decimals: the number of decimals in the Entry
// @return last_updated_timestamp: timestamp the Entries were last updated
// @return num_sources_aggregated: number of sources used in aggregation
@view
func get_spot_for_sources{
    bitwise_ptr: BitwiseBuiltin*, syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(pair_id: felt, aggregation_mode: felt, sources_len: felt, sources: felt*) -> (
    price: felt, decimals: felt, last_updated_timestamp: felt, num_sources_aggregated: felt
) {
    let (price, decimals, last_updated_timestamp, num_sources_aggregated) = Oracle.get_spot(
        pair_id, aggregation_mode, sources_len, sources
    );
    return (price, decimals, last_updated_timestamp, num_sources_aggregated);
}

// @notice get address of publisher registry
// @return publisher_registry_address: address of the publisher registry
@view
func get_publisher_registry_address{
    syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}() -> (publisher_registry_address: felt) {
    let (publisher_registry_address) = Oracle.get_publisher_registry_address();
    return (publisher_registry_address,);
}

// @notice get number of decimals used in the asset value
// @param key: the key of the asset
// @return decimals: the number of decimals
@view
func get_spot_decimals{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    pair_id: felt
) -> (decimals: felt) {
    let (decimals) = Oracle.get_spot_decimals(pair_id);
    return (decimals,);
}

@view
func get_value{
    bitwise_ptr: BitwiseBuiltin*, syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(key: felt) -> (
    value: felt, decimals: felt, last_updated_timestamp: felt, num_sources_aggregated: felt
) {
    // TODO: should this always aggregate all values or should we require a source
    let (price, decimals, last_updated_timestamp, num_sources_aggregated) = Oracle.get_value(key);
    return (price, decimals, last_updated_timestamp, num_sources_aggregated);
}

@view
func get_spot_with_USD_hop{
    bitwise_ptr: BitwiseBuiltin*, syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(base_currency_id, quote_currency_id, aggregation_mode) -> (
    price: felt, decimals: felt, last_updated_timestamp: felt, num_sources_aggregated: felt
) {
    let (
        price, decimals, last_updated_timestamp, num_sources_aggregated
    ) = Oracle.get_spot_with_USD_hop(base_currency_id, quote_currency_id, aggregation_mode);
    return (price, decimals, last_updated_timestamp, num_sources_aggregated);
}

//
// Setters
//

// @notice publish a FutureEntry
// @param new_entry: a FutureEntry to publish
@external
func publish_future_entry{
    bitwise_ptr: BitwiseBuiltin*, syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(new_entry: FutureEntry) {
    Oracle.publish_future_entry(new_entry);
    return ();
}

// @notice publish a SpotEntry
// @param new_entry: a SpotEntry to publish
@external
func publish_spot_entry{
    bitwise_ptr: BitwiseBuiltin*, syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(new_entry: SpotEntry) {
    Oracle.publish_spot_entry(new_entry);
    return ();
}

@external
func publish_entry{
    bitwise_ptr: BitwiseBuiltin*, syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(new_entry: GenericEntry) {
    Oracle.publish_entry(new_entry);
    return ();
}

@external
func publish_entries{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    new_entries_len, new_entries: GenericEntry*
) {
    Oracle.publish_entries(new_entries_len, new_entries);
    return ();
}

@external
func publish_future_entries{
    bitwise_ptr: BitwiseBuiltin*, syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(new_entries_len: felt, new_entries: FutureEntry*) {
    Oracle.publish_future_entries(new_entries_len, new_entries);
    return ();
}

// @notice publish an array of entries
// @param new_entries_len: length of entries array
// @param new_entries: pointer to first Entry in array
@external
func publish_spot_entries{
    bitwise_ptr: BitwiseBuiltin*, syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(new_entries_len: felt, new_entries: SpotEntry*) {
    Oracle.publish_spot_entries(new_entries_len, new_entries);
    return ();
}

@external
func update_publisher_registry_address{
    syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(publisher_registry_address: felt) {
    Proxy.assert_only_admin();
    Oracle.update_publisher_registry_address(publisher_registry_address);
    return ();
}

@external
func add_currency{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    currency: Currency
) {
    Proxy.assert_only_admin();
    Oracle.add_currency(currency);
    return ();
}

@external
func update_currency{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    currency: Currency
) {
    Proxy.assert_only_admin();
    Oracle.update_currency(currency);
    return ();
}

@external
func add_pair{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(pair: Pair) {
    Proxy.assert_only_admin();
    Oracle.add_pair(pair);
    return ();
}

@view
func get_latest_checkpoint_index{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    key: felt
) -> (latest: felt) {
    let (latest) = Oracle.get_latest_checkpoint_index(key);
    return (latest,);
}

@view
func get_checkpoint{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    key: felt, index: felt
) -> (checkpoint: Checkpoint) {
    let (latest) = Oracle.get_checkpoint_by_index(key, index);
    return (latest,);
}

@view
func get_sources_threshold{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
    threshold: felt
) {
    let (threshold) = Oracle.get_sources_threshold();
    return (threshold,);
}

//
// Upgrades
//

@external
func upgrade{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    new_implementation: felt
) {
    Proxy.assert_only_admin();
    Proxy._set_implementation_hash(new_implementation);
    return ();
}

@external
func set_admin_address{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    new_admin_address: felt
) {
    Proxy.assert_only_admin();
    Proxy._set_admin_address(new_admin_address);
    return ();
}

@view
func get_implementation_hash{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
    address: felt
) {
    let (address) = Proxy.get_implementation_hash();
    return (address,);
}

// @notice get address for admin
// @return admin_address: returns admin's address
@view
func get_admin_address{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
    admin_address: felt
) {
    let (admin_address) = Proxy.get_admin_address();
    return (admin_address,);
}

@external
func set_checkpoint{
    bitwise_ptr: BitwiseBuiltin*, syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(pair_id: felt, aggregation_mode: felt) {
    Oracle.set_checkpoint(pair_id, aggregation_mode);
    return ();
}

@external
func set_checkpoints{
    bitwise_ptr: BitwiseBuiltin*, syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(pair_ids_len, pair_ids: felt*, aggregation_mode: felt) {
    Oracle.set_checkpoints(pair_ids_len, pair_ids, aggregation_mode);
    return ();
}

@view
func get_last_spot_checkpoint_before{
    syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
}(pair_id: felt, timestamp: felt) -> (checkpoint: Checkpoint, idx: felt) {
    let idx = Oracle.find_startpoint(pair_id, timestamp);
    let (cp) = Oracle.get_checkpoint_by_index(pair_id, idx);
    return (cp, idx);
}

@external
func set_sources_threshold{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    threshold: felt
) {
    Proxy.assert_only_admin();

    Oracle.set_sources_threshold(threshold);
    return ();
}
