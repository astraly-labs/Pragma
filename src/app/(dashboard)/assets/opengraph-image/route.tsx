import { generateOGImage } from "@/lib/og";
import { EXPLORER_NETWORKS, explorerSource } from "@/lib/explorer-networks";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const source = explorerSource(request.nextUrl.searchParams.get("source"));
  return generateOGImage(
    "Oracle price feeds.",
    `Explore market data on ${EXPLORER_NETWORKS[source]}.`,
    EXPLORER_NETWORKS[source]
  );
}
