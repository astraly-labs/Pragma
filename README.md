# Pontis Oracle

This is the repository for the Pontis Oracle on Starknet.

## About

You can read more about the Pontis Oracle [here](https://www.notion.so/Pontis-f5103d8ecc9d49a6844323819570c1b6).

The Oracle contract is deployed at 0x037f6eb00ae24c94e401ac729ca297727a19b8c85d5c7fc201452e892689b9b1.
(TODO: update with proxy contract address)

## Setup

After you have cloned the repository, run the following commands to set up the repo:
1. `pip install -r requirements.txt`
2. `pip install -e .`

## Usage

### Interacting with Deployed Contracts

Make sure you set the following environment variables to be able to interact with the deployed contract:
```
STARKNET_NETWORK=alpha-goerli
```

Then you can use the Starknet CLI to invoke the contract. For instance to get the price of USD/ETH first calculate the key by converting the string to the UTF-8 encoded felt `24016925336360008` (use `str_to_felt` util in `pontis.core.utils`). Then run the following commands, replacing `<ORACLE_ADDRESS>` with the address of the Oracle (see above):
```
starknet-compile contracts/Oracle.cairo --abi oracle_abi.json --output oracle_compiled.json
starknet call --address <ORACLE_ADDRESS> --abi oracle_abi.json --function get_price --inputs 24016925336360008
```

### Running Tests

To run tests, simply run `pytest .` from the project root.

### Deploying Contracts

To deploy this contract on Goerli testnet (e.g. to test behavior outside of the production contract), first create a private/public key pair that will be required to allow new publishers to register with the contract (use `get_random_private_key` and `private_to_stark_key` in `starkware.crypto.signature.signature`).

Then run the following commands, replacing `<PUBLIC_PUBLISHER_REGISTRATION_KEY>` with the public key you generated in the previous step.

```
export STARKNET_NETWORK=alpha-goerli
starknet-compile contracts/Oracle.cairo --abi oracle_abi.json --output oracle_compiled.json
starknet deploy --contract oracle_compiled.json --inputs <PUBLIC_PUBLISHER_REGISTRATION_KEY>
```

### Publishing a New Version

First, make sure to set the environmental variable `PYPI_API_TOKEN`.

To publish a new version, just run `bumpversion <part>` (where `<part>` is major, minor or patch). Then run `python3 -m build` to generate the distribution archives. Finally upload the new distribution with `twine upload dist/* -u __token__ -p $PYPI_API_TOKEN`.
