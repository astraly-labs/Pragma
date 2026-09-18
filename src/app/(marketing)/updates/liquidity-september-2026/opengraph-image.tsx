import { generateOGImage, ogSize } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Pragma September 2026 liquidity and source-risk report";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return generateOGImage(
    "A price is not exit liquidity.",
    "September 2026 / Liquidity and source-risk report"
  );
}
