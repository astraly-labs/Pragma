# Quickstart

In order to consume data in your smart contract, simply grab the oracle interface and address from the snippet below and get going!

You can find the list of supported assets [here](using-empiric/supported-assets.md), the example below is for the ETH/USD feed.

### Steps

1.  Copy the following code and replace line 22 (`# Your smart contract logic!`) with your code that makes use of the data feed.

    Optional: Change the asset (full list of supported assets [here](using-empiric/supported-assets.md)) or aggregation mode you are requesting.
2. [Compile](https://starknet.io/docs/hello\_starknet/intro.html#compile-the-contract), [declare](https://starknet.io/docs/hello\_starknet/intro.html#declare-the-contract-on-the-starknet-testnet) and [deploy](https://starknet.io/docs/hello\_starknet/intro.html#deploy-the-contract-on-the-starknet-testnet) the contract on Starknet.

### Sample Code

```
%lang starknet

# Oracle Interface Definition
const EMPIRIC_ORACLE_ADDRESS = 0x012fadd18ec1a23a160cc46981400160fbf4a7a5eed156c4669e39807265bcd4
const KEY = 28556963469423460  # str_to_felt("eth/usd")
const AGGREGATION_MODE = 120282243752302  # str_to_felt("median")

@contract_interface
namespace IEmpiricOracle:
    func get_value(key : felt, aggregation_mode : felt) -> (
        value : felt, decimals : felt, last_updated_timestamp : felt, num_sources_aggregated : felt
    ):
    end
end

# Your function
@view
func my_func() -> ():
    let (eth_price, decimals, last_updated_timestamp, num_sources_aggregated) = IEmpiricOracle.get_value(
        EMPIRIC_ORACLE_ADDRESS, KEY, AGGREGATION_MODE
    )
    # Your smart contract logic!
    return ()
end
```
