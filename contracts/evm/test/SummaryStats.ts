import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { simpleDeploy } from "@makerdao/hardhat-utils";
import { expect } from "chai";
import { ethers } from "hardhat";
import {
	Oracle__factory,
	PublisherRegistry__factory,
  SummaryStats__factory,
	ProxyAdmin__factory,
	TransparentUpgradeableProxy__factory,
} from "../typechain-types";
describe("SummaryStats", function () {
  async function deployContractsFixture() {

    const timestampBefore = await time.latest();

		const [owner, otherAccount] = await ethers.getSigners();

		const admin = await simpleDeploy<ProxyAdmin__factory>("ProxyAdmin", []);

		const publisherRegistry = await simpleDeploy<PublisherRegistry__factory>(
			"PublisherRegistry",
			[]
		);

		const oracle = await simpleDeploy<Oracle__factory>("Oracle", []);
    

		const calldata = oracle.interface.encodeFunctionData("initialize", [
			publisherRegistry.address,
			[
				{
					id: ethers.utils.formatBytes32String("USD"),
					decimals: 8,
					isAbstractCurrency: true,
					ethereumAddress: ethers.constants.AddressZero,
				},
				{
					id: ethers.utils.formatBytes32String("ETH"),
					decimals: 18,
					isAbstractCurrency: true,
					ethereumAddress: ethers.constants.AddressZero,
				},
			],
			[
				{
					id: ethers.utils.formatBytes32String("ETH/USD"),
					quoteCurrencyId: ethers.utils.formatBytes32String("ETH"),
					baseCurrencyId: ethers.utils.formatBytes32String("USD"),
				},
			],
		]);

		const proxy = await simpleDeploy<TransparentUpgradeableProxy__factory>(
			"TransparentUpgradeableProxy",
			[oracle.address, admin.address, calldata]
		);

		const oracleProxy = oracle.attach(proxy.address);

		await publisherRegistry.addPublisher(
			ethers.utils.formatBytes32String("EMPIRIC"),
			owner.address
		);
		await publisherRegistry.addSourcesForPublisher(
			ethers.utils.formatBytes32String("EMPIRIC"),
			[
				ethers.utils.formatBytes32String("SOURCE1"),
				ethers.utils.formatBytes32String("SOURCE2"),
				ethers.utils.formatBytes32String("SOURCE3"),
				ethers.utils.formatBytes32String("SOURCE4"),
			]
		);

		return {
			publisherRegistry,
			oracle: oracleProxy,
			owner,
			otherAccount,
			timestampBefore,
		};
	}
   async function iteratePricesandTimes(timesArray : number[], pricesArray : number[], oracle : any, owner:any) {
    const timestampBefore = await time.latest();
    for (let i = 0; i < timesArray.length; i++) {
      await oracle.connect(owner).publishSpotEntry(
        {
          base: {
            timestamp: timesArray[i],
            source: ethers.utils.formatBytes32String('SOURCE1'),
            publisher: ethers.utils.formatBytes32String('EMPIRIC'),
          },
          pairId: ethers.utils.formatBytes32String('ETH/USD'),
          price: pricesArray[i],
          volume: 100000,
        }
      );
      
      await oracle.connect(owner).setCheckpoint(ethers.utils.formatBytes32String("ETH/USD"), "0");
      
    }
  }

	describe("Deployment", function () {
		// it("Should be able to provide spot prices", async function () {
		// 	const { timestampBefore, oracle, owner } = await loadFixture(
		// 		deployContractsFixture
		// 	);
		// 	await oracle.connect(owner).publishSpotEntry({
		// 		base: {
		// 			timestamp: timestampBefore + 60,
		// 			source: ethers.utils.formatBytes32String("SOURCE1"),
		// 			publisher: ethers.utils.formatBytes32String("EMPIRIC"),
		// 		},
		// 		pairId: ethers.utils.formatBytes32String("ETH/USD"),
		// 		price: 10000000000,
		// 		volume: 100000,
		// 	});
		// 	const response = await oracle.getSpot(
		// 		ethers.utils.formatBytes32String("ETH/USD"),
		// 		"0",
		// 		[
		// 			ethers.utils.formatBytes32String("SOURCE1"),
		// 			ethers.utils.formatBytes32String("SOURCE2"),
		// 		]
		// 	);
		// 	expect(response.numSourcesAggregated).to.equal(1);
		// 	await oracle.connect(owner).publishSpotEntry({
		// 		base: {
		// 			timestamp: timestampBefore + 60,
		// 			source: ethers.utils.formatBytes32String("SOURCE2"),
		// 			publisher: ethers.utils.formatBytes32String("EMPIRIC"),
		// 		},
		// 		pairId: ethers.utils.formatBytes32String("ETH/USD"),
		// 		price: 11000000000,
		// 		volume: 100000,
		// 	});
		// 	const response2 = await oracle.getSpot(
		// 		ethers.utils.formatBytes32String("ETH/USD"),
		// 		"0",
		// 		[
		// 			ethers.utils.formatBytes32String("SOURCE1"),
		// 			ethers.utils.formatBytes32String("SOURCE2"),
		// 		]
		// 	);
		// 	expect(response2.numSourcesAggregated).to.equal(2);
		// 	expect(response2.price).to.equal(10500000000);
		// });
    it ("Should be able to compute the volatity", async function () {
	const { timestampBefore, oracle, owner } = await loadFixture(deployContractsFixture);
      const timesArray : number[] = [];
      const pricesArray : number[] = [1930620000000,1929640000000,1929640000000,1930950000000,1930740000000,1930709999999,1930709999999];
      const numSamples : number = 4;
	  for (let i=0; i<pricesArray.length; i++){
		timesArray.push(1679425080 + 30*i);
	  }
      await iteratePricesandTimes(timesArray, pricesArray, oracle, owner);
	  const summaryStats = await simpleDeploy<SummaryStats__factory>("SummaryStats", [oracle.address]);
      const volatility1 = await summaryStats.calculateVolatility(ethers.utils.formatBytes32String("ETH/USD"),1679425080,1679425080+30*5, numSamples);
      console.log(volatility1);
    }
    )
	});

});
