import { cookies } from "next/headers";
import { FeedsResponse } from "../_types";

export async function getServerFeeds(): Promise<FeedsResponse> {
  const cookieValue = (await cookies()).get(process.env.COOKIE_NAME!)?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_OAAS_API}/feeds/list`, {
    headers: {
      Cookie: `${process.env.COOKIE_NAME}=${cookieValue}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch feeds");
  }

  const data: FeedsResponse = await res.json();

  return data;
}
