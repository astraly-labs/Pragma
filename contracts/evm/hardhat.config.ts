import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-verify";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-web3";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const zkSyncDeploy =
  process.env.TEST_ENV === "local"
    ? {
        zkSyncNetwork: "http://localhost:3050",
        ethNetwork: "http://localhost:8545",
      }
    : {
        zkSyncNetwork: "https://testnet.era.zksync.dev",
        ethNetwork: process.env.GOERLI_RPC_URL || "",
      };

const config: HardhatUserConfig = {
  zksolc: {
    version: "1.3.9",
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },

  mocha: {
    timeout: 50000,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.19",
        settings: {
          optimizer: {
            enabled: true,
          },
        },
      },
    ],
  },
  paths: {
    sources: process.env.UNIT_TESTS
      ? "./contracts"
      : `./contracts/${process.env.DOMAIN || "l1"}`,
  },
  networks: {
    hardhat: {},
    zksyncTestnet: {
      zksync: true,
      url: zkSyncDeploy.zkSyncNetwork,
      ethNetwork: "goerli",
      allowUnlimitedContractSize: true,
      verifyURL:
        "https://zksync2-testnet-explorer.zksync.dev/contract_verification",
    },
    goerli: {
      url: zkSyncDeploy.ethNetwork,
      allowUnlimitedContractSize: true,
    },
  },
  defaultNetwork: "zksyncTestnet",
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_KEY ?? "",
    },
  },
};

export default config;
