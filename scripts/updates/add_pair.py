import asyncio
import os

from starknet_py.net.account.account import Account
from starknet_py.net.gateway_client import GatewayClient
from starknet_py.net.signer.stark_curve_signer import KeyPair, StarkCurveSigner
from starknet_py.net.models import StarknetChainId
from starknet_py.contract import Contract, ContractFunction
from empiric.core import Currency, Pair
from empiric.core.types import RPC_URLS

ORACLE_ABI = [
    {
        "members": [
            {
                "name": "base",
                "offset": 0,
                "type": "BaseEntry"
            },
            {
                "name": "key",
                "offset": 3,
                "type": "felt"
            },
            {
                "name": "value",
                "offset": 4,
                "type": "felt"
            }
        ],
        "name": "GenericEntry",
        "size": 5,
        "type": "struct"
    },
    {
        "members": [
            {
                "name": "timestamp",
                "offset": 0,
                "type": "felt"
            },
            {
                "name": "source",
                "offset": 1,
                "type": "felt"
            },
            {
                "name": "publisher",
                "offset": 2,
                "type": "felt"
            }
        ],
        "name": "BaseEntry",
        "size": 3,
        "type": "struct"
    },
    {
        "members": [
            {
                "name": "base",
                "offset": 0,
                "type": "BaseEntry"
            },
            {
                "name": "pair_id",
                "offset": 3,
                "type": "felt"
            },
            {
                "name": "price",
                "offset": 4,
                "type": "felt"
            },
            {
                "name": "volume",
                "offset": 5,
                "type": "felt"
            }
        ],
        "name": "SpotEntry",
        "size": 6,
        "type": "struct"
    },
    {
        "members": [
            {
                "name": "base",
                "offset": 0,
                "type": "BaseEntry"
            },
            {
                "name": "pair_id",
                "offset": 3,
                "type": "felt"
            },
            {
                "name": "price",
                "offset": 4,
                "type": "felt"
            },
            {
                "name": "expiry_timestamp",
                "offset": 5,
                "type": "felt"
            }
        ],
        "name": "FutureEntry",
        "size": 6,
        "type": "struct"
    },
    {
        "members": [
            {
                "name": "id",
                "offset": 0,
                "type": "felt"
            },
            {
                "name": "decimals",
                "offset": 1,
                "type": "felt"
            },
            {
                "name": "is_abstract_currency",
                "offset": 2,
                "type": "felt"
            },
            {
                "name": "starknet_address",
                "offset": 3,
                "type": "felt"
            },
            {
                "name": "ethereum_address",
                "offset": 4,
                "type": "felt"
            }
        ],
        "name": "Currency",
        "size": 5,
        "type": "struct"
    },
    {
        "members": [
            {
                "name": "id",
                "offset": 0,
                "type": "felt"
            },
            {
                "name": "quote_currency_id",
                "offset": 1,
                "type": "felt"
            },
            {
                "name": "base_currency_id",
                "offset": 2,
                "type": "felt"
            }
        ],
        "name": "Pair",
        "size": 3,
        "type": "struct"
    },
    {
        "members": [
            {
                "name": "timestamp",
                "offset": 0,
                "type": "felt"
            },
            {
                "name": "value",
                "offset": 1,
                "type": "felt"
            },
            {
                "name": "aggregation_mode",
                "offset": 2,
                "type": "felt"
            },
            {
                "name": "num_sources_aggregated",
                "offset": 3,
                "type": "felt"
            }
        ],
        "name": "Checkpoint",
        "size": 4,
        "type": "struct"
    },
    {
        "data": [
            {
                "name": "old_publisher_registry_address",
                "type": "felt"
            },
            {
                "name": "new_publisher_registry_address",
                "type": "felt"
            }
        ],
        "keys": [],
        "name": "UpdatedPublisherRegistryAddress",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "new_entry",
                "type": "GenericEntry"
            }
        ],
        "keys": [],
        "name": "SubmittedEntry",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "new_entry",
                "type": "SpotEntry"
            }
        ],
        "keys": [],
        "name": "SubmittedSpotEntry",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "new_entry",
                "type": "FutureEntry"
            }
        ],
        "keys": [],
        "name": "SubmittedFutureEntry",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "currency",
                "type": "Currency"
            }
        ],
        "keys": [],
        "name": "SubmittedCurrency",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "currency",
                "type": "Currency"
            }
        ],
        "keys": [],
        "name": "UpdatedCurrency",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "pair",
                "type": "Pair"
            }
        ],
        "keys": [],
        "name": "SubmittedPair",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "pair_id",
                "type": "felt"
            }
        ],
        "keys": [],
        "name": "CheckpointSpotEntry",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "implementation",
                "type": "felt"
            }
        ],
        "keys": [],
        "name": "Upgraded",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "previousAdminAddress",
                "type": "felt"
            },
            {
                "name": "newAdminAddress",
                "type": "felt"
            }
        ],
        "keys": [],
        "name": "AdminAddressChanged",
        "type": "event"
    },
    {
        "inputs": [
            {
                "name": "proxy_admin",
                "type": "felt"
            },
            {
                "name": "publisher_registry_address",
                "type": "felt"
            },
            {
                "name": "currencies_len",
                "type": "felt"
            },
            {
                "name": "currencies",
                "type": "Currency*"
            },
            {
                "name": "pairs_len",
                "type": "felt"
            },
            {
                "name": "pairs",
                "type": "Pair*"
            }
        ],
        "name": "initializer",
        "outputs": [],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "pair_id",
                "type": "felt"
            },
            {
                "name": "sources_len",
                "type": "felt"
            },
            {
                "name": "sources",
                "type": "felt*"
            }
        ],
        "name": "get_spot_entries_for_sources",
        "outputs": [
                {
                    "name": "entries_len",
                    "type": "felt"
                },
            {
                    "name": "entries",
                    "type": "SpotEntry*"
                }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "pair_id",
                "type": "felt"
            }
        ],
        "name": "get_spot_entries",
        "outputs": [
                {
                    "name": "entries_len",
                    "type": "felt"
                },
            {
                    "name": "entries",
                    "type": "SpotEntry*"
                }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "pair_id",
                "type": "felt"
            },
            {
                "name": "source",
                "type": "felt"
            }
        ],
        "name": "get_spot_entry",
        "outputs": [
                {
                    "name": "entry",
                    "type": "SpotEntry"
                }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "pair_id",
                "type": "felt"
            },
            {
                "name": "expiry_timestamp",
                "type": "felt"
            },
            {
                "name": "source",
                "type": "felt"
            }
        ],
        "name": "get_future_entry",
        "outputs": [
                {
                    "name": "entry",
                    "type": "FutureEntry"
                }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "pair_id",
                "type": "felt"
            }
        ],
        "name": "get_spot_median",
        "outputs": [
                {
                    "name": "price",
                    "type": "felt"
                },
            {
                    "name": "decimals",
                    "type": "felt"
                },
            {
                    "name": "last_updated_timestamp",
                    "type": "felt"
                },
            {
                    "name": "num_sources_aggregated",
                    "type": "felt"
                }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "pair_id",
                "type": "felt"
            },
            {
                "name": "sources_len",
                "type": "felt"
            },
            {
                "name": "sources",
                "type": "felt*"
            }
        ],
        "name": "get_spot_median_for_sources",
        "outputs": [
                {
                    "name": "price",
                    "type": "felt"
                },
            {
                    "name": "decimals",
                    "type": "felt"
                },
            {
                    "name": "last_updated_timestamp",
                    "type": "felt"
                },
            {
                    "name": "num_sources_aggregated",
                    "type": "felt"
                }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "pair_id",
                "type": "felt"
            },
            {
                "name": "aggregation_mode",
                "type": "felt"
            }
        ],
        "name": "get_spot",
        "outputs": [
                {
                    "name": "price",
                    "type": "felt"
                },
            {
                    "name": "decimals",
                    "type": "felt"
                },
            {
                    "name": "last_updated_timestamp",
                    "type": "felt"
                },
            {
                    "name": "num_sources_aggregated",
                    "type": "felt"
                }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "pair_id",
                "type": "felt"
            },
            {
                "name": "aggregation_mode",
                "type": "felt"
            },
            {
                "name": "sources_len",
                "type": "felt"
            },
            {
                "name": "sources",
                "type": "felt*"
            }
        ],
        "name": "get_spot_for_sources",
        "outputs": [
                {
                    "name": "price",
                    "type": "felt"
                },
            {
                    "name": "decimals",
                    "type": "felt"
                },
            {
                    "name": "last_updated_timestamp",
                    "type": "felt"
                },
            {
                    "name": "num_sources_aggregated",
                    "type": "felt"
                }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_publisher_registry_address",
        "outputs": [
                {
                    "name": "publisher_registry_address",
                    "type": "felt"
                }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "pair_id",
                "type": "felt"
            }
        ],
        "name": "get_spot_decimals",
        "outputs": [
                {
                    "name": "decimals",
                    "type": "felt"
                }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "key",
                "type": "felt"
            }
        ],
        "name": "get_value",
        "outputs": [
                {
                    "name": "value",
                    "type": "felt"
                },
            {
                    "name": "decimals",
                    "type": "felt"
                },
            {
                    "name": "last_updated_timestamp",
                    "type": "felt"
                },
            {
                    "name": "num_sources_aggregated",
                    "type": "felt"
                }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "base_currency_id",
                "type": "felt"
            },
            {
                "name": "quote_currency_id",
                "type": "felt"
            },
            {
                "name": "aggregation_mode",
                "type": "felt"
            }
        ],
        "name": "get_spot_with_USD_hop",
        "outputs": [
                {
                    "name": "price",
                    "type": "felt"
                },
            {
                    "name": "decimals",
                    "type": "felt"
                },
            {
                    "name": "last_updated_timestamp",
                    "type": "felt"
                },
            {
                    "name": "num_sources_aggregated",
                    "type": "felt"
                }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "new_entry",
                "type": "FutureEntry"
            }
        ],
        "name": "publish_future_entry",
        "outputs": [],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "new_entry",
                "type": "SpotEntry"
            }
        ],
        "name": "publish_spot_entry",
        "outputs": [],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "new_entry",
                "type": "GenericEntry"
            }
        ],
        "name": "publish_entry",
        "outputs": [],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "new_entries_len",
                "type": "felt"
            },
            {
                "name": "new_entries",
                "type": "GenericEntry*"
            }
        ],
        "name": "publish_entries",
        "outputs": [],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "new_entries_len",
                "type": "felt"
            },
            {
                "name": "new_entries",
                "type": "FutureEntry*"
            }
        ],
        "name": "publish_future_entries",
        "outputs": [],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "new_entries_len",
                "type": "felt"
            },
            {
                "name": "new_entries",
                "type": "SpotEntry*"
            }
        ],
        "name": "publish_spot_entries",
        "outputs": [],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "publisher_registry_address",
                "type": "felt"
            }
        ],
        "name": "update_publisher_registry_address",
        "outputs": [],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "currency",
                "type": "Currency"
            }
        ],
        "name": "add_currency",
        "outputs": [],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "currency",
                "type": "Currency"
            }
        ],
        "name": "update_currency",
        "outputs": [],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "pair",
                "type": "Pair"
            }
        ],
        "name": "add_pair",
        "outputs": [],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "key",
                "type": "felt"
            }
        ],
        "name": "get_latest_checkpoint_index",
        "outputs": [
                {
                    "name": "latest",
                    "type": "felt"
                }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "key",
                "type": "felt"
            },
            {
                "name": "index",
                "type": "felt"
            }
        ],
        "name": "get_checkpoint",
        "outputs": [
                {
                    "name": "checkpoint",
                    "type": "Checkpoint"
                }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_sources_threshold",
        "outputs": [
                {
                    "name": "threshold",
                    "type": "felt"
                }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "new_implementation",
                "type": "felt"
            }
        ],
        "name": "upgrade",
        "outputs": [],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "new_admin_address",
                "type": "felt"
            }
        ],
        "name": "set_admin_address",
        "outputs": [],
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_implementation_hash",
        "outputs": [
                {
                    "name": "address",
                    "type": "felt"
                }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_admin_address",
        "outputs": [
                {
                    "name": "admin_address",
                    "type": "felt"
                }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "pair_id",
                "type": "felt"
            },
            {
                "name": "aggregation_mode",
                "type": "felt"
            }
        ],
        "name": "set_checkpoint",
        "outputs": [],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "pair_ids_len",
                "type": "felt"
            },
            {
                "name": "pair_ids",
                "type": "felt*"
            },
            {
                "name": "aggregation_mode",
                "type": "felt"
            }
        ],
        "name": "set_checkpoints",
        "outputs": [],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "pair_id",
                "type": "felt"
            },
            {
                "name": "timestamp",
                "type": "felt"
            }
        ],
        "name": "get_last_spot_checkpoint_before",
        "outputs": [
                {
                    "name": "checkpoint",
                    "type": "Checkpoint"
                },
            {
                    "name": "idx",
                    "type": "felt"
                }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "threshold",
                "type": "felt"
            }
        ],
        "name": "set_sources_threshold",
        "outputs": [],
        "type": "function"
    }
]

