import { generateOGImage, ogSize } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Pragma November 2026 liquidity and source-risk report";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return generateOGImage(
    "Liquidity remains uneven.",
    "27 November 2026 / Liquidity and source-risk snapshot"
  );
}
