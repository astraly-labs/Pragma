import { useContract, useContractRead } from "@starknet-react/core";
import { hexToString, strToHexFelt } from "../../utils/felt";
import { getOracleProxyAddress } from "../services/address.service";
import { networkId } from "../services/wallet.service";
import OracleAbi from "../abi/Oracle.json";
import { Abi, CairoCustomEnum } from "starknet";
import { num } from "starknet";

// List from https://github.com/Astraly-Labs/Pragma/blob/master/pragma-package/pragma/publisher/assets.py
export const AssetKeys = [
  "ETH/USD",
  "BTC/USD",
  "WBTC/USD",
  "BTC/EUR",
  "WSTETH/USD",
  "DAI/USD",
  "USDT/USD",
  "USDC/USD",
  "LORDS/USD",
  "EKUBO/USD",
];

// prettier-ignore
export type AssetKeyT = (typeof AssetKeys)[number];

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
  error: Error;
}

export const useOracleGetValue = (assetKey: AssetKeyT): GetValueHookT => {
  const { contract } = useOracleContract();
  const arg = strToHexFelt(assetKey);
  const { data, isLoading, error } = useContractRead({
    address: contract.address,
    abi: contract.abi,
    functionName: "get_data_median",
    args: [new CairoCustomEnum({ SpotEntry: arg })],
  });
  const realData = data ? data : undefined;
  console.log(contract.address);
  console.log(data);

  if (error !== null) {
    console.error(
      `Error retrieving price for ${assetKey}, encoded as ${arg}`,
      error
    );
  }

  let oracleResponse: GetValueResponseT | undefined = undefined;
  if (realData !== undefined) {
    const strValue = num.toHex(realData["price"]);
    const strDecimals = num.toHex(realData["decimals"]);
    const strLastUpdatedTimestamp = num.toHex(
      realData["last_updated_timestamp"]
    );
    const strNumSourcesAggregated = num.toHex(
      realData["num_sources_aggregated"]
    );
    const decimals = parseInt(strDecimals);
    oracleResponse = {
      value: parseInt(strValue) / 10 ** decimals,
      decimals: decimals,
      lastUpdatedTimestamp: parseInt(strLastUpdatedTimestamp),
      numSourcesAggregated: parseInt(strNumSourcesAggregated),
    };
  }
  return { oracleResponse, loading: isLoading, error };
};

export interface SpotEntry {
  pair_id: string;
  price: number;
  timestamp: number;
  source: string;
  publisher?: string;
}

export interface GetEntriesT {
  oracleResponse: SpotEntry[] | undefined;
  loading: boolean;
  error: string;
}

export const useOracleGetEntries = (assetKey: AssetKeyT) => {
  const { contract } = useOracleContract();
  const arg = strToHexFelt(assetKey);
  const sources = [];
  const {
    data,
    isLoading: loading,
    error,
  } = useContractRead({
    address: contract.address,
    abi: contract.abi,
    functionName: "get_data_median_for_sources",
    args: [new CairoCustomEnum({ SpotEntry: arg }), sources],
  });

  if (error !== undefined) {
    console.error(
      `Error retrieving entries for ${assetKey}, encoded as ${arg}.`,
      error
    );
  }

  let oracleResponse: SpotEntry[] | undefined = undefined;
  if (data !== undefined) {
    const responseArray = data["entries"];
    if (Array.isArray(responseArray)) {
      oracleResponse = responseArray.map((entry: Object): SpotEntry => {
        return {
          pair_id: hexToString(num.toHex(entry["pair_id"])),
          price: parseInt(num.toHex(entry["price"])),
          timestamp: parseInt(num.toHex(entry["base"]["timestamp"])),
          source: hexToString(num.toHex(entry["base"]["source"])),
        };
      });
    }
  }
  return { oracleResponse, loading, error };
};
