import { generateOGImage, ogSize } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Pragma | Starknet & Miden";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return generateOGImage(
    "The world moves. Bring it onchain.",
    "The oracle for Starknet and Miden"
  );
}
