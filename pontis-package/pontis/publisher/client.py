from pontis.core.base_client import PontisBaseClient

MAX_FEE = 0
DEFAULT_N_RETRIES = 3


class PontisPublisherClient(PontisBaseClient):
    def __init__(
        self,
        publisher_private_key,
        publisher_address,
        network=None,
        oracle_controller_address=None,
        max_fee=None,
        n_retries=None,
    ):

        n_retries = DEFAULT_N_RETRIES if n_retries is None else n_retries
        super().__init__(
            publisher_private_key,
            publisher_address,
            network,
            oracle_controller_address,
            max_fee,
            n_retries,
        )

    async def _fetch_contracts(self):
        self._fetch_base_contracts()

    async def publish(self, entry):
        await self._fetch_contracts()

        result = await self.send_transaction(
            self.oracle_controller_address, "submit_entry", [entry._asdict()]
        )
        print(f"Updated entry with transaction {result}")

        return result

    async def publish_many(self, entries):
        await self._fetch_contracts()

        result = await self.send_transaction(
            self.oracle_controller_address,
            "submit_many_entries",
            [entry._asdict() for entry in entries],
        )

        print(
            f"Successfully sent {len(entries)} updated entries  with transaction {result}"
        )

        return result
