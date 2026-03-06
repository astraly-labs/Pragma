const charToDecFelt = (str: string): number => str.charCodeAt(0);

export const strToHexFelt = (input: string): string => {
  const inputList = input.split("");
  return "0x" + inputList.map((c) => charToDecFelt(c).toString(16)).join("");
};

export const decToHex = (input: number): string => `0x${input.toString(16)}`;

/**
 * This function converts a hex string to ascii
 * @param {string} hex a hex string of the form '0x...'
 * @return {string} the ascii string
 */
export function hexToString(hex: string): string {
  let str = "";
  for (let i = 2; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substring(i, i + 2), 16));
  }
  return str;
}
