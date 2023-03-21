---
id: open-oracle
title: Open Oracle
sidebar_position: 4
---

---

## Assets

The assets currently listed on testnet are:

| Ticker   | Coinbase | OKX |
| -------- | -------- | --- |
| BTC/USD  | ✅       | ✅  |
| ETH/USD  | ✅       | ✅  |
| DAI/USD  | ✅       | ✅  |
| ZRX/USD  | ✅       | ✅  |
| BAT/USD  | ✅       | ✅  |
| KNC/USD  | ✅       | ✅  |
| LINK/USD | ✅       | ✅  |
| COMP/USD | ✅       | ✅  |
| XTZ/USD  | ✅       |     |
| REP/USD  | ✅       |     |
| UNI/USD  | ✅       |     |
| GRT/USD  | ✅       |     |
| SNX/USD  | ✅       |     |

## Consuming Data

Note: The Open Oracle standard is currently only supported by two exchanges, Coinbase and OKX. While we hope that many more exchanges will support this format in the future, we currently advise to use the feeds as a permissionless backup but not as the main price feed. The risk of relying on only a few sources as the main price feed is that the underlying markets could be moved, leading to skewed prices (see past Coinbase/Compound [exploit](https://decrypt.co/49657/oracle-exploit-sees-100-million-liquidated-on-compound)).

### Quickstart

```bash
%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.alloc import alloc

// Oracle Interface Definition
const PRAGMA_ORACLE_ADDRESS = 0x446812bac98c08190dee8967180f4e3cdcd1db9373ca269904acb17f67f7093;
const PAIR_ID = 19514442401534788; // str_to_felt("ETH/USD")
const COINBASE_OO_SOURCE = 95879041655361647872660293; // str_to_felt("OO-COINBASE")
const OKX_OO_SOURCE = 87201481182040; // str_to_felt("OO-OKX")

@contract_interface
namespace IPragmaOracle {
func get_spot_median_for_sources(pair_id: felt, sources_len: felt, sources: felt\*) -> (
value: felt, decimals: felt, last_updated_timestamp: felt, num_sources_aggregated: felt
) {
}
}

// Your function
@view
func my_func{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> () {
let (sources: felt\*) = alloc();
assert sources[0] = COINBASE_OO_SOURCE;
assert sources[1] = OKX_OO_SOURCE;

    let (
        eth_price, decimals, last_updated_timestamp, num_sources_aggregated
    ) = IPragmaOracle.get_spot_median_for_sources(
        PRAGMA_ORACLE_ADDRESS, PAIR_ID, 2, sources
    );
    // Your smart contract logic!
    return ();

}
```

## Publishing Data

One of the benefits of the open oracle is that anyone can publish data permissionlessly, as Coinbase and OKX signatures are verified on-chain. We are working with a number of leading protocols on StarkNet to publish data regularly in order to provide free, transparent and community-driven price feeds for the ecosystem. If you'd like to join the StarkNet Open Oracle Publisher Committee, please reach out on [Twitter](https://twitter.com/PragmaOracle)!

In order to publish data, you must call the [Coinbase](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getcoinbasepriceoracle) API or [OKX](https://www.okx.com/docs-v5/en/#rest-api-market-data-get-oracle) API to retrieve the signed and timestamped data. Then, you must prepare that data to be consumed by the on-chain verification contract. You can implement this logic yourself or feel free to use [our SDK](https://github.com/Astraly-Labs/StarknetOpenOracle/blob/master/client/client_tools.py). If you use our SDK, simply follow the instructions in the [README](https://github.com/Astraly-Labs/StarknetOpenOracle#using-the-client-to-publish-signed-prices) to get going.
