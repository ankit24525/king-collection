import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {

  const token = req.cookies.get("token")?.value;

  const { pathname } = req.nextUrl;

  // Allow admin login page without authentication
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // If no token → redirect to admin login
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {

    const decoded = jwt.decode(token);

    if (!decoded?.isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();

  } catch (error) {

    return NextResponse.redirect(new URL("/admin/login", req.url));

  }
}

export const config = {
  matcher: ["/admin/:path*"],
};