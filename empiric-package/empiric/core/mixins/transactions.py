from empiric.core.contract import Contract
from starknet_py.net.client import Client
from starknet_py.net.client_models import Call
from starkware.starknet.public.abi import get_selector_from_name


class TransactionMixin:
    publisher_registry: Contract
    client: Client

    async def send_transaction(self, to_contract, selector_name, calldata) -> str:
        selector = get_selector_from_name(selector_name)
        return await self.send_transactions([Call(to_contract, selector, calldata)])

    async def send_transactions(self, calls) -> str:
        return hex(
            (await self.client.execute(calls, auto_estimate=True)).transaction_hash
        )
