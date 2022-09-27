%lang starknet

from starkware.starknet.common.syscalls import get_caller_address, get_block_number
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.hash import hash2
from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.uint256 import Uint256

from proxy.library import Proxy
from randomness.structs import RequestStatus
from randomness.IRandomnessReceiver import IRandomnessReceiver

@storage_var
func Randomness__public_key() -> (pk: Uint256) {
}

@storage_var
func Randomness__request_id(caller_address) -> (id_: felt) {
}

@storage_var
func Randomness__request_hash(caller_address, request_id) -> (request_hash: felt) {
}

@storage_var
func Randomness__request_status(caller_address, request_id) -> (status_: felt) {
}

@event
func Randomness__request(
    request_id: felt,
    caller_address: felt,
    seed: felt,
    minimum_block_number: felt,
    callback_address: felt,
    callback_gas_limit: felt,
    num_words: felt,
) {
}

@event
func Randomness__proof(
    request_id: felt,
    requestor_address: felt,
    seed: felt,
    minimum_block_number: felt,
    random_words_len: felt,
    random_words: felt*,
    proof_len: felt,
    proof: felt*,
) {
}

@event
func Randomness__status_change(requestor_address: felt, request_id: felt, status: felt) {
}

//
// initializer
//

@external
func initializer{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    proxy_admin, public_key: Uint256
) {
    Proxy.initializer(proxy_admin);
    Randomness__public_key.write(public_key);

    return ();
}

//
// External
//

// until cairo 1.0, we can not calculate onchain the amount of gas an invocation uses so we need to fail it ourselves
@external
func update_status{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    requestor_address, request_id, status
) {
    Proxy.assert_only_admin();
    Randomness__request_status.write(requestor_address, request_id, status);
    Randomness__status_change.emit(requestor_address, request_id, status);

    return ();
}

@external
func request_random{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    seed, callback_address, callback_gas_limit, publish_delay, num_words
) -> (request_id: felt) {
    alloc_locals;

    let (caller_address) = get_caller_address();
    let (current_block) = get_block_number();
    let (request_id) = Randomness__request_id.read(caller_address);

    with_attr error_message("Currently only one random word per request") {
        assert num_words = 1;
    }

    let (hash_) = hash_request(
        request_id,
        caller_address,
        seed,
        current_block + publish_delay,
        callback_address,
        callback_gas_limit,
        num_words,
    );

    // hash request
    Randomness__request_hash.write(caller_address, request_id, hash_);
    Randomness__request.emit(
        request_id,
        caller_address,
        seed,
        current_block + publish_delay,
        callback_address,
        callback_gas_limit,
        num_words,
    );
    Randomness__request_status.write(caller_address, request_id, RequestStatus.RECEIVED);
    Randomness__request_id.write(caller_address, request_id + 1);

    return (request_id=request_id);
}

@external
func cancel_random_request{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    request_id,
    requestor_address,
    seed,
    minimum_block_number,
    callback_address,
    callback_gas_limit,
    num_words,
) {
    alloc_locals;

    let (caller_address) = get_caller_address();
    let (_hashed_value) = hash_request(
        request_id,
        requestor_address,
        seed,
        minimum_block_number,
        callback_address,
        callback_gas_limit,
        num_words,
    );
    let (stored_hash_) = Randomness__request_hash.read(caller_address, request_id);

    with_attr error_message("INVALID REQUEST OWNER") {
        assert _hashed_value = stored_hash_;
        assert requestor_address = caller_address;
    }
    Randomness__status_change.emit(requestor_address, request_id, RequestStatus.CANCELLED);
    return ();
}

