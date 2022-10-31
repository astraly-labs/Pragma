import { ethers } from "hardhat";
import { Wallet } from "zksync-web3";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

// update this to the publisher address you want to use
const PUBLISHER_ADDRESS = "0x8e0694057A1d313355887639fCDB1e1a128D44BC";

export default async function (hre: HardhatRuntimeEnvironment) {
  // Initialize the wallet.
  const wallet = new Wallet(process.env.PRIVATE_KEY!);

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("PublisherRegistry");
  const publisherRegistryContract = await deployer.deploy(artifact, []);

  const contractAddress = publisherRegistryContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);

  await publisherRegistryContract.addPublisher(
    ethers.utils.formatBytes32String('EMPIRIC'),
    PUBLISHER_ADDRESS,
  );

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
