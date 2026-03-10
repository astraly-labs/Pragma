import { generateOGImage, ogSize } from "@/lib/og";

export const runtime = "edge";
export const alt = "Pragma - The network of zk-truth machines";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return generateOGImage(
    "The open infrastructure for oracles",
    "Enabling anyone to deploy optimized oracles for any application"
  );
}
