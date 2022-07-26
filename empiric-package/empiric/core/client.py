from empiric.core.const import NETWORK, ORACLE_CONTROLLER_ADDRESS
from empiric.core.utils import str_to_felt
from starknet_py.contract import Contract
from starknet_py.net.gateway_client import GatewayClient


class EmpiricClient:
    def __init__(self, network=None, oracle_controller_address=None):
        if network is None:
            network = NETWORK
        if oracle_controller_address is None:
            oracle_controller_address = ORACLE_CONTROLLER_ADDRESS

        self.network = network
        self.oracle_controller_address = oracle_controller_address
        self.oracle_controller_contract = None

    async def fetch_oracle_controller_contract(self):
        if self.oracle_controller_contract is None:
            self.oracle_controller_contract = await Contract.from_address(
                self.oracle_controller_address,
                GatewayClient(self.network),
            )

    async def get_decimals(self, key):
        await self.fetch_oracle_controller_contract()

        if type(key) == str:
            key = str_to_felt(key)
        elif type(key) != int:
            raise AssertionError(
                "Key must be string (will be converted to felt) or integer"
            )

        response = await self.oracle_controller_contract.functions["get_decimals"].call(
            key
        )

        return response.decimals

    async def get_value(self, key, aggregation_mode, sources=None):
        await self.fetch_oracle_controller_contract()

        if type(key) == str:
            key = str_to_felt(key)
        elif type(key) != int:
            raise AssertionError(
                "Key must be string (will be converted to felt) or integer"
            )
        if sources is None:
            response = await self.oracle_controller_contract.functions[
                "get_value"
            ].call(key, aggregation_mode)
        else:
            response = await self.oracle_controller_contract.functions[
                "get_value_for_sources"
            ].call(key, aggregation_mode, sources)

        return (
            response.value,
            response.decimals,
            response.last_updated_timestamp,
            response.num_sources_aggregated,
        )

    async def get_entries(self, key, sources=None):
        await self.fetch_oracle_controller_contract()

        if type(key) == str:
            key = str_to_felt(key)
        elif type(key) != int:
            raise AssertionError(
                "Key must be string (will be converted to felt) or integer"
            )
        if sources is None:
            sources = []

        response = await self.oracle_controller_contract.functions["get_entries"].call(
            key, sources
        )

        return response.entries
