import { ethers } from "hardhat";
import { Wallet } from "zksync-web3";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

const publisherRegistryAddress = '0x78C1C337B3BfB80896ae407528690243612102F8';

export default async function (hre: HardhatRuntimeEnvironment) {
  // Initialize the wallet.
  const wallet = new Wallet(process.env.PRIVATE_KEY!);

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);
  const adminArtifact = await deployer.loadArtifact("ProxyAdmin");
  const admin = await deployer.deploy(adminArtifact, []);
  console.log(`${adminArtifact.contractName} was deployed to ${admin.address}`);

  const artifact = await deployer.loadArtifact("Oracle");
  const oracleContract = await deployer.deploy(artifact, []);
  const fragment = oracleContract.interface.getFunction("initialize");
  const data = oracleContract.interface.encodeFunctionData(fragment, [
    publisherRegistryAddress,
    [{
      id: ethers.utils.formatBytes32String('USD'),
      decimals: 8,
      isAbstractCurrency: true,
      ethereumAddress: ethers.constants.AddressZero,
    },
    {
      id: ethers.utils.formatBytes32String('ETH'),
      decimals: 18,
      isAbstractCurrency: true,
      ethereumAddress: ethers.constants.AddressZero,
    },
    {
      id: ethers.utils.formatBytes32String('EUR'),
      decimals: 8,
      isAbstractCurrency: true,
      ethereumAddress: ethers.constants.AddressZero,
    },
    {
      id: ethers.utils.formatBytes32String('BTC'),
      decimals: 18,
      isAbstractCurrency: true,
      ethereumAddress: ethers.constants.AddressZero,
    },
    {
      id: ethers.utils.formatBytes32String('BNB'),
      decimals: 18,
      isAbstractCurrency: true,
      ethereumAddress: ethers.constants.AddressZero,
    },
    {
      id: ethers.utils.formatBytes32String('MATIC'),
      decimals: 18,
      isAbstractCurrency: true,
      ethereumAddress: ethers.constants.AddressZero,
    },
    {
      id: ethers.utils.formatBytes32String('AAVE'),
      decimals: 18,
      isAbstractCurrency: true,
      ethereumAddress: ethers.constants.AddressZero,
    },
    {
      id: ethers.utils.formatBytes32String('USDT'),
      decimals: 6,
      isAbstractCurrency: true,
      ethereumAddress: ethers.constants.AddressZero,
    },
    {
      id: ethers.utils.formatBytes32String('USDC'),
      decimals: 6,
      isAbstractCurrency: true,
      ethereumAddress: ethers.constants.AddressZero,
    },
    {
      id: ethers.utils.formatBytes32String('DAI'),
      decimals: 18,
      isAbstractCurrency: true,
      ethereumAddress: ethers.constants.AddressZero,
    },
    ],
    [{
      id: ethers.utils.formatBytes32String('ETH/USD'),
      quoteCurrencyId: ethers.utils.formatBytes32String('ETH'),
      baseCurrencyId: ethers.utils.formatBytes32String('USD'),
    }, {
      id: ethers.utils.formatBytes32String('BTC/EUR'),
      quoteCurrencyId: ethers.utils.formatBytes32String('BTC'),
      baseCurrencyId: ethers.utils.formatBytes32String('EUR'),
    }, {
      id: ethers.utils.formatBytes32String('BTC/USD'),
      quoteCurrencyId: ethers.utils.formatBytes32String('BTC'),
      baseCurrencyId: ethers.utils.formatBytes32String('USD'),
    }, {
      id: ethers.utils.formatBytes32String('BNB/USD'),
      quoteCurrencyId: ethers.utils.formatBytes32String('BNB'),
      baseCurrencyId: ethers.utils.formatBytes32String('USD'),
    }, {
      id: ethers.utils.formatBytes32String('AAVE/USD'),
      quoteCurrencyId: ethers.utils.formatBytes32String('AAVE'),
      baseCurrencyId: ethers.utils.formatBytes32String('USD'),
    }, {
      id: ethers.utils.formatBytes32String('MATIC/USD'),
      quoteCurrencyId: ethers.utils.formatBytes32String('MATIC'),
      baseCurrencyId: ethers.utils.formatBytes32String('USD'),
    }, {
      id: ethers.utils.formatBytes32String('USDC/USD'),
      quoteCurrencyId: ethers.utils.formatBytes32String('USDC'),
      baseCurrencyId: ethers.utils.formatBytes32String('USD'),
    }, {
      id: ethers.utils.formatBytes32String('USDT/USD'),
      quoteCurrencyId: ethers.utils.formatBytes32String('USDT'),
      baseCurrencyId: ethers.utils.formatBytes32String('USD'),
    }, {
      id: ethers.utils.formatBytes32String('DAI/USD'),
      quoteCurrencyId: ethers.utils.formatBytes32String('DAI'),
      baseCurrencyId: ethers.utils.formatBytes32String('USD'),
    },
    ],
  ]);

  const proxyArtifact = await deployer.loadArtifact("TransparentUpgradeableProxy");
  const oracleProxy = await deployer.deploy(proxyArtifact, [
    oracleContract.address,
    admin.address,
    data,
  ]);
  console.log(`${proxyArtifact.contractName} was deployed to ${oracleProxy.address}`);
  const _oracle = oracleContract.attach(oracleProxy.address);

  // await oracle.publishSpotEntry(
  //   {
  //     base: {
  //       timestamp: Math.floor(Date.now() / 1000),
  //       source: ethers.utils.formatBytes32String('CEX'),
  //       publisher: ethers.utils.formatBytes32String('EMPIRIC'),
  //     },
  //     pairId: ethers.utils.formatBytes32String('ETH/USD'),
  //     price: 132688000000,
  //     volume: 0,
  //   }
  // );
}
