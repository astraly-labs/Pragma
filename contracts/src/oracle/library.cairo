%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.bool import TRUE, FALSE
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.registers import get_label_location
from starkware.cairo.common.hash import hash2
from starkware.cairo.common.math import (
    assert_nn,
    assert_not_equal,
    assert_not_zero,
    assert_le,
    unsigned_div_rem,
)
from starkware.cairo.common.math_cmp import is_not_zero, is_le
from starkware.cairo.common.registers import get_fp_and_pc
from starkware.starknet.common.syscalls import get_caller_address, get_block_timestamp
from time_series.convert import _max, convert_via_usd

from entry.structs import Checkpoint, Currency, GenericEntry, FutureEntry, SpotEntry, Pair
from publisher_registry.IPublisherRegistry import IPublisherRegistry
from entry.library import Entries

const BACKWARD_TIMESTAMP_BUFFER = 3600;  // Min difference data timestamp - current block timestamp (60 minutes)
const FORWARD_TIMESTAMP_BUFFER = 900;  // Max difference data timestamp - current block timestamp (15 minutes)
const BOTH_TRUE = 2;
const USD_CURRENCY_ID = 5591876;  // str_to_felt("USD")

//
// Storage
//
@storage_var
func Oracle_publisher_registry_address_storage() -> (publisher_registry_address: felt) {
}

@storage_var
func Oracle_currencies_storage(key: felt) -> (currency: Currency) {
}

@storage_var
func Oracle_pairs_storage(id: felt) -> (pair: Pair) {
}

@storage_var
func Oracle_pair_id_storage(quote_currency_id, base_currency_id) -> (pair_id: felt) {
}

@storage_var
func Oracle_spot_entry_storage(key: felt, source: felt) -> (entry: SpotEntry) {
}

@storage_var
func Oracle__entry_storage(key: felt, source: felt) -> (entry: GenericEntry) {
}

@storage_var
func Oracle_sources_len_storage(key: felt) -> (sources_len: felt) {
}

@storage_var
func Oracle_sources_storage(key: felt, idx: felt) -> (source: felt) {
}

@storage_var
func Oracle_controller_address_storage() -> (oracle_address: felt) {
}

@storage_var
func Oracle__checkpoints(key: felt, index: felt) -> (res: Checkpoint) {
}

@storage_var
func Oracle__checkpoint_index(key: felt) -> (index: felt) {
}

@storage_var
func Oracle__sources_threshold() -> (threshold: felt) {
}

@storage_var
func Oracle__future_entry_storage(pair_id, expiry_timestamp, source) -> (res: FutureEntry) {
}

//
// Events
//
@event
func UpdatedPublisherRegistryAddress(
    old_publisher_registry_address: felt, new_publisher_registry_address: felt
) {
}

@event
func SubmittedEntry(new_entry: GenericEntry) {
}

@event
func SubmittedSpotEntry(new_entry: SpotEntry) {
}

@event
func SubmittedFutureEntry(new_entry: FutureEntry) {
}

@event
func SubmittedCurrency(currency: Currency) {
}

@event
func UpdatedCurrency(currency: Currency) {
}

@event
func SubmittedPair(pair: Pair) {
}

@event
func CheckpointSpotEntry(pair_id: felt) {
}

namespace Oracle {
    //
    // Constructor
    //

    func initialize_oracle{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        publisher_registry_address: felt,
        currencies_len: felt,
        currencies: Currency*,
        pairs_len: felt,
        pairs: Pair*,
    ) {
        Oracle_publisher_registry_address_storage.write(publisher_registry_address);
        _set_keys_currencies(currencies_len, currencies, 0);
        _set_keys_pairs(pairs_len, pairs, 0);

        return ();
    }

    //
    // Guards
    //

