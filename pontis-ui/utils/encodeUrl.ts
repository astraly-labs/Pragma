import { AssetKeyT } from "../src/hooks/oracle";

/**
 *
 * @param {AssetKeyT} assetKey
 * @return {string}
 */
export function assetKeyToUrl(assetKey: AssetKeyT): string {
  return encodeURIComponent(assetKey.replace("/", "-"));
}

/**
 *
 * @param {string} url
 * @return {AssetKeyT}
 */
export function urlToAssetKey(url: string): AssetKeyT {
  return decodeURIComponent(url.replace("-", "/"));
}
