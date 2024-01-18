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
  "0x36031daa264c24520b11d93af622c848b2499b66b41d611bac95e13cfca131a";

const GOERLI2_DEFAULT_ORACLE_CONTROLLER_CONTRACT_ADDRESS =
  "0xc28f8752abb9ed18f65fed730b8faa69bdf6128bb730411efd916284701938";

export const getOracleProxyAddress = (network: Network): string => {
  if (network == "mainnet-alpha") {
    throw new Error("Not deployed on mainnet yet");
  } else if (network === "goerli-alpha") {
    return GOERLI_DEFAULT_ORACLE_CONTROLLER_CONTRACT_ADDRESS;
  } else if (network === "goerli2-alpha") {
    return GOERLI2_DEFAULT_ORACLE_CONTROLLER_CONTRACT_ADDRESS;
  } else if (network === "localhost") {
    throw new Error(
      "Unknown contract address on localhost. Add address in `src/services/address.service.ts"
    );
  } else {
    throw new Error("Unknown network type");
  }
};
