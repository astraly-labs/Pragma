import { AssetT } from "../_types";
import { DEFAULT_ASSETS } from "@/lib/constants";

export const getTokens = async (source?: string): Promise<AssetT[]> =>
  source === "miden" ? [] : DEFAULT_ASSETS;
