import { useContract, useStarknetCall } from "@starknet-react/core";
import { decToHex, strToFelt } from "../../utils/felt";
import { getOracleAddress } from "../services/address.service";
import { networkId } from "../services/wallet.service";
import OracleAbi from "../abi/oracle.json";
import { Abi } from "starknet";
import { bigNumberishArrayToDecimalStringArray } from "starknet/utils/number";

export type AssetKeyT =
  | "eth/usd"
  | "btc/usd"
  | "luna/usd"
  | "sol/usd"
  | "avax/usd"
  | "doge/usd"
  | "shib/usd";

export const useOracleContract = () => {
  const network = networkId();
  const oracleContractAddress = getOracleAddress(network);
  return useContract({
    abi: OracleAbi as Abi,
    address: oracleContractAddress,
  });
};

interface GetDecimalsHookT {
  decimals: number;
  loading: boolean;
  error: string;
}

const useOracleGetDecimals = (assetKey: AssetKeyT): GetDecimalsHookT => {
  const { contract } = useOracleContract();
  const { data, loading, error } = useStarknetCall({
    contract,
    method: "get_decimals",
    args: [],
  });
  let decimals: number | undefined = undefined;
  if (data !== undefined) {
    console.log("data dec", data);
    decimals = parseInt(bigNumberishArrayToDecimalStringArray(data)[0]);
  }
  return { decimals, loading, error };
};

export type OracleResponseT = {
  value: number;
  lastUpdatedTimestamp: number;
};

export interface GetValueHookT {
  oracleResponse: OracleResponseT | undefined;
  loading: boolean;
  error: string;
}

export const useOracleGetValue = (assetKey: AssetKeyT): GetValueHookT => {
  const { contract } = useOracleContract();
  const { decimals } = useOracleGetDecimals(assetKey);
  const arg = decToHex(strToFelt(assetKey));
  const { data, loading, error } = useStarknetCall({
    contract,
    method: "get_value",
    args: [arg],
  });
  let oracleResponse: OracleResponseT | undefined = undefined;
  if (data !== undefined) {
    const [value, lastUpdatedTimestamp] =
      bigNumberishArrayToDecimalStringArray(data);
    oracleResponse = {
      value: parseInt(value) / 10 ** decimals,
      lastUpdatedTimestamp: parseInt(lastUpdatedTimestamp),
    };
  }
  return { oracleResponse, loading, error };
};
