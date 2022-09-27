import logging
from typing import Optional

from empiric.core.abis import ORACLE_ABI, PUBLISHER_REGISTRY_ABI
from empiric.core.config import CONTRACT_ADDRESSES, NETWORKS, ContractAddresses
from empiric.core.contract import Contract
from empiric.core.mixins import (
    OracleMixin,
    PublisherRegistryMixin,
    RandomnessMixin,
    TransactionMixin,
)
from starknet_py.net import AccountClient
from starknet_py.net.gateway_client import GatewayClient
from starknet_py.net.signer.stark_curve_signer import KeyPair, StarkCurveSigner

logger = logging.getLogger(__name__)


class EmpiricClient(
    OracleMixin, PublisherRegistryMixin, RandomnessMixin, TransactionMixin
):
    is_user_client: bool = False

    def __init__(
        self,
        network: str = "testnet",
        account_private_key: Optional[int] = None,
        account_contract_address: Optional[
            int
        ] = 0x0704CC0F2749637A0345D108AC9CD597BB33CCF7F477978D52E236830812CD98,  # testnet admin address
        contract_addresses_config: Optional[ContractAddresses] = None,
    ):
        """
        Client for interacting with Empiric on Starknet.
        :param net: Target network for the client. Can be a string with URL, one of ``"mainnet"``, ``"testnet"``, ``"local"`` or ``"integration""``
        :param account_private_key: Optional private key for requests.  Not necessary if not making network updates
        :param account_contract_address: Optional account contract address.  Not necessary if not making network updates
        :param contract_addresses_config: Optional Contract Addresses for Empiric.  Will default to the provided network but must be set if using non standard contracts.
        """
        network_config = NETWORKS[network]

        if network not in ["mainnet", "testnet"]:
            if network in NETWORKS:
                self.client = GatewayClient(
                    network_config.gateway_url,
                    network_config.chain_id,
                )
            else:
                self.client = GatewayClient(network, network_config.chain_id)
        else:
            self.client = GatewayClient(network)

        if account_contract_address and account_private_key:
            self._setup_account_client(
                network_config.chain_id, account_private_key, account_contract_address
            )

        if not contract_addresses_config:
            contract_addresses_config = CONTRACT_ADDRESSES[network]
        self.contract_addresses_config = contract_addresses_config
        self._setup_contracts()

    def _setup_contracts(self):
        self.oracle = Contract(
            self.contract_addresses_config.oracle_proxy_address,
            ORACLE_ABI,
            self.client,
        )
        self.publisher_registry = Contract(
            self.contract_addresses_config.publisher_registry_address,
            PUBLISHER_REGISTRY_ABI,
            self.client,
        )

    async def get_balance(self, account_contract_address):
        client = AccountClient(
            account_contract_address,
            self.client,
            key_pair=KeyPair.from_private_key(1),
        )
        balance = await client.get_balance()
        return balance

    def set_account(self, private_key, account_contract_address):
        self.signer = StarkCurveSigner(
            account_contract_address,
            KeyPair.from_private_key(private_key),
            self.client.chain,
        )
        self.client = AccountClient(
            account_contract_address,
            self.client,
            self.signer,
            supported_tx_version=1,
        )
        self.is_user_client = True
        self._setup_contracts()

    def _setup_account_client(self, chain_id, private_key, account_contract_address):
        self.signer = StarkCurveSigner(
            account_contract_address,
            KeyPair.from_private_key(private_key),
            chain_id,
        )
        self.client = AccountClient(
            account_contract_address,
            self.client,
            self.signer,
            supported_tx_version=1,
        )
        self.is_user_client = True

    def account_address(self):
        return self.client.address
