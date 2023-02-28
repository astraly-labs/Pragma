---
id: starknet-quickstart
title: Starknet Quickstart
sidebar_position: 1
---

---

In order to consume data in your smart contract, simply grab the oracle interface and address from the snippet below and get going!
You can find the list of supported assets [here](/docs/starknet/data-feeds/supported-assets), the example below is for the ETH/USD feed.

## Steps

1. Copy the following code and replace line 22 (`# Your smart contract logic!`) with your code that makes use of the data feed.
   Optional: Change the asset (full list of supported assets here), or use a more advanced endpoint to request data from specific sources, customize the aggregation logic, rebase the currency (e.g. BTC/ETH price) or get multiple prices in one call.
2. Compile, declare and deploy the contract on Starknet.

## Sample Code

```bash
%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin

// Oracle Interface Definition
const EMPIRIC_ORACLE_ADDRESS = 0x446812bac98c08190dee8967180f4e3cdcd1db9373ca269904acb17f67f7093;
const PAIR_ID = 19514442401534788; // str_to_felt("ETH/USD")

@contract_interface
namespace IEmpiricOracle {
func get_spot_median(pair_id: felt) -> (
price: felt,
decimals: felt,
last_updated_timestamp: felt,
num_sources_aggregated: felt
) {
}
}

// Your function
@view
func my_func{syscall_ptr: felt*,
pedersen_ptr: HashBuiltin*,
range_check_ptr
}() -> () {
let (
eth_price,
decimals,
last_updated_timestamp,
num_sources_aggregated
) = IEmpiricOracle.get_spot_median(EMPIRIC_ORACLE_ADDRESS, PAIR_ID);
// Your smart contract logic!
return ();
}
```
