import { useContract, useStarknetCall } from "@starknet-react/core";
import { hexToString, strToHexFelt } from "../../utils/felt";
import { getOracleProxyAddress } from "../services/address.service";
import { networkId } from "../services/wallet.service";
import OracleAbi from "../abi/Oracle.json";
import { Abi } from "starknet";
import {
  bigNumberishArrayToDecimalStringArray,
  toHex,
} from "starknet/utils/number";

// List from https://github.com/42labs/Empiric/blob/master/empiric-package/empiric/publisher/assets.py
export const AssetKeys = [
  "ETH/USD",
  "BTC/USD",
  "SOL/USD",
  "BTC/EUR",
  "AVAX/USD",
  "DOGE/USD",
  "SHIB/USD",
  // "TEMP/USD",
  "DAI/USD",
  "USDT/USD",
  "USDC/USD",
  "TUSD/USD",
  "BUSD/USD",
  // "ETH/MXN",
  "BNB/USD",
  "ADA/USD",
  "XRP/USD",
  "MATIC/USD",
  "AAVE/USD",
];

export type AssetKeyT = typeof AssetKeys[number];

export const useOracleContract = () => {
  const network = networkId();
  const oracleProxyContractAddress = getOracleProxyAddress(network);
  return useContract({
    abi: OracleAbi as Abi,
    address: oracleProxyContractAddress,
  });
};

export type GetValueResponseT = {
  value: number;
  decimals: number;
  lastUpdatedTimestamp: number;
  numSourcesAggregated: number;
};

export interface GetValueHookT {
  oracleResponse: GetValueResponseT | undefined;
  loading: boolean;
  error: string;
}

export const useOracleGetValue = (assetKey: AssetKeyT): GetValueHookT => {
  const { contract } = useOracleContract();
  const arg = strToHexFelt(assetKey);
  const { data, loading, error } = useStarknetCall({
    contract,
    method: "get_spot_median",
    args: [arg],
  });

  if (error !== undefined) {
    console.error(
      `Error retrieving price for ${assetKey}, encoded as ${arg}`,
      error
    );
  }

  let oracleResponse: GetValueResponseT | undefined = undefined;
  if (data !== undefined) {
    const [
      strValue,
      strDecimals,
      strLastUpdatedTimestamp,
      strNumSourcesAggregated,
    ] = bigNumberishArrayToDecimalStringArray(data);
    const decimals = parseInt(strDecimals);
    oracleResponse = {
      value: parseInt(strValue) / 10 ** decimals,
      decimals: decimals,
      lastUpdatedTimestamp: parseInt(strLastUpdatedTimestamp),
      numSourcesAggregated: parseInt(strNumSourcesAggregated),
    };
  }
  return { oracleResponse, loading, error };
};

export interface Entry {
  key: string;
  value: number;
  timestamp: number;
  source: string;
  publisher: string;
}

export interface GetEntriesT {
  oracleResponse: Entry[] | undefined;
  loading: boolean;
  error: string;
}

export const useOracleGetEntries = (assetKey: AssetKeyT) => {
  const { contract } = useOracleContract();
  const arg = strToHexFelt(assetKey);
  const sources = [];
  const { data, loading, error } = useStarknetCall({
    contract,
    method: "get_entries",
    args: [arg, sources],
  });

  if (error !== undefined) {
    console.error(
      `Error retrieving entries for ${assetKey}, encoded as ${arg}.`,
      error
    );
  }

  let oracleResponse: Entry[] | undefined = undefined;
  if (data !== undefined) {
    const responseArray = data["entries"];
    if (Array.isArray(responseArray)) {
      oracleResponse = responseArray.map((entry: Object): Entry => {
        return {
          key: hexToString(toHex(entry["key"])),
          value: parseInt(toHex(entry["value"])),
          timestamp: parseInt(toHex(entry["timestamp"])),
          source: hexToString(toHex(entry["source"])),
          publisher: hexToString(toHex(entry["publisher"])),
        };
      });
    }
  }
  return { oracleResponse, loading, error };
};
