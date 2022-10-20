%lang starknet

from starkware.cairo.common.uint256 import Uint256

@contract_interface
namespace IRandomness {
    func initializer(proxy_admin: felt, public_key: Uint256) {
    }

    func update_status(requestor_address, request_id, status) {
    }

    func request_random(seed, callback_address, callback_gas_limit, publish_delay, num_words) -> (
        request_id: felt
    ) {
    }

    func cancel_random_request(
        request_id,
        requestor_address,
        seed,
        minimum_block_number,
        callback_address,
        callback_gas_limit,
        num_words,
    ) {
    }

    func submit_random(
        request_id,
        requestor_address,
        seed,
        minimum_block_number,
        callback_address,
        callback_gas_limit,
        random_words_len,
        random_words: felt*,
        block_hash: felt,
        proof_len,
        proof: felt*,
    ) {
    }

    func get_pending_requests(
        requestor_address, offset, max_len, request_ids_len, request_ids: felt*
    ) -> (requests_len: felt, requests: felt*) {
    }

    func get_request_status(requestor_address, request_id) -> (status_: felt) {
    }

    func requestor_current_index(requestor_address) -> (idx: felt) {
    }
}
