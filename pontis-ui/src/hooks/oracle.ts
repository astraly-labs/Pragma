import { useContract, useStarknetCall } from "@starknet-react/core";
import { hexToString, strToHexFelt } from "../../utils/felt";
import { getOracleControllerAddress } from "../services/address.service";
import { networkId } from "../services/wallet.service";
import OracleControllerAbi from "../abi/OracleController.json";
import { Abi } from "starknet";
import {
  bigNumberishArrayToDecimalStringArray,
  toHex,
} from "starknet/utils/number";

// List from https://github.com/42labs/Pontis/blob/master/pontis-package/pontis/publisher/assets.py
export const AssetKeys = [
  "eth/usd",
  "btc/usd",
  "sol/usd",
  "btc/eur",
  "avax/usd",
  "doge/usd",
  "shib/usd",
  // "temp/usd",
  "dai/usd",
  "usdt/usd",
  "usdc/usd",
  "tusd/usd",
  "busd/usd",
  // "eth/mxn",
  "bnb/usd",
  "ada/usd",
  "xrp/usd",
  "matic/usd",
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
  const { contract } = useOracleControllerContract();
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
    oracleResponse = data["0"].map((entry: Object): Entry => {
      return {
        key: hexToString(toHex(entry["key"])),
        value: parseInt(toHex(entry["value"])),
        timestamp: parseInt(toHex(entry["timestamp"])),
        source: hexToString(toHex(entry["source"])),
        publisher: hexToString(toHex(entry["publisher"])),
      };
    });
  }
  return { oracleResponse, loading, error };
};
