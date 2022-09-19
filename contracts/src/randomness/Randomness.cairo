%lang starknet

from starkware.starknet.common.syscalls import get_caller_address, get_block_number
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.hash import hash2
from starkware.cairo.common.alloc import alloc

from admin.library import Admin
from randomness.structs import RequestStatus
from randomness.IRandomnessReceiver import IRandomnessReceiver

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
    requestor_address: felt,
    request_id: felt,
    minimum_block_number: felt,
    callback_gas_limit: felt,
    num_words: felt,
) {
}

@event
func Randomness__status_change(requestor_address: felt, request_id: felt, status: felt) {
}

//
// Constructor
//

@constructor
func constructor{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(admin_address) {
    Admin.initialize_admin_address(admin_address);

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
    Admin.only_admin();
    Randomness__request_status.write(requestor_address, request_id, status);
    Randomness__status_change.emit(requestor_address, request_id, status);

    return ();
}

@external
func request_random{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    seed, callback_gas_limit, callback_address, publish_delay, num_words
) -> (request_id: felt) {
    alloc_locals;

    let (caller_address) = get_caller_address();
    let (current_block) = get_block_number();
    let (request_id) = Randomness__request_id.read(caller_address);

    let (hash_) = hash_request(
        request_id, caller_address, current_block + publish_delay, callback_gas_limit, num_words
    );

    // hash request
    Randomness__request_hash.write(caller_address, request_id, hash_);
    Randomness__request.emit(
        caller_address, request_id, current_block + publish_delay, callback_gas_limit, num_words
    );
    Randomness__request_status.write(caller_address, request_id, RequestStatus.RECEIVED);
    Randomness__request_id.write(caller_address, request_id + 1);

    return (request_id=request_id);
}

@external
func cancel_random_request{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    requestor_address, request_id, minimum_block_number, callback_gas_limit, num_words
) {
    alloc_locals;

    let (caller_address) = get_caller_address();
    let (_hashed_value) = hash_request(
        request_id, requestor_address, minimum_block_number, callback_gas_limit, num_words
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
    minimum_block_number,
    callback_gas_limit,
    random_words_len,
    random_words: felt*,
) {
    alloc_locals;

    Admin.only_admin();

    let (_hashed_value) = hash_request(
        request_id, requestor_address, minimum_block_number, callback_gas_limit, random_words_len
    );
    let (stored_hash_) = Randomness__request_hash.read(requestor_address, request_id);

    with_attr error_message("Randomness hash mismatch") {
        assert stored_hash_ = _hashed_value;
    }

    IRandomnessReceiver.receive_random_words(
        requestor_address, request_id, random_words_len, random_words
    );
    Randomness__request_status.write(requestor_address, request_id, RequestStatus.FULFILLED);
    Randomness__status_change.emit(requestor_address, request_id, RequestStatus.FULFILLED);

    return ();
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
func request_id_status{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
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

//
// Helpers
//

func hash_request{pedersen_ptr: HashBuiltin*}(
    request_id, requestor_address, minimum_block_number, callback_gas_limit, num_words
) -> (hashed_value_: felt) {
    let (hash_) = hash2{hash_ptr=pedersen_ptr}(request_id, requestor_address);
    let (hash_) = hash2{hash_ptr=pedersen_ptr}(hash_, minimum_block_number);
    let (hash_) = hash2{hash_ptr=pedersen_ptr}(hash_, callback_gas_limit);
    let (hash_) = hash2{hash_ptr=pedersen_ptr}(hash_, num_words);
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

    if (status_ == RequestStatus.EMPTY) {
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
