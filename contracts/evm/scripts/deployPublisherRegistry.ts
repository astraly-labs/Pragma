import { ethers } from "hardhat";

const PUBLISHER_ADDRESS = process.env.PUBLISHER_ADDRESS!;

async function main() {
  const PublisherRegistry = await ethers.getContractFactory("PublisherRegistry");
  const publisherRegistryContract = await PublisherRegistry.deploy();

  const contractAddress = publisherRegistryContract.address;
  console.log(`PublisherRegistry was deployed to ${contractAddress}`);

  await publisherRegistryContract.addPublisher(
    ethers.utils.formatBytes32String('EMPIRIC'),
    PUBLISHER_ADDRESS,
  );
  console.log('added publisher');

  await publisherRegistryContract.addSourcesForPublisher(
    ethers.utils.formatBytes32String('EMPIRIC'),
    [
      ethers.utils.formatBytes32String('BITSTAMP'),
      ethers.utils.formatBytes32String('CEX'),
      ethers.utils.formatBytes32String('COINBASE'),
      ethers.utils.formatBytes32String('FTX'),
      ethers.utils.formatBytes32String('GEMINI'),
      ethers.utils.formatBytes32String('THEGRAPH'),
    ]
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
