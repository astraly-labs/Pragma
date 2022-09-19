%lang starknet

@contract_interface
namespace IRandomnessReceiver {
    func receive_random_words(request_id, random_words_len, random_words: felt*) {
    }
}
