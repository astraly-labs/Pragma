%lang starknet

@contract_interface
namespace IExampleRandomness {
    func receive_random_words(
        requestor_address, request_id, random_words_len, random_words: felt*
    ) {
    }
    func see_random_word() -> (word: felt) {
    }

    func request_my_randomness(
        seed, callback_address, callback_gas_limit, publish_delay, num_words
    ) {
    }
}
