%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin

@storage_var
func Example__random_word() -> (random_word: felt) {
}

@external
func receive_random_words{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    requestor_address, request_id, random_words_len, random_words: felt*
) {
    assert random_words_len = 1;
    let random_word = random_words[0];
    Example__random_word.write(random_word);
    return ();
}

@view
func see_random_word{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
    word: felt
) {
    let (_word) = Example__random_word.read();
    return (_word,);
}