admin_contract_address = (
    # 0x029E7D00D0142EB684D6B010DDFE59348D892E5F8FF94F1B77CD372645DF4B77 mainnet
    0x021d6f33c00d3657d7ec6f9322399729afdf21533b77cf0512ac583b4755f011  # goerli
)
oracle_proxy_address = (
    # 0x0346c57f094d641ad94e43468628d8e9c574dcb2803ec372576ccc60a40be2c4 mainnet
    0x446812bac98c08190dee8967180f4e3cdcd1db9373ca269904acb17f67f7093  # goerli
)

currencies_to_add = [
    # Currency(
    #     "LORDS",
    #     8,
    #     0,
    #     0x0124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49,
    #     0x686f2404e77ab0d9070a46cdfb0b7fecdd2318b0,
    # ),
    # Currency(
    #     "R",
    #     8,
    #     0,
    #     0x01fa2fb85f624600112040e1f3a848f53a37ed5a7385810063d5fe6887280333,
    #     0x183015a9bA6fF60230fdEaDc3F43b3D788b13e21,
    # ),
    Currency(
        "wstETH",
        8,
        0,
        0x042b8f0484674ca266ac5d08e4ac6a3fe65bd3129795def2dca5c34ecc5f96d2,
        0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0,
    ),
]
pairs_to_add = [
    # Pair("LORDS/USD", "LORDS", "USD"),
    # Pair("R/USD", "R", "USD"),
    Pair("wstETH/USD", "wstETH", "USD"),
]

