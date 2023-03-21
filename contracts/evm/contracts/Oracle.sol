// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "./interfaces/IOracle.sol";
import "./interfaces/IPublisherRegistry.sol";
import "./CurrencyManager.sol";
import "./EntryUtils.sol";

contract Oracle is Initializable, CurrencyManager, EntryUtils, IOracle {
    IPublisherRegistry public publisherRegistry;

    mapping(bytes32 => bytes32[]) public oracleSourcesStorage;
    mapping(bytes32 => mapping(bytes32 => SpotEntryStorage))
        public spotEntryStorage;
    mapping(bytes32 => Checkpoint[]) public checkpoints;
    mapping(bytes32 => uint256) public checkpointIndex;
    uint256 sourcesThreshold = 1;

    uint256 constant BACKWARD_TIMESTAMP_BUFFER = 3600;
    uint256 constant FORWARD_TIMESTAMP_BUFFER = 900;

    function initialize(
        address _publisherRegistry,
        Currency[] memory _currencies,
        Pair[] memory _pairs
    ) public initializer {
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
        _publishSpotEntry(spotEntry);
    }

    function setCheckpoint(bytes32 pairId, AggregationMode aggregationMode)
        public
    {
        _setCheckpoint(pairId, aggregationMode);
    }

    function setCheckpoints(
        bytes32[] memory pairIds,
        AggregationMode aggregationMode
    ) public {
        for (uint256 i = 0; i < pairIds.length; i++) {
            _setCheckpoint(pairIds[i], aggregationMode);
        }
    }

    function _setCheckpoint(bytes32 pairId, AggregationMode aggregationMode)
        private
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
            uint64(lastUpdatedTimestamp),
            uint128(value),
            aggregationMode,
            uint8(numSourcesAggregated)
        );

        checkpointIndex[pairId]++;
        checkpoints[pairId].push(newCheckpoint);

        emit CheckpointSpotEntry(newCheckpoint);
    }

    function publishSpotEntries(SpotEntry[] calldata spotEntries) public {
        for (uint256 i = 0; i < spotEntries.length; i++) {
            _publishSpotEntry(spotEntries[i]);
        }
    }

    function _publishSpotEntry(SpotEntry calldata spotEntry) internal {
        _validateSenderForSource(spotEntry.base, msg.sender);
        SpotEntryStorage memory _latest = spotEntryStorage[spotEntry.pairId][
            spotEntry.base.source
        ];
        _validateTimestamp(_latest, spotEntry);
        spotEntryStorage[spotEntry.pairId][
            spotEntry.base.source
        ] = SpotEntryStorage(
            uint128(spotEntry.base.timestamp),
            bytes16(spotEntry.pairId),
            uint128(spotEntry.price),
            uint128(spotEntry.volume)
        );

        emit SubmittedSpotEntry(spotEntry);
    }

    function getSpot(
        bytes32 pairId,
        AggregationMode,
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
        (
            SpotEntryStorage[] memory entries,
            uint256 _lastUpdatedTimestamp
        ) = getSpotEntries(pairId, sources);
        if (entries.length == 0) {
            return (0, 0, 0, 0);
        }
        uint256 _price = _aggregateSpotEntries(entries);
        uint256 _decimals = _getSpotDecimals(pairId);
        return (_price, _decimals, _lastUpdatedTimestamp, entries.length);
    }

    function getSpotEntries(bytes32 pairId, bytes32[] memory sources)
        public
        view
        returns (
            SpotEntryStorage[] memory entries,
            uint256 lastUpdatedTimestamp
        )
    {
        (
            SpotEntryStorage[] memory unfilteredEntries,
            uint256 _lastUpdatedTimestamp
        ) = _getSpotEntriesArray(pairId, sources);
        entries = _filterSpotEntriesByTimestamp(
            unfilteredEntries,
            _lastUpdatedTimestamp
        );
        return (entries, _lastUpdatedTimestamp);
    }

    function _getSpotEntriesArray(bytes32 pairId, bytes32[] memory sources)
        internal
        view
        returns (SpotEntryStorage[] memory, uint256 latestTimestamp)
    {
        SpotEntryStorage[] memory entries = new SpotEntryStorage[](
            sources.length
        );
        for (uint256 i = 0; i < sources.length; i++) {
            SpotEntryStorage memory entry = spotEntryStorage[pairId][
                sources[i]
            ];
            latestTimestamp = Math.max(entry.timestamp, latestTimestamp);
            entries[i] = entry;
        }
        return (entries, latestTimestamp);
    }

    function _getSpotDecimals(bytes32 pairId) internal view returns (uint256) {
        bytes32 baseCurrencyid = pairs[pairId].baseCurrencyId;
        return currencies[baseCurrencyid].decimals;
    }

    function _getLatestSpotEntryTimestamp(
        bytes32 pairId,
        bytes32[] memory sources
    ) internal view returns (uint256 latestTimestamp) {
        for (uint256 i = 0; i < sources.length; i++) {
            SpotEntryStorage memory entry = spotEntryStorage[pairId][
                sources[i]
            ];
            latestTimestamp = Math.max(entry.timestamp, latestTimestamp);
        }
    }

    function getLastCheckpointIndex(bytes32 pairId)
        public
        view
        returns (uint256)
    {
       
        // return checkpointIndex[pairId];
        return checkpoints[pairId].length;
    }

    function getLastSpotCheckpointBefore(bytes32 pair_id, uint256 timestamp)
        public
        view
        returns (Checkpoint memory checkpoint, uint256 checkpointIdx)
    {
        Checkpoint[] memory checkpointsForPair = checkpoints[pair_id];
        uint256 cpIdx = getLastCheckpointIndex(pair_id);
        require (cpIdx > 0, "No checkpoints found");
        while (cpIdx > 0) {
            Checkpoint memory cp = checkpointsForPair[cpIdx - 1];
            if (cp.timestamp <= timestamp) {
                return (cp, cpIdx);
            }
            cpIdx--;
        }
    }

    function getSpotCheckpoint(bytes32 key, uint256 index) 
        public
        view
        returns (Checkpoint memory)
    {
        return checkpoints[key][index];
    }

    function _aggregateSpotEntries(SpotEntryStorage[] memory entries)
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

    function _filterSpotEntriesByTimestamp(
        SpotEntryStorage[] memory entries,
        uint256 lastUpdatedTimestamp
    ) internal pure returns (SpotEntryStorage[] memory) {
        uint256 resultCount = 0;
        for (uint256 i = 0; i < entries.length; i++) {
            SpotEntryStorage memory entry = entries[i];
            if (
                entry.timestamp + BACKWARD_TIMESTAMP_BUFFER <
                lastUpdatedTimestamp
            ) {
                continue;
            }
            resultCount++;
        }

        SpotEntryStorage[] memory spotEntries = new SpotEntryStorage[](
            resultCount
        );
        uint256 curIndex = 0;
        for (uint256 i = 0; i < entries.length; i++) {
            SpotEntryStorage memory entry = entries[i];
            if (
                entry.timestamp + BACKWARD_TIMESTAMP_BUFFER <
                lastUpdatedTimestamp
            ) {
                continue;
            }
            spotEntries[curIndex++] = entry;
        }

        return spotEntries;
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
        SpotEntryStorage memory oldEntry,
        SpotEntry memory newEntry
    ) internal {
        require(
            oldEntry.timestamp < newEntry.base.timestamp,
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

        if (oldEntry.timestamp == 0) {
            // Source did not exist yet, so add to our list
            oracleSourcesStorage[newEntry.pairId].push(newEntry.base.source);
        }
    }

    function _splitBytes32(bytes32 source)
        internal
        pure
        returns (bytes16, bytes16)
    {
        bytes16[2] memory y = [bytes16(0), 0];
        assembly {
            mstore(y, source)
            mstore(add(y, 16), source)
        }
        return (y[0], y[1]);
    }
}
