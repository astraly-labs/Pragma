# Empiric Network

This is the repository for the zk-native Empiric Network Oracle, which is already live on Starknet.

## About

You can read more about the Empiric Network [here](https://docs.empiric.network) and you can see the frontend in action [here](https://empiric.network).

### Overview

![Empiric Network Architecture](/assets/Empiric-Architecture.png)

The Empiric Network consists of three smart contracts. The first is the Proxy contract, which is the most static. This is designed to never be updated because it uses fallback functions to redirect any calls to its implementation contract (standard OpenZeppelin Proxy contract). This is the contract which protocols use, and the one to which publishers publish. The second is the Publisher Registry, which is also designed to be updated extremely infrequently because it's state should be permanent (each publisher and their address). The third is the Oracle which contains the logic for storing and aggregating specific key/value data streams. The Oracle can be updated when necessary, but must be updated in a backward compatible way.

### Deployed Contracts

On testnet, the contracts are deployed at the following addresses:
| Contract | Starkscan | Address |
| --- | ----------- | --- |
| Publisher Registry | [Link](https://testnet.starkscan.co/contract/0x06debea885f954b1090a8b2194b940cceb585d35cd3e8a5ab1874a9360c8c1b8) | 0x6debea885f954b1090a8b2194b940cceb585d35cd3e8a5ab1874a9360c8c1b8 |
| Oracle (Proxy) | [Link](https://testnet.starkscan.co/contract/0x40749e84da5270ee2ccf3c290b985c678b86f0e97f60910bb027ed97f6b101f) | 0x40749e84da5270ee2ccf3c290b985c678b86f0e97f60910bb027ed97f6b101f |

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

```code () { VSCODE_CWD="$PWD" open -n -b "com.microsoft.VSCode" --args $* ;}```

After doing so, open all subsequent windows of the repo from the CLI, using the `code .` command, for correct formatting.

## Pulling Data Locally from Feeds in Deployed Contracts

Make sure you set the following environment variables to be able to interact with the deployed contract:

```bash
STARKNET_NETWORK=alpha-goerli
```

Then you can use the Starknet CLI to invoke the contract. For instance to get the price of ETH/USD first calculate the key by converting the string to the UTF-8 encoded felt `28556963469423460` (use `str_to_felt("eth/usd")` util in `empiric.core.utils`). Then run the following commands, replacing `<ORACLE_PROXY_ADDRESS>` with the address of the Oracle Proxy contract (see above):

```bash
starknet call --address <ORACLE_PROXY_ADDRESS> --abi contracts/abi/Oracle.json --function get_value --inputs 19514442401534788
```

## Publishing Data to a Feed in a Deployed Contract

The recommended way to publish data is to use the `empiric-publisher` Docker image which has the Empiric SDK baked in, which includes the most up to date contract addresses and the `EmpiricPublisherClient`. You just need to create a Python script that fetches the data and then publishes it via the `EmpiricPublisherClient.publish` method. See the setup in `sample-publisher/coinbase` for an example. With the setup there (and an additional file `.secrets.env` with the secret runtime args), we would just have to run:

```bash
docker build sample-publisher/coinbase/ -t coinbase
docker run --env-file sample-publisher/coinbase/.secrets.env coinbase
```

## Running Tests

To run tests, simply run `pytest .` from the project root.

## Deploying Contracts

To deploy these contracts on Goerli testnet (e.g. to test behavior outside of the production contract), first create a private/public admin key pair for admin actions with both the publisher registry and the Oracle Proxy (use `get_random_private_key` and `private_to_stark_key` in `starkware.crypto.signature.signature`).

Then run the following commands, replacing `<ADMIN_PUBLIC_KEY>` with the public key you generated in the previous step. Replace `<ADMIN_ADDRESS>`, `<PUBLISHER_REGISTRY_ADDRESS>` and `<ORACLE_PROXY_ADDRESS>` with the addresses of the first, second and third contract deployed in the steps below, respectively.

```bash
export STARKNET_NETWORK=alpha-goerli
protostar build
cp contracts/starknet/build/OracleController_abi.json empiric-ui/src/abi/OracleController.json
starknet deploy --contract contracts/starknet/build/Account.json --inputs <ADMIN_PUBLIC_KEY>
starknet deploy --contract contracts/starknet/build/Account.json --inputs <PUBLISHER_PUBLIC_KEY>
starknet deploy --contract contracts/starknet/build/PublisherRegistry.json --inputs <ADMIN_ADDRESS>
starknet deploy --contract contracts/starknet/build/OracleController.json --inputs <ADMIN_ADDRESS> <PUBLISHER_REGISTRY_ADDRESS> <KEY_DECIMALS>
starknet deploy --contract contracts/starknet/build/OracleImplementation.json --inputs <ORACLE_PROXY_ADDRESS>
TODO: Update for proxy
```

Finally, you must add the Oracle Implementation to the Controller. You can use the `add_oracle_implementation` method of the `EmpiricAdminClient` class in `empiric.admin.client`. For instance, after replacing `<ORACLE_IMPLEMENTATION_ADDRESS>` with the actual address you would run the `add_oracle_implementation.py` script in sample-publisher/utils. After replacing the Publisher Registry, run the `register_all_publishers.py` in the same location.

# Release Flow

The release flow depends on which parts of the code base changed. Below is a mapping from which parts of the code base changed to how to release the updates.

## Contracts

First, compile and then redeploy the contract(s) that have changed. See the section above "Deploying Contracts" for details.

Then, depending on which contracts were redeployed, you have to take further steps:

- If it was merely the oracle implementation contract that was updated, add it to the Oracle Controller's oracle implementations so that it can run in shadow mode. Finally, you need to set that oracle implementation as the primary one by using the `set_primary_oracle` method of the `EmpiricAdminClient` class in `empiric.admin.client`.
- If oracle registry is updated, you will first have to pull existing publishers and keys and write them to the new publisher registry. It is probably easiest to do this off-chain, by using the getter functions on the old publisher registry and then using the admin key to effectively re-register all the publishers in the new register. You must also update the `PUBLISHER_REGISTRY_ADDRESS` variable in `empiric.core.config` and then follow the steps to release a new version of the Empiric package. Finally, you'll have to update the Oracle Controller's Publisher Registry address which you can do using the `update_publisher_registry_address` method of the `EmpiricAdminClient` class in `empiric.admin.client`.
- Finally, if the Oracle Controller is updated, you'll have to update the address in empiric-package (`empiric.core.config`), in this README (above), in the sample consumer (`contracts/sample_consumer/SampleConsumer.cairo`) and in empiric-ui (`src/services/address.service.ts`). Then you'll have to follow the release processes for those components. Finally, make sure to coordinate with protocols to update their references.

## Empiric Package

To create a new version, just navigate into `empiric-package` and run `bumpversion <part>` (where `<part>` is major, minor or patch). Make sure to run `git push --tags` once you've done that.

This new version will be released automatically along with the Docker base image when a branch is merged to master.

## Empiric UI

Netlify will automatically deploy previews on push if a pull request is open and will redeploy the main website on merge to master.

## Empiric Publisher Docker Base Image

Run the following commands to build a new base image for empiric-publisher locally. Use the `latest` tag for testing:

```bash
docker build . -t 42labs/empiric-publisher
docker push 42labs/empiric-publisher:latest
```

empiric-publisher base images are versioned together with the Empiric Python package because when the Empiric package is updated, a new Docker image should always be released. If the Docker image needs to be updated for a reason other than a new Empiric package release, the release flow will overwrite the Empiric package. A new Docker image is automatically tagged with the appropriate version and pushed to Dockerhub by the GHA release flow, so no need to do this locally.

## Sample Publisher

If your changes involve changes to the fetching and publishing code, navigate to `publisher/manage-deployment` and run `scp -i LightsailDefaultKey-us-east-2.pem -r ../sample-publisher/all ubuntu@<IP_ADDRESS>:` to copy over the code again, where `IP_ADDRESS` is the IP address of the Lightsail instance. The existing instance will automatically rebuild the docker image using that new code.

If your changes are to the cron command, it is easiest to ssh into the instance and edit the cron command there directtly using `crontab -e`.

# Staging Environment

## Separate Environment

We have a staging environment set up in order to be able to test our code without affecting the production environment.

On testnet, the staging contracts are deployed at the following addresses:
| Contract | Voyager | Address |
| --- | ----------- | --- |
| PublisherRegistry | [Link](https://goerli.voyager.online/contract/0x051949605ab53fcc2c0adc1d53a72dd0fbcbf83e52399a8b05552f675b1db4e9) | 0x051949605ab53fcc2c0adc1d53a72dd0fbcbf83e52399a8b05552f675b1db4e9 |
| Proxy | [Link](https://goerli.voyager.online/contract/TODO) | TODO |
| Oracle | [Link](https://goerli.voyager.online/contract/TODO) | TODO |

The admin contract is identical to the one used in production. Staging has a separate Publisher Registry, so accounts registered in production will not be registered there. The Empiric publisher account that is registered is located at 3251373723367219268498787183941698604007480963314075130334762142902855469511.

The main part of our CI setup that uses the staging environment is the update prices GHA.
