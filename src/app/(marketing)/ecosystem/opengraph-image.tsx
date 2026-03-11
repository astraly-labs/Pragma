import { generateOGImage, ogSize } from "@/lib/og";

export const runtime = "edge";
export const alt = "Pragma Ecosystem";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return generateOGImage(
    "Meet and join our ecosystem",
    "World-class builders already work on Pragma. Become a publisher or integrate now."
  );
}
