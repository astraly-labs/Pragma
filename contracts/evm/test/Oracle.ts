import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Oracle } from "../typechain-types";
import { OracleInterface } from "../typechain-types/Oracle";

describe("Oracle", function () {
  async function deployContractsFixture() {
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const timestampBefore = await time.latest();

    const [owner, otherAccount] = await ethers.getSigners();

    const Admin = await ethers.getContractFactory("ProxyAdmin");
    const admin = await Admin.deploy();

    const PublisherRegistry = await ethers.getContractFactory("PublisherRegistry");
    const publisherRegistry = await PublisherRegistry.deploy();

    const Oracle = await ethers.getContractFactory("Oracle");
    const oracle = await Oracle.deploy();
    const TransparentUpgradeableProxy = await ethers.getContractFactory("TransparentUpgradeableProxy");

    const fragment = Oracle.interface.getFunction("initialize");
    const data = Oracle.interface.encodeFunctionData(fragment, [
      publisherRegistry.address,
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
      }],
      [{
        id: ethers.utils.formatBytes32String('ETH/USD'),
        quoteCurrencyId: ethers.utils.formatBytes32String('ETH'),
        baseCurrencyId: ethers.utils.formatBytes32String('USD'),
      }]
    ]);

    const proxy = await TransparentUpgradeableProxy.deploy(oracle.address, admin.address, data);
    const oracleProxy = await Oracle.attach(proxy.address);

    await publisherRegistry.addPublisher(
      ethers.utils.formatBytes32String('EMPIRIC'),
      owner.address,
    );
    await publisherRegistry.addSourcesForPublisher(
      ethers.utils.formatBytes32String('EMPIRIC'),
      [
        ethers.utils.formatBytes32String('SOURCE1'),
        ethers.utils.formatBytes32String('SOURCE2'),
        ethers.utils.formatBytes32String('SOURCE3'),
        ethers.utils.formatBytes32String('SOURCE4'),
      ]
    );

    return { publisherRegistry, oracle: oracleProxy, owner, otherAccount, timestampBefore };
  }

  describe("Deployment", function () {
    it("Should be able to provide spot prices", async function () {
      const { timestampBefore, oracle, owner } = await loadFixture(deployContractsFixture);
      await oracle.connect(owner).publishSpotEntry(
        {
          base: {
            timestamp: timestampBefore + 60,
            source: ethers.utils.formatBytes32String('SOURCE1'),
            publisher: ethers.utils.formatBytes32String('EMPIRIC'),
          },
          pairId: ethers.utils.formatBytes32String('ETH/USD'),
          price: 10000000000,
          volume: 100000,
        }
      );
      const response = await oracle.getSpot(
        ethers.utils.formatBytes32String('ETH/USD'),
        ethers.BigNumber.from("0"),
        [
          ethers.utils.formatBytes32String('SOURCE1'),
          ethers.utils.formatBytes32String('SOURCE2'),
        ]
      );
      expect(response.numSourcesAggregated).to.equal(1);
      await oracle.connect(owner).publishSpotEntry(
        {
          base: {
            timestamp: timestampBefore + 60,
            source: ethers.utils.formatBytes32String('SOURCE2'),
            publisher: ethers.utils.formatBytes32String('EMPIRIC'),
          },
          pairId: ethers.utils.formatBytes32String('ETH/USD'),
          price: 11000000000,
          volume: 100000,
        }
      );
      const response2 = await oracle.getSpot(
        ethers.utils.formatBytes32String('ETH/USD'),
        ethers.BigNumber.from("0"),
        [
          ethers.utils.formatBytes32String('SOURCE1'),
          ethers.utils.formatBytes32String('SOURCE2'),
        ]
      );
      expect(response2.numSourcesAggregated).to.equal(2);
      expect(response2.price).to.equal(10500000000);
    });
  });
});
