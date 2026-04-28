import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// next.config.ts redirects use case-insensitive path matching, which causes a
// 308 self-redirect loop when the source path and destination path are identical
// after lowercasing (e.g. /classes/Brazilian-Jiu-Jitsu → /classes/brazilian-jiu-jitsu).
// These three legacy redirects are handled here instead, using exact string
// comparison so the destination URL is never accidentally matched.
const EXACT_REDIRECTS: Record<string, string> = {
  "/classes/Brazilian-Jiu-Jitsu": "/classes/brazilian-jiu-jitsu",
  "/classes/MMA": "/classes/mma",
  "/Contact": "/contact",
};

export function proxy(request: NextRequest) {
  const destination = EXACT_REDIRECTS[request.nextUrl.pathname];
  if (destination) {
    return NextResponse.redirect(new URL(destination, request.url), {
      status: 308,
    });
  }
}

export const config = {
  matcher: ["/classes/Brazilian-Jiu-Jitsu", "/classes/MMA", "/Contact"],
};
