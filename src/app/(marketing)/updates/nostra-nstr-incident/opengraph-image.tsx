import { generateOGImage, ogSize } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Pragma: NSTR incident update";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return generateOGImage(
    "NSTR incident update",
    "Liquidity risk, collateral controls and recovery"
  );
}
