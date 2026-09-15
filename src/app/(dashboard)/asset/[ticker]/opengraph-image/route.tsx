import { generateOGImage } from "@/lib/og";
import { EXPLORER_NETWORKS, explorerSource } from "@/lib/explorer-networks";
import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ ticker: string }> }
) {
  const { ticker } = await params;
  if (!/^[A-Za-z0-9_.]+-[A-Za-z0-9_.]+$/.test(ticker) || ticker.length > 40) {
    return new Response("Invalid pair", { status: 404 });
  }
  const source = explorerSource(request.nextUrl.searchParams.get("network"));
  return generateOGImage(
    ticker.replace("-", "/"),
    `Oracle price feed on ${EXPLORER_NETWORKS[source]}.`,
    EXPLORER_NETWORKS[source]
  );
}
