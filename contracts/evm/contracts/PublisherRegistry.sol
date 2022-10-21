// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./interfaces/IPublisherRegistry.sol";

contract PublisherRegistry is Ownable, IPublisherRegistry {
    mapping(bytes32 => address) public publisherAddresses;
    mapping(bytes32 => mapping(bytes32 => bool)) public publisherSources;
    bytes32[] public publishers;
    bytes32[] public sources;
    mapping(bytes32 => bool) public sourceExists;
    mapping(bytes32 => bytes32[]) public sourcesForPublisher;
    uint256 public publisherStorageLen;

    function addPublisher(bytes32 publisher, address publisherAddress)
        external
        onlyOwner
    {
        require(publisherAddresses[publisher] == address(0), "Already Added");
        publishers.push(publisher);
        publisherAddresses[publisher] = publisherAddress;
        publisherStorageLen++;
        emit RegisteredPublisher(publisher, publisherAddress);
    }

    function updatePublisherAddress(
        bytes32 publisher,
        address newPublisherAddress
    ) external {
        address oldAddress = publisherAddresses[publisher];
        require(
            msg.sender == publisherAddresses[publisher],
            "Only publisher can change their address"
        );
        publisherAddresses[publisher] = newPublisherAddress;
        emit UpdatedPublisherAddress(
            publisher,
            oldAddress,
            newPublisherAddress
        );
    }

    function removePublisher(bytes32 publisher) public onlyOwner {
        delete publisherAddresses[publisher];
        for (uint256 i = 0; i < sources.length; i++) {
            delete publisherSources[publisher][sources[i]];
        }

        uint256 index;
        for (uint256 i = 0; i < publishers.length; i++) {
            if (publishers[i] == publisher) {
                index = i;
                break;
            }
        }
        publishers[index] = publishers[publishers.length - 1];
        publishers.pop();
        delete sourcesForPublisher[publisher];
    }

    function addSourceForPublisher(bytes32 publisher, bytes32 source)
        public
        onlyOwner
    {
        address publisherAddress = publisherAddresses[publisher];
        require(publisherAddress != address(0), "Publisher does not exist");
        require(!canPublishSource(publisher, source), "Already Registered");
        publisherSources[publisher][source] = true;
        sourcesForPublisher[publisher].push(source);
    }

    function addSourcesForPublisher(
        bytes32 publisher,
        bytes32[] calldata sources_
    ) public onlyOwner {
        for (uint256 i = 0; i < sources_.length; i++) {
            addSourceForPublisher(publisher, sources_[i]);
        }
    }

    function removeSourceForPublisher(bytes32 publisher, bytes32 source)
        public
        onlyOwner
    {
        uint256 index;
        bytes32[] storage _publisherSources = sourcesForPublisher[publisher];
        for (uint256 i = 0; i < _publisherSources.length; i++) {
            if (_publisherSources[i] == source) {
                index = i;
                break;
            }
        }
        _publisherSources[index] = _publisherSources[
            _publisherSources.length - 1
        ];
        _publisherSources.pop();
    }

    // views

    function canPublishSource(bytes32 publisher, bytes32 source)
        public
        view
        returns (bool)
    {
        return publisherSources[publisher][source];
    }
}
