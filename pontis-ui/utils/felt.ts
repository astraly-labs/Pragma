export const charToFelt = (str: string): number => str.charCodeAt(0);

export const strToFelt = (input: string): number => {
  const inputList = input.split("");
  const outputList = inputList.map(charToFelt);
  return outputList.reduce((prev, curr) => prev * 256 + curr);
};

export const decToHex = (input: number): string => `0x${input.toString(16)}`;
