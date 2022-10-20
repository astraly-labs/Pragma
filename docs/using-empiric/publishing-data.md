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

To make fetching data simple, implement your own fetching function using whatever libraries you want, as long as it returns a `List[SpotEntry]`.

```python
import asyncio
import logging
import os
import time
from typing import List

from empiric.core.config import TESTNET_CONTRACTS
from empiric.core.entry import SpotEntry
from empiric.core.utils import currency_pair_to_pair_id, log_entry
from empiric.publisher.assets import EMPIRIC_ALL_ASSETS, EmpiricAsset
from empiric.publisher.client import EmpiricPublisherClient

logger = logging.getLogger(__name__)


# you can fetch your data using any strategy or libraries you want
def fetch_entries(assets: List[EmpiricAsset], *args, **kwargs) -> List[SpotEntry]:
    entries = []
    for asset in assets:
        entries.append(
            SpotEntry(
                timestamp=int(time.time()),
                source="MY_SOURCE",
                publisher="MY_PUBLISHER",
                pair_id=currency_pair_to_pair_id("TEST", "USD"),
                price=10 * 10 ** asset["decimals"],  # shifted 10 ** decimals
                volume=0,
            )
        )
    return entries


async def publish_all(assets):
    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"), 0)
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"), 0)
    publisher_client = EmpiricPublisherClient(
        account_private_key=publisher_private_key,
        account_contract_address=publisher_address,
        contract_addresses_config=TESTNET_CONTRACTS,
    )

    # or use your own custom logic
    _entries = fetch_entries(assets)
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
FROM 42labs/empiric-publisher:1.0.1

COPY fetch-and-publish.py ./fetch-and-publish.py
CMD python fetch-and-publish.py
```
