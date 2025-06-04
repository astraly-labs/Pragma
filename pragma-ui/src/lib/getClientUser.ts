import type { User } from "./getUser";

export const getClientUser = async (): Promise<User | null> => {
  try {
    const res = await fetch(`https://feed.devnet.pragma.build/v1/auth/me`, {
      credentials: "include",
    });

    if (!res.ok) return null;

    const data: User = await res.json();
    return data?.id ? data : null;
  } catch (error) {
    console.error("Failed to fetch user", error);
    return null;
  }
};
