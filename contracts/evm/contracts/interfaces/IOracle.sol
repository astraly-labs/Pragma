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

    struct Checkpoint {
        uint256 timestamp;
        uint256 value;
        AggregationMode aggregationMode;
        uint256 numSourcesAggregated;
    }

    event SubmittedSpotEntry(SpotEntry newEntry);
    event NewCheckpoint(Checkpoint cp);
}
