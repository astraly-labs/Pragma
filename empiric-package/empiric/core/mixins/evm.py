import os
import time
from typing import List

from empiric.core.entry import SpotEntry
from empiric.core.types import CHAIN_IDS, GATEWAY_URLS, LINEA_TESTNET, SCROLL_TESTNET, ERA_TESTNET
from web3 import Web3
from web3.middleware import geth_poa_middleware

ORACLE_ABI = [
    {"inputs": [], "stateMutability": "nonpayable", "type": "constructor"},
    {
        "inputs": [
            {
                "components": [
                    {"internalType": "uint64", "name": "timestamp", "type": "uint64"},
                    {"internalType": "uint128", "name": "value", "type": "uint128"},
                    {
                        "internalType": "enum IOracle.AggregationMode",
                        "name": "aggregationMode",
                        "type": "uint8",
                    },
                    {
                        "internalType": "uint8",
                        "name": "numSourcesAggregated",
                        "type": "uint8",
                    },
                ],
                "indexed": False,
                "internalType": "struct IOracle.Checkpoint",
                "name": "cp",
                "type": "tuple",
            }
        ],
        "name": "CheckpointSpotEntry",
        "type": "event",
    },
    {
        "anonymous": False,
        "inputs": [
            {
                "indexed": False,
                "internalType": "uint8",
                "name": "version",
                "type": "uint8",
            }
        ],
        "name": "Initialized",
        "type": "event",
    },
    {
        "anonymous": False,
        "inputs": [
            {
                "indexed": True,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address",
            },
            {
                "indexed": True,
                "internalType": "address",
                "name": "newOwner",
                "type": "address",
            },
        ],
        "name": "OwnershipTransferred",
        "type": "event",
    },
    {
        "anonymous": False,
        "inputs": [
            {
                "components": [
                    {"internalType": "bytes32", "name": "id", "type": "bytes32"},
                    {"internalType": "uint256", "name": "decimals", "type": "uint256"},
                    {
                        "internalType": "bool",
                        "name": "isAbstractCurrency",
                        "type": "bool",
                    },
                    {
                        "internalType": "address",
                        "name": "ethereumAddress",
                        "type": "address",
                    },
                ],
                "indexed": False,
                "internalType": "struct ICurrencyManager.Currency",
                "name": "currency",
                "type": "tuple",
            }
        ],
        "name": "SubmittedCurrency",
        "type": "event",
    },
    {
        "anonymous": False,
        "inputs": [
            {
                "components": [
                    {"internalType": "bytes32", "name": "id", "type": "bytes32"},
                    {
                        "internalType": "bytes32",
                        "name": "quoteCurrencyId",
                        "type": "bytes32",
                    },
                    {
                        "internalType": "bytes32",
                        "name": "baseCurrencyId",
                        "type": "bytes32",
                    },
                ],
                "indexed": False,
                "internalType": "struct ICurrencyManager.Pair",
                "name": "pair",
                "type": "tuple",
            }
        ],
        "name": "SubmittedPair",
        "type": "event",
    },
    {
        "anonymous": False,
        "inputs": [
            {
                "components": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "timestamp",
                                "type": "uint256",
                            },
                            {
                                "internalType": "bytes32",
                                "name": "source",
                                "type": "bytes32",
                            },
                            {
                                "internalType": "bytes32",
                                "name": "publisher",
                                "type": "bytes32",
                            },
                        ],
                        "internalType": "struct IOracle.BaseEntry",
                        "name": "base",
                        "type": "tuple",
                    },
                    {"internalType": "bytes32", "name": "pairId", "type": "bytes32"},
                    {"internalType": "uint256", "name": "price", "type": "uint256"},
                    {"internalType": "uint256", "name": "volume", "type": "uint256"},
                ],
                "indexed": False,
                "internalType": "struct IOracle.SpotEntry",
                "name": "newEntry",
                "type": "tuple",
            }
        ],
        "name": "SubmittedSpotEntry",
        "type": "event",
    },
    {
        "anonymous": False,
        "inputs": [
            {
                "components": [
                    {"internalType": "bytes32", "name": "id", "type": "bytes32"},
                    {"internalType": "uint256", "name": "decimals", "type": "uint256"},
                    {
                        "internalType": "bool",
                        "name": "isAbstractCurrency",
                        "type": "bool",
                    },
                    {
                        "internalType": "address",
                        "name": "ethereumAddress",
                        "type": "address",
                    },
                ],
                "indexed": False,
                "internalType": "struct ICurrencyManager.Currency",
                "name": "currency",
                "type": "tuple",
            }
        ],
        "name": "UpdatedCurrency",
        "type": "event",
    },
    {
        "anonymous": False,
        "inputs": [
            {
                "indexed": False,
                "internalType": "address",
                "name": "oldPublisherRegistryAddress",
                "type": "address",
            },
            {
                "indexed": False,
                "internalType": "address",
                "name": "newPublisherRegistryAddress",
                "type": "address",
            },
        ],
        "name": "UpdatedPublisherRegistryAddress",
        "type": "event",
    },
    {
        "inputs": [
            {
                "components": [
                    {"internalType": "bytes32", "name": "id", "type": "bytes32"},
                    {"internalType": "uint256", "name": "decimals", "type": "uint256"},
                    {
                        "internalType": "bool",
                        "name": "isAbstractCurrency",
                        "type": "bool",
                    },
                    {
                        "internalType": "address",
                        "name": "ethereumAddress",
                        "type": "address",
                    },
                ],
                "internalType": "struct ICurrencyManager.Currency",
                "name": "currency",
                "type": "tuple",
            }
        ],
        "name": "addCurrency",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {
                "components": [
                    {"internalType": "bytes32", "name": "id", "type": "bytes32"},
                    {
                        "internalType": "bytes32",
                        "name": "quoteCurrencyId",
                        "type": "bytes32",
                    },
                    {
                        "internalType": "bytes32",
                        "name": "baseCurrencyId",
                        "type": "bytes32",
                    },
                ],
                "internalType": "struct ICurrencyManager.Pair",
                "name": "pair",
                "type": "tuple",
            }
        ],
        "name": "addPair",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
        "name": "checkpointIndex",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [
            {"internalType": "bytes32", "name": "", "type": "bytes32"},
            {"internalType": "uint256", "name": "", "type": "uint256"},
        ],
        "name": "checkpoints",
        "outputs": [
            {"internalType": "uint64", "name": "timestamp", "type": "uint64"},
            {"internalType": "uint128", "name": "value", "type": "uint128"},
            {
                "internalType": "enum IOracle.AggregationMode",
                "name": "aggregationMode",
                "type": "uint8",
            },
            {"internalType": "uint8", "name": "numSourcesAggregated", "type": "uint8"},
        ],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
        "name": "currencies",
        "outputs": [
            {"internalType": "bytes32", "name": "id", "type": "bytes32"},
            {"internalType": "uint256", "name": "decimals", "type": "uint256"},
            {"internalType": "bool", "name": "isAbstractCurrency", "type": "bool"},
            {"internalType": "address", "name": "ethereumAddress", "type": "address"},
        ],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [
            {"internalType": "bytes32", "name": "", "type": "bytes32"},
            {"internalType": "uint256", "name": "", "type": "uint256"},
        ],
        "name": "oracleSourcesStorage",
        "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [
            {"internalType": "bytes32", "name": "", "type": "bytes32"},
            {"internalType": "bytes32", "name": "", "type": "bytes32"},
        ],
        "name": "pairIdStorage",
        "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
        "name": "pairs",
        "outputs": [
            {"internalType": "bytes32", "name": "id", "type": "bytes32"},
            {"internalType": "bytes32", "name": "quoteCurrencyId", "type": "bytes32"},
            {"internalType": "bytes32", "name": "baseCurrencyId", "type": "bytes32"},
        ],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [],
        "name": "publisherRegistry",
        "outputs": [
            {
                "internalType": "contract IPublisherRegistry",
                "name": "",
                "type": "address",
            }
        ],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {"internalType": "bytes32", "name": "", "type": "bytes32"},
            {"internalType": "bytes32", "name": "", "type": "bytes32"},
        ],
        "name": "spotEntryStorage",
        "outputs": [
            {"internalType": "uint128", "name": "timestamp", "type": "uint128"},
            {"internalType": "bytes16", "name": "pairId", "type": "bytes16"},
            {"internalType": "uint128", "name": "price", "type": "uint128"},
            {"internalType": "uint128", "name": "volume", "type": "uint128"},
        ],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {
                "components": [
                    {"internalType": "bytes32", "name": "id", "type": "bytes32"},
                    {"internalType": "uint256", "name": "decimals", "type": "uint256"},
                    {
                        "internalType": "bool",
                        "name": "isAbstractCurrency",
                        "type": "bool",
                    },
                    {
                        "internalType": "address",
                        "name": "ethereumAddress",
                        "type": "address",
                    },
                ],
                "internalType": "struct ICurrencyManager.Currency",
                "name": "currency",
                "type": "tuple",
            }
        ],
        "name": "updateCurrency",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_publisherRegistry",
                "type": "address",
            },
            {
                "components": [
                    {"internalType": "bytes32", "name": "id", "type": "bytes32"},
                    {"internalType": "uint256", "name": "decimals", "type": "uint256"},
                    {
                        "internalType": "bool",
                        "name": "isAbstractCurrency",
                        "type": "bool",
                    },
                    {
                        "internalType": "address",
                        "name": "ethereumAddress",
                        "type": "address",
                    },
                ],
                "internalType": "struct ICurrencyManager.Currency[]",
                "name": "_currencies",
                "type": "tuple[]",
            },
            {
                "components": [
                    {"internalType": "bytes32", "name": "id", "type": "bytes32"},
                    {
                        "internalType": "bytes32",
                        "name": "quoteCurrencyId",
                        "type": "bytes32",
                    },
                    {
                        "internalType": "bytes32",
                        "name": "baseCurrencyId",
                        "type": "bytes32",
                    },
                ],
                "internalType": "struct ICurrencyManager.Pair[]",
                "name": "_pairs",
                "type": "tuple[]",
            },
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [{"internalType": "uint256", "name": "threshold", "type": "uint256"}],
        "name": "setSourcesThreshold",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {
                "internalType": "contract IPublisherRegistry",
                "name": "newPublisherRegistryAddress",
                "type": "address",
            }
        ],
        "name": "updatePublisherRegistryAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "timestamp",
                                "type": "uint256",
                            },
                            {
                                "internalType": "bytes32",
                                "name": "source",
                                "type": "bytes32",
                            },
                            {
                                "internalType": "bytes32",
                                "name": "publisher",
                                "type": "bytes32",
                            },
                        ],
                        "internalType": "struct IOracle.BaseEntry",
                        "name": "base",
                        "type": "tuple",
                    },
                    {"internalType": "bytes32", "name": "pairId", "type": "bytes32"},
                    {"internalType": "uint256", "name": "price", "type": "uint256"},
                    {"internalType": "uint256", "name": "volume", "type": "uint256"},
                ],
                "internalType": "struct IOracle.SpotEntry",
                "name": "spotEntry",
                "type": "tuple",
            }
        ],
        "name": "publishSpotEntry",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {"internalType": "bytes32", "name": "pairId", "type": "bytes32"},
            {
                "internalType": "enum IOracle.AggregationMode",
                "name": "aggregationMode",
                "type": "uint8",
            },
        ],
        "name": "setCheckpoint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {"internalType": "bytes32[]", "name": "pairIds", "type": "bytes32[]"},
            {
                "internalType": "enum IOracle.AggregationMode",
                "name": "aggregationMode",
                "type": "uint8",
            },
        ],
        "name": "setCheckpoints",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "timestamp",
                                "type": "uint256",
                            },
                            {
                                "internalType": "bytes32",
                                "name": "source",
                                "type": "bytes32",
                            },
                            {
                                "internalType": "bytes32",
                                "name": "publisher",
                                "type": "bytes32",
                            },
                        ],
                        "internalType": "struct IOracle.BaseEntry",
                        "name": "base",
                        "type": "tuple",
                    },
                    {"internalType": "bytes32", "name": "pairId", "type": "bytes32"},
                    {"internalType": "uint256", "name": "price", "type": "uint256"},
                    {"internalType": "uint256", "name": "volume", "type": "uint256"},
                ],
                "internalType": "struct IOracle.SpotEntry[]",
                "name": "spotEntries",
                "type": "tuple[]",
            }
        ],
        "name": "publishSpotEntries",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {"internalType": "bytes32", "name": "pairId", "type": "bytes32"},
            {
                "internalType": "enum IOracle.AggregationMode",
                "name": "",
                "type": "uint8",
            },
            {"internalType": "bytes32[]", "name": "sources", "type": "bytes32[]"},
        ],
        "name": "getSpot",
        "outputs": [
            {"internalType": "uint256", "name": "price", "type": "uint256"},
            {"internalType": "uint256", "name": "decimals", "type": "uint256"},
            {
                "internalType": "uint256",
                "name": "lastUpdatedTimestamp",
                "type": "uint256",
            },
            {
                "internalType": "uint256",
                "name": "numSourcesAggregated",
                "type": "uint256",
            },
        ],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [
            {"internalType": "bytes32", "name": "pairId", "type": "bytes32"},
            {"internalType": "bytes32[]", "name": "sources", "type": "bytes32[]"},
        ],
        "name": "getSpotEntries",
        "outputs": [
            {
                "components": [
                    {"internalType": "uint128", "name": "timestamp", "type": "uint128"},
                    {"internalType": "bytes16", "name": "pairId", "type": "bytes16"},
                    {"internalType": "uint128", "name": "price", "type": "uint128"},
                    {"internalType": "uint128", "name": "volume", "type": "uint128"},
                ],
                "internalType": "struct IOracle.SpotEntryStorage[]",
                "name": "entries",
                "type": "tuple[]",
            },
            {
                "internalType": "uint256",
                "name": "lastUpdatedTimestamp",
                "type": "uint256",
            },
        ],
        "stateMutability": "view",
        "type": "function",
    },
]

