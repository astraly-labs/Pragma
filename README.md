# Empiric Network

This is the repository for the zk-native Empiric Network Oracle, the leading oracle network on Starknet.

## About

You can read more about the Empiric Network [here](https://docs.empiric.network) and you can see the frontend in action [here](https://empiric.network).

### Overview

![Empiric Network Architecture](/assets/Empiric-Architecture.png)

The Empiric Network consists of three smart contracts. The first is the Proxy contract, which is the most static. This is designed to never be updated because it uses fallback functions to redirect any calls to its implementation contract (standard OpenZeppelin Proxy contract). This is the contract which protocols use, and the one to which publishers publish. The second is the Publisher Registry, which is also designed to be updated extremely infrequently because it's state should be permanent (each publisher and their address). The third is the Oracle implementation which contains the logic for storing and aggregating specific key/value data streams. The Oracle proxy forwards calls to the implementation, which can be updated when necessary, but must be updated in a backward compatible way.

### Deployed Contracts

The addresses of the deployed contracts can be found in the Empiric Network [documentation](https://docs.empiric.network/using-empiric/consuming-data).

## Setup

After you have cloned the repository, run the following commands to set up the repo:

1. `pip install -r requirements.txt`
2. `pip install -r dev-requirements.txt`
3. `pip install -e empiric-package`
4. `curl -L https://raw.githubusercontent.com/software-mansion/protostar/master/install.sh | bash`

# Usage

## Developing Contracts Locally

To ensure your IDE settings and contracts compile correctly, make sure to run any Empiric code after activating your Cairo virtual environment.

Then add this line of code to your shell profile:

`code () { VSCODE_CWD="$PWD" open -n -b "com.microsoft.VSCode" --args $* ;}`

After doing so, open all subsequent windows of the repo from the CLI, using the `code .` command, for correct formatting.

## Pulling Data Locally from Feeds in Deployed Contracts

Make sure you set the following environment variables to be able to interact with the deployed contract:

```bash
STARKNET_NETWORK=alpha-goerli
```

Then you can use the Starknet CLI to invoke the contract. For instance to get the price of ETH/USD first calculate the key by converting the string to the UTF-8 encoded felt `19514442401534788` (use `str_to_felt("ETH/USD")` util in `empiric.core.utils`). Then run the following commands, replacing `<ORACLE_PROXY_ADDRESS>` with the address of the Oracle Proxy contract (see above):

```bash
starknet call --address <ORACLE_PROXY_ADDRESS> --abi contracts/starknet/build/Oracle_abi.json --function get_spot_median --inputs 19514442401534788
```

## Publishing Data to a Feed in a Deployed Contract

The recommended way to publish data is to use the `empiric-publisher` Docker image which has the Empiric SDK baked in, which includes the most up to date contract addresses and the `EmpiricPublisherClient`. You just need to create a Python script that fetches the data and then publishes it via the `EmpiricPublisherClient.publish` method. See the setup in `sample-publisher/coinbase` for an example. With the setup there (and an additional file `.secrets.env` with the secret runtime args), we would just have to run:

```bash
docker build sample-publisher/coinbase/ -t coinbase
docker run --env-file sample-publisher/coinbase/.secrets.env coinbase
```

See the [full docs](https://docs.empiric.network/using-empiric/publishing-data) for details on how to publish data to Empiric.

## Running Tests

To run tests, simply run `pytest .` from the project root. Note: We are currently transitioning to using Protostar which will require you to run `protostar test ./contracts/starknet/test` to run the tests. As we transition, there will be an intermediate period where you are required to run both.

## Deploying Contracts

To deploy these contracts on Goerli testnet (e.g. to test behavior outside of the production contract), first create a private/public admin key pair for admin actions with both the publisher registry and the Oracle Proxy (use `get_random_private_key` and `private_to_stark_key` in `starkware.crypto.signature.signature`).

Then run the following commands, replacing `<ADMIN_PUBLIC_KEY>` with the public key you generated in the previous step. Replace `<ADMIN_ADDRESS>`, `<PUBLISHER_REGISTRY_ADDRESS>` and `<ORACLE_PROXY_ADDRESS>` with the addresses of the first, second and third contract deployed in the steps below, respectively. `<CURRENCIES>` and `<PAIRS>` should be replaced with the lists of currencies and pairs you want the contract to support.

```bash
export STARKNET_NETWORK=alpha-goerli
protostar build
cp contracts/starknet/build/Oracle_abi.json empiric-ui/src/abi/Oracle_abi.json
starknet deploy --contract contracts/starknet/build/Account_abi.json --inputs <ADMIN_PUBLIC_KEY>
starknet deploy --contract contracts/starknet/build/Account_abi.json --inputs <PUBLISHER_PUBLIC_KEY>
starknet deploy --contract contracts/starknet/build/PublisherRegistry_abi.json --inputs <ADMIN_ADDRESS>
starknet deploy --contract contracts/starknet/build/Oracle_abi.json --inputs <ADMIN_ADDRESS> <PUBLISHER_REGISTRY_ADDRESS> <CURRENCIES> <PAIRS>
```

# Release Flow

The release flow depends on which parts of the code base changed. Below is a mapping from which parts of the code base changed to how to release the updates.

## Contracts

Declare the new implementation's contract class and then update the proxy contract to refer to the new class hash.

## Empiric Package

To create a new version, just navigate into `empiric-package` and run `bumpversion <part>` (where `<part>` is major, minor or patch). Make sure to run `git push --tags` once you've done that.

This new version will be released automatically along with the Docker base image when a branch is merged to master.

## Empiric UI

Netlify will automatically deploy previews on push if a pull request is open and will redeploy the main website on merge to master.

## Empiric Publisher Docker Base Image

Run the following commands to build a new base image for empiric-publisher locally. Use the `latest` tag for testing:

```bash
docker build . -t astralylabs/empiric-publisher
docker push astralylabs/empiric-publisher:latest
```

empiric-publisher base images are versioned together with the Empiric Python package because when the Empiric package is updated, a new Docker image should always be released. If the Docker image needs to be updated for a reason other than a new Empiric package release, the release flow will overwrite the Empiric package. A new Docker image is automatically tagged with the appropriate version and pushed to Dockerhub by the GHA release flow, so no need to do this locally.
