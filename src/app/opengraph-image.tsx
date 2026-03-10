import { generateOGImage, ogSize } from "@/lib/og";

export const runtime = "edge";
export const alt = "Pragma - The network of zk-truth machines";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return generateOGImage(
    "The network of zk-truth machines",
    "Provable data feeds for decentralized applications"
  );
}
