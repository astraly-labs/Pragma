%lang starknet

struct RequestStatus {
    UNINITIALIZED: felt,
    RECEIVED: felt,
    FULFILLED: felt,
    CANCELLED: felt,
    EXCESSIVE_GAS_NEEDED: felt,
    ERRORED: felt,
}
