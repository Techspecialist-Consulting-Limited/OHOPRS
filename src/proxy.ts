import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const publicRoutes = ["/login", "/about", "/our-programmes", "/contact"];

const roleRouteMap: Record<string, string[]> = {
  minister: ["/national"],
  executive: ["/national"],
  agency_admin: ["/agency"],
  operations: ["/agency"],
  partner: ["/agency"],
  view_only: ["/agency"],
};

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  if (publicRoutes.some((route) => pathname.startsWith(route)) || pathname === "/") {
    return NextResponse.next();
  }

  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const userRole = session.user.role;

  if (pathname === "/" || pathname === "") {
    if (userRole === "minister" || userRole === "executive") {
      return NextResponse.redirect(new URL("/national", req.url));
    }
    return NextResponse.redirect(new URL("/agency", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
