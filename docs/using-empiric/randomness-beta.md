# Randomness \[Beta]

Empiric Network offers a verifiable randomness feed that allows protocols to request secure randomness on-chain.&#x20;

This feed is being rolled out in two phases: In the first phase (currently live) the randomness proof is posted as calldata, allowing anyone to verify it off-chain. See below for more details on how to verify the randomness. This first phase is limited to testnet, and there is no charge for randomness.

In the second phase, the proof will be verified directly on-chain (coming soon) and requesters will be required to cover gas costs of their callback function plus a small fee to cover the cost of generating randomness.

## Sample Code

If you are just trying to get started with using randomness, see the self-contained code snippet. If you'd like to use more advanced oracle functions, read on past the code block for further information. You can find a full sample randomness receiver contract [here](https://github.com/42labs/Empiric/blob/master/contracts/src/randomness/ExampleRandomness.cairo).

```
%lang starknet

from starkware.starknet.common.syscalls import get_block_number, get_caller_address, get_contract_address
from starkware.cairo.common.math import assert_le
from starkware.cairo.common.cairo_builtins import HashBuiltin

const EMPIRIC_RANDOM_ORACLE_ADDRESS = 0x681a206bfb74aa7436b3c5c20d7c9242bc41bc6471365ca9404e738ca8f1f3b;

@storage_var
func min_block_number_storage() -> (min_block_number: felt) {
}

@contract_interface
namespace IRandomness {
    func request_random(seed,
                        callback_address,
                        callback_gas_limit,
                        publish_delay,
                        num_words
    ) -> (
        request_id: felt
    ) {
    }
}

@external
func request_my_randomness{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    seed, callback_address, callback_gas_limit, publish_delay, num_words
) {
    let (request_id) = IRandomness.request_random(
        EMPIRIC_RANDOM_ORACLE_ADDRESS,
        seed,
        callback_address,
        callback_gas_limit,
        publish_delay,
        num_words,
    );

    let (current_block_number) = get_block_number();
    min_block_number_storage.write(current_block_number + publish_delay);

    return ();
}

@external
func receive_random_words{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    requestor_address, request_id, random_words_len, random_words: felt*
) {
    // Have to make sure that the caller is the Empiric Randomness Oracle contract
    let (caller_address) = get_caller_address();
    assert EMPIRIC_RANDOM_ORACLE_ADDRESS = caller_address;

    // and that the current block is within publish_delay of the request block
    let (current_block_number) = get_block_number();
    let (min_block_number) = min_block_number_storage.read();
    assert_le(min_block_number, current_block_number);
    
    // and that the requestor_address is what we expect it to be (can be self
    // or another contract address), checking for self in this case
    let (contract_address) = get_contract_address()
    assert requestor_address = contract_address

    // Optionally: Can also make sure that request_id is what you expect it to be,
    // and that random_words_len==num_words

    // Your code using randomness!
    let random_word = random_words[0];

    return ();
}

```

## How Randomness is Generated

Empiric Network's randomness is based off of the [Internet Engineering Task Force's (IETF) Verifiable Randomness Function](https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-vrf-06) using elliptic curves. Their Python implementation is available as open source code [here](https://github.com/nccgroup/draft-irtf-cfrg-vrf-06/blob/master/README.md).

When smart contracts request randomness, they specify a random seed. This seed uniquely determines the randomness, so the Empiric as the VRF provider is not able to manipulate the randomness. However calculating the randomness requires having access to a private key that is not known, so the smart contract (and any other party observing the randomness request) is not able to predict the randomness. Off-chain, the randomness is calculated using the private key and the seed. That randomness and the proof are then sent on-chain, where the unbiased randomness is then available to the smart contract that requested it.

## Verifying The Randomness

As mentioned above, in the first phase of Empiric Network's VRF feed, the randomness proof is posted as calldata, allowing anyone to verify it off-chain.

In order to make it easier to verify that a specific piece of randomness was verifiable, we provide an open source implementation of the verifier. Follow these simple steps to verify any randomness provided by Empiric Network:

1. Install the Empiric Python package `pip install empiric-network --pre`
2. Run `python3 -m empiric.cli random verify-random <TRANSACTION_HASH>` where `TRANSACTION_HASH` is the hash of the StarkNet testnet transaction in which the randomness was submitted to your smart contract.

## Technical Specification

### Function: `request_random`

Allows your smart contract to request randomness. Upon calling the Empiric contract, an event is emitted triggering the randomness and proof to be generated off-chain and then submitted back on-chain, calling the callback function `receive_random_words` on your contract.

Inputs

* `seed`: random seed that feeds into the verifiable randomness algorithm, must be different every time. Until it it possible to get the block\_hash on StarkNet, it is recommended to use `hash(request_address, hash(nonce, block_timestamp))`
* `callback_address`: address to call `receive_random_words` on with the randomness
* `callback_gas_limit`: gas limit on the callback function
* `publish_delay`: minimum number of blocks to wait from the request to fulfillment
* `num_words`: number of random words to receive in one call. Each word is a felt, so 251 bits of randomness

Returns

* `request_id`: ID of the request, which can be used to check the status, cancel the request and check that the callback function was correctly called.

### Callback Function: `receive_random_words`

This is function must be defined on the contract at `callback_address` initially passed in the randomness request.

Inputs

* `requestor_address`: address that submitted the randomness request
* `request_id`: id of the randomness request (auto-incrementing for each `requestor_address`)
* `random_words_len`: number of random words returned
* `random_words`: pointer to the first random word

### Function: `cancel_random_request`

Allows the requestor of randomness to cancel the request.

Inputs

* `request_id`: ID of the request to be canceled
* `seed`: seed used to request the randomness
* `requestor_address`: address of the contract that originally requested the randomness. Currently must be the same as the contract calling the cancel function
* `minimum_block_number`: the block number in which the randomness could first have been published, equal to `publish_delay` + `block_number` of the request
* `callback_address`: argument provided in the randomness request
* `callback_gas_limit`: argument provided in the randomness request
* `num_words`: argument provided in the randomness request

### Function: `get_request_status`

Get the status of a randomness request.

Inputs

* `requestor_address`: address of the requesting contract
* `request_id`: ID of the request to be canceled

Returns

* `status_`: status of the request, see [here](https://github.com/42labs/Empiric/blob/master/contracts/src/randomness/structs.cairo). 0=UNINITIALIZED, 1=RECEIVED, 2=FULFILLED, 3=CANCELLED, 4=EXCESSIVE\_GAS\_NEEDED, 5=ERRORED.&#x20;