# currencies_to_update = [ 
#     Currency(
#         "R",
#         8,
#         1,
#         0,
#         0,
#     ),
# ]

NETWORK = "testnet"
CHAIN_ID = StarknetChainId.TESTNET if NETWORK == "testnet" else StarknetChainId.MAINNET


async def main():
    admin_private_key = int(os.environ.get(f"ADMIN_PRIVATE_KEY_{NETWORK.upper()}"), 0)
    gateway = GatewayClient(net=NETWORK)
    signer = StarkCurveSigner(
        admin_contract_address,
        KeyPair.from_private_key(admin_private_key),
        CHAIN_ID,
    )

    admin = Account(
        address=admin_contract_address,
        client=gateway,
        signer=signer
    )

    # Create contract instance
    contract = Contract(address=oracle_proxy_address, abi=ORACLE_ABI, provider=admin)

    # Add Currencies
    for currency in currencies_to_add:
        print(currency.to_dict())
        invocation = await contract.functions['add_currency'].invoke(
            currency.to_dict(),
            max_fee=int(1e16)
        )
        print(hex(invocation.hash))
        await invocation.wait_for_acceptance()

    # Add Pairs
    for pair in pairs_to_add:
        print(pair.to_dict())
        invocation = await contract.functions['add_pair'].invoke(
            pair.to_dict(),
            max_fee=int(1e16)
        )
        print(hex(invocation.hash))
        await invocation.wait_for_acceptance()

    # # Update Currencies
    # for currency in currencies_to_update:
    #     print(currency.to_dict())
    #     invocation = await contract.functions['update_currency'].invoke(
    #         currency.to_dict(),
    #         max_fee=int(1e16)
    #     )
    #     print(hex(invocation.hash))
    #     await invocation.wait_for_acceptance()

if __name__ == "__main__":
    asyncio.run(main())
