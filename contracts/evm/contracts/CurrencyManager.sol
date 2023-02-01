// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./interfaces/ICurrencyManager.sol";

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

    function addCurrencyData(bytes32 id, uint256 decimals, bool isAbstractCurrency, address ethereumAddress) public onlyOwner {
        Currency memory currency = Currency(id, decimals, isAbstractCurrency, ethereumAddress);

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
        function addPairData(bytes32 id,bytes32 quoteCurrencyId, bytes32 baseCurrencyId) external onlyOwner {
        Pair memory pair = Pair(id, quoteCurrencyId, baseCurrencyId);
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
