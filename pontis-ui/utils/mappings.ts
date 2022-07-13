import { AssetKeyT } from "../src/hooks/oracle";

// Mapping from asset key abbreviation to currency symbol.
const currencySymbols = {
  usd: "dollar.svg",
  mxn: "dollar.svg",
  eur: "euro.svg",
};

/**
 * Converts asset key into file name of currency symbol;
 * @param {AssetKeyT} assetKey
 * @return {string} file name of the currency symbol
 */
export function getCurrency(assetKey: AssetKeyT): string {
  const slashIndex = assetKey.indexOf("/");
  const dashIndex = assetKey.indexOf("-");
  const cur =
    dashIndex === -1
      ? assetKey.slice(slashIndex + 1)
      : assetKey.slice(slashIndex + 1, dashIndex);
  return currencySymbols[cur];
}

/**
 * Returns name of the logo's image.
 * @param {AssetKeyT} assetKey string containing the coin abbreviation delimited by a '/'
 * @return {string} returns string that matches corresponding file name in /assets/logos
 */
export function getLogoPath(assetKey: AssetKeyT): string {
  const indexOfSlash = assetKey.indexOf("/");
  const logo =
    indexOfSlash > 0
      ? assetKey.slice(0, indexOfSlash).toLowerCase()
      : "fallback";
  return `/assets/currencies/${logo}.svg`;
}
