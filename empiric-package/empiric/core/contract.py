import asyncio
from typing import Callable, Optional

from starknet_py.contract import Contract as StarknetContract
from starknet_py.contract import ContractFunction, InvokeResult
from starknet_py.net.client_models import SentTransactionResponse, TransactionStatus
from starknet_py.transaction_errors import (
    TransactionFailedError,
    TransactionNotReceivedError,
    TransactionRejectedError,
)


class Contract(StarknetContract):
    def __getattr__(self, attr):
        if attr in self._functions:
            return self._functions[attr]
        elif attr in dir(self):
            return getattr(self, attr)
        else:
            raise AttributeError("Invalid Attribute")


async def invoke_(
    self,
    *args,
    max_fee: Optional[int] = None,
    auto_estimate: bool = False,
    callback: Optional[Callable[[SentTransactionResponse], None]] = None,
    **kwargs,
) -> InvokeResult:
    """
    Allows for a callback in the invocation of a contract method.
    This is useful for tracking the nonce changes
    """
    prepared_call = self.prepare(*args, **kwargs)

    # transfer ownership to the prepared call
    self = prepared_call
    if max_fee is not None:
        self.max_fee = max_fee

    transaction = await self._account.sign_invoke_transaction(
        calls=self,
        max_fee=self.max_fee,
        auto_estimate=auto_estimate,
    )
    response = await self._client.send_transaction(transaction)

    if callback:
        await callback(transaction.nonce, response.transaction_hash)

    invoke_result = InvokeResult(
        hash=response.transaction_hash,
        _client=self._client,
        contract=self._contract_data,
        invoke_transaction=transaction,
    )

    await asyncio.sleep(3)

    # don't return invoke result until it is received or errors
    await self._client.wait_for_tx(invoke_result.hash)

    return invoke_result

# patch contract function to use new invoke function
ContractFunction.invoke = invoke_
