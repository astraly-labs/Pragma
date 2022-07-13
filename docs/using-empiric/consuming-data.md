# Consuming Data

You can find the list of supported assets [here](supported-assets.md).

The current Empiric Network proxy addresses are:

| Network               | Address                                                              | Block Explorer Link                                                                                                               |
| --------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Starknet Alpha-Goerli | `0x012fadd18ec1a23a160cc46981400160fbf4a7a5eed156c4669e39807265bcd4` | [Voyager](https://goerli.voyager.online/contract/0x012fadd18ec1a23a160cc46981400160fbf4a7a5eed156c4669e39807265bcd4#readContract) |
| Starknet Mainnet      | Coming soon!                                                         | N/A                                                                                                                               |

## Sample Code

If you are just trying to get started with our price feeds, see this self-contained code snippet [here](../quickstart.md). If you'd like to use more advanced oracle functions please see the further information below. You can find a full sample data feed consumer contract [here](https://github.com/42labs/Empiric/blob/master/contracts/sample\_consumer/CheckEthThreshold.cairo) and the full Oracle interface specification is available [here](https://github.com/42labs/Empiric/blob/master/contracts/oracle\_controller/IEmpiricOracle.cairo).

```
%lang starknet

from starkware.cairo.common.math_cmp import is_le
from starkware.cairo.common.pow import pow

from contracts.oracle_controller.IEmpiricOracle import IEmpiricOracle

const EMPIRIC_ORACLE_ADDRESS = 0x012fadd18ec1a23a160cc46981400160fbf4a7a5eed156c4669e39807265bcd4
const KEY = 28556963469423460  # str_to_felt("eth/usd")
const AGGREGATION_MODE = 0  # default

@view
func check_eth_usd_threshold{syscall_ptr : felt*, range_check_ptr}(threshold : felt) -> (
    is_above_threshold : felt
):
    alloc_locals

    let (eth_price, decimals, timestamp, num_sources_aggregated) = IEmpiricOracle.get_value(
        EMPIRIC_ORACLE_ADDRESS, KEY, AGGREGATION_MODE
    )
    let (multiplier) = pow(10, decimals)

    let shifted_threshold = threshold * multiplier
    let (is_above_threshold) = is_le(shifted_threshold, eth_price)
    return (is_above_threshold)
end

```

## Technical Specification

### **Function:** `get_value`

This is the primary function used to read the aggregated value of a specific data feed.

Inputs

* `key`: The lowercased utf8-encoded string
* `aggregation_mode`: The aggregation mode to use for combining the many data sources available in Empiric. Use default of 0 for median

Returns

* `value`: aggregation result of all entries for the given key (using the algorithm specified by the `aggregation_mode` parameter). Multiplied by `10**decimals`
* `decimals`: The number of places that `value` has been shifted to allow for greater accuracy (fixed point)
* `last_updated_timestamp`: timestamp of the most recent entry aggregated
* `num_sources_aggregated`: The number of sources aggregated in the final answer. Use this to check if one of the sources you requested was not available, or if there are enough data reports for you to rely on the answer

### **Function:** `get_entries`

This can be used to get specific verified data building blocks and further process them yourself.

Inputs

* `key`: The lowercased utf8-encoded string
* `sources` \[Optional]: A list of lowercased, utf8-encoded strings to aggregate, e.g. (\[6714488, 128606242856788297213371764, 6516084] for FTX, Jane Street and CMT). Defaults to all sources if none are provided.

**Returns**

* `entries`: the list of entries available for the key and sources provided. Each entry is a struct with the following members:

```
struct Entry:
    member key : felt  # UTF-8 encoded lowercased string, e.g. "eth/usd"
    member value : felt  # Value shifted to the left by decimals
    member timestamp : felt  # Timestamp of the most recent update, UTC epoch
    member source : felt  # UTF-8 encoded lowercased string, e.g. "ftx"
    member publisher : felt  # UTF-8 encoded lowercased string, e.g. "consensys"
    # Publisher of the data (usually the source, but occasionally a third party)
end
```

### **Function:** `get_entry`

This is function will retrieve the entry for a specific data source, and is useful e.g. if your contract needs to know the price on a specific exchange - but use this cautiously as using the price from one source is less robust than aggregating data from many different sources.

Inputs

* `key`: The lowercased utf8-encoded string
* `source`: The lowercased, utf8-encoded strings to fetch data for, e.g. (6714488 for FTX).

Returns

* `entry`: the single entry with the most up to date data for that source. See above for details on the `Entry` struct
