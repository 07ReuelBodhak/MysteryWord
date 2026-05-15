import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { match } from "assert";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const isLoggedIn = !!token;

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home/:path*",
    "/profile/:path*",
    "/leaderboard/:path*",
    "/game/:path*",
  ],
};
