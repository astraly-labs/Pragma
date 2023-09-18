import { encode } from "starknet";
import { Network } from "./wallet.service";

export const formatAddress = (address: string) =>
  encode.addHexPrefix(encode.removeHexPrefix(address).padStart(64, "0"));

export const truncateAddress = (fullAddress: string) => {
  const address = formatAddress(fullAddress);

  const hex = address.slice(0, 2);
  const start = address.slice(2, 6);
  const end = address.slice(-4);
  return `${hex} ${start} ... ${end}`;
};

const GOERLI_DEFAULT_ORACLE_CONTROLLER_CONTRACT_ADDRESS =
  "0x446812BAC98C08190DEE8967180F4E3CDCD1DB9373CA269904ACB17F67F7093";

const MAINNET_DEFAULT_ORACLE_CONTROLLER_CONTRACT_ADDRESS =
  "0x0346c57f094d641ad94e43468628d8e9c574dcb2803ec372576ccc60a40be2c4";

export const getOracleProxyAddress = (network: Network): string => {
  if (network == "mainnet-alpha") {
    return MAINNET_DEFAULT_ORACLE_CONTROLLER_CONTRACT_ADDRESS;
  } else if (network === "goerli-alpha") {
    return GOERLI_DEFAULT_ORACLE_CONTROLLER_CONTRACT_ADDRESS;
  } else if (network === "localhost") {
    throw new Error(
      "Unknown contract address on localhost. Add address in `src/services/address.service.ts"
    );
  } else {
    throw new Error("Unknown network type");
  }
};
