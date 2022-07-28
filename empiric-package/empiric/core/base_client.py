from abc import ABC, abstractmethod

from empiric.core.const import NETWORK, ORACLE_CONTROLLER_ADDRESS
from starknet_py.contract import Contract
from starknet_py.net import AccountClient
from starknet_py.net.client_models import Call
from starknet_py.net.gateway_client import GatewayClient
from starknet_py.net.models import StarknetChainId
from starknet_py.net.networks import MAINNET, TESTNET
from starknet_py.net.signer.stark_curve_signer import KeyPair, StarkCurveSigner
from starkware.starknet.public.abi import get_selector_from_name


class EmpiricBaseClient(ABC):
    def __init__(
        self,
        account_private_key,
        account_contract_address,
        network=None,
        oracle_controller_address=None,
    ):
        if network is None:
            network = NETWORK
        if oracle_controller_address is None:
            oracle_controller_address = ORACLE_CONTROLLER_ADDRESS

        if network == TESTNET:
            chain_id = StarknetChainId.TESTNET
        elif network == MAINNET:
            chain_id = StarknetChainId.MAINNET
        else:
            raise NotImplementedError(
                "Empiric.BaseClient: Network not recognized, unknown Chain ID"
            )

        self.network = network
        self.chain_id = chain_id
        self.oracle_controller_address = oracle_controller_address
        self.oracle_controller_contract = None
        self.account_contract_address = account_contract_address
        self.account_contract = None

        assert type(account_private_key) == int, "Account private key must be integer"
        self.account_private_key = account_private_key

        self.signer = StarkCurveSigner(
            self.account_contract_address,
            KeyPair.from_private_key(self.account_private_key),
            self.chain_id,
        )

        self.client = GatewayClient(self.network)
        self.account_client = AccountClient(
            self.account_contract_address, self.client, self.signer
        )

    @abstractmethod
    async def _fetch_contracts(self):
        pass

    async def _fetch_base_contracts(self):
        if self.oracle_controller_contract is None:
            self.oracle_controller_contract = await Contract.from_address(
                self.oracle_controller_address,
                self.client,
            )

        if self.account_contract is None:
            self.account_contract = await Contract.from_address(
                self.account_contract_address, self.client
            )

    async def get_balance(self):
        return await self.account_client.get_balance()

    async def send_transaction(self, to_contract, selector_name, calldata):
        selector = get_selector_from_name(selector_name)
        return await self.send_transactions([Call(to_contract, selector, calldata)])

    async def send_transactions(self, calls):
        return hex((await self.account_client.execute(calls, auto_estimate=True)).hash)
