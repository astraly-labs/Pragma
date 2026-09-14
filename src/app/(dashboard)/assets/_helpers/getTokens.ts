import { AssetT } from "../_types";
import { DEFAULT_ASSETS } from "@/lib/constants";

export const getTokens = async (_source?: string): Promise<AssetT[]> =>
  DEFAULT_ASSETS;
