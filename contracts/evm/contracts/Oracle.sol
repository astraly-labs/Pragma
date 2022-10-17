// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/math/Math.sol";

import "./interfaces/IOracle.sol";
import "./interfaces/IPublisherRegistry.sol";
import "./CurrencyManager.sol";
import "./EntryUtils.sol";

contract Oracle is CurrencyManager, EntryUtils, IOracle {
    IPublisherRegistry public publisherRegistry;

    mapping(bytes32 => bytes32[]) public oracleSourcesStorage;
    mapping(bytes32 => mapping(bytes32 => SpotEntry)) public spotEntryStorage;
    mapping(bytes32 => Checkpoint[]) public checkpoints;
    mapping(bytes32 => uint256) public checkpointIndex;
    uint256 sourcesThreshold = 1;

    uint256 constant BACKWARD_TIMESTAMP_BUFFER = 3600;
    uint256 constant FORWARD_TIMESTAMP_BUFFER = 900;

    constructor(
        address _publisherRegistry,
        Currency[] memory _currencies,
        Pair[] memory _pairs
    ) {
        publisherRegistry = IPublisherRegistry(_publisherRegistry);
        for (uint256 i = 0; i < _currencies.length; i++) {
            currencies[_currencies[i].id] = _currencies[i];
        }
        for (uint256 i = 0; i < _pairs.length; i++) {
            pairs[_pairs[i].id] = _pairs[i];
        }
    }

    function setSourcesThreshold(uint256 threshold) external onlyOwner {
        sourcesThreshold = threshold;
    }

    function updatePublisherRegistryAddress(
        IPublisherRegistry newPublisherRegistryAddress
    ) external onlyOwner {
        publisherRegistry = newPublisherRegistryAddress;
    }

    function publishSpotEntry(SpotEntry calldata spotEntry) public {
        _validateSenderForSource(spotEntry.base, msg.sender);
        SpotEntry memory _latest = spotEntryStorage[spotEntry.pairId][
            spotEntry.base.source
        ];
        _validateTimestamp(_latest, spotEntry);
        spotEntryStorage[spotEntry.pairId][spotEntry.base.source] = spotEntry;

        emit SubmittedSpotEntry(spotEntry);
    }

    function setCheckpoint(bytes32 pairId, AggregationMode aggregationMode)
        public
    {
        bytes32[] memory sources = oracleSourcesStorage[pairId];
        (
            uint256 value,
            ,
            uint256 lastUpdatedTimestamp,
            uint256 numSourcesAggregated
        ) = getSpot(pairId, aggregationMode, sources);

        require(
            sourcesThreshold <= numSourcesAggregated,
            "Does not meet threshold for aggreagated sources"
        );

        if (checkpointIndex[pairId] > 0) {
            Checkpoint memory currentCheckpoint = checkpoints[pairId][
                checkpointIndex[pairId] - 1
            ];
            require(
                currentCheckpoint.timestamp < lastUpdatedTimestamp,
                "stale"
            );
        }
        Checkpoint memory newCheckpoint = Checkpoint(
            lastUpdatedTimestamp,
            value,
            aggregationMode,
            numSourcesAggregated
        );

        checkpointIndex[pairId]++;
        checkpoints[pairId].push(newCheckpoint);

        return ();
    }

    function publishSpotEntries(SpotEntry[] calldata spotEntries) public {
        for (uint256 i = 0; i < spotEntries.length; i++) {
            publishSpotEntry(spotEntries[i]);
        }
    }

    function getSpot(
        bytes32 pairId,
        AggregationMode aggregationMode,
        bytes32[] memory sources
    )
        public
        view
        returns (
            uint256 price,
            uint256 decimals,
            uint256 lastUpdatedTimestamp,
            uint256 numSourcesAggregated
        )
    {
        (SpotEntry[] memory entries, uint256 length, ) = getSpotEntries(
            pairId,
            sources
        );
        if (entries.length == 0) {
            return (0, 0, 0, 0);
        }
        uint256 price = _aggregateSpotEntries(entries);
        uint256 decimals = _getSpotDecimals(pairId);
        uint256 lastUpdatedTimestamp = _maxSpotTimestamp(entries);
        return (price, decimals, lastUpdatedTimestamp, length);
    }

    function getSpotEntries(bytes32 pairId, bytes32[] memory sources)
        public
        view
        returns (
            SpotEntry[] memory,
            uint256,
            uint256
        )
    {
        uint256 lastUpdatedTimestamp = _getLatestSpotEntryTimestamp(
            pairId,
            sources
        );
        (SpotEntry[] memory entries, uint256 length) = _getAllSpotEntries(
            pairId,
            sources,
            lastUpdatedTimestamp
        );
        return (entries, length, lastUpdatedTimestamp);
    }

    function _getSpotDecimals(bytes32 pairId) internal view returns (uint256) {
        bytes32 baseCurrencyid = pairs[pairId].baseCurrencyId;
        return currencies[baseCurrencyid].decimals;
    }

    function _maxSpotTimestamp(SpotEntry[] memory entries)
        internal
        pure
        returns (uint256 latestTimestamp)
    {
        for (uint256 i = 0; i < entries.length; i++) {
            if (entries[i].base.timestamp > latestTimestamp) {
                latestTimestamp = entries[i].base.timestamp;
            }
        }
        return latestTimestamp;
    }

    function _getLatestSpotEntryTimestamp(
        bytes32 pairId,
        bytes32[] memory sources
    ) internal view returns (uint256 latestTimestamp) {
        for (uint256 i = 0; i < sources.length; i++) {
            SpotEntry memory entry = spotEntryStorage[pairId][sources[i]];
            latestTimestamp = Math.max(entry.base.timestamp, latestTimestamp);
        }
    }

    function _aggregateSpotEntries(SpotEntry[] memory entries)
        internal
        pure
        returns (uint256)
    {
        uint256[] memory values = new uint256[](entries.length);
        uint256 length = 0;
        for (uint256 i = 0; i < entries.length; i++) {
            if (entries[i].price != 0) {
                values[i] = entries[i].price;
                length += 1;
            }
        }
        return median(values, length);
    }

    function _getAllSpotEntries(
        bytes32 pairId,
        bytes32[] memory sources,
        uint256 lastUpdatedTimestamp
    ) internal view returns (SpotEntry[] memory, uint256 length) {
        SpotEntry[] memory spotEntries = new SpotEntry[](sources.length);
        uint256 curIndex = 0;
        for (uint256 i = 0; i < sources.length; i++) {
            SpotEntry memory entry = spotEntryStorage[pairId][sources[i]];
            if (
                entry.base.timestamp + BACKWARD_TIMESTAMP_BUFFER <
                lastUpdatedTimestamp
            ) {
                continue;
            }
            if (entry.base.timestamp == 0) {
                continue;
            }
            spotEntries[curIndex++] = entry;
        }
        return (spotEntries, curIndex);
    }

    function _validateSenderForSource(
        BaseEntry calldata baseEntry,
        address sender
    ) internal view {
        require(
            publisherRegistry.publisherAddresses(baseEntry.publisher) == sender,
            "Invalid Sender for Publisher"
        );
        require(
            publisherRegistry.canPublishSource(
                baseEntry.publisher,
                baseEntry.source
            ),
            "Can not publish Source"
        );
    }

    function _validateTimestamp(
        SpotEntry memory oldEntry,
        SpotEntry memory newEntry
    ) internal {
        require(
            oldEntry.base.timestamp < newEntry.base.timestamp,
            "Oracle: Existing entry is more recent"
        );
        require(
            block.timestamp - BACKWARD_TIMESTAMP_BUFFER <=
                newEntry.base.timestamp,
            "Oracle: New entry timestamp is too far in the past"
        );
        require(
            block.timestamp + FORWARD_TIMESTAMP_BUFFER >=
                newEntry.base.timestamp,
            "Oracle: New entry timestamp is too far in the future"
        );

        if (oldEntry.base.timestamp == 0) {
            // Source did not exist yet, so add to our list
            oracleSourcesStorage[newEntry.pairId].push(newEntry.base.source);
        }
    }
}
