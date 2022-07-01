%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.bool import TRUE, FALSE

from contracts.entry.structs import Entry
from contracts.oracle_implementation.library import (
    Oracle_set_default_decimals,
    Oracle_set_oracle_controller_address,
    Oracle_set_decimals,
    Oracle_get_decimals,
    Oracle_get_entries,
    Oracle_get_value,
    Oracle_get_entry,
    Oracle_get_all_sources,
    Oracle_submit_entry,
)

#
# Constructor
#

@constructor
func constructor{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    oracle_controller_address : felt
):
    Oracle_set_default_decimals()
    Oracle_set_oracle_controller_address(oracle_controller_address)
    return ()
end

#
# Getters
#

@view
func get_entries{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    key : felt, sources_len : felt, sources : felt*
) -> (entries_len : felt, entries : Entry*):
    let (entries_len, entries) = Oracle_get_entries(key, sources_len, sources)
    return (entries_len, entries)
end

@view
func get_value{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    key : felt, aggregation_mode : felt, sources_len : felt, sources : felt*
) -> (value : felt, last_updated_timestamp : felt, num_sources_aggregated : felt):
    let (value, last_updated_timestamp, num_sources_aggregated) = Oracle_get_value(
        key, aggregation_mode, sources_len, sources
    )
    return (value, last_updated_timestamp, num_sources_aggregated)
end

@view
func get_entry{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    key : felt, source : felt
) -> (entry : Entry):
    let (entry) = Oracle_get_entry(key, source)
    return (entry)
end

@view
func get_all_sources{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    key : felt
) -> (sources_len : felt, sources : felt*):
    let (sources_len, sources) = Oracle_get_all_sources(key)
    return (sources_len, sources)
end

#
# Setters
#

@external
func set_oracle_controller_address{
    syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
}(oracle_controller_address : felt):
    Oracle_set_oracle_controller_address(oracle_controller_address)
    return ()
end

@external
func submit_entry{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    new_entry : Entry
):
    Oracle_submit_entry(new_entry)
    return ()
end
