// Route protection proxy
// Protects /dashboard and /admin routes based on user role
// Uses NextAuth v5 API

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const path = request.nextUrl.pathname;

  // Public routes - allow access
  if (
    path.startsWith("/api") ||
    path.startsWith("/auth") ||
    path === "/" ||
    path.startsWith("/productos") ||
    path.startsWith("/categoria") ||
    path.startsWith("/carrito")
  ) {
    return NextResponse.next();
  }

  // Protected routes require authentication
  if (path.startsWith("/dashboard") || path.startsWith("/checkout")) {
    if (!token) {
      const signInUrl = new URL("/auth/signin", request.url);
      signInUrl.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Admin routes require ADMIN role
  if (path.startsWith("/admin")) {
    if (!token) {
      const signInUrl = new URL("/auth/signin", request.url);
      signInUrl.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(signInUrl);
    }

    // Check if user has ADMIN role
    // Role is stored in token.role from JWT
    const userRole = token.role as string;
    if (userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/checkout/:path*",
  ],
};
