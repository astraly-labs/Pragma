// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts for Cairo v0.3.1 (upgrades/presets/Proxy.cairo)

%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.starknet.common.syscalls import library_call, library_call_l1_handler
from proxy.library import Proxy

//
// Constructor
//

@contract_interface
namespace IProxy {
    //
    // Fallback functions
    //
    @external
    @raw_input
    @raw_output
    func __default__(selector: felt, calldata_size: felt, calldata: felt*) -> (
        retdata_size: felt, retdata: felt*
    ) {
    }

    @external
    @l1_handler
    @raw_input
    func __l1_default__(selector: felt, calldata_size: felt, calldata: felt*) {
    }
}
