// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// OpenZeppelin Contracts (last updated v4.7.0) (utils/math/Math.sol)

/**
 * @dev Standard math utilities missing in the Solidity language.
 */
library Math {
    enum Rounding {
        Down, // Toward negative infinity
        Up, // Toward infinity
        Zero // Toward zero
    }

    /**
     * @dev Returns the largest of two numbers.
     */
    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a >= b ? a : b;
    }

    /**
     * @dev Returns the smallest of two numbers.
     */
    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }

    /**
     * @dev Returns the average of two numbers. The result is rounded towards
     * zero.
     */
    function average(uint256 a, uint256 b) internal pure returns (uint256) {
        // (a + b) / 2 can overflow.
        return (a & b) + (a ^ b) / 2;
    }

    /**
     * @dev Returns the ceiling of the division of two numbers.
     *
     * This differs from standard division with `/` in that it rounds up instead
     * of rounding down.
     */
    function ceilDiv(uint256 a, uint256 b) internal pure returns (uint256) {
        // (a + b - 1) / b can overflow on addition, so we distribute.
        return a == 0 ? 0 : (a - 1) / b + 1;
    }

    /**
     * @notice Calculates floor(x * y / denominator) with full precision. Throws if result overflows a uint256 or denominator == 0
     * @dev Original credit to Remco Bloemen under MIT license (https://xn--2-umb.com/21/muldiv)
     * with further edits by Uniswap Labs also under MIT license.
     */
    function mulDiv(
        uint256 x,
        uint256 y,
        uint256 denominator
    ) internal pure returns (uint256 result) {
        unchecked {
            // 512-bit multiply [prod1 prod0] = x * y. Compute the product mod 2^256 and mod 2^256 - 1, then use
            // use the Chinese Remainder Theorem to reconstruct the 512 bit result. The result is stored in two 256
            // variables such that product = prod1 * 2^256 + prod0.
            uint256 prod0; // Least significant 256 bits of the product
            uint256 prod1; // Most significant 256 bits of the product
            assembly {
                let mm := mulmod(x, y, not(0))
                prod0 := mul(x, y)
                prod1 := sub(sub(mm, prod0), lt(mm, prod0))
            }

            // Handle non-overflow cases, 256 by 256 division.
            if (prod1 == 0) {
                return prod0 / denominator;
            }

            // Make sure the result is less than 2^256. Also prevents denominator == 0.
            require(denominator > prod1);

            ///////////////////////////////////////////////
            // 512 by 256 division.
            ///////////////////////////////////////////////

            // Make division exact by subtracting the remainder from [prod1 prod0].
            uint256 remainder;
            assembly {
                // Compute remainder using mulmod.
                remainder := mulmod(x, y, denominator)

                // Subtract 256 bit number from 512 bit number.
                prod1 := sub(prod1, gt(remainder, prod0))
                prod0 := sub(prod0, remainder)
            }

            // Factor powers of two out of denominator and compute largest power of two divisor of denominator. Always >= 1.
            // See https://cs.stackexchange.com/q/138556/92363.

            // Does not overflow because the denominator cannot be zero at this stage in the function.
            uint256 twos = denominator & (~denominator + 1);
            assembly {
                // Divide denominator by twos.
                denominator := div(denominator, twos)

                // Divide [prod1 prod0] by twos.
                prod0 := div(prod0, twos)

                // Flip twos such that it is 2^256 / twos. If twos is zero, then it becomes one.
                twos := add(div(sub(0, twos), twos), 1)
            }

            // Shift in bits from prod1 into prod0.
            prod0 |= prod1 * twos;

            // Invert denominator mod 2^256. Now that denominator is an odd number, it has an inverse modulo 2^256 such
            // that denominator * inv = 1 mod 2^256. Compute the inverse by starting with a seed that is correct for
            // four bits. That is, denominator * inv = 1 mod 2^4.
            uint256 inverse = (3 * denominator) ^ 2;

            // Use the Newton-Raphson iteration to improve the precision. Thanks to Hensel's lifting lemma, this also works
            // in modular arithmetic, doubling the correct bits in each step.
            inverse *= 2 - denominator * inverse; // inverse mod 2^8
            inverse *= 2 - denominator * inverse; // inverse mod 2^16
            inverse *= 2 - denominator * inverse; // inverse mod 2^32
            inverse *= 2 - denominator * inverse; // inverse mod 2^64
            inverse *= 2 - denominator * inverse; // inverse mod 2^128
            inverse *= 2 - denominator * inverse; // inverse mod 2^256

            // Because the division is now exact we can divide by multiplying with the modular inverse of denominator.
            // This will give us the correct result modulo 2^256. Since the preconditions guarantee that the outcome is
            // less than 2^256, this is the final result. We don't need to compute the high bits of the result and prod1
            // is no longer required.
            result = prod0 * inverse;
            return result;
        }
    }

    /**
     * @notice Calculates x * y / denominator with full precision, following the selected rounding direction.
     */
    function mulDiv(
        uint256 x,
        uint256 y,
        uint256 denominator,
        Rounding rounding
    ) internal pure returns (uint256) {
        uint256 result = mulDiv(x, y, denominator);
        if (rounding == Rounding.Up && mulmod(x, y, denominator) > 0) {
            result += 1;
        }
        return result;
    }

    /**
     * @dev Returns the square root of a number. It the number is not a perfect square, the value is rounded down.
     *
     * Inspired by Henry S. Warren, Jr.'s "Hacker's Delight" (Chapter 11).
     */
    function sqrt(uint256 a) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }

        // For our first guess, we get the biggest power of 2 which is smaller than the square root of the target.
        // We know that the "msb" (most significant bit) of our target number `a` is a power of 2 such that we have
        // `msb(a) <= a < 2*msb(a)`.
        // We also know that `k`, the position of the most significant bit, is such that `msb(a) = 2**k`.
        // This gives `2**k < a <= 2**(k+1)` → `2**(k/2) <= sqrt(a) < 2 ** (k/2+1)`.
        // Using an algorithm similar to the msb conmputation, we are able to compute `result = 2**(k/2)` which is a
        // good first aproximation of `sqrt(a)` with at least 1 correct bit.
        uint256 result = 1;
        uint256 x = a;
        if (x >> 128 > 0) {
            x >>= 128;
            result <<= 64;
        }
        if (x >> 64 > 0) {
            x >>= 64;
            result <<= 32;
        }
        if (x >> 32 > 0) {
            x >>= 32;
            result <<= 16;
        }
        if (x >> 16 > 0) {
            x >>= 16;
            result <<= 8;
        }
        if (x >> 8 > 0) {
            x >>= 8;
            result <<= 4;
        }
        if (x >> 4 > 0) {
            x >>= 4;
            result <<= 2;
        }
        if (x >> 2 > 0) {
            result <<= 1;
        }

        // At this point `result` is an estimation with one bit of precision. We know the true value is a uint128,
        // since it is the square root of a uint256. Newton's method converges quadratically (precision doubles at
        // every iteration). We thus need at most 7 iteration to turn our partial result with one bit of precision
        // into the expected uint128 result.
        unchecked {
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            return min(result, a / result);
        }
    }

    /**
     * @notice Calculates sqrt(a), following the selected rounding direction.
     */
    function sqrt(uint256 a, Rounding rounding) internal pure returns (uint256) {
        uint256 result = sqrt(a);
        if (rounding == Rounding.Up && result * result < a) {
            result += 1;
        }
        return result;
    }
}

