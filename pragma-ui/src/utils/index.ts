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
  const bytes = new Uint8Array(hex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []);
  const decoder = new TextDecoder('utf-8');
  return decoder.decode(bytes);
}


export function extractTitleFromClaim(claim: string): string | null {
  const titleRegex = /The title of the assertion is: (.*?), the description/;
  const match = claim.match(titleRegex);
  return match ? match[1] : null;
}


export function extractDescriptionFromClaim(claim: string): string | null {
  const descriptionRegex = /the description is: (.*)\.$/;
  const match = claim.match(descriptionRegex);
  return match ? match[1] : null;
}


export const findCurrencyNameByAddress = (address: string): string | undefined => {
  for (const network in CURRENCIES) {
    const currency = CURRENCIES[network].find(c => c.address === address);
    if (currency) return currency.name;
  }
  return undefined;
};