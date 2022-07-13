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
  "0x012fadd18ec1a23a160cc46981400160fbf4a7a5eed156c4669e39807265bcd4";

export const getOracleControllerAddress = (network: Network): string => {
  if (network == "mainnet-alpha") {
    throw new Error("Not deployed on mainnet yet");
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
