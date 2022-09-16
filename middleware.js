import { NextResponse } from "next/server";
const PUBLIC_FILE = /\.(.*)$/;
const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=()",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
];

export async function middleware(req, res) {
  // set security headers for static assets
  if (req.nextUrl.pathname.startsWith("/_next")) {
    const response = NextResponse.next();

    for (const header of securityHeaders)
      response.headers.set(header.key, header.value);

    return response;
  }

  // redirect to prefixed default-local
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  const search = req.nextUrl.search?.length ? req.nextUrl.search : "";

  if (req.nextUrl.locale === "default") {
    return NextResponse.redirect(
      new URL(`/de-DE${req.nextUrl.pathname}${search}`, req.url)
    );
  }
}
