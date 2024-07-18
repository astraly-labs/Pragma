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
