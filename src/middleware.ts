import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const apiUrl = pathname.replace(/\api\//, "");
  const expTime = req.cookies.get("expTime"); //lấy exp time để so sánh
  const currentTime = Math.floor(Date.now() / 1000);
  if (Number(expTime) < currentTime) {
    //Token hết hạn, gọi refresh token
  }
}
export const config = {
  matcher: "/api/:path*", // */api/*
};
