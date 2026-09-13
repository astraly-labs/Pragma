import { generateOGImage, ogSize } from "@/lib/og";

export const runtime = "edge";
export const alt = "Pragma | Starknet & Miden";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return generateOGImage(
    "The oracle for Starknet and Miden",
    "Market data. Transparent sources. Verifiable computation."
  );
}
