export function assetKeyToUrl(assetKey: string): string {
  return encodeURIComponent(assetKey.replace("/", "-"));
}

export function urlToAssetKey(url: string): string {
  return decodeURIComponent(url.replace("-", "/"));
}
