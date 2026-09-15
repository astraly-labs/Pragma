import { generateOGImage, ogSize } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Pragma Staking";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return generateOGImage(
    "Stake STRK with Pragma",
    "Explore delegation, validator performance, and staking activity.",
    "STARKNET STAKING"
  );
}
