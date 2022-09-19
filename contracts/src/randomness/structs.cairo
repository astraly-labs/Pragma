%lang starknet

struct RequestStatus {
    EMPTY: felt,
    RECEIVED: felt,
    FULFILLED: felt,
    CANCELLED: felt,
    EXCESSIVE_GAS_NEEDED: felt,
    ERRORED: felt,
}
