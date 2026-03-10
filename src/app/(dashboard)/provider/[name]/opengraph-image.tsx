import { generateOGImage, ogSize } from "@/lib/og";

export const runtime = "edge";
export const alt = "Pragma Data Provider";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return generateOGImage(
    "Data Provider",
    "Explore data publisher details and their contributions to Pragma's oracle network"
  );
}
