import { generateOGImage, ogSize } from "@/lib/og";

export const runtime = "edge";
export const alt = "Pragma Asset";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return generateOGImage(
    "Asset Explorer",
    "Real-time price data from multiple sources, verified on-chain"
  );
}
