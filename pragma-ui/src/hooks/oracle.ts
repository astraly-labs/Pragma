import { useContract, useStarknetCall } from "@starknet-react/core";
import { hexToString, strToHexFelt } from "../../utils/felt";
import { getOracleProxyAddress } from "../services/address.service";
import OracleAbi from "../abi/Oracle.json";
import { Abi } from "starknet";
import {
  bigNumberishArrayToDecimalStringArray,
  toHex,
} from "starknet/utils/number";
import { useNetwork } from "../providers/network";
import { Network } from "../services/wallet.service";

// List from https://github.com/Astraly-Labs/Pragma/blob/master/pragma-package/pragma/publisher/assets.py
export const AssetKeys = (network: Network): Array<string> => {
  if (network === "goerli-alpha") {
    return [
      "ETH/USD",
      "BTC/USD",
      "SOL/USD",
      "WBTC/USD",
      "BTC/EUR",
      "WSTETH/USD",
      "AVAX/USD",
      "DOGE/USD",
      "SHIB/USD",
      // "TEMP/USD",
      "DAI/USD",
      "USDT/USD",
      "USDC/USD",
      "R/USD",
      "LORDS/USD",
      // "TUSD/USD",
      "BUSD/USD",
      // "ETH/MXN",
      "BNB/USD",
      "ADA/USD",
      "XRP/USD",
      "MATIC/USD",
      "AAVE/USD",
    ];
  } else {
    return [
      "ETH/USD",
      "BTC/USD",
      "WBTC/USD",
      "WSTETH/USD",
      "DAI/USD",
      "USDT/USD",
      "USDC/USD",
      "R/USD",
      "LORDS/USD",
    ];
  }
};

export type AssetKeyT = string;

export const useOracleContract = () => {
  const { network, provider } = useNetwork();
  const oracleProxyContractAddress = getOracleProxyAddress(network);
  const { contract } = useContract({
    abi: OracleAbi as Abi,
    address: oracleProxyContractAddress,
  });
  contract.connect(provider);
  return { contract };
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
  if (data !== undefined && data !== null) {
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
  const { data, loading, error } = useStarknetCall({
    contract,
    method: "get_spot_entries",
    args: [arg, sources],
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
          pair_id: hexToString(toHex(entry["pair_id"])),
          price: parseInt(toHex(entry["price"])),
          timestamp: parseInt(toHex(entry["base"]["timestamp"])),
          source: hexToString(toHex(entry["base"]["source"])),
        };
      });
    }
  }
  return { oracleResponse, loading, error };
};
