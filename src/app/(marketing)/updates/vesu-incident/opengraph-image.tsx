import { generateOGImage, ogSize } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Pragma: 4 September oracle incident post-mortem";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return generateOGImage(
    "The 4 September oracle incident",
    "Post-mortem, recovery updates and remediation tracker"
  );
}
