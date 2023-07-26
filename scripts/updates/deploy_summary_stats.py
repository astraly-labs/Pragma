import asyncio
import os

from starknet_py.net.account.account import Account
from starknet_py.net.gateway_client import GatewayClient
from starknet_py.net.signer.stark_curve_signer import KeyPair, StarkCurveSigner
from starknet_py.net.models import StarknetChainId
from starknet_py.contract import Contract, ContractFunction

admin_contract_address = (
    # 0x029E7D00D0142EB684D6B010DDFE59348D892E5F8FF94F1B77CD372645DF4B77 # mainnet
    0x021D6F33C00D3657D7EC6F9322399729AFDF21533B77CF0512AC583B4755F011  # goerli
)
oracle_proxy_address = (
    # 0x0346c57f094d641ad94e43468628d8e9c574dcb2803ec372576ccc60a40be2c4 # mainnet
    0x446812BAC98C08190DEE8967180F4E3CDCD1DB9373CA269904ACB17F67F7093  # goerli
)

NETWORK = "testnet"
CHAIN_ID = StarknetChainId.TESTNET if NETWORK == "testnet" else StarknetChainId.MAINNET

async def main():
    admin_private_key = int(os.environ.get(f"ADMIN_PRIVATE_KEY_{NETWORK.upper()}"), 0)
    gateway = GatewayClient(net=NETWORK)
    signer = StarkCurveSigner(
        admin_contract_address,
        KeyPair.from_private_key(admin_private_key),
        CHAIN_ID,
    )

    admin = Account(address=admin_contract_address, client=gateway, signer=signer)

    # Deploy contract
    with open("build/SummaryStats.json", "r") as f:
        compiled_contract = f.read()

    declare_result = await Contract.declare(
        admin,
        compiled_contract=compiled_contract,
        max_fee=int(1e16)
    )
    await declare_result.wait_for_acceptance()

    deployment_result = await declare_result.deploy(
        constructor_args=[oracle_proxy_address],
        max_fee=int(1e16)
    )
    print(hex(deployment_result.hash))

    # you can wait for transaction to be accepted
    await deployment_result.wait_for_acceptance()

    # but you can access the deployed contract object even if has not been accepted yet
    contract = deployment_result.deployed_contract
    print(f"Deployed SummaryStats with address: {hex(contract.address)}")


if __name__ == "__main__":
    asyncio.run(main())
