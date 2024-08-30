import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const apiUrl = pathname.replace(/\api\//, "");
  console.log(`Đang gọi đến ${apiUrl}, logic refresh token ở đây nếu cần`);
  return NextResponse.next();
}
export const config = {
  matcher: "/api/:path*", // */api/*
};
