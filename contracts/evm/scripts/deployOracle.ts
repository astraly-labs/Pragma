import { ethers } from "hardhat";

const PUBLISHER_REGISTRY_ADDRESS = process.env.PUBLISHER_REGISTRY_ADDRESS!;

async function main() {
  const ProxyAdmin = await ethers.getContractFactory("ProxyAdmin");
  const proxyAdmin = await ProxyAdmin.deploy();
  console.log(`ProxyAdmin was deployed to ${proxyAdmin.address}`);

  const Oracle = await ethers.getContractFactory("Oracle");
  const oracleContract = await Oracle.deploy();
  await oracleContract.deployed();

  const fragment = oracleContract.interface.getFunction("initialize") as any;
  const data = oracleContract.interface.encodeFunctionData(fragment, [
    PUBLISHER_REGISTRY_ADDRESS,
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

  const transparentUpgradeableProxy = await ethers.getContractFactory("TransparentUpgradeableProxy");
  const oracleProxy = await transparentUpgradeableProxy.deploy(
    oracleContract.address,
    proxyAdmin.address,
    data,
  );
  console.log(`TransparentUpgradeableProxy was deployed to ${oracleProxy.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
