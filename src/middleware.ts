import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const expTime = req.cookies.get("expTime"); //lấy exp time để so sánh
  const currentTime = Math.floor(Date.now() / 1000);
  if (Number(expTime) < currentTime) {
    //Token hết hạn, gọi refresh token
    console.log("Token hết hạn, gọi refresh token");
  }
}
export const config = {
  matcher: "/api/:path*", // */api/*
};
