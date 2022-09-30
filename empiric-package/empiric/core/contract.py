import asyncio
from typing import Callable, Optional

from starknet_py.contract import Contract as StarknetContract
from starknet_py.contract import ContractFunction, InvokeResult
from starknet_py.net.client_models import SentTransactionResponse, TransactionStatus
from starknet_py.transaction_exceptions import (
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

    transaction = await self._client.sign_invoke_transaction(
        calls=self,
        max_fee=self.max_fee,
        auto_estimate=auto_estimate,
        version=self.version,
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

    # don't return invoke result until it is received or errors
    await wait_for_received(self._client, invoke_result.hash)

    return invoke_result


async def wait_for_received(
    client,
    tx_hash,
    check_interval=3,
) -> (int, TransactionStatus):
    # pylint: disable=too-many-branches
    """
    Awaits for transaction to get accepted or at least pending by polling its status

    :param client: Account client
    :param tx_hash: Transaction's hash
    :param check_interval: Defines interval between checks
    :return: Tuple containing block number and transaction status
    """
    if check_interval <= 0:
        raise ValueError("check_interval has to bigger than 0.")

    first_run = True
    try:
        while True:
            result = await client.get_transaction_receipt(tx_hash=tx_hash)
            status = result.status

            if status in (
                TransactionStatus.ACCEPTED_ON_L1,
                TransactionStatus.ACCEPTED_ON_L2,
            ):
                return result.block_number, status
            if status == TransactionStatus.PENDING:
                return result.block_number, status
            elif status == TransactionStatus.REJECTED:
                raise TransactionRejectedError(
                    message=result.rejection_reason,
                )
            elif status == TransactionStatus.NOT_RECEIVED:
                if not first_run:
                    raise TransactionNotReceivedError()
            elif status != TransactionStatus.RECEIVED:
                # This will never get executed with current possible transactions statuses
                raise TransactionFailedError(
                    message=result.rejection_reason,
                )
            elif status == TransactionStatus.RECEIVED:
                return 0, 0

            first_run = False
            await asyncio.sleep(check_interval)
    except asyncio.CancelledError as exc:
        raise TransactionNotReceivedError from exc


# patch contract function to use new invoke function
ContractFunction.invoke = invoke_
