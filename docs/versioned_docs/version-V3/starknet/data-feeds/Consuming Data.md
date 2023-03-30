---
id: consuming-data
title: Consuming Data
sidebar_position: 1
---

---

You can find the list of supported assets here.
The current Pragma proxy addresses are:

| Network                 | Address                                                             | Explorer                                                                                                                                                                                                                                              |
| ----------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| StarkNet Mainnet        | 0x0346c57f094d641ad94e43468628d8 e9c574dcb2803ec372576ccc60a40be2c4 | [Starkscan](https://starkscan.co/contract/0x0346c57f094d641ad94e43468628d8e9c574dcb2803ec372576ccc60a40be2c4#overview) [Voyager](https://voyager.online/contract/0x0346c57f094d641ad94e43468628d8e9c574dcb2803ec372576ccc60a40be2c4)                  |
| StarkNet Alpha-Goerli   | 0x446812bac98c08190dee8967180f4e 3cdcd1db9373ca269904acb17f67f7093  | [Starkscan](https://testnet.starkscan.co/contract/0x446812bac98c08190dee8967180f4e3cdcd1db9373ca269904acb17f67f7093) [Voyager](https://goerli.voyager.online/contract/0x446812bac98c08190dee8967180f4e3cdcd1db9373ca269904acb17f67f7093#transactions) |
| StarkNet Alpha-Goerli 2 | 0xc28f8752abb9ed18f65fed730b8faa 69bdf6128bb730411efd916284701938   | [Starkscan](https://testnet.starkscan.co/contract/0x446812bac98c08190dee8967180f4e3cdcd1db9373ca269904acb17f67f7093) [Voyager](https://goerli.voyager.online/contract/0x446812bac98c08190dee8967180f4e3cdcd1db9373ca269904acb17f67f7093#transactions) |

## Sample Code

If you are just trying to get started with our price feeds, see this self-contained code snippet [here](/docs/starknet/data-feeds/quickstart). If you'd like to use more advanced oracle functions please see the further information below. You can find a full sample data feed consumer contract [here](https://github.com/Astraly-Labs/Pragma/blob/master/contracts/starknet/src/sample_consumer/CheckEthThreshold.cairo) and the full Oracle interface specification is available [here](https://github.com/Astraly-Labs/Pragma/blob/master/contracts/starknet/src/oracle/IEmpiricOracle.cairo).

```bash
%lang starknet

from starkware.cairo.common.math_cmp import is_le
from starkware.cairo.common.pow import pow

from oracle.IPragmaOracle import IPragmaOracle, PragmaAggregationModes

const PRAGMA_ORACLE_ADDRESS = 0x446812bac98c08190dee8967180f4e3cdcd1db9373ca269904acb17f67f7093;
const KEY = 19514442401534788; // str_to_felt("ETH/USD")

@view
func check_eth_usd_threshold{syscall_ptr: felt\*, range_check_ptr}(threshold: felt) -> (
is_above_threshold: felt
) {
    alloc_locals;

    let (eth_price, decimals, timestamp, num_sources_aggregated) = IPragmaOracle.get_spot(PRAGMA_ORACLE_ADDRESS, KEY, PragmaAggregationModes.MEDIAN);
    let (multiplier) = pow(10, decimals);

    let shifted_threshold = threshold * multiplier;
    let is_above_threshold = is_le(shifted_threshold, eth_price);
    return (is_above_threshold,);
}
```

## Technical Specification

### Function: `get_spot_median`

This is the the simplest function that will aggregate all data into a median for a given spot pair ID.

#### Inputs

- `pair_id`: uppercased utf8-encoded string

#### Returns

- `price`: aggregation result of all entries for the given key based on the robust median algorithm. Multiplied by `10**decimals`
- `decimals`: number of places that value has been shifted to allow for greater accuracy (fixed point)
- `last_updated_timestamp`: timestamp of the most recent entry aggregated
- `num_sources_aggregated`: number of sources aggregated in the final answer. Use this to check if one of the sources you requested was not available, or if there are enough data reports for you to rely on the answer

#### Function: `get_spot`

Similar to get_spot_median except it allows for an additional parameter to specify a custom aggregated logic (e.g. volume-weighted average (VWAP), mean and more).

#### Inputs

- `pair_id`: uppercased utf8-encoded string
- `aggregation_mode`: aggregation mode to use for combining the many data sources available in Pragma. Use constants defined in Pragma. Option must currently be set to `MEDIAN`. Additional options `VWAP`, `EXPONENTIAL_DECAY` and `MEAN` are coming soon.

#### Returns

- `price`: aggregation result of all entries for the given key based on the robust median algorithm. Multiplied by `10**decimals`
- `decimals`: number of places that value has been shifted to allow for greater accuracy (fixed point)
- `last_updated_timestamp`: timestamp of the most recent entry aggregated
- `num_sources_aggregated`: number of sources aggregated in the final answer. Use this to check if one of the sources you requested was not available, or if there are enough data reports for you to rely on the answer

### Function: `get_spot_median_multi`

Similar to get_spot_median except it allows for getting multiple spot prices in one call.

#### Inputs

- `pair_ids_len`: number of pair IDs being requested
- `pair_ids`: pointer to the first uppercased utf8-encoded string in the array of pair IDs

#### Returns

- `prices_response_len`: number of responses returned
- `prices_response`: pointer to the first response, where each response is of type `PragmaPricesResponse` which consists of (`price`, `decimals`, `last_updated_timestamp`, `num_sources_aggregated`) with the same interpretation as on a `single get_spot_median` call (see above)

### Function: `get_spot_with_USD_hop`

This function enables you to rebase the price, i.e. use a different base currency. For instance, if you want the price of BTC/ETH, you can combine the BTC/USD and ETH/USD price data to derive that.

#### Inputs

- `base_currency_id`: uppercase utf8-encoded string for the base currency (e.g. BTC)
- `quote_currency_id`: uppercase utf8-encoded string for the base currency (e.g. ETH)
- `aggregation_mode`: aggregation mode to use for combining the many data sources available in Pragma. Use constants defined in Pragma. Option must currently be set to `MEDIAN`. Additional options `TWAP`, `EXPONENTIAL_DECAY` and `MEAN` are coming soon.

#### Returns

- `price`: aggregation result of all entries for the given key (using the algorithm specified by the `aggregation_mode` parameter). Multiplied by `10**decimals`
- `decimals`: number of places that value has been shifted to allow for greater accuracy (fixed point)
- `last_updated_timestamp`: timestamp of the most recent entry aggregated
- `num_sources_aggregated`: number of sources aggregated in the final answer. Use this to check if one of the sources you requested was not available, or if there are enough data reports for you to rely on the answer

### Function: `get_spot_with_hops`

This function enables you to get the price of one currency in terms of another, by specifying the path from one the quote to the base currency. For instance, if you want the price of ETH/EUR, you can combine the ETH/USD, BTC/USD and BTC/EUR price data to derive that.

#### Inputs

- `currency_ids_len`: number of currency ids in the hops
- `currency_ids`: pointer to the first element in the list of currency IDs, where each currency ID is the utf8-encoded string for that currency (e.g. ETH)
- `aggregation_mode`: aggregation mode to use for combining the many data sources available in Pragma. Use constants defined in Pragma. Option must currently be set to `MEDIAN`. Additional options `TWAP`, `EXPONENTIAL_DECAY` and `MEAN` are coming soon.

#### Returns

- `price`: aggregation result of all entries for the given key (using the algorithm specified by the `aggregation_mode` parameter). Multiplied by `10**decimals`
- `decimals`: number of places that value has been shifted to allow for greater accuracy (fixed point)
- `last_updated_timestamp`: timestamp of the most recent entry aggregated
- `num_sources_aggregated`: number of sources aggregated in the final answer. Use this to check if one of the sources you requested was not available, or if there are enough data reports for you to rely on the answer

### Function: `get_spot_for_sources`

This function enables you to get the price of one currency in terms of another, by specifying the path from one the quote to the base currency. For instance, if you want the price of ETH/EUR, you can combine the ETH/USD, BTC/USD and BTC/EUR price data to derive that.

#### Inputs

- `pair_id`: uppercased utf8-encoded string
- `aggregation_mode`: aggregation mode to use for combining the many data sources available in Pragma. Use constants defined in Pragma. Option must currently be set to `MEDIAN`. Additional options `TWAP`, `EXPONENTIAL_DECAY` and `MEAN` are coming soon.
- `sources_len`: number of sources to aggregate
- `sources`: pointer to the first source in the list of sources, where each source is a utf8-encoded string (e.g. "gemini")

#### Returns

- `price`: aggregation result of all entries for the given key (using the algorithm specified by the `aggregation_mode` parameter). Multiplied by `10\*\*decimals`
- `decimals`: number of places that value has been shifted to allow for greater accuracy (fixed point)
- `last_updated_timestamp`: timestamp of the most recent entry aggregated
- `num_sources_aggregated`: number of sources aggregated in the final answer. Use this to check if one of the sources you requested was not available, or if there are enough data reports for you to rely on the answer

### Function: `get_futures`

This function enables you to get the price of one currency in terms of another, by specifying the path from one the quote to the base currency. For instance, if you want the price of ETH/EUR, you can combine the ETH/USD, BTC/USD and BTC/EUR price data to derive that.

#### Inputs

- `pair_id`: uppercased utf8-encoded string
- `expiry_timestamp`: timestamp of the expiry of the future (UTC)
- `aggregation_mode`: aggregation mode to use for combining the many data sources available in Pragma. Use constants defined in Pragma. Option must currently be set to `MEDIAN`. Additional options `TWAP`, `EXPONENTIAL_DECAY` and `MEAN` are coming soon.
- `sources_len`: number of sources to aggregate
- `sources`: pointer to the first source in the list of sources, where each source is a utf8-encoded string (e.g. "gemini")

#### Returns

- `price`: aggregation result of all entries for the given key (using the algorithm specified by the `aggregation_mode` parameter). Multiplied by `10\*\*decimals`
- `decimals`: number of places that value has been shifted to allow for greater accuracy (fixed point)
- `last_updated_timestamp`: timestamp of the most recent entry aggregated
- `num_sources_aggregated`: number of sources aggregated in the final answer. Use this to check if one of the sources you requested was not available, or if there are enough data reports for you to rely on the answer

### Function: `get_spot_entry`

This function enables you to get the most recent raw data point for a specific spot asset and source.

#### Inputs

- `pair_id`: uppercased utf8-encoded string
- `source`: uppercased utf8-encoded data source, e.g. `str_to_felt("GEMINI")=78362974965321`

#### Returns

- `entry`: entry of type SpotEntry, i.e. a `struct` with members `base_entry`, which in turn has a `timestamp`, `source` and `publisher`, and additional members `pair_id`, `price` and `volume`.

### Function: `get_spot_entries`

This function enables you to get the multiple raw data points for a specific spot asset and all sources.

#### Inputs

- `pair_id`: uppercased utf8-encoded string

#### Returns

- `entries_len`: the number of entries in the list returned
- `entries`: pointer to the first entry, where each entry of type `SpotEntry`, i.e. a struct with members `base_entry`, which in turn has a `timestamp`, `source` and `publisher`, and additional members `pair_id`, `price` and `volume`.

### Function: `get_spot_entries_for_sources`

This function enables you to get the most recent raw data point for a specific spot asset and a list of sources.

#### Inputs

- `pair_id`: uppercased utf8-encoded string
- `sources_len`: number of sources to request for sources: pointer to the first source, where each source is a uppercased utf8-encoded data source, e.g. `str_to_felt("GEMINI")=78362974965321`

#### Returns

- `entries_len`: the number of entries in the list returned
- `entries`: pointer to the first entry, where each entry of type `SpotEntry`, i.e. a struct with members `base_entry`, which in turn has a `timestamp`, `source` and `publisher`, and additional members `pair_id`, `price` and `volume`.

### Function: `get_future_entry`

This function enables you to get the most recent raw data point for a specific future asset and source.

#### Inputs

- `pair_id`: uppercased utf8-encoded string
- `expiry_timestamp`: timestamp of the expiry of the future
- `source`: uppercased utf8-encoded data source, e.g. `str_to_felt("GEMINI")=78362974965321`

#### Returns

- `entry`: entry of type `FutureEntry`, i.e. a struct with members `base_entry`, which in turn has a `timestamp`, `source` and `publisher`, and additional members `pair_id`, `expiry_timestamp` and `price`.

### Function: `get_future_entries`

This function enables you to get the multiple raw data points for a specific future asset and all sources.

#### Inputs

- `pair_id`: uppercased utf8-encoded string
- `expiry_timestamp`: timestamp of the expiry of the future

#### Returns

- `entries_len`: the number of entries in the list returned
- `entries`: pointer to the first entry, where each entry of type `FutureEntry`, i.e. a struct with members `base_entry`, which in turn has a `timestamp`, `source` and `publisher`, additional members `pair_id`, `expiry_timestamp` and `price`.

### Function: `get_future_entries_for_sources`

This function enables you to get the most recent raw data point for a specific future asset and a list of sources.

#### Inputs

- `pair_id`: uppercased utf8-encoded string
- `expiry_timestamp`: timestamp of the expiry of the future
- `sources_len`: number of sources to request for
- `sources`: pointer to the first source, where each source is a uppercased utf8-encoded data source, e.g. `str_to_felt("GEMINI")=78362974965321`

#### Returns

- `entries_len`: the number of entries in the list returned
- `entries`: pointer to the first entry, where each entry of type `FutureEntry`, i.e. a struct with members `base_entry`, which in turn has a `timestamp`, `source` and `publisher`, additional members `pair_id`, `expiry_timestamp` and `price`.
