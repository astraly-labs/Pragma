import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (token && process.env.NODE_ENV === "development") {
    const cookieName = process.env.COOKIE_NAME!;
    const cleanUrl = new URL(req.url);
    cleanUrl.searchParams.delete("token");

    const response = NextResponse.redirect(cleanUrl);
    response.cookies.set({
      name: cookieName,
      value: token,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
