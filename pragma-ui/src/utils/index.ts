import { CURRENCIES } from "../pages/constants";

export const truncateTxHash = (txHash: string): string => {
  return `${txHash.slice(0, 6)}...${txHash.slice(-4)}`;
};

export const getPublisherType = (type: number): string => {
  switch (type) {
    case 0:
      return "1st party";
    case 1:
      return "3rd party";
    default:
      return "Unknown";
  }
};

export function hexToUtf8(hex: string): string {
  const bytes = new Uint8Array(
    hex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
  );
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(bytes);
}

export function extractTitleFromClaim(claim: string): string | null {
  // Trim the claim and remove any leading/trailing whitespace
  const trimmedClaim = claim.trim();

  // Try different regex patterns
  const patterns = [
    /The title of the assertion is:\s*(.*?)\s*,\s*the description/i,
    /title of the assertion is:\s*(.*?)\s*(?:,|$)/i,
    /assertion is:\s*(.*?)\s*(?:,|$)/i,
  ];

  for (const pattern of patterns) {
    const match = trimmedClaim.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  // If no match is found, return the entire claim up to the first period or comma
  const fallbackMatch = trimmedClaim.match(/^(.*?)(?:[.,]|$)/);
  return fallbackMatch ? fallbackMatch[1].trim() : null;
}

export function extractDescriptionFromClaim(claim: string): string | null {
  const descriptionRegex = /the description is: (.*)\.$/;
  const match = claim.match(descriptionRegex);
  return match ? match[1] : null;
}

export const findCurrencyNameByAddress = (
  address: string
): string | undefined => {
  for (const network in CURRENCIES) {
    const currency = CURRENCIES[network].find((c) => c.address === address);
    if (currency) return currency.name;
  }
  return undefined;
};
