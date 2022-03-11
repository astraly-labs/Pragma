# Declare this file as a StarkNet contract.
%lang starknet

from starkware.starknet.common.syscalls import storage_read, storage_write
from utils.constants import TRUE
from starkware.cairo.common.cairo_builtins import HashBuiltin
from types.entry import Entry

func verify_oracle_signature(oracle_signature : felt, oracle_name : felt) -> (
        is_signature_valid : felt):
    let is_signature_valid = TRUE  # To do
    return (is_signature_valid)
end

@storage_var
func entry(asset_name : felt) -> (entry : Entry):
end

@external
func add_entry{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        new_entry : Entry, oracle_signature : felt):
    let (is_signature_valid) = verify_oracle_signature(oracle_signature, new_entry.oracle_name)
    assert is_signature_valid = TRUE

    entry.write(new_entry.asset_name, new_entry)
    return ()
end

@view
func get_entry{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        asset_name : felt) -> (entry_res : Entry):
    let (res) = entry.read(asset_name)
    return (res)
end
