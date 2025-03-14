import { NextResponse, type NextRequest } from "next/server";
import { auth } from "./lib/config/firebase";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const session = auth.currentUser;
  console.log("session", session);

  // Jika mencoba akses halaman login tapi sudah login
  if (path.startsWith("/auth/login")) {
    if (session) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Redirect root path ke login jika belum login
  if (path === "/" && !session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}
