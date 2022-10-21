// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IOracle {
    enum AggregationMode {
        MEDIAN
    }
    struct BaseEntry {
        uint256 timestamp;
        bytes32 source;
        bytes32 publisher;
    }

    struct SpotEntry {
        BaseEntry base;
        bytes32 pairId;
        uint256 price;
        uint256 volume;
    }

    struct SpotEntryStorage {
        uint128 timestamp;
        bytes16 pairId;
        uint128 price;
        uint128 volume;
    }

    struct Checkpoint {
        uint64 timestamp;
        uint128 value;
        AggregationMode aggregationMode;
        uint8 numSourcesAggregated;
    }

    event UpdatedPublisherRegistryAddress(
        address oldPublisherRegistryAddress,
        address newPublisherRegistryAddress
    );
    event SubmittedSpotEntry(SpotEntry newEntry);
    event CheckpointSpotEntry(Checkpoint cp);
}
