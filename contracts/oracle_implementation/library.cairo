%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin
from starkware.cairo.common.math_cmp import is_not_zero, is_le
from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.bool import TRUE, FALSE
from starkware.starknet.common.syscalls import get_caller_address

from contracts.entry.library import Entry, Entry_aggregate_entries, Entry_aggregate_timestamps_max
from contracts.publisher_registry.IPublisherRegistry import IPublisherRegistry

const DEFAULT_KEY = 28258988067220596  # str_to_felt("default")
const DEFAULT_DECIMALS = 18

#
# Storage
#

@storage_var
func Oracle_entry_storage(key : felt, publisher : felt) -> (entry : Entry):
end

@storage_var
func Oracle_decimals_storage(key : felt) -> (decimals : felt):
end

@storage_var
func Oracle_proxy_address_storage() -> (publisher_address : felt):
end

#
# Constructor
#

func Oracle_set_default_decimals{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        ):
    Oracle_decimals_storage.write(DEFAULT_KEY, DEFAULT_DECIMALS)
    return ()
end

#
# Guards
#

func Oracle_only_oracle_proxy{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}():
    let (caller_address) = get_caller_address()
    let (oracle_proxy_address) = Oracle_proxy_address_storage.read()
    if oracle_proxy_address == 0:
        # Assume uninitialized
        return ()
    end
    with_attr error_message("This function can only be called by the oracle proxy"):
        assert caller_address = oracle_proxy_address
    end
    return ()
end

#
# Getters
#

func Oracle_get_decimals{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        key : felt) -> (decimals : felt):
    let (decimals) = Oracle_decimals_storage.read(key)
    if decimals == 0:
        let (default_decimals) = Oracle_decimals_storage.read(DEFAULT_KEY)
        return (default_decimals)
    else:
        return (decimals)
    end
end

func Oracle_get_entries_for_key{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        publishers_len : felt, publishers : felt*, key : felt) -> (
        entries_len : felt, entries : Entry*):
    let (entries_len, entries) = Oracle_get_all_entries_for_key(key, publishers_len, publishers)
    return (entries_len, entries)
end

func Oracle_get_value{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        publishers_len : felt, publishers : felt*, key : felt, aggregation_mode : felt) -> (
        value : felt, last_updated_timestamp : felt):
    alloc_locals

    let (entries_len, entries) = Oracle_get_entries_for_key(publishers_len, publishers, key)

    if entries_len == 0:
        return (0, 0)
    end

    let (value) = Entry_aggregate_entries(entries_len, entries)
    let (last_updated_timestamp) = Entry_aggregate_timestamps_max(entries_len, entries)
    return (value, last_updated_timestamp)
end

#
# Setters
#

func Oracle_set_oracle_proxy_address{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        oracle_proxy_address : felt):
    Oracle_only_oracle_proxy()
    Oracle_proxy_address_storage.write(oracle_proxy_address)
    return ()
end

func Oracle_set_decimals{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        key : felt, decimals : felt):
    Oracle_only_oracle_proxy()
    Oracle_decimals_storage.write(key, decimals)
    return ()
end

func Oracle_submit_entry{
        syscall_ptr : felt*, ecdsa_ptr : SignatureBuiltin*, pedersen_ptr : HashBuiltin*,
        range_check_ptr}(new_entry : Entry, should_assert : felt):
    alloc_locals

    Oracle_only_oracle_proxy()

    let (entry) = Oracle_entry_storage.read(new_entry.key, new_entry.publisher)

    # use is_le and -1 to get is_lt
    let (is_new_entry_more_recent) = is_le(entry.timestamp, new_entry.timestamp - 1)
    if is_new_entry_more_recent == TRUE:
        Oracle_entry_storage.write(new_entry.key, new_entry.publisher, new_entry)
        return ()
    end

    if should_assert == FALSE:
        return ()
    end

    with_attr error_message("Received stale update (timestamp not newer than current entry)"):
        assert is_new_entry_more_recent = TRUE
    end

    return ()
end

#
# Helpers
#

func Oracle_get_all_entries_for_key{
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        key : felt, publishers_len : felt, publishers : felt*) -> (
        entries_len : felt, entries : Entry*):
    let (entries : Entry*) = alloc()

    if publishers_len == 0:
        return (0, entries)
    end

    let (entries_len, entries) = Oracle_build_entries_array(
        key, publishers_len, publishers, 0, 0, entries)

    return (entries_len, entries)
end

func Oracle_build_entries_array{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        key : felt, publishers_len : felt, publishers : felt*, publishers_idx : felt,
        entries_idx : felt, entries : Entry*) -> (entries_len : felt, entries : Entry*):
    alloc_locals

    if publishers_idx == publishers_len:
        let entries_len = entries_idx  # 0-indexed
        return (entries_len, entries)
    end

    let publisher = [publishers + publishers_idx]
    let (entry) = Oracle_entry_storage.read(key, publisher)
    let (is_entry_initialized) = is_not_zero(entry.timestamp)
    if is_entry_initialized == 0:
        let (entries_len, entries) = Oracle_build_entries_array(
            key, publishers_len, publishers, publishers_idx + 1, entries_idx, entries)
        return (entries_len, entries)
    end

    assert [entries + entries_idx * Entry.SIZE] = entry

    let (entries_len, entries) = Oracle_build_entries_array(
        key, publishers_len, publishers, publishers_idx + 1, entries_idx + 1, entries)
    return (entries_len, entries)
end
