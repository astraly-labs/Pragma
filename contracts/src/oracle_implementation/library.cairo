%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.math_cmp import is_not_zero, is_le
from starkware.cairo.common.math import assert_le
from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.bool import TRUE, FALSE
from starkware.starknet.common.syscalls import get_caller_address, get_block_timestamp

from entry.library import Entry, Entries, Checkpoint

const TIMESTAMP_BUFFER = 3600  # 60 minutes

#
# Storage
#

@storage_var
func Oracle_entry_storage(key : felt, source : felt) -> (entry : Entry):
end

@storage_var
func Oracle_sources_len_storage(key : felt) -> (sources_len : felt):
end

@storage_var
func Oracle_sources_storage(key : felt, idx : felt) -> (source : felt):
end

@storage_var
func Oracle_controller_address_storage() -> (oracle_controller_address : felt):
end

@storage_var
func Oracle__checkpoints(key : felt, index : felt) -> (res : Checkpoint):
end

@storage_var
func Oracle__checkpoint_index(key : felt) -> (index : felt):
end

namespace Oracle:
    #
    # Guards
    #

    func only_oracle_controller{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        ):
        let (caller_address) = get_caller_address()
        let (oracle_controller_address) = Oracle_controller_address_storage.read()
        if oracle_controller_address == 0:
            # Assume uninitialized
            return ()
        end
        with_attr error_message(
                "OracleImplementation: This function can only be called by the oracle controller"):
            assert caller_address = oracle_controller_address
        end
        return ()
    end

    #
    # Getters
    #

    func get_entries{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        key : felt, sources_len : felt, sources : felt*
    ) -> (entries_len : felt, entries : Entry*):
        let (entries_len, entries) = get_all_entries(key, sources_len, sources)
        return (entries_len, entries)
    end

    func get_value{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        key : felt, aggregation_mode : felt, sources_len : felt, sources : felt*
    ) -> (value : felt, last_updated_timestamp : felt, num_sources_aggregated : felt):
        alloc_locals

        let (entries_len, entries) = get_entries(key, sources_len, sources)

        if entries_len == 0:
            return (0, 0, 0)
        end

        let (value) = Entries.aggregate_entries(entries_len, entries)
        let (last_updated_timestamp) = Entries.aggregate_timestamps_max(entries_len, entries)
        return (value, last_updated_timestamp, entries_len)
    end

    func get_entry{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        key : felt, source : felt
    ) -> (entry : Entry):
        let (entry) = Oracle_entry_storage.read(key, source)
        return (entry)
    end

    func get_all_sources{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        key : felt
    ) -> (sources_len : felt, sources : felt*):
        alloc_locals

        let (sources) = alloc()

        let (sources_len) = Oracle_sources_len_storage.read(key)
        let (sources) = build_sources_array(key, sources_len, sources, 0)
        return (sources_len, sources)
    end

    #
    # Setters
    #

    func set_oracle_controller_address{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
    }(oracle_controller_address : felt):
        only_oracle_controller()
        Oracle_controller_address_storage.write(oracle_controller_address)
        return ()
    end

    func publish_entry{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        new_entry : Entry
    ):
        alloc_locals

        only_oracle_controller()

        let (entry) = Oracle_entry_storage.read(new_entry.key, new_entry.source)

        with_attr error_message("OracleImplementation: Existing entry is more recent"):
            assert_le(entry.timestamp, new_entry.timestamp)
        end

        let (current_timestamp) = get_block_timestamp()
        with_attr error_message("OracleImplementation: New entry timestamp is too far in the past"):
            assert_le(current_timestamp - TIMESTAMP_BUFFER, new_entry.timestamp)
        end

        with_attr error_message(
                "OracleImplementation: New entry timestamp is too far in the future"):
            assert_le(new_entry.timestamp, current_timestamp + TIMESTAMP_BUFFER)
        end

        if entry.timestamp == 0:
            # Source did not exist yet, so add to our list
            let (sources_len) = Oracle_sources_len_storage.read(new_entry.key)
            Oracle_sources_storage.write(new_entry.key, sources_len, new_entry.source)
            Oracle_sources_len_storage.write(new_entry.key, sources_len + 1)
            tempvar syscall_ptr = syscall_ptr
            tempvar pedersen_ptr = pedersen_ptr
        else:
            tempvar syscall_ptr = syscall_ptr
            tempvar pedersen_ptr = pedersen_ptr
        end

        Oracle_entry_storage.write(new_entry.key, new_entry.source, new_entry)

        return ()
    end

    #
    # Helpers
    #

    func get_all_entries{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        key : felt, sources_len : felt, sources : felt*
    ) -> (entries_len : felt, entries : Entry*):
        alloc_locals

        let (entries : Entry*) = alloc()

        if sources_len == 0:
            let (all_sources_len, all_sources) = get_all_sources(key)
            let (entries_len, entries) = build_entries_array(
                key, all_sources_len, all_sources, 0, 0, entries
            )
        else:
            let (entries_len, entries) = build_entries_array(
                key, sources_len, sources, 0, 0, entries
            )
        end

        return (entries_len, entries)
    end

    func build_entries_array{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        key : felt,
        sources_len : felt,
        sources : felt*,
        sources_idx : felt,
        entries_idx : felt,
        entries : Entry*,
    ) -> (entries_len : felt, entries : Entry*):
        alloc_locals

        if sources_idx == sources_len:
            let entries_len = entries_idx  # 0-indexed
            return (entries_len, entries)
        end

        let source = [sources + sources_idx]
        let (entry) = Oracle_entry_storage.read(key, source)
        let (is_entry_initialized) = is_not_zero(entry.timestamp)
        let not_is_entry_initialized = 1 - is_entry_initialized
        let (current_timestamp) = get_block_timestamp()
        let (is_entry_stale) = is_le(entry.timestamp, current_timestamp - TIMESTAMP_BUFFER)
        let (should_skip_entry) = is_not_zero(is_entry_stale + not_is_entry_initialized)

        if should_skip_entry == TRUE:
            let (entries_len, entries) = Oracle_build_entries_array(
                key, sources_len, sources, sources_idx + 1, entries_idx, entries
            )
            return (entries_len, entries)
        end

        assert [entries + entries_idx * Entry.SIZE] = entry

        let (entries_len, entries) = Oracle_build_entries_array(
            key, sources_len, sources, sources_idx + 1, entries_idx + 1, entries
        )
        return (entries_len, entries)
    end

    func build_sources_array{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        key : felt, sources_len : felt, sources : felt*, idx : felt
    ) -> (sources : felt*):
        let (new_source) = Oracle_sources_storage.read(key, idx)
        assert [sources + idx] = new_source

        if idx == sources_len:
            return (sources)
        end

        build_sources_array(key, sources_len, sources, idx + 1)

        return (sources)
    end
end
