import time
from abc import ABC, abstractmethod
from typing import Optional

from empiric.core.config import IConfig, get_config
from empiric.core.types import ADDRESS, HEX_STR, TESTNET, Network
from starknet_py.contract import Contract
from starknet_py.net import AccountClient
from starknet_py.net.client_models import Call
from starknet_py.net.gateway_client import GatewayClient
from starknet_py.net.signer.stark_curve_signer import KeyPair, StarkCurveSigner
from starkware.starknet.public.abi import get_selector_from_name


class EmpiricAccountClient(AccountClient):
    async def _get_nonce(self) -> int:
        return int(time.time())


class EmpiricBaseClient(ABC):
    account_client: AccountClient
    client: GatewayClient
    config: IConfig
    account_contract_address: ADDRESS
    oracle_controller_address: ADDRESS
    account_private_key: int
    signer: StarkCurveSigner
    oracle_controller_contract: Optional[ADDRESS]
    account_contract: Optional[ADDRESS]

    def __init__(
        self,
        account_private_key: ADDRESS,
        account_contract_address: ADDRESS,
        network: Network = TESTNET,
        oracle_controller_address: Optional[ADDRESS] = None,
    ):
        raw_config = get_config(network)
        self.config = raw_config()

        self.account_contract_address = account_contract_address
        self.oracle_controller_address = (
            oracle_controller_address or self.config.ORACLE_CONTROLLER_ADDRESS
        )

        self.oracle_controller_contract = None
        self.account_contract = None

        if not isinstance(account_private_key, int):
            raise ValueError("Account private key must be an int")
        self.account_private_key = account_private_key

        self.signer = StarkCurveSigner(
            self.account_contract_address,
            KeyPair.from_private_key(self.account_private_key),
            self.config.CHAIN_ID,
        )

        self.client = GatewayClient(self.config.NETWORK, self.config.CHAIN_ID)
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

    async def get_balance(self) -> int:
        return await self.account_client.get_balance()

    async def send_transaction(self, to_contract, selector_name, calldata) -> HEX_STR:
        selector = get_selector_from_name(selector_name)
        return await self.send_transactions([Call(to_contract, selector, calldata)])

    async def send_transactions(self, calls) -> HEX_STR:
        return hex((await self.account_client.execute(calls, auto_estimate=True)).hash)
