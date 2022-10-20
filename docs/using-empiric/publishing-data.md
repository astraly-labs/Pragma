# Publishing Data

Empiric makes publishing data easy because there is no off-chain infrastructure, so publishing only requires signing and timestamping data before sending it on-chain. All of this can be done with a simple, stateless node that costs a few dollars a month to run.&#x20;

Here is the step-by-step breakdown:

### 1. Clone the Empiric Network [GitHub repo](https://github.com/42labs/Empiric).

### 2. Install the dependencies (see [instructions](https://github.com/42labs/Empiric#setup)).

If you have trouble installing the fastecdsa dependency, try installing gmp with the command `brew install gmp` if you use Homebrew. For further troubleshooting, see this [thread](https://github.com/OpenZeppelin/nile/issues/22).

### 3. Generate your public-private key pair

Run the following code to generate keys on the STARK curve (save these someplace secure and safe):

```
from starkware.crypto.signature.signature import (
    get_random_private_key,
    private_to_stark_key,
)
private_key = get_random_private_key()
public_key = private_to_stark_key(private_key)

print(f'Private Key: {private_key}')
print(f'Public Key: {public_key}')
```

### 4. Deploy an account contract on StarkNet

Use the following commands to compile and deploy the account contract. If you'd prefer to deploy your own account contract (we use the OpenZeppelin account contract), you can [compile and deploy](https://starknet.io/docs/hello\_starknet/intro.html#compile-the-contract) your own contract instead. Make sure to replace `PUBLIC_KEY_FROM_STEP_3` in the second command with your \*public\* key from step 3.

```
starknet-compile --account_contract contracts/src/account/Account.cairo --abi contracts/build/Account_abi.json --output contracts/build/Account.json --cairo_path contracts/src:contracts/lib
starknet deploy --contract contracts/build/Account.json --inputs <PUBLIC_KEY_FROM_STEP_3> --no_wallet --network alpha-goerli
```

### 5. Register your account contract address with Empiric

Currently, publisher registration is permissioned while we create a robust ecosystem of publishers that will enable the transition to being a completely open network. During that initial phase, publishers send their publisher ID (the felt-encoded uppercased string, e.g. `str_to_felt("GEMINI")=78362974965321`) and account contract address to the Empiric team. Publishers should also publish their account contract address/public key online so that third parties can verify their identity with them directly.

### 6. Set up the data fetching logic

To simplify the process of setting up a publisher, we provide an optional Docker base image and a Python SDK which can make it easier to get started. The process to integrate usually takes an hour to half a day.

The initial publishing frequency for the oracle is every 3 minutes on Starknet Alpha-Goerli testnet, we expect to move to single-digit seconds as the network matures and value secured grows.

#### Using the Empiric Network Python SDK

See a full sample script [here](https://github.com/42labs/Empiric/blob/master/stagecoach/jobs/publishers/examples/publish\_all.py), or copy paste the code below to get started. Note that you need to set environment variables `PUBLISHER`, `PUBLISHER_ADDRESS`, and `PUBLISHER_PRIVATE_KEY` before running the code. You can use the sample `.env` file [here](https://github.com/42labs/Empiric/blob/master/stagecoach/jobs/publishers/examples/.env) to set them (the file does not include `PUBLISHER_PRIVATE_KEY` for obvious reasons).&#x20;

To make fetching data simple, create your own fetcher that implements the `PublisherInterfaceT`, see the fetcher template below or an example fetcher [here](https://github.com/42labs/Empiric/blob/0ad7b9c3eb5554e743bff423d2085d950b97b69f/empiric-package/empiric/publisher/fetchers/bitstamp.py).  You may also implement your own fetching logic however you want as long as it returns a `List[SpotEntry]`.

```python
import asyncio
import os
import time
from typing import Any, List

from aiohttp import ClientSession
from empiric.core.config import TESTNET_CONTRACTS
from empiric.core.entry import SpotEntry
from empiric.core.logger import get_stream_logger
from empiric.core.utils import currency_pair_to_pair_id, log_entry
from empiric.publisher.assets import EMPIRIC_ALL_ASSETS, EmpiricAsset
from empiric.publisher.client import EmpiricPublisherClient
from empiric.publisher.types import PublisherInterfaceT

logger = get_stream_logger()


class MyFetcher(PublisherInterfaceT):
    SOURCE = "SOURCE_NAME"  # the source of the data, identical to your publisher ID for 1st party publishers
    PUBLISHER = "PUBLISHER_NAME"  # your publisher ID

    def __init__(self, assets: List[EmpiricAsset], publisher):
        self.assets = assets
        
    # Use this if you have synchronous fetching logic, e.g. `requests.get()`
    def fetch_sync(self, *args, **kwargs): 
        ...

    # Use this for asynchronous fetching logic, e.g. `with session.get()`
    async def fetch(self, session: ClientSession) -> List[SpotEntry]:
        entries = []
        for asset in self.assets:
            # Use session to fetch data, here we hardcode for the example
            price = 10.0
            price_int = int(price * (10 ** asset["decimals"]))

            entries.append(
                SpotEntry(
                    timestamp=int(time.time()),
                    source=self.SOURCE,
                    publisher=self.PUBLISHER,
                    pair_id=currency_pair_to_pair_id("TEST", "USD"),
                    price=price_int,  # shifted 10 ** decimals; see above,
                    volume=0,
                )
            )
        return entries


# or you can fetch your data using any strategy or libraries you want
def fetch_entries(*args, **kwargs) -> List[SpotEntry]:
    return [
        SpotEntry(
            timestamp=int(time.time()),
            source="GEMINI",
            publisher="GEMINI",
            pair_id=currency_pair_to_pair_id("TEST", "USD"),
            price=price_int,  # shifted 10 ** decimals; see above,
            volume=0,
        )
    ]


async def publish_all(assets):
    publisher = os.environ.get("PUBLISHER")
    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"), 0)
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"), 0)
    publisher_client = EmpiricPublisherClient(
        account_private_key=publisher_private_key,
        account_contract_address=publisher_address,
        contract_addresses_config=TESTNET_CONTRACTS,
    )

    # you can use a custom fetcher to fetch using requests
    publisher_client.add_fetcher(MyFetcher(assets, publisher))
    _entries = await publisher_client.fetch()
    await publisher_client.publish_many(_entries)
    
    # or use your own custom logic
    _entries = await fetch_entries()
    await publisher_client.publish_many(_entries)

    logger.info("Publishing the following entries:")
    for entry in _entries:
        log_entry(entry, logger=logger)


if __name__ == "__main__":
    asyncio.run(publish_all(EMPIRIC_ALL_ASSETS))

```

**Docker Image**

In this setup, a Python script would fetch data (your custom logic) and then use the Empiric SDK to publish that data, similar to the script above. In order to deploy you can use the empiric-publisher Docker base image. The base image is available on [Dockerhub](https://hub.docker.com/r/42labs/empiric-publisher/tags) and comes with the Python and all requirements (including the empiric-network Python package) installed.

Again, note the `.env` file in that same [folder](https://github.com/42labs/Empiric/tree/master/stagecoach/jobs/publishers/examples) which is passed to Docker at run time via the `--env-file` arg, with `PUBLISHER` and `PUBLISHER_ADDRESS` variables set, as well as a `PUBLISHER_PRIVATE_KEY` variable (which is not in the repository for obvious reasons).

Alternatively, you can find an example of how to use the SDK in a serverless deployment (e.g. AWS Lambda).

```docker
FROM 42labs/empiric-publisher:1.0.0

COPY fetch-and-publish.py ./fetch-and-publish.py
CMD python fetch-and-publish.py
```
