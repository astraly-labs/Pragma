import logging
from typing import Any, Callable, List, Optional

from empiric.core.abis.randomness import RANDOMNESS_ABI
from empiric.core.contract import Contract
from starknet_py.contract import InvokeResult
from starknet_py.net.client import Client

logger = logging.getLogger(__name__)


class RandomnessMixin:
    client: Client
    randomness: Optional[Contract] = None
    track_nonce: Callable[Any, None] = None

    def init_randomness_contract(
        self,
        randomness_contract_address: int,
    ):
        self.randomness = Contract(
            randomness_contract_address,
            RANDOMNESS_ABI,
            self.client,
        )

    async def request_random(
        self,
        seed: int,
        callback_address: int,
        callback_gas_limit: int = 1000000,
        publish_delay: int = 1,
        num_words: int = 1,
        max_fee=int(1e16),
    ) -> InvokeResult:
        if not self.is_user_client:
            raise AttributeError(
                "Must set account.  You may do this by invoking self._setup_account_client(private_key, account_contract_address)"
            )
        invocation = await self.randomness.functions["request_random"].invoke(
            seed,
            callback_address,
            callback_gas_limit,
            publish_delay,
            num_words,
            callback=self.track_nonce,
            max_fee=max_fee,
        )
        return invocation

    async def submit_random(
        self,
        request_id: int,
        requestor_address: int,
        seed: int,
        callback_address: int,
        callback_gas_limit: int,  # =1000000
        minimum_block_number: int,
        random_words: List[int],  # List with 1 item
        block_hash: int,  # block hash of block
        proof: List[int],  # randomness proof
        max_fee=int(1e16),
    ) -> InvokeResult:
        if not self.is_user_client:
            raise AttributeError(
                "Must set account.  You may do this by invoking self._setup_account_client(private_key, account_contract_address)"
            )
        invocation = await self.randomness.functions["submit_random"].invoke(
            request_id,
            requestor_address,
            seed,
            callback_address,
            callback_gas_limit,
            minimum_block_number,
            random_words,
            block_hash,
            proof,
            callback=self.track_nonce,
            max_fee=max_fee,
        )
        return invocation

    async def get_request_status(
        self,
        caller_address: int,
        request_id: int,
    ):
        if not self.is_user_client:
            raise AttributeError(
                "Must set account.  You may do this by invoking self._setup_account_client(private_key, account_contract_address)"
            )
        invocation = await self.randomness.functions["get_request_status"].call(
            caller_address,
            request_id,
        )

        return invocation
