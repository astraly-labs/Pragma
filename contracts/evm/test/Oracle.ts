import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Oracle", function () {
  async function deployContractsFixture() {
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const timestampBefore = await time.latest();

    const [owner, otherAccount] = await ethers.getSigners();

    const PublisherRegistry = await ethers.getContractFactory("PublisherRegistry");
    const publisherRegistry = await PublisherRegistry.deploy();

    const Oracle = await ethers.getContractFactory("Oracle");
    const oracle = await Oracle.deploy(
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
      }
      ],
      [{
        id: ethers.utils.formatBytes32String('ETH/USD'),
        quoteCurrencyId: ethers.utils.formatBytes32String('ETH'),
        baseCurrencyId: ethers.utils.formatBytes32String('USD'),
      }],
    );

    await publisherRegistry.addPublisher(
      ethers.utils.formatBytes32String('EMPIRIC'),
      owner.address,
    );
    await publisherRegistry.addSourcesForPublisher(
      ethers.utils.formatBytes32String('EMPIRIC'),
      [
        ethers.utils.formatBytes32String('source1'),
        ethers.utils.formatBytes32String('source2'),
        ethers.utils.formatBytes32String('source3'),
        ethers.utils.formatBytes32String('source4'),
      ]
    );

    return { publisherRegistry, oracle, owner, otherAccount, timestampBefore };
  }

  describe("Deployment", function () {
    it("Should be able to provide spot prices", async function () {
      const { timestampBefore, oracle, owner } = await loadFixture(deployContractsFixture);
      await oracle.connect(owner).publishSpotEntry(
        {
          base: {
            timestamp: timestampBefore + 60,
            source: ethers.utils.formatBytes32String('source1'),
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
          ethers.utils.formatBytes32String('source1'),
          ethers.utils.formatBytes32String('source2'),
        ]
      );
      expect(response.numSourcesAggregated).to.equal(1);
      await oracle.connect(owner).publishSpotEntry(
        {
          base: {
            timestamp: timestampBefore + 60,
            source: ethers.utils.formatBytes32String('source2'),
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
          ethers.utils.formatBytes32String('source1'),
          ethers.utils.formatBytes32String('source2'),
        ]
      );
      expect(response2.numSourcesAggregated).to.equal(2);
      expect(response2.price).to.equal(10500000000);
    });
  });
});
