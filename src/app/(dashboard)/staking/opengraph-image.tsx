import { generateOGImage, ogSize } from "@/lib/og";

export const runtime = "edge";
export const alt = "Pragma Staking";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return generateOGImage(
    "Stake STRK with Pragma",
    "Delegate your STRK to earn staking rewards while supporting decentralized oracle infrastructure"
  );
}
