import { generateOGImage, ogSize } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Pragma Data Provider";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return generateOGImage(
    "Oracle data publishers.",
    "Inspect reported pairs and onchain observations.",
    "STARKNET MAINNET"
  );
}
