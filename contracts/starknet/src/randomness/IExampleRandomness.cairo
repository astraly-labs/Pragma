%lang starknet

@contract_interface
namespace IExampleRandomness {
    func get_last_random() -> (last_random: felt) {
    }

    func request_my_randomness(
        seed, callback_address, callback_gas_limit, publish_delay, num_words
    ) {
    }

    func receive_random_words(
        requestor_address, request_id, random_words_len, random_words: felt*
    ) {
    }
}