ORACLE_ADDRESS = {
    LINEA_TESTNET: "0x8A571d47fA7Ce97E8F6BDcEFAc1221585567C84b",
    SCROLL_TESTNET: "0xbb91Ed469258069Ff2590CA11E1800DE05Bf6Ec7",
    ERA_TESTNET: "0x807dEEA2a8BA552b13C418F1E9Ac8a12af77D1B1",
}


class EvmHelper:
    def __init__(
        self,
        publisher,
        sender_address,
        private_key,
        network_name,
    ):
        self.w3 = Web3(Web3.HTTPProvider(GATEWAY_URLS[network_name]))

        # The following middleware is required for POA chains (polygon, bnb, consensys zkevm)
        # See here for why https://web3py.readthedocs.io/en/v5/middleware.html?highlight=geth_poa_middleware#why-is-geth-poa-middleware-necessary
        self.w3.middleware_onion.inject(geth_poa_middleware, layer=0)
        
        self.chain_id = CHAIN_IDS[network_name]
        self.oracle = self.w3.eth.contract(
            address=ORACLE_ADDRESS[network_name],
            abi=ORACLE_ABI,
        )
        self.publisher = publisher
        self.sender = sender_address or os.environ["SENDER_ADDRESS"]
        self.private_key = private_key or os.environ["PRIVATE_KEY"]

    def publish_spot_entry(
        self,
        pair,
        price,
        source,
        volume=0,
        gas_price=int(1e8),
        gas=int(1e6)
    ):
        nonce = self.w3.eth.getTransactionCount(self.sender)
        txn = self.oracle.functions.publishSpotEntry(
            {
                "base": {
                    "timestamp": int(time.time()),
                    "source": source,
                    "publisher": self.publisher,
                },
                "pairId": b"ETH/USD",
                "price": price,
                "volume": volume,
            }
        ).buildTransaction(
            {
                "nonce": nonce,
                "gasPrice": gas_price,
                "gasPrice": gas,
                "chainId": self.chain_id,
                "from": self.sender,
            }
        )
        print(txn)
        signed_txn = self.w3.eth.account.signTransaction(
            txn, private_key=self.private_key
        )
        self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)

        return signed_txn.hash.hex()

    def publish_spot_entries(self, spot_entries: List[SpotEntry], gas_price=int(1e8), gas=int(1e6)):
        serialized_spot_entries = SpotEntry.serialize_entries_evm(spot_entries)
        nonce = self.w3.eth.get_transaction_count(self.sender)
        transaction = self.oracle.functions.publishSpotEntries(
            serialized_spot_entries
        ).build_transaction(
            {
                "nonce": nonce,
                "chainId": self.chain_id,
                "from": self.sender,
                "gasPrice": gas_price,
                "gas": gas,
            }
        )
        signed_tx = self.w3.eth.account.sign_transaction(transaction, self.private_key)

        txn_hash = self.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
        txn_receipt = self.w3.eth.wait_for_transaction_receipt(txn_hash)

        return txn_hash.hex()
