import { AssetKeyT } from "../src/hooks/oracle";

/**
 * Converts an asset key into its url version by replacing the '/' with '-'.
 * @param {AssetKeyT} assetKey a valid asset key as defined in oracle.ts
 * @return {string} the asset key in a url compatible version
 */
export function assetKeyToUrl(assetKey: AssetKeyT): string {
  return encodeURIComponent(assetKey.replace("/", "-"));
}

/**
 * Converts a url encoded asset key back to its normal version.
 * @param {string} url a url encoded asset key (usually by `assetKeyToUrl`)
 * @return {AssetKeyT} a valid asset key as defined in oracle.ts
 */
export function urlToAssetKey(url: string): AssetKeyT {
  return decodeURIComponent(url.replace("-", "/"));
}