@external
func submit_random{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
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
    alloc_locals;
    // this will be replaced with a proof in the following release once we are finished with our implementation of an onchain verifier

    Proxy.assert_only_admin();

    let (_hashed_value) = hash_request(
        request_id,
        requestor_address,
        seed,
        minimum_block_number,
        callback_address,
        callback_gas_limit,
        random_words_len,
    );
    let (stored_hash_) = Randomness__request_hash.read(requestor_address, request_id);

    with_attr error_message("Randomness hash mismatch") {
        assert stored_hash_ = _hashed_value;
    }

    IRandomnessReceiver.receive_random_words(
        callback_address, requestor_address, request_id, random_words_len, random_words
    );
    Randomness__request_status.write(requestor_address, request_id, RequestStatus.FULFILLED);
    Randomness__status_change.emit(requestor_address, request_id, RequestStatus.FULFILLED);

    Randomness__proof.emit(
        request_id,
        requestor_address,
        seed,
        minimum_block_number,
        random_words_len,
        random_words,
        proof_len,
        proof,
    );
    return ();
}

//
// Upgrade
//

@external
func upgrade{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    new_implementation: felt
) {
    Proxy.assert_only_admin();
    Proxy._set_implementation_hash(new_implementation);
    return ();
}

@view
func get_implementation_hash{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
    address: felt
) {
    let (address) = Proxy.get_implementation_hash();
    return (address,);
}

//
// Views
//

@view
func get_pending_requests{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    requestor_address, offset, max_len, request_ids_len, request_ids: felt*
) -> (requests_len: felt, requests: felt*) {
    alloc_locals;

    let (max_index) = Randomness__request_id.read(requestor_address);
    let (requests) = alloc();
    let (requests_len) = allocate_requests(
        0, offset, max_index, max_len, requestor_address, 0, requests
    );
    return (requests_len=requests_len, requests=requests);
}

@view
func get_request_status{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    requestor_address, request_id
) -> (status_: felt) {
    let (request_status) = Randomness__request_status.read(requestor_address, request_id);
    return (status_=request_status);
}

@view
func requestor_current_index{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    requestor_address
) -> (idx: felt) {
    let (current_index) = Randomness__request_id.read(requestor_address);
    return (idx=current_index);
}

@view
func get_public_key{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    requestor_address
) -> (pk: Uint256) {
    let (pub_key_) = Randomness__public_key.read();
    return (pub_key_,);
}

//
// Helpers
//

func hash_request{pedersen_ptr: HashBuiltin*}(
    request_id,
    requestor_address,
    seed,
    minimum_block_number,
    callback_address,
    callback_gas_limit,
    num_words,
) -> (hashed_value_: felt) {
    alloc_locals;

    let (local hash_) = hash2{hash_ptr=pedersen_ptr}(request_id, requestor_address);
    let (local hash_) = hash2{hash_ptr=pedersen_ptr}(hash_, seed);
    let (local hash_) = hash2{hash_ptr=pedersen_ptr}(hash_, minimum_block_number);
    let (local hash_) = hash2{hash_ptr=pedersen_ptr}(hash_, callback_address);
    let (local hash_) = hash2{hash_ptr=pedersen_ptr}(hash_, callback_gas_limit);
    let (local hash_) = hash2{hash_ptr=pedersen_ptr}(hash_, num_words);
    return (hashed_value_=hash_);
}

func allocate_requests{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    cur_idx, offset, max_index, max_len, requestor_address, request_ids_len, request_ids: felt*
) -> (request_len: felt) {
    if (cur_idx + offset == max_index) {
        return (request_len=request_ids_len);
    }
    if (request_ids_len == max_len) {
        return (request_len=max_len);
    }

    let (status_) = Randomness__request_status.read(requestor_address, cur_idx + offset);

    if (status_ == RequestStatus.UNINITIALIZED) {
        return (request_len=request_ids_len);
    }

    if (status_ == RequestStatus.RECEIVED) {
        assert request_ids[request_ids_len] = cur_idx + offset;
        return allocate_requests(
            cur_idx + 1,
            offset,
            max_index,
            max_len,
            requestor_address,
            request_ids_len + 1,
            request_ids,
        );
    } else {
        return allocate_requests(
            cur_idx + 1, offset, max_index, max_len, requestor_address, request_ids_len, request_ids
        );
    }
}
