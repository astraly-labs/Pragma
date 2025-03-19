import { CURRENCIES } from "./constants";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

/**
 * Truncates a transaction hash to a shorter format.
 * @param {string} txHash - The full transaction hash.
 * @return {string} The truncated transaction hash in the format "0x123...abcd".
 */
export const truncateTxHash = (txHash: string): string => {
  return `${txHash.slice(0, 6)}...${txHash.slice(-4)}`;
};

/**
 * Return the publisher type as a string based on the provided type number.
 * @param {number} type - The type of the publisher (0 for 1st party, 1 for 3rd party).
 * @return {string} The publisher type as a human-readable string.
 */
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

/**
 * Converts a hexadecimal string to a UTF-8 encoded string.
 * @param {string} hex - The hexadecimal string to convert.
 * @return {string} The UTF-8 encoded string.
 */
export function hexToUtf8(hex: string): string {
  const bytes = new Uint8Array(
    hex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
  );
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(bytes);
}

/**
 * Extracts the title from a claim string using different regex patterns.
 * @param {string} claim - The claim string from which to extract the title.
 * @return {string | null} The extracted title, or null if no title is found.
 */
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

/**
 * Extracts the description from a claim string.
 * @param {string} claim - The claim string from which to extract the description.
 * @return {string | null} The extracted description, or null if no description is found.
 */
export function extractDescriptionFromClaim(claim: string): string | null {
  const descriptionRegex = /the description is: (.*)\.$/;
  const match = claim.match(descriptionRegex);
  return match ? match[1] : null;
}

/**
 * Finds the currency name by its address.
 * @param {string} address - The address of the currency.
 * @return {string | undefined} The name of the currency if found, otherwise undefined.
 */
export const findCurrencyNameByAddress = (address: string): string => {
  for (const network in CURRENCIES) {
    if (Object.prototype.hasOwnProperty.call(CURRENCIES, network)) {
      const currency = CURRENCIES[network].find((c) => c.address === address);
      if (currency) return currency.name;
    }
  }
  return "";
};

export const utcToLocalTime = (utcDateString: string) => {
  const utcDate = new Date(utcDateString + "Z"); // Adds 'Z' to indicate UTC time

  // eslint-disable-next-line new-cap
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const localDate = toZonedTime(utcDate, timeZone);

  const formattedDate = format(localDate, "yyyy-MM-dd");
  const formattedTime = format(localDate, "HH:mm:ss");

  return {
    date: formattedDate,
    time: formattedTime,
    full: `${formattedDate}, ${formattedTime}`,
  };
};
