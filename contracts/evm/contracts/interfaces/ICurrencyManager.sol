// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

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
}
