import { generateOGImage, ogSize } from "@/lib/og";

export const runtime = "edge";
export const alt = "Pragma Resources";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return generateOGImage(
    "Resources",
    "Data feeds, computational feeds, and verifiable randomness for your applications"
  );
}
