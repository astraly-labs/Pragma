// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// OpenZeppelin Contracts (last updated v4.7.0) (access/Ownable.sol)

// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

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

    function addSourcesForPublisher(
        bytes32 publisher,
        bytes32[] calldata sources_
    ) external;
}

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