    func only_oracle_controller{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() {
        let (caller_address) = get_caller_address();
        let (oracle_controller_address) = Oracle_controller_address_storage.read();
        if (oracle_controller_address == 0) {
            // Assume uninitialized
            return ();
        }
        with_attr error_message(
                "OracleImplementation: This function can only be called by the oracle controller") {
            assert caller_address = oracle_controller_address;
        }
        return ();
    }

    //
    // Getters
    //

    func get_spot_with_USD_hop{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        base_currency_id, quote_currency_id, aggregation_mode
    ) -> (price: felt, decimals: felt, last_updated_timestamp: felt, num_sources_aggregated: felt) {
        alloc_locals;
        let (sources) = alloc();

        let (base_pair_id) = Oracle_pair_id_storage.read(base_currency_id, USD_CURRENCY_ID);
        let (quote_pair_id) = Oracle_pair_id_storage.read(quote_currency_id, USD_CURRENCY_ID);
        let (base_value, _, base_last_updated_timestamp, base_num_sources_aggregated) = get_spot(
            base_pair_id, aggregation_mode, 0, sources
        );
        let (quote_value, _, quote_last_updated_timestamp, quote_num_sources_aggregated) = get_spot(
            quote_pair_id, aggregation_mode, 0, sources
        );
        let (currency) = Oracle_currencies_storage.read(quote_currency_id);
        let decimals = currency.decimals;

        let rebased_value = convert_via_usd(base_value, quote_value, decimals);

        let (last_updated_timestamp) = _max(
            quote_last_updated_timestamp, base_last_updated_timestamp
        );
        let (num_sources_aggregated) = _max(
            quote_num_sources_aggregated, base_num_sources_aggregated
        );

        return (rebased_value, decimals, last_updated_timestamp, num_sources_aggregated);
    }

    func get_publisher_registry_address{
        syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
    }() -> (publisher_registry_address: felt) {
        let (publisher_registry_address) = Oracle_publisher_registry_address_storage.read();
        return (publisher_registry_address,);
    }

    func get_spot_decimals{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        pair_id: felt
    ) -> (decimals: felt) {
        let (pair) = Oracle_pairs_storage.read(pair_id);
        let (key_currency) = Oracle_currencies_storage.read(pair.base_currency_id);
        if (key_currency.id == 0) {
            return (0,);
        }

        let key_decimals = key_currency.decimals;
        return (key_decimals,);
    }

    func get_spot{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        key: felt, aggregation_mode: felt, sources_len: felt, sources: felt*
    ) -> (price: felt, decimals: felt, last_updated_timestamp: felt, num_sources_aggregated: felt) {
        alloc_locals;

        let (entries_len, entries, _) = get_spot_entries(key, sources_len, sources);

        if (entries_len == 0) {
            return (0, 0, 0, 0);
        }

        let (price) = Entries.aggregate_spot_entries(entries_len, entries);
        let (decimals) = get_spot_decimals(key);
        let (last_updated_timestamp) = Entries.aggregate_timestamps_max(entries_len, entries);
        return (price, decimals, last_updated_timestamp, entries_len);
    }

    func get_value{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(key: felt) -> (
        value: felt, decimals: felt, last_updated_timestamp: felt, num_sources_aggregated: felt
    ) {
        alloc_locals;
        let sources_len = 0;
        let (sources) = alloc();

        let (entries_len, entries, _) = get_generic_entries(key, sources_len, sources);

        if (entries_len == 0) {
            return (0, 0, 0, 0);
        }

        let (price) = Entries.aggregate_generic_entries(entries_len, entries);
        let (last_updated_timestamp) = Entries.aggregate_generic_timestamps_max(
            entries_len, entries
        );
        return (price, 18, last_updated_timestamp, entries_len);
    }

    func get_spot_entries{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        pair_id: felt, sources_len: felt, sources: felt*
    ) -> (entries_len: felt, entries: SpotEntry*, last_updated_timestamp: felt) {
        // This will return all entries within the BACKWARD_TIMESTAMP_BUFFER of the latest entry published for the given list of sources
        alloc_locals;

        let (last_updated_timestamp) = get_latest_spot_entry_timestamp(
            pair_id, sources_len, sources, 0, 0
        );
        let (entries_len, entries) = get_all_spot_entries(
            pair_id, sources_len, sources, last_updated_timestamp
        );
        return (entries_len, entries, last_updated_timestamp);
    }

    func get_generic_entries{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        pair_id: felt, sources_len: felt, sources: felt*
    ) -> (entries_len: felt, entries: GenericEntry*, last_updated_timestamp: felt) {
        alloc_locals;

        let (last_updated_timestamp) = get_latest_entry_timestamp(
            pair_id, sources_len, sources, 0, 0
        );
        let (entries_len, entries) = get_all_entries(
            pair_id, sources_len, sources, last_updated_timestamp
        );
        return (entries_len, entries, last_updated_timestamp);
    }

    func get_spot_entry{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        pair_id: felt, source
    ) -> (entry: SpotEntry) {
        let (entry) = Oracle_spot_entry_storage.read(pair_id, source);
        return (entry,);
    }

    func get_all_sources{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        pair_id: felt
    ) -> (sources_len: felt, sources: felt*) {
        alloc_locals;

        let (sources) = alloc();

        let (sources_len) = Oracle_sources_len_storage.read(pair_id);
        let (sources) = build_sources_array(pair_id, sources_len, sources, 0);
        return (sources_len, sources);
    }

    func get_latest_checkpoint_index{
        syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
    }(key: felt) -> (_idx: felt) {
        let (cur_ix) = Oracle__checkpoint_index.read(key);
        return (cur_ix,);
    }

    func get_latest_checkpoint{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        key: felt
    ) -> (checkpoint: Checkpoint) {
        let (cur_ix) = Oracle__checkpoint_index.read(key);
        let (latest_checkpoint) = Oracle__checkpoints.read(key, cur_ix - 1);
        return (latest_checkpoint,);
    }

    func get_checkpoint_by_index{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        key: felt, idx: felt
    ) -> (checkpoint: Checkpoint) {
        let (cur_checkpoint) = Oracle__checkpoints.read(key, idx);
        return (cur_checkpoint,);
    }

    func get_sources_threshold{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        ) -> (threshold: felt) {
        let (threshold) = Oracle__sources_threshold.read();
        return (threshold,);
    }

    func get_future_entry{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        pair_id, expiry_timestamp, source
    ) -> (future_entry: FutureEntry) {
        let (future_entry) = Oracle__future_entry_storage.read(pair_id, expiry_timestamp, source);
        return (future_entry,);
    }

    //
    // Setters
    //

    func publish_entry{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        new_entry: GenericEntry
    ) {
        alloc_locals;

        let (new_entry_ptr: GenericEntry*) = alloc();
        assert new_entry_ptr[0] = new_entry;
        validate_sender_for_source(cast(new_entry_ptr, felt*));

        let (entry) = Oracle__entry_storage.read(new_entry.key, new_entry.base.source);

        let (entry_ptr: GenericEntry*) = alloc();
        assert entry_ptr[0] = entry;

        validate_timestamp(cast(new_entry_ptr, felt*), cast(entry_ptr, felt*));

        SubmittedEntry.emit(new_entry);
        Oracle__entry_storage.write(new_entry.key, new_entry.base.source, new_entry);

        return ();
    }

    func publish_entries{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        entries_len: felt, entries: GenericEntry*
    ) {
        return ();
    }

    func publish_future_entry{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        new_entry: FutureEntry
    ) {
        alloc_locals;

        let (new_entry_ptr: FutureEntry*) = alloc();
        assert new_entry_ptr[0] = new_entry;
        validate_sender_for_source(cast(new_entry_ptr, felt*));

        let (entry) = Oracle__future_entry_storage.read(
            new_entry.pair_id, new_entry.expiry_timestamp, new_entry.base.source
        );

        let (entry_ptr: FutureEntry*) = alloc();
        assert entry_ptr[0] = entry;

        validate_timestamp(cast(new_entry_ptr, felt*), cast(entry_ptr, felt*));

        SubmittedFutureEntry.emit(new_entry);
        Oracle__future_entry_storage.write(
            new_entry.pair_id, new_entry.expiry_timestamp, new_entry.base.source, new_entry
        );

        return ();
    }

    func publish_spot_entry{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        new_entry: SpotEntry
    ) {
        alloc_locals;

        let (new_entry_ptr: SpotEntry*) = alloc();
        assert new_entry_ptr[0] = new_entry;
        validate_sender_for_source(cast(new_entry_ptr, felt*));

        let (entry) = Oracle_spot_entry_storage.read(new_entry.pair_id, new_entry.base.source);

        let (entry_ptr: SpotEntry*) = alloc();
        assert entry_ptr[0] = entry;

        validate_timestamp(cast(new_entry_ptr, felt*), cast(entry_ptr, felt*));

        SubmittedSpotEntry.emit(new_entry);
        Oracle_spot_entry_storage.write(new_entry.pair_id, new_entry.base.source, new_entry);

        return ();
    }

    func publish_spot_entries{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        new_entries_len: felt, new_entries: SpotEntry*
    ) {
        if (new_entries_len == 0) {
            return ();
        }

        publish_spot_entry([new_entries]);
        publish_spot_entries(new_entries_len - 1, new_entries + SpotEntry.SIZE);

        return ();
    }

    func _set_keys_currencies{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        keys_currencies_len: felt, keys_currencies: Currency*, idx: felt
    ) {
        if (idx == keys_currencies_len) {
            return ();
        }

        let key_currency = keys_currencies[idx];
        Oracle_currencies_storage.write(key_currency.id, key_currency);

        _set_keys_currencies(keys_currencies_len, keys_currencies, idx + 1);

        return ();
    }

    func _set_keys_pairs{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        keys_pairs_len: felt, keys_pairs: Pair*, idx: felt
    ) {
        if (idx == keys_pairs_len) {
            return ();
        }

        let key_pair = keys_pairs[idx];
        Oracle_pairs_storage.write(key_pair.id, key_pair);
        Oracle_pair_id_storage.write(
            key_pair.quote_currency_id, key_pair.base_currency_id, key_pair.id
        );

        _set_keys_pairs(keys_pairs_len, keys_pairs, idx + 1);

        return ();
    }

    func update_publisher_registry_address{
        syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
    }(publisher_registry_address: felt) {
        let (old_publisher_registry_address) = Oracle_publisher_registry_address_storage.read();
        Oracle_publisher_registry_address_storage.write(publisher_registry_address);
        UpdatedPublisherRegistryAddress.emit(
            old_publisher_registry_address, publisher_registry_address
        );
        return ();
    }

    func add_currency{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        currency: Currency
    ) {
        with_attr error_message("Oracle: currency with this key already registered") {
            let (existing_currency) = Oracle_currencies_storage.read(currency.id);
            assert existing_currency.id = 0;
        }

        SubmittedCurrency.emit(currency);
        Oracle_currencies_storage.write(currency.id, currency);
        return ();
    }

    func update_currency{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        currency: Currency
    ) {
        Oracle_currencies_storage.write(currency.id, currency);
        UpdatedCurrency.emit(currency);
        return ();
    }

    func add_pair{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(pair: Pair) {
        let (pair_) = Oracle_pairs_storage.read(pair.id);
        with_attr error_message("Oracle: pair with this key already registered") {
            assert pair_.id = 0;
        }

        SubmittedPair.emit(pair);
        Oracle_pairs_storage.write(pair.id, pair);
        Oracle_pair_id_storage.write(pair.quote_currency_id, pair.base_currency_id, pair.id);
        return ();
    }

    func set_sources_threshold{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        threshold: felt
    ) {
        Oracle__sources_threshold.write(threshold);
        return ();
    }

    func set_checkpoint{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        key: felt, aggregation_mode: felt
    ) {
        alloc_locals;
        let (sources) = alloc();
        let (value, _decimals, last_updated_timestamp, num_sources_aggregated) = get_spot(
            key, aggregation_mode, 0, sources
        );
        let (sources_threshold) = Oracle__sources_threshold.read();
        let meets_sources_threshold = is_le(sources_threshold, num_sources_aggregated);
        let (cur_checkpoint) = get_latest_checkpoint(key);
        let is_new_checkpoint = is_le(cur_checkpoint.timestamp + 1, last_updated_timestamp);

        if (meets_sources_threshold + is_new_checkpoint == BOTH_TRUE) {
            let checkpoint = Checkpoint(
                last_updated_timestamp, value, aggregation_mode, num_sources_aggregated
            );
            let (cur_ix) = Oracle__checkpoint_index.read(key);
            Oracle__checkpoints.write(key, cur_ix, checkpoint);
            Oracle__checkpoint_index.write(key, cur_ix + 1);
            CheckpointSpotEntry.emit(key);
            return ();
        }
        return ();
    }

    func set_checkpoints{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        pair_ids_len, pair_ids: felt*, aggregation_mode: felt
    ) {
        if (pair_ids_len == 0) {
            return ();
        }
        set_checkpoint([pair_ids], aggregation_mode);
        return set_checkpoints(pair_ids_len - 1, pair_ids + 1, aggregation_mode);
    }

    //
    // Helpers
    //

    func get_all_spot_entries{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        pair_id: felt, sources_len: felt, sources: felt*, latest_timestamp
    ) -> (entries_len: felt, entries: SpotEntry*) {
        alloc_locals;

        let (entries: SpotEntry*) = alloc();

        if (sources_len == 0) {
            let (all_sources_len, all_sources) = get_all_sources(pair_id);
            let (entries_len, entries) = build_spot_entries_array(
                pair_id, all_sources_len, all_sources, 0, 0, entries, latest_timestamp
            );
        } else {
            let (entries_len, entries) = build_spot_entries_array(
                pair_id, sources_len, sources, 0, 0, entries, latest_timestamp
            );
        }

        return (entries_len, entries);
    }

    func get_all_entries{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        pair_id: felt, sources_len: felt, sources: felt*, latest_timestamp
    ) -> (entries_len: felt, entries: GenericEntry*) {
        alloc_locals;

        let (entries: GenericEntry*) = alloc();

        if (sources_len == 0) {
            let (all_sources_len, all_sources) = get_all_sources(pair_id);
            let (entries_len, entries) = build_entries_array(
                pair_id, all_sources_len, all_sources, 0, 0, entries, latest_timestamp
            );
        } else {
            let (entries_len, entries) = build_entries_array(
                pair_id, sources_len, sources, 0, 0, entries, latest_timestamp
            );
        }

        return (entries_len, entries);
    }

    func get_latest_spot_entry_timestamp{
        syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
    }(pair_id, sources_len, sources: felt*, cur_idx, latest_timestamp) -> (latest_timestamp: felt) {
        if (cur_idx == sources_len) {
            return (latest_timestamp,);
        }
        let (entry) = Oracle_spot_entry_storage.read(pair_id, sources[cur_idx]);
        if (is_le(latest_timestamp, entry.base.timestamp) == TRUE) {
            return get_latest_spot_entry_timestamp(
                pair_id, sources_len, sources, cur_idx + 1, entry.base.timestamp
            );
        } else {
            return get_latest_spot_entry_timestamp(
                pair_id, sources_len, sources, cur_idx + 1, latest_timestamp
            );
        }
    }

    func get_latest_entry_timestamp{
        syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
    }(pair_id, sources_len, sources: felt*, cur_idx, latest_timestamp) -> (latest_timestamp: felt) {
        if (cur_idx == sources_len) {
            return (latest_timestamp,);
        }
        let (entry) = Oracle__entry_storage.read(pair_id, sources[cur_idx]);
        if (is_le(latest_timestamp, entry.base.timestamp) == TRUE) {
            return get_latest_entry_timestamp(
                pair_id, sources_len, sources, cur_idx + 1, entry.base.timestamp
            );
        } else {
            return get_latest_entry_timestamp(
                pair_id, sources_len, sources, cur_idx + 1, latest_timestamp
            );
        }
    }

    func find_startpoint{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        key: felt, start_tick: felt
    ) -> felt {
        let (latest_checkpoint_index) = get_latest_checkpoint_index(key=key);

        let (cp) = get_checkpoint_by_index(key, latest_checkpoint_index - 1);
        let (first_cp) = get_checkpoint_by_index(key, 0);
        with_attr error_message("start_tick is in future") {
            assert_nn(cp.timestamp - start_tick);
        }
        if (is_le(start_tick, first_cp.timestamp) == TRUE) {
            return 0;
        }

        let startpoint = _binary_search(key, 0, latest_checkpoint_index, start_tick);
        return startpoint;
    }

    func build_spot_entries_array{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        pair_id: felt,
        sources_len: felt,
        sources: felt*,
        sources_idx: felt,
        entries_idx: felt,
        entries: SpotEntry*,
        latest_entry_timestamp: felt,
    ) -> (entries_len: felt, entries: SpotEntry*) {
        alloc_locals;
        if (sources_idx == sources_len) {
            return (entries_idx, entries);
        }

        let source = sources[sources_idx];
        let (entry) = Oracle_spot_entry_storage.read(pair_id, source);
        let is_entry_initialized = is_not_zero(entry.base.timestamp);
        let not_is_entry_initialized = 1 - is_entry_initialized;

        let is_entry_stale = is_le(
            entry.base.timestamp, latest_entry_timestamp - BACKWARD_TIMESTAMP_BUFFER
        );
        let should_skip_entry = is_not_zero(is_entry_stale + not_is_entry_initialized);

        if (should_skip_entry == TRUE) {
            let (entries_len, entries) = build_spot_entries_array(
                pair_id,
                sources_len,
                sources,
                sources_idx + 1,
                entries_idx,
                entries,
                latest_entry_timestamp,
            );
            return (entries_len, entries);
        }

        assert entries[entries_idx] = entry;

        return build_spot_entries_array(
            pair_id,
            sources_len,
            sources,
            sources_idx + 1,
            entries_idx + 1,
            entries,
            latest_entry_timestamp,
        );
    }

    func build_entries_array{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        pair_id: felt,
        sources_len: felt,
        sources: felt*,
        sources_idx: felt,
        entries_idx: felt,
        entries: GenericEntry*,
        latest_entry_timestamp: felt,
    ) -> (entries_len: felt, entries: GenericEntry*) {
        alloc_locals;

        if (sources_idx == sources_len) {
            return (entries_idx, entries);
        }

        let source = sources[sources_idx];
        let (entry) = Oracle__entry_storage.read(pair_id, source);
        let is_entry_initialized = is_not_zero(entry.base.timestamp);
        let not_is_entry_initialized = 1 - is_entry_initialized;

        let is_entry_stale = is_le(
            entry.base.timestamp, latest_entry_timestamp - BACKWARD_TIMESTAMP_BUFFER
        );
        let should_skip_entry = is_not_zero(is_entry_stale + not_is_entry_initialized);

        if (should_skip_entry == TRUE) {
            let (entries_len, entries) = build_entries_array(
                pair_id,
                sources_len,
                sources,
                sources_idx + 1,
                entries_idx,
                entries,
                latest_entry_timestamp,
            );
            return (entries_len, entries);
        }

        assert [entries + entries_idx * GenericEntry.SIZE] = entry;

        return build_entries_array(
            pair_id,
            sources_len,
            sources,
            sources_idx + 1,
            entries_idx + 1,
            entries,
            latest_entry_timestamp,
        );
    }

    func build_sources_array{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        pair_id: felt, sources_len: felt, sources: felt*, idx: felt
    ) -> (sources: felt*) {
        let (new_source) = Oracle_sources_storage.read(pair_id, idx);
        assert [sources + idx] = new_source;

        if (idx == sources_len) {
            return (sources,);
        }

        build_sources_array(pair_id, sources_len, sources, idx + 1);

        return (sources,);
    }

    func validate_sender_for_source{
        syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr
    }(_entry: felt*) {
        alloc_locals;

        let new_entry_ptr = cast(_entry, GenericEntry*);
        let new_entry = new_entry_ptr[0];
        let (publisher_registry_address) = get_publisher_registry_address();
        let (publisher_address) = IPublisherRegistry.get_publisher_address(
            publisher_registry_address, new_entry.base.publisher
        );
        let (_can_publish_source) = IPublisherRegistry.can_publish_source(
            publisher_registry_address, new_entry.base.publisher, new_entry.base.source
        );

        let (caller_address) = get_caller_address();

        with_attr error_message("Oracle: Publisher not registered") {
            assert_not_zero(publisher_address);
        }

        with_attr error_message("Oracle: Caller must not be 0 address") {
            assert_not_zero(caller_address);
        }

        with_attr error_message("Oracle: Transaction not from publisher account") {
            assert caller_address = publisher_address;
        }
        with_attr error_message("Oracle: Publisher not authorized for this source") {
            assert _can_publish_source = TRUE;
        }

        return ();
    }

    func validate_timestamp{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        _new_entry: felt*, _entry: felt*
    ) {
        alloc_locals;

        let new_entry_ptr = cast(_new_entry, SpotEntry*);
        let new_entry = new_entry_ptr[0];
        let entry_ptr = cast(_entry, SpotEntry*);
        let entry = entry_ptr[0];

        with_attr error_message("Oracle: Existing entry is more recent") {
            assert_le(entry.base.timestamp, new_entry.base.timestamp);
        }

        let (current_timestamp) = get_block_timestamp();
        with_attr error_message("Oracle: New entry timestamp is too far in the past") {
            assert_le(current_timestamp - BACKWARD_TIMESTAMP_BUFFER, new_entry.base.timestamp);
        }

        with_attr error_message("Oracle: New entry timestamp is too far in the future") {
            // TODO (rlkelly): should we allow for an hour into the future?
            let new_entry_timestamp = new_entry.base.timestamp;
            assert_le(new_entry.base.timestamp, current_timestamp + FORWARD_TIMESTAMP_BUFFER);
        }

        if (entry.base.timestamp == 0) {
            // Source did not exist yet, so add to our list
            let (sources_len) = Oracle_sources_len_storage.read(new_entry.pair_id);
            Oracle_sources_storage.write(new_entry.pair_id, sources_len, new_entry.base.source);
            Oracle_sources_len_storage.write(new_entry.pair_id, sources_len + 1);
            tempvar syscall_ptr = syscall_ptr;
            tempvar pedersen_ptr = pedersen_ptr;
            tempvar range_check_ptr = range_check_ptr;
        } else {
            tempvar syscall_ptr = syscall_ptr;
            tempvar pedersen_ptr = pedersen_ptr;
            tempvar range_check_ptr = range_check_ptr;
        }

        return ();
    }

    func _binary_search{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        key, low, high, target
    ) -> felt {
        alloc_locals;
        let (midpoint, _) = unsigned_div_rem(low + high - 1, 2);

        if (high + low == 1) {
            return midpoint;
        }

        if (midpoint == 0) {
            return 0;
        }

        let (cp) = get_checkpoint_by_index(key, midpoint);
        let timestamp = cp.timestamp;
        if (timestamp == target) {
            return midpoint;
        }

        if (is_le(target, timestamp) == TRUE) {
            let (prev_cp) = get_checkpoint_by_index(key, midpoint - 1);
            if (is_le(prev_cp.timestamp, target) == TRUE) {
                return midpoint - 1;
            }
            return _binary_search(key, low, midpoint, target);
        } else {
            let (next_cp) = get_checkpoint_by_index(key, midpoint + 1);
            if (is_le(target, next_cp.timestamp) == TRUE) {
                return midpoint;
            }
            return _binary_search(key, midpoint, high, target);
        }
    }
}
