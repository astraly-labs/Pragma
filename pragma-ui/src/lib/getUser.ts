import "server-only";

import { cookies } from "next/headers";

type Subscription = {
  tier: string;
  status: string;
};

export type User = {
  id: string;
  email: string;
  subscription: Subscription;
};

export const getUser = async () => {
  const token = (await cookies()).get("pragma_auth_token")?.value;
  if (!token) return null;

  try {
    const res = await fetch(`https://feed.devnet.pragma.build/v1/auth/me`, {
      headers: {
        Cookie: (await cookies()).toString(),
      },
    });

    if (!res.ok) {
      return undefined;
    }

    const data: User = await res.json();

    if (!data?.id) {
      return undefined;
    }

    return data || null;
  } catch {
    console.log("Failed to fetch user");
    return null;
  }
};
