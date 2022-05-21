from nile.signer import Signer
from pontis.core.const import NETWORK, ORACLE_CONTROLLER_ADDRESS
from starknet_py.contract import Contract
from starknet_py.net import Client

MAX_FEE = 0


class PontisBaseClient:
    def __init__(
        self,
        account_private_key,
        account_contract_address,
        network=None,
        oracle_controller_address=None,
        max_fee=None,
        n_retries=None,
    ):
        if network is None:
            network = NETWORK
        if oracle_controller_address is None:
            oracle_controller_address = ORACLE_CONTROLLER_ADDRESS

        self.network = network
        self.oracle_controller_address = oracle_controller_address
        self.oracle_controller_contract = None
        self.account_contract_address = account_contract_address
        self.account_contract = None

        assert type(account_private_key) == int, "Account private key must be integer"
        self.admin_private_key = account_private_key
        self.signer = Signer(self.admin_private_key)

        self.max_fee = MAX_FEE if max_fee is None else max_fee
        self.n_retries = n_retries

    async def _fetch_base_contracts(self):
        if self.oracle_controller_contract is None:
            self.oracle_controller_contract = await Contract.from_address(
                self.oracle_controller_address,
                Client(self.network, n_retries=self.n_retries),
            )

        if self.account_contract is None:
            self.account_contract = await Contract.from_address(
                self.account_contract_address, Client(self.network)
            )

    async def send_transaction(self, to, selector_name, calldata):
        return await self.send_transactions([(to, selector_name, calldata)])

    async def send_transactions(self, calls):
        await self._fetch_contracts()

        execution_info = await self.account_contract.get_nonce().call()
        (nonce,) = execution_info.result

        build_calls = []
        for call in calls:
            build_call = list(call)
            build_call[0] = hex(build_call[0])
            build_calls.append(build_call)

        (call_array, calldata, sig_r, sig_s) = self.signer.sign_transaction(
            hex(self.account_contract.contract_address),
            build_calls,
            nonce,
            self.max_fee,
        )
        return await self.account_contract.__execute__(
            call_array, calldata, nonce
        ).invoke(signature=[sig_r, sig_s])
