---
id: consumming-data
title: Consumming Data
sidebar_position: 1
---

---


You can find the list of supported assets here.
The current Empiric Network proxy addresses are:

| Network                 | Address                                                             | Explorer                                                                                                                                                                                                                                              |
| ----------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Consensys Testnet    | - | [Explorer](https://explorer.goerli.zkevm.consensys.net/)               |


## Technical Specifications

### Structure : `BaseEntry`

```bash 
struct BaseEntry {
        uint256 timestamp;
        bytes32 source;
        bytes32 publisher;
    }

```
The basic elements shared by most of the structures (spot, futures, options, etc). It includes the time of publication, the source of the data and the publisher of the data.

### Structure : `SpotEntry`

```bash
struct SpotEntry {
        BaseEntry base;
        bytes32 pairId;
        uint256 price;
        uint256 volume;
    }
```

The spot structure, which includes a Base Entry, and diverse information about the spot price of a given asset pair (pairId, which is for example `str_to_felt('ETH/USD') and its associated price and volume). 

### Structure : `SpotEntryStorage`

```bash
struct SpotEntryStorage {
        uint128 timestamp;
        bytes16 pairId;
        uint128 price;
        uint128 volume;
    }

```

The spot storage structure, which includes different informations regarding asset pairs for a specific source : the timestamp, the pairId, the price and the volume.

### Function: `getSpot`

This function will aggregate all the data from selected sources into a median for a given spot pair ID. 

#### Inputs 

- `pairId`: The ID of the spot pair to get the median for (bytes32).
- `sources` The list of sources to aggregate data from (list of bytes32).

#### Returns 

- `price`: aggrergation result of all the selected sources for the given pair_id, based on an median algorithm (uint256). Multiplied by `10**decimals`. 
-`decimals` : number of places that value has been shifted to allow for greater accuracy (uint256).
-`lastUpdatedTimestamp` : timestamp of the most recent entry aggregated (uint256). 
-`numSourcesAggregated` : number of sources aggregated in the final answer. Should correspond to the length of the input sources list (uint256).

### Function: `getSpotEntries`

This function will retreive the most recent entries for a given pair ID from selected sources. Entries are selected according to their timestamps; however, only a difference of up to one hour between the current timestamp and the publication one is tolerated.


#### Inputs

- `pairId`: The ID of the spot pair to get the median for (bytes32).
- `sources` The list of sources to aggregate data from (list of bytes32).

#### Returns

- `entries` : list of entries, given an input pairId and sources. Each entry is a `SpotEntryStorage`
- `lastUpdatedTimestamp` : timestamp of the most recent entry aggregated (uint256).





