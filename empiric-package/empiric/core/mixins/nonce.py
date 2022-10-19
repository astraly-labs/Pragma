from typing import Dict, Literal, Optional, Union

from starknet_py.net.client import Client
from starknet_py.net.client_models import TransactionReceipt, TransactionStatus


class NonceMixin:
    client: Client
    account_contract_address: Optional[int]
    nonce_status: Dict[int, TransactionStatus] = dict()
    nonce_dict: Dict[int, int] = dict()
    pending_nonce: Optional[int] = None

    async def _get_nonce(self) -> int:
        self.update_nonce_dict()
        self.cleanup_nonce_dict()

        if self.pending_nonce:
            return self.pending_nonce
        if self.nonce_status:
            return max(self.nonce_status) + 1

        latest_nonce = await self.get_nonce()
        return latest_nonce

    def cleanup_nonce_dict(self):
        nonce_seq = [
            x
            for x in self.nonce_dict
            if self.nonce_status[x]
            in [TransactionStatus.ACCEPTED_ON_L1, TransactionStatus.ACCEPTED_ON_L2]
        ]
        if nonce_seq:
            max_accepted = max(nonce_seq)
            for nonce in list(self.nonce_dict):
                if nonce <= max_accepted:
                    del self.nonce_dict[nonce]
                    if nonce in self.nonce_status:
                        del self.nonce_status[nonce]
            if self.pending_nonce and self.pending_nonce < max_accepted:
                self.pending_nonce = None

    async def track_nonce(
        self,
        nonce,
        transaction_hash,
    ):
        self.nonce_dict[nonce] = transaction_hash
        self.nonce_status[nonce] = await self.get_status(transaction_hash)

        nonce_min = min(self.nonce_dict)
        nonce_max = max(self.nonce_dict)
        for i in range(nonce_min, nonce_max + 1):
            if i not in self.nonce_dict:
                self.pending_nonce = i
                break

    async def update_nonce_dict(
        self,
    ):
        for nonce in list(self.nonce_dict):
            self.nonce_status[nonce] = await self.get_status(self.nonce_dict[nonce])
            if self.nonce_dict[nonce] in [
                TransactionStatus.REJECTED,
            ]:
                # assume all later transaction will fail because this nonce was skipped
                self.pending_nonce = nonce
                self.nonce_dict = {}
                self.nonce_status = {}
                return

    async def get_nonce(
        self,
        include_pending=True,
        block_number: Optional[Union[int, str, Literal["pending", "latest"]]] = None,
    ):
        if not block_number:
            block_number = "pending" if include_pending else "latest"

        nonce = await self.client.get_contract_nonce(
            self.account_contract_address,
            block_number,
        )
        return nonce

    async def get_status(
        self,
        transaction_hash: int,
    ) -> TransactionReceipt:
        receipt = await self.client.get_transaction_receipt(transaction_hash)
        return receipt.status
