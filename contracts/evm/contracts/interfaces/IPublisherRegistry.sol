// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IPublisherRegistry {
    event RegisteredPublisher(bytes32 publisher, address publisherAddress);
    event UpdatedPublisherAddress(
        bytes32 publisher,
        address oldPublisherAddress,
        address newPublisherAddress
    );

    function addPublisher(bytes32 publisher, address publisherAddress) external;

    function canPublishSource(bytes32 publisher, bytes32 source)
        external
        view
        returns (bool);

    function publisherAddresses(bytes32 publisher)
        external
        view
        returns (address);
}
