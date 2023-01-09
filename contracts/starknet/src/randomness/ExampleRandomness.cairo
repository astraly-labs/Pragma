%lang starknet

from starkware.starknet.common.syscalls import (
    get_block_number,
    get_caller_address,
    get_contract_address,
)
from starkware.cairo.common.math import assert_le
from starkware.cairo.common.cairo_builtins import HashBuiltin

const ORACLE_ADDRESS = 0x681a206bfb74aa7436b3c5c20d7c9242bc41bc6471365ca9404e738ca8f1f3b;

@storage_var
func min_block_number_storage() -> (min_block_number: felt) {
}

@storage_var
func last_random_storage() -> (res: felt) {
}

@contract_interface
namespace IRandomness {
    func request_random(seed, callback_address, callback_gas_limit, publish_delay, num_words) -> (
        request_id: felt
    ) {
    }
}

@view
func get_last_random{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
    last_random: felt
) {
    let (last_random) = last_random_storage.read();
    return (last_random=last_random);
}

@external
func request_my_randomness{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    seed, callback_address, callback_gas_limit, publish_delay, num_words
) {
    let (request_id) = IRandomness.request_random(
        ORACLE_ADDRESS, seed, callback_address, callback_gas_limit, publish_delay, num_words
    );

    let (current_block_number) = get_block_number();
    min_block_number_storage.write(current_block_number + publish_delay);

    return ();
}

@external
func receive_random_words{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    requestor_address, request_id, random_words_len, random_words: felt*
) {
    // Have to make sure that the caller is the Empiric Randomness Oracle contract
    let (caller_address) = get_caller_address();
    assert ORACLE_ADDRESS = caller_address;

    // and that the current block is within publish_delay of the request block
    let (current_block_number) = get_block_number();
    let (min_block_number) = min_block_number_storage.read();
    assert_le(min_block_number, current_block_number);

    // and that the requestor_address is what we expect it to be (can be self
    // or another contract address), checking for self in this case
    let (contract_address) = get_contract_address();
    assert requestor_address = contract_address;

    // Optionally: Can also make sure that request_id is what you expect it to be,
    // and that random_words_len==num_words

    // Your code using randomness!
    let random_word = random_words[0];

    last_random_storage.write(random_word);

    return ();
}
