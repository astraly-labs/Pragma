import logging
from typing import Optional

from empiric.core.abis import ORACLE_ABI, PUBLISHER_REGISTRY_ABI, SUMMARY_STATS_ABI
from empiric.core.config import CONTRACT_ADDRESSES, NETWORKS, ContractAddresses
from empiric.core.contract import Contract
from empiric.core.mixins import (
    NonceMixin,
    OracleMixin,
    PublisherRegistryMixin,
    RandomnessMixin,
    TransactionMixin,
)
from starknet_py.net.account.account import Account
from starknet_py.net.gateway_client import GatewayClient
from starknet_py.net.signer.stark_curve_signer import KeyPair, StarkCurveSigner

logger = logging.getLogger(__name__)

class EmpiricClient(
    NonceMixin, OracleMixin, PublisherRegistryMixin, RandomnessMixin, TransactionMixin
):
    is_user_client: bool = False
    account_contract_address: Optional[int] = None
    account: Account = None

    def __init__(
        self,
        network: str = "testnet",
        account_private_key: Optional[int] = None,
        account_contract_address: Optional[int] = None,
        contract_addresses_config: Optional[ContractAddresses] = None,
    ):
        """
        Client for interacting with Empiric on Starknet.
        :param net: Target network for the client. Can be a string with URL, one of ``"mainnet"``, ``"testnet"``, ``"local"`` or ``"integration""``
        :param account_private_key: Optional private key for requests.  Not necessary if not making network updates
        :param account_contract_address: Optional account contract address.  Not necessary if not making network updates
        :param contract_addresses_config: Optional Contract Addresses for Empiric.  Will default to the provided network but must be set if using non standard contracts.
        """
        self.network_config = NETWORKS[network]
        self.network = network

        if network not in ["mainnet", "testnet"]:
            if network in NETWORKS:
                self.client = GatewayClient(self.network_config.gateway_url)
            else:
                raise NotImplementedError(f"Network {network} not recognized")
        else:
            self.client = GatewayClient(network)

        if account_contract_address and account_private_key:
            self._setup_account_client(
                self.network_config.chain_id,
                account_private_key,
                account_contract_address,
            )

        if not contract_addresses_config:
            contract_addresses_config = CONTRACT_ADDRESSES[network]
        self.contract_addresses_config = contract_addresses_config
        self._setup_contracts()

    def _setup_contracts(self):
        provider = self.account if self.account else self.client
        self.oracle = Contract(
            address=self.contract_addresses_config.oracle_proxy_address,
            abi=ORACLE_ABI,
            provider=provider,
        )
        self.publisher_registry = Contract(
            address=self.contract_addresses_config.publisher_registry_address,
            abi=PUBLISHER_REGISTRY_ABI,
            provider=provider,
        )

    async def get_balance(self, account_contract_address, token_address=None):
        client = Account(
            address=account_contract_address,
            client=self.client,
            key_pair=KeyPair.from_private_key(1),
            chain=self.network_config.chain_id,
        )
        balance = await client.get_balance(token_address)
        return balance

    def set_account(self, chain_id, private_key, account_contract_address):
        self._setup_account_client(chain_id, private_key, account_contract_address)

    def _setup_account_client(self, chain_id, private_key, account_contract_address):
        self.signer = StarkCurveSigner(
            account_contract_address,
            KeyPair.from_private_key(private_key),
            chain_id,
        )
        self.account = Account(
            address=account_contract_address,
            client=self.client,
            signer=self.signer,
        )
        self.client = self.account.client
        self.client._get_nonce = self._get_nonce
        self.is_user_client = True
        self.account_contract_address = account_contract_address

    def account_address(self):
        return self.account.address

    def init_stats_contract(
        self,
        stats_contract_address: int,
    ):
        provider = self.account if self.account else self.client
        self.stats = Contract(
            address=stats_contract_address,
            abi=SUMMARY_STATS_ABI,
            provider=provider,
        )
