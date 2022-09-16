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
}
