import { generateOGImage, ogSize } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Pragma Resources";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return generateOGImage(
    "Built for builders.",
    "Oracle documentation, SDKs, contracts, and integration guides."
  );
}
