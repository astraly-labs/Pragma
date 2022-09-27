%lang starknet

@contract_interface
namespace IExampleRandomness {
    func receive_random_words(
        requestor_address, request_id, random_words_len, random_words: felt*
    ) {
    }
    func see_random_word() -> (word: felt) {
    }
}
