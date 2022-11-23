import asyncio
import os

from empiric.core import Currency, Pair
from empiric.core.client import EmpiricClient
from starknet_py.contract import Contract, ContractFunction

admin_contract_address = (
    0x029E7D00D0142EB684D6B010DDFE59348D892E5F8FF94F1B77CD372645DF4B77
)
publisher_registry_address = (
    0x04746485FA57B49DC992C35D7F12054B5A7D24B0E187021CD8F40BC2517700BC
)
currencies = [
    Currency("USD", 8, 1, 0, 0),
    Currency(
        "BTC",
        18,
        0,
        0x03FE2B97C1FD336E750087D68B9B867997FD64A2661FF3CA5A7C771641E8E7AC,
        0x2260FAC5E5542A773AA44FBCFEDF7C193BC2C599,
    ),
    Currency(
        "ETH",
        18,
        0,
        0x049D36570D4E46F48E99674BD3FCC84644DDD6B96F7C741B1562B82F9E004DC7,
        0x0000000000000000000000000000000000000000,
    ),
    Currency(
        "USDC",
        6,
        0,
        0x053C91253BC9682C04929CA02ED00B3E423F6710D2EE7E0D5EBB06F3ECF368A8,
        0xA0B86991C6218B36C1D19D4A2E9EB0CE3606EB48,
    ),
    Currency(
        "USDT",
        6,
        0,
        0x068F5C6A61780768455DE69077E07E89787839BF8166DECFBF92B645209C0FB8,
        0xDAC17F958D2EE523A2206206994597C13D831EC7,
    ),
    Currency(
        "DAI",
        18,
        0,
        0x001108CDBE5D82737B9057590ADAF97D34E74B5452F0628161D237746B6FE69E,
        0x6B175474E89094C44DA98B954EEDEAC495271D0F,
    ),
]
pairs = [
    Pair("ETH/USD", "ETH", "USD"),
    Pair("BTC/USD", "BTC", "USD"),
    Pair("USDC/USD", "USDC", "USD"),
    Pair("USDT/USD", "USDT", "USD"),
    Pair("DAI/USD", "DAI", "USD"),
]


async def main():
    admin_private_key = int(os.environ.get("ADMIN_PRIVATE_KEY"), 0)
    admin_client = EmpiricClient(
        network="mainnet",
        account_private_key=admin_private_key,
        account_contract_address=admin_contract_address,
    )
    token = os.environ.get("STARKNET_DEPLOY_TOKEN")
    declared_contract_class_hash = (
        2941673184093146268702167922653141142200218741213082327867231946079057827173
    )
    if declared_contract_class_hash is None:
        # Declare implementation
        with open("Oracle.json", "r") as f:
            compiled_contract = f.read()
        declare_transaction = await admin_client.client.sign_declare_transaction(
            compiled_contract=compiled_contract, max_fee=int(1e16)
        )

        # To declare a contract, send Declare transaction with AccountClient.declare method
        resp = await admin_client.client.client.declare(
            transaction=declare_transaction, token=token
        )
        print(hex(resp.transaction_hash))
        breakpoint()
        await admin_client.client.client.wait_for_tx(resp.transaction_hash)

        declared_contract_class_hash = resp.class_hash

    # Deploy proxy
    selector = ContractFunction.get_selector("initializer")
    calldata = [admin_contract_address, publisher_registry_address, len(currencies)]
    for currency in currencies:
        calldata.extend(currency.serialize())
    calldata.append(len(pairs))
    for pair in pairs:
        calldata.extend(pair.serialize())
    constructor_args = [declared_contract_class_hash, selector, calldata]
    with open("contracts/starknet/build/Proxy.json", "r") as f:
        compiled_contract = f.read()
    breakpoint()
    deployment_result = await Contract.deploy(
        admin_client.client,
        compiled_contract=compiled_contract,
        constructor_args=constructor_args,
        token=token,
    )
    print(hex(deployment_result.hash))

    # you can wait for transaction to be accepted
    await deployment_result.wait_for_acceptance()

    # but you can access the deployed contract object even if has not been accepted yet
    contract = deployment_result.deployed_contract
    print(f"Deployed oracle proxy with address: {hex(contract.address)}")


if __name__ == "__main__":
    asyncio.run(main())
