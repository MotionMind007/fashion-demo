import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Block admin routes from being indexed
  if (pathname.startsWith("/admin")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  // Skip auth check for login page and public API routes
  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/messages") && request.method === "POST"
  ) {
    return response;
  }

  // Protect admin API routes (server-side auth)
  if (pathname.startsWith("/api/") && pathname !== "/api/products") {
    const token = request.cookies.get("noir-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const secret = new TextEncoder().encode(
        process.env.PAYLOAD_SECRET || "noir-studio-secret-change-in-production-2026"
      );
      await jwtVerify(token, secret);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
