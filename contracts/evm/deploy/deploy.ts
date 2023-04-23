import { Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

// load env file
import dotenv from "dotenv";
dotenv.config();

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
	console.log(`Running deploy script for Oracle`);

	// Initialize the wallet.
	const wallet = new Wallet(process.env.PRIVATE_KEY_ERA || "");

	// Create deployer object and load the artifact of the contract you want to deploy.
	const deployer = new Deployer(hre, wallet);
	const proxyAdmin = await deployer.loadArtifact("ProxyAdmin");
	const proxyAdminContract = await deployer.deploy(proxyAdmin, []);

	const publisherRegistry = await deployer.loadArtifact(
		"contracts/PublisherRegistry.sol:PublisherRegistry"
	);
	const publisherRegistryContract = await deployer.deploy(
		publisherRegistry,
		[]
	);

	console.log("publisherRegistryContract", publisherRegistryContract.address);

	const oracle = await deployer.loadArtifact("contracts/Oracle.sol:Oracle");
	const oracleContract = await deployer.deploy(oracle, []);

	console.log("oracleContract", oracleContract.address);

	const calldata = oracleContract.interface.encodeFunctionData("initialize", [
		publisherRegistryContract.address,
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

	const proxy = await deployer.loadArtifact(
		"@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol:TransparentUpgradeableProxy"
	);
	const proxyContract = await deployer.deploy(proxy, [
		oracleContract.address,
		proxyAdminContract.address,
		calldata,
	]);

	console.log("proxyContract", proxyContract.address);

	await publisherRegistryContract.addPublisher(
		ethers.utils.formatBytes32String("EMPIRIC"),
		wallet.address
	);

	await publisherRegistryContract.addSourcesForPublisher(
		ethers.utils.formatBytes32String("EMPIRIC"),
		[
			ethers.utils.formatBytes32String("BITSTAMP"),
			ethers.utils.formatBytes32String("DEFILLAMA"),
			ethers.utils.formatBytes32String("ASCENDEX"),
			ethers.utils.formatBytes32String("COINBASE"),
			ethers.utils.formatBytes32String("KAIKO"),
			ethers.utils.formatBytes32String("CEX"),
		]
	);
}
