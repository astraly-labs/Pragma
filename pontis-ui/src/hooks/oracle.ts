import { useContract, useStarknetCall } from "@starknet-react/core";
import { strToHexFelt } from "../../utils/felt";
import { getOracleControllerAddress } from "../services/address.service";
import { networkId } from "../services/wallet.service";
import OracleControllerAbi from "../abi/OracleController.json";
import { Abi } from "starknet";
import { bigNumberishArrayToDecimalStringArray } from "starknet/utils/number";

export const AssetKeys = [
  "eth/usd",
  "btc/usd",
  "sol/usd",
  "avax/usd",
  "doge/usd",
  "shib/usd",
  "temp/usd",
  "eth/mxn",
  "dai/usd",
  "usdt/usd",
  "usdc/usd",
  "tusd/usd",
  "btc/usd-20220930",
  "btc/usd-20221230",
  "eth/usd-20220930",
  "eth/usd-20221230",
];

export type AssetKeyT = typeof AssetKeys[number];

export const useOracleControllerContract = () => {
  const network = networkId();
  const oracleControllerContractAddress = getOracleControllerAddress(network);
  return useContract({
    abi: OracleControllerAbi as Abi,
    address: oracleControllerContractAddress,
  });
};

export type OracleResponseT = {
  value: number;
  decimals: number;
  lastUpdatedTimestamp: number;
  numSourcesAggregated: number;
};

export interface GetValueHookT {
  oracleResponse: OracleResponseT | undefined;
  loading: boolean;
  error: string;
}

export const useOracleGetValue = (assetKey: AssetKeyT): GetValueHookT => {
  const { contract } = useOracleControllerContract();
  const arg = strToHexFelt(assetKey);
  const aggregationMode = 0;
  const { data, loading, error } = useStarknetCall({
    contract,
    method: "get_value",
    args: [arg, aggregationMode],
  });

  if (error !== undefined) {
    console.error(
      `Error retrieving price for ${assetKey}, encoded as ${arg}`,
      error
    );
  }

  let oracleResponse: OracleResponseT | undefined = undefined;
  if (data !== undefined) {
    const [
      strValue,
      strDecimals,
      strLastUpdatedTimestamp,
      strNumSourcesAggregated,
    ] = bigNumberishArrayToDecimalStringArray(data);
    const decimals = parseInt(strDecimals);
    const value = parseInt(strValue) / 10 ** decimals;
    const lastUpdatedTimestamp = parseInt(strLastUpdatedTimestamp);
    const numSourcesAggregated = parseInt(strNumSourcesAggregated);
    oracleResponse = {
      value: isNaN(value) ? undefined : value,
      decimals: isNaN(decimals) ? undefined : value,
      lastUpdatedTimestamp: isNaN(lastUpdatedTimestamp)
        ? undefined
        : lastUpdatedTimestamp,
      numSourcesAggregated: isNaN(numSourcesAggregated)
        ? undefined
        : numSourcesAggregated,
    };
  }
  return { oracleResponse, loading, error };
};
