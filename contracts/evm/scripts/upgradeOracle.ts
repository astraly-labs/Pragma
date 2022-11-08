import { ethers } from "hardhat";

async function main() {
  const proxyAdmin = await ethers.getContractAt("ProxyAdmin", "0x18cfa9cfe58821a69e3a36f561019ed4225c4698");
  const Oracle = await ethers.getContractFactory("Oracle");
  const oracleContract = await Oracle.deploy();
  await oracleContract.deployed();

  await proxyAdmin.upgrade("0x8bB539897994476bc99f4F33C267AAEE4cf4325B", oracleContract.address);
  console.log("ORACLE ADDRESS:", oracleContract.address);
  // const oracle = await ethers.getContractAt("Oracle", "0x8bB539897994476bc99f4F33C267AAEE4cf4325B");
  // console.log(
  //   await oracle.volatility(ethers.utils.formatBytes32String('ETH/USD'),
  //     1667419459,
  //     0,
  //     100,
  //   )
  // );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
