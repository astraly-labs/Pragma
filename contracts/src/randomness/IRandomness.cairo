%lang starknet

@contract_interface
namespace IRandomness {
    func update_status(requestor_address, request_id, status) {
    }

    func request_random(seed, callback_gas_limit, callback_address, publish_delay, num_words) -> (
        request_id: felt
    ) {
    }

    func cancel_random_request(
        requestor_address, request_id, minimum_block_number, callback_gas_limit, num_words
    ) {
    }

    func submit_random(
        request_id,
        requestor_address,
        minimum_block_number,
        callback_gas_limit,
        random_words_len,
        random_words: felt*,
    ) {
    }

    func get_pending_requests(
        requestor_address, offset, max_len, request_ids_len, request_ids: felt*
    ) -> (requests_len: felt, requests: felt*) {
    }

    func request_id_status(requestor_address, request_id) -> (status_: felt) {
    }

    func requestor_current_index(requestor_address) -> (idx: felt) {
    }
}
