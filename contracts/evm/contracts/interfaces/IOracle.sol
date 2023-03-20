// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./ICurrencyManager.sol";

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

    function initialize(
        address _publisherRegistry,
        ICurrencyManager.Currency[] memory _currencies,
        ICurrencyManager.Pair[] memory _pairs
    ) external;
    function getLastCheckpointIndex(
        bytes32 pairID
    ) external view returns (uint256);

    function getLastSpotCheckpointBefore(
        bytes32 pairID,
        uint256 timestamp
    ) external view returns (Checkpoint memory, uint256);
    
    function getSpotCheckpoint(
        bytes32 pairID,
        uint256 index
    ) external view returns (Checkpoint memory);

    function getLastCheckpointIndex(
        bytes32 pairID
    ) external view returns (uint256);

    function getLastSpotCheckpointBefore(
        bytes32 pairID,
        uint256 timestamp
    ) external view returns (Checkpoint memory, uint256);
    
    function getSpotCheckpoint(
        bytes32 pairID,
        uint256 index
    ) external view returns (Checkpoint memory);
}
