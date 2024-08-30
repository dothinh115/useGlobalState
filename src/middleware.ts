import type { NextRequest } from "next/server";
import { REFRESH_TOKEN, TOKEN_EXPIRED_TIME } from "./utils/constant";

export function middleware(req: NextRequest) {
  const expTime = req.cookies.get(TOKEN_EXPIRED_TIME); //lấy exp time để so sánh
  const refreshToken = req.cookies.get(REFRESH_TOKEN); //lấy refresh token
  const currentTime = Math.floor(Date.now() / 1000);
  if (!expTime || (expTime && Number(expTime) < currentTime)) {
    //Token hết hạn, gọi refresh token
    console.log("Token hết hạn, gọi refresh token");
  }
}
export const config = {
  matcher: "/api/:path*", // */api/*
};
