import { generateOGImage, ogSize } from "@/lib/og";

export const runtime = "edge";
export const alt = "Pragma Explorer";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return generateOGImage(
    "Every asset priced the best way",
    "Explore the assets supported by Pragma with best pricing and no fluff"
  );
}