// OpenZeppelin Contracts (last updated v4.7.0) (proxy/utils/Initializable.sol)

// OpenZeppelin Contracts (last updated v4.7.0) (utils/Address.sol)

/**
 * @dev Collection of functions related to the address type
 */
library AddressUpgradeable {
    /**
     * @dev Returns true if `account` is a contract.
     *
     * [IMPORTANT]
     * ====
     * It is unsafe to assume that an address for which this function returns
     * false is an externally-owned account (EOA) and not a contract.
     *
     * Among others, `isContract` will return false for the following
     * types of addresses:
     *
     *  - an externally-owned account
     *  - a contract in construction
     *  - an address where a contract will be created
     *  - an address where a contract lived, but was destroyed
     * ====
     *
     * [IMPORTANT]
     * ====
     * You shouldn't rely on `isContract` to protect against flash loan attacks!
     *
     * Preventing calls from contracts is highly discouraged. It breaks composability, breaks support for smart wallets
     * like Gnosis Safe, and does not provide security since it can be circumvented by calling from a contract
     * constructor.
     * ====
     */
    function isContract(address account) internal view returns (bool) {
        // This method relies on extcodesize/address.code.length, which returns 0
        // for contracts in construction, since the code is only stored at the end
        // of the constructor execution.

        return account.code.length > 0;
    }

    /**
     * @dev Replacement for Solidity's `transfer`: sends `amount` wei to
     * `recipient`, forwarding all available gas and reverting on errors.
     *
     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
     * of certain opcodes, possibly making contracts go over the 2300 gas limit
     * imposed by `transfer`, making them unable to receive funds via
     * `transfer`. {sendValue} removes this limitation.
     *
     * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].
     *
     * IMPORTANT: because control is transferred to `recipient`, care must be
     * taken to not create reentrancy vulnerabilities. Consider using
     * {ReentrancyGuard} or the
     * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].
     */
    function sendValue(address payable recipient, uint256 amount) internal {
        require(address(this).balance >= amount, "Address: insufficient balance");

        (bool success, ) = recipient.call{value: amount}("");
        require(success, "Address: unable to send value, recipient may have reverted");
    }

    /**
     * @dev Performs a Solidity function call using a low level `call`. A
     * plain `call` is an unsafe replacement for a function call: use this
     * function instead.
     *
     * If `target` reverts with a revert reason, it is bubbled up by this
     * function (like regular Solidity function calls).
     *
     * Returns the raw returned data. To convert to the expected return value,
     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].
     *
     * Requirements:
     *
     * - `target` must be a contract.
     * - calling `target` with `data` must not revert.
     *
     * _Available since v3.1._
     */
    function functionCall(address target, bytes memory data) internal returns (bytes memory) {
        return functionCall(target, data, "Address: low-level call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with
     * `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        return functionCallWithValue(target, data, 0, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but also transferring `value` wei to `target`.
     *
     * Requirements:
     *
     * - the calling contract must have an ETH balance of at least `value`.
     * - the called Solidity function must be `payable`.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value
    ) internal returns (bytes memory) {
        return functionCallWithValue(target, data, value, "Address: low-level call with value failed");
    }

    /**
     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but
     * with `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value,
        string memory errorMessage
    ) internal returns (bytes memory) {
        require(address(this).balance >= value, "Address: insufficient balance for call");
        require(isContract(target), "Address: call to non-contract");

        (bool success, bytes memory returndata) = target.call{value: value}(data);
        return verifyCallResult(success, returndata, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(address target, bytes memory data) internal view returns (bytes memory) {
        return functionStaticCall(target, data, "Address: low-level static call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal view returns (bytes memory) {
        require(isContract(target), "Address: static call to non-contract");

        (bool success, bytes memory returndata) = target.staticcall(data);
        return verifyCallResult(success, returndata, errorMessage);
    }

    /**
     * @dev Tool to verifies that a low level call was successful, and revert if it wasn't, either by bubbling the
     * revert reason using the provided one.
     *
     * _Available since v4.3._
     */
    function verifyCallResult(
        bool success,
        bytes memory returndata,
        string memory errorMessage
    ) internal pure returns (bytes memory) {
        if (success) {
            return returndata;
        } else {
            // Look for revert reason and bubble it up if present
            if (returndata.length > 0) {
                // The easiest way to bubble the revert reason is using memory via assembly
                /// @solidity memory-safe-assembly
                assembly {
                    let returndata_size := mload(returndata)
                    revert(add(32, returndata), returndata_size)
                }
            } else {
                revert(errorMessage);
            }
        }
    }
}

/**
 * @dev This is a base contract to aid in writing upgradeable contracts, or any kind of contract that will be deployed
 * behind a proxy. Since proxied contracts do not make use of a constructor, it's common to move constructor logic to an
 * external initializer function, usually called `initialize`. It then becomes necessary to protect this initializer
 * function so it can only be called once. The {initializer} modifier provided by this contract will have this effect.
 *
 * The initialization functions use a version number. Once a version number is used, it is consumed and cannot be
 * reused. This mechanism prevents re-execution of each "step" but allows the creation of new initialization steps in
 * case an upgrade adds a module that needs to be initialized.
 *
 * For example:
 *
 * [.hljs-theme-light.nopadding]
 * ```
 * contract MyToken is ERC20Upgradeable {
 *     function initialize() initializer public {
 *         __ERC20_init("MyToken", "MTK");
 *     }
 * }
 * contract MyTokenV2 is MyToken, ERC20PermitUpgradeable {
 *     function initializeV2() reinitializer(2) public {
 *         __ERC20Permit_init("MyToken");
 *     }
 * }
 * ```
 *
 * TIP: To avoid leaving the proxy in an uninitialized state, the initializer function should be called as early as
 * possible by providing the encoded function call as the `_data` argument to {ERC1967Proxy-constructor}.
 *
 * CAUTION: When used with inheritance, manual care must be taken to not invoke a parent initializer twice, or to ensure
 * that all initializers are idempotent. This is not verified automatically as constructors are by Solidity.
 *
 * [CAUTION]
 * ====
 * Avoid leaving a contract uninitialized.
 *
 * An uninitialized contract can be taken over by an attacker. This applies to both a proxy and its implementation
 * contract, which may impact the proxy. To prevent the implementation contract from being used, you should invoke
 * the {_disableInitializers} function in the constructor to automatically lock it when it is deployed:
 *
 * [.hljs-theme-light.nopadding]
 * ```
 * /// @custom:oz-upgrades-unsafe-allow constructor
 * constructor() {
 *     _disableInitializers();
 * }
 * ```
 * ====
 */
abstract contract Initializable {
    /**
     * @dev Indicates that the contract has been initialized.
     * @custom:oz-retyped-from bool
     */
    uint8 private _initialized;

    /**
     * @dev Indicates that the contract is in the process of being initialized.
     */
    bool private _initializing;

    /**
     * @dev Triggered when the contract has been initialized or reinitialized.
     */
    event Initialized(uint8 version);

    /**
     * @dev A modifier that defines a protected initializer function that can be invoked at most once. In its scope,
     * `onlyInitializing` functions can be used to initialize parent contracts. Equivalent to `reinitializer(1)`.
     */
    modifier initializer() {
        bool isTopLevelCall = !_initializing;
        require(
            (isTopLevelCall && _initialized < 1) || (!AddressUpgradeable.isContract(address(this)) && _initialized == 1),
            "Initializable: contract is already initialized"
        );
        _initialized = 1;
        if (isTopLevelCall) {
            _initializing = true;
        }
        _;
        if (isTopLevelCall) {
            _initializing = false;
            emit Initialized(1);
        }
    }

    /**
     * @dev A modifier that defines a protected reinitializer function that can be invoked at most once, and only if the
     * contract hasn't been initialized to a greater version before. In its scope, `onlyInitializing` functions can be
     * used to initialize parent contracts.
     *
     * `initializer` is equivalent to `reinitializer(1)`, so a reinitializer may be used after the original
     * initialization step. This is essential to configure modules that are added through upgrades and that require
     * initialization.
     *
     * Note that versions can jump in increments greater than 1; this implies that if multiple reinitializers coexist in
     * a contract, executing them in the right order is up to the developer or operator.
     */
    modifier reinitializer(uint8 version) {
        require(!_initializing && _initialized < version, "Initializable: contract is already initialized");
        _initialized = version;
        _initializing = true;
        _;
        _initializing = false;
        emit Initialized(version);
    }

    /**
     * @dev Modifier to protect an initialization function so that it can only be invoked by functions with the
     * {initializer} and {reinitializer} modifiers, directly or indirectly.
     */
    modifier onlyInitializing() {
        require(_initializing, "Initializable: contract is not initializing");
        _;
    }

    /**
     * @dev Locks the contract, preventing any future reinitialization. This cannot be part of an initializer call.
     * Calling this in the constructor of a contract will prevent that contract from being initialized or reinitialized
     * to any version. It is recommended to use this to lock implementation contracts that are designed to be called
     * through proxies.
     */
    function _disableInitializers() internal virtual {
        require(!_initializing, "Initializable: contract is initializing");
        if (_initialized < type(uint8).max) {
            _initialized = type(uint8).max;
            emit Initialized(type(uint8).max);
        }
    }
}

interface ICurrencyManager {
    struct Currency {
        bytes32 id;
        uint256 decimals;
        bool isAbstractCurrency;
        address ethereumAddress;
    }

    struct Pair {
        bytes32 id;
        bytes32 quoteCurrencyId;
        bytes32 baseCurrencyId;
    }

    event SubmittedCurrency(Currency currency);
    event UpdatedCurrency(Currency currency);
    event SubmittedPair(Pair pair);

    function addCurrency(Currency calldata currency) external;

    function addPair(Pair calldata pair) external;
}

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

contract CurrencyManager is ICurrencyManager, Ownable {
    mapping(bytes32 => Currency) public currencies;
    mapping(bytes32 => Pair) public pairs;
    mapping(bytes32 => mapping(bytes32 => bytes32)) public pairIdStorage;

    function addCurrency(Currency calldata currency) public onlyOwner {
        require(
            currencies[currency.id].id == bytes32(""),
            "Currency already set"
        );
        currencies[currency.id] = currency;
    }

    function updateCurrency(Currency calldata currency) public onlyOwner {
        require(currencies[currency.id].id != bytes32(""), "Currency not set");
        currencies[currency.id] = currency;
    }

    function addPair(Pair calldata pair) external onlyOwner {
        Pair memory oldPair = pairs[pair.id];
        require(
            oldPair.id == 0,
            "Oracle: Pair with this key already registered"
        );
        pairs[pair.id] = pair;
        pairIdStorage[pair.quoteCurrencyId][pair.baseCurrencyId] = pair.id;

        emit SubmittedPair(pair);
    }

}

contract EntryUtils {
    function swap(
        uint256[] memory array,
        uint256 i,
        uint256 j
    ) internal pure {
        (array[i], array[j]) = (array[j], array[i]);
    }

    function sort(
        uint256[] memory array,
        uint256 begin,
        uint256 end
    ) internal pure {
        if (begin < end) {
            uint256 j = begin;
            uint256 pivot = array[j];
            for (uint256 i = begin + 1; i < end; ++i) {
                if (array[i] < pivot) {
                    swap(array, i, ++j);
                }
            }
            swap(array, begin, j);
            sort(array, begin, j);
            sort(array, j + 1, end);
        }
    }

    function median(uint256[] memory array, uint256 length)
        internal
        pure
        returns (uint256)
    {
        sort(array, 0, length);
        return
            length % 2 == 0
                ? Math.average(array[length / 2 - 1], array[length / 2])
                : array[length / 2];
    }
}

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
