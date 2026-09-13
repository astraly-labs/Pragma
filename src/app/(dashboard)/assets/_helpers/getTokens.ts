import { fetchExplorer } from "@/lib/explorer-api";
import { Token, AssetT } from "@/app/(dashboard)/assets/_types";
import { DEFAULT_ASSETS } from "@/lib/constants";

export const getTokens = async (source?: string): Promise<AssetT[]> => {
  if (source === "api") {
    const data = await fetchExplorer<{ tokens: Token[] }>(
      "/tokens/all",
      "/api/tokens/all"
    );

    return data.tokens || [];
  }

  return DEFAULT_ASSETS;
};
