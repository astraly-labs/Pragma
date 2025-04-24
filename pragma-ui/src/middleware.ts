import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (token && process.env.NODE_ENV === "development") {
    const response = NextResponse.next();

    response.cookies.set({
      name: "pragma_auth_token",
      value: token,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    url.searchParams.delete("token");
    response.headers.set("Location", url.toString());

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/oracle/new"],
};
