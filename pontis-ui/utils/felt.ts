const charToDecFelt = (str: string): number => str.charCodeAt(0);

export const strToHexFelt = (input: string): string => {
  const inputList = input.split("");
  return "0x" + inputList.map((c) => charToDecFelt(c).toString(16)).join("");
};

export const decToHex = (input: number): string => `0x${input.toString(16)}`;
