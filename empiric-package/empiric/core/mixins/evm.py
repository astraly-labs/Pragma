import time
from typing import List

from empiric.core.entry import SpotEntry
from web3 import HTTPProvider, Web3

ORACLE_ABI = [
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
]


class EvmHelper:
    def __init__(
        self,
        publisher,
        sender_address,
        private_key,
        provider_uri,
        chain_id,
        oracle_address,
    ):
        self.w3 = Web3(HTTPProvider(endpoint_uri=provider_uri))
        self.chain_id = chain_id
        self.oracle = self.w3.eth.contract(
            address=oracle_address,
            abi=ORACLE_ABI,
        )
        self.publisher = publisher
        self.sender = sender_address
        self.private_key = private_key

    def get_nonce(self) -> int:
        return self.w3.eth.getTransactionCount(self.sender)

    def publish_spot_entry(
        self,
        pair,
        price,
        source,
        volume=0,
        gas_price=int(1e8),
        nonce=None,
    ):
        nonce = nonce or self.get_nonce()
        txn = self.oracle.functions.publishSpotEntry(
            {
                "base": {
                    "timestamp": int(time.time()),
                    "source": source,
                    "publisher": self.publisher,
                },
                "pairId": pair,
                "price": price,
                "volume": volume,
            }
        ).buildTransaction(
            {
                "nonce": nonce,
                "gasPrice": gas_price,
                "chainId": self.chain_id,
                "from": self.sender,
            }
        )

        signed_txn = self.w3.eth.account.signTransaction(
            txn, private_key=self.private_key
        )
        self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)

        return signed_txn.hash.hex()

    def publish_spot_entries(
        self, spot_entries: List[SpotEntry], gas_price=int(1e8), nonce=None
    ):
        nonce = nonce or self.get_nonce()
        txn = self.oracle.functions.publishSpotEntries(spot_entries).buildTransaction(
            {
                "nonce": nonce,
                "gasPrice": int(1e8),
                "chainId": self.chain_id,
                "from": self.sender,
            }
        )
        signed_txn = self.w3.eth.account.signTransaction(
            txn, private_key=self.private_key
        )
        self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)

        return signed_txn.hash.hex()

    def setCheckpoints(self, pairs: List[bytes], nonce=None) -> str:
        nonce = nonce or self.get_nonce()
        txn = self.oracle.functions.setCheckpoints(pairs, 0).buildTransaction(
            {
                "nonce": nonce,
                "gasPrice": int(1e8),
                "chainId": self.chain_id,
                "from": self.sender,
            }
        )

        signed_txn = self.w3.eth.account.signTransaction(
            txn, private_key=self.private_key
        )
        self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)

        return signed_txn.hash.hex()
