%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.starknet.common.syscalls import get_block_timestamp, get_block_number
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.uint256 import Uint256

from randomness.IRandomness import IRandomness
from randomness.IExampleRandomness import IExampleRandomness
from time_series.prelude import ONE

@external
func __setup__{syscall_ptr: felt*, range_check_ptr}() {
    alloc_locals;

    let randomness_admin_address = 1234;
    local randomness_address;
    local example_randomness;

    %{
        ids.randomness_address = deploy_contract("./contracts/starknet/src/randomness/Randomness.cairo", []).contract_address
        ids.example_randomness = deploy_contract("./contracts/starknet/src/randomness/ExampleRandomness.cairo", []).contract_address
        context.randomness_address = ids.randomness_address
        context.example_randomness = ids.example_randomness
    %}

    IRandomness.initializer(randomness_address, randomness_admin_address, Uint256(100, 100));
    return ();
}

@external
func test_randomness{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() {
    tempvar randomness_address;
    tempvar example_randomness;
    let randomness_admin_address = 1234;
    %{
        ids.randomness_address = context.randomness_address
        ids.example_randomness = context.example_randomness
    %}

    let seed = 1;
    let callback_gas_limit = 0;
    let callback_address = example_randomness;
    let publish_delay = 1;
    let num_words = 1;

    let requestor_address = 1234;
    let (block_number) = get_block_number();

    %{ expect_events({"name": "Randomness__request", "data": [0, ids.requestor_address, ids.seed, 2, ids.example_randomness, ids.callback_gas_limit, ids.num_words]}) %}
    %{ stop_prank_callable = start_prank(ids.requestor_address, ids.randomness_address) %}
    %{ stop_roll = roll(1, ids.randomness_address) %}
    IRandomness.request_random(
        randomness_address, seed, callback_address, callback_gas_limit, publish_delay, num_words
    );

    let (random_words: felt*) = alloc();

    assert random_words[0] = 10000;
    let request_id = 0;
    let minimum_block_number = 2;

    let (res_) = IExampleRandomness.see_random_word(example_randomness);
    assert res_ = 0;

    let block_hash = 123456789;
    let proof_len = 3;
    let (proof: felt*) = alloc();
    assert proof[0] = 100;
    assert proof[1] = 200;
    assert proof[2] = 300;

    %{ stop_prank_callable(); stop_prank_callable = start_prank(ids.randomness_admin_address, ids.randomness_address) %}
    %{ stop_roll = roll(3, ids.randomness_address) %}
    IRandomness.submit_random(
        randomness_address,
        request_id,
        requestor_address,
        seed,
        minimum_block_number,
        callback_address,
        callback_gas_limit,
        num_words,
        random_words,
        block_hash,
        proof_len,
        proof,
    );
    return ();
}
