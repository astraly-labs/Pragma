import asyncio
import json
import os

import boto3
from web3 import Web3
import aiohttp

ACCOUNT_ADDRESSES = os.environ["ACCOUNT_ADDRESSES"]
SECRET_NAME = os.environ["SECRET_NAME"]

ORIGIN_CHAIN = os.environ["ORIGIN_CHAIN"]
DEST_CHAIN = os.environ["DEST_CHAIN"]
RPC_URL = os.environ["RPC_URL"]

API_URL = os.environ["API_URL"]


def handler(event, context):
    accounts = ACCOUNT_ADDRESSES.split(",")
    asyncio.run(_handler(accounts))
    return {
        "success": True,
    }


def _get_api_key():
    region_name = "eu-west-3"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(service_name="secretsmanager", region_name=region_name)
    get_secret_value_response = client.get_secret_value(SecretId=SECRET_NAME)
    return str(
        json.loads(get_secret_value_response["SecretString"])["HERODOTUS_API_KEY"]
    )


async def _handler(accounts):
    api_key = _get_api_key()

    # Get latest block on chain_id using web3py
    w3 = Web3(Web3.HTTPProvider(RPC_URL))
    latest_block_number = w3.eth.block_number

    for account in accounts:
        await _handle_account(account, latest_block_number, api_key)

    return


async def _handle_account(account, latest_block_number, api_key):
    # Send Proving request to Herodotus API_URL
    proving_request = {
        "originChain": ORIGIN_CHAIN,
        "destinationChain": DEST_CHAIN,
        "blockNumber": latest_block_number,
        "type": "ACCOUNT_ACCESS",
        "requestedProperties": {
            "ACCOUNT_ACCESS": {
                "account": account,
                "properties": ["nonce", "balance", "codeHash", "storageHash"],
            }
        },
    }

    proving_request_json = json.dumps(proving_request)
    if not api_key:
        print("API key not provided")
        return
    url = f"{API_URL}?apiKey={api_key}"
    async with aiohttp.ClientSession() as session:
        async with session.post(url, data=proving_request_json) as resp:
            response_json = await resp.json()
            proving_id = response_json["taskId"]
            print('Sent request with id: ', proving_id)

    # # Check request status
    # status = ""
    # while status != "FINALIZED":
    #     async with aiohttp.ClientSession() as session:
    #         async with session.get(
    #             url=f"{API_URL}/status/{proving_id}",
    #             params={"apiKey": api_key},
    #         ) as response:
    #             response_data = await response.json()
    #             status = response_data["taskStatus"]
    #             print(f'Current status: {status}')

    #     await asyncio.sleep(5)

    return


if __name__ == "__main__":
    handler(None, None)
