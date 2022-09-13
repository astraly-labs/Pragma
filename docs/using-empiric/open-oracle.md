# Open Oracle

### Assets

The assets currently listed (as of August 2022) are:

| Asset    | Coinbase             | OKX                  |
| -------- | -------------------- | -------------------- |
| BTC/USD  | :white\_check\_mark: | :white\_check\_mark: |
| ETH/USD  | :white\_check\_mark: | :white\_check\_mark: |
| DAI/USD  | :white\_check\_mark: | :white\_check\_mark: |
| ZRX/USD  | :white\_check\_mark: | :white\_check\_mark: |
| BAT/USD  | :white\_check\_mark: | :white\_check\_mark: |
| KNC/USD  | :white\_check\_mark: | :white\_check\_mark: |
| LINK/USD | :white\_check\_mark: | :white\_check\_mark: |
| COMP/USD | :white\_check\_mark: | :white\_check\_mark: |
| XTZ/USD  | :white\_check\_mark: |                      |
| REP/USD  | :white\_check\_mark: |                      |
| UNI/USD  | :white\_check\_mark: |                      |
| GRT/USD  | :white\_check\_mark: |                      |
| SNX/USD  | :white\_check\_mark: |                      |

### Consuming Data

Note: The Open Oracle standard is currently only supported by two exchanges, Coinbase and OKX. While we hope that many more exchanges will support this format in the future, we currently advise to use the feeds as a permissionless backup but not as the main price feed. The risk of relying on only a few sources as the main price feed is that the underlying markets could be moved, leading to skewed prices (see past Coinbase/Compound [exploit](https://decrypt.co/49657/oracle-exploit-sees-100-million-liquidated-on-compound)).Assets

#### Quickstart

```
%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.alloc import alloc

# Oracle Interface Definition
const ORACLE_PROXY_ADDRESS = 0x012fadd18ec1a23a160cc46981400160fbf4a7a5eed156c4669e39807265bcd4
const KEY = 28556963469423460  # str_to_felt("eth/usd")
const AGGREGATION_MODE = 120282243752302  # str_to_felt("median")
const COINBASE_OO_SOURCE = 134715785925367140928549733 # str_to_felt("oo-coinbase")
const OKX_OO_SOURCE = 122523294329720 # str_to_felt("oo-okx")

@contract_interface
namespace IEmpiricOracle:
    func get_value_for_sources(
        key : felt, aggregation_mode : felt, sources_len : felt, sources : felt*
    ) -> (
        value : felt,
        decimals : felt,
        last_updated_timestamp : felt,
        num_sources_aggregated : felt
    ):
    end
end

# Your function
@view
func my_func{
    syscall_ptr : felt*,
    pedersen_ptr : HashBuiltin*,
    range_check_ptr
}() -> ():
    let (sources: felt*) = alloc()
    assert sources[0] = COINBASE_OO_SOURCE
    assert sources[1] = OKX_OO_SOURCE
    
    let (eth_price,
        decimals,
        last_updated_timestamp,
        num_sources_aggregated) = IEmpiricOracle.get_value_for_sources(
            EMPIRIC_ORACLE_ADDRESS, KEY, AGGREGATION_MODE, 2, sources
        )
    # Your smart contract logic!
    return ()
end
```

### Publishing Data

In order to publish data, you must call the [Coinbase API](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi\_getcoinbasepriceoracle-1) or [OKX API](https://www.okx.com/docs-v5/en/#rest-api-market-data-get-oracle) to retrieve the signed and timestamped data. Then, you must prepare that data to be consumed by the on-chain verification contract. You can implement this logic yourself or feel free to use [our SDK](https://github.com/42labs/StarkNet-Open-Oracle/blob/main/client/client\_tools.py). If you use our SDK, simply follow the instructions [in the README](https://github.com/42labs/StarkNet-Open-Oracle#using-the-client-to-publish-signed-prices) to get going.
