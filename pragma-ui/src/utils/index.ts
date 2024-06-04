export const truncateTxHash = (txHash: string): string => {
    return `${txHash.slice(0, 6)}...${txHash.slice(-4)}`;
}