import { cookies } from "next/headers";
import { ApiKey } from "../_types";

export async function getServerApiKeys(): Promise<ApiKey[]> {
  const cookieValue = (await cookies()).get(process.env.COOKIE_NAME!)?.value;

  if (cookieValue) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_OAAS_API}/api-keys/list`,
      {
        headers: {
          Cookie: `${process.env.COOKIE_NAME}=${cookieValue}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch api keys");
    }

    const data: ApiKey[] = await res.json();

    return data;
  }

  return [];
}
