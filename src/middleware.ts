import { NextResponse, type NextRequest } from "next/server";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  TOKEN_EXPIRED_TIME,
} from "@/utils/constant";
import { jwtDecode } from "jwt-decode";

const staticFileExtensions =
  /\.(jpg|jpeg|png|gif|svg|ico|css|js|woff|woff2|ttf|eot|js|css)$/i;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const expTime = req.cookies.get(TOKEN_EXPIRED_TIME); //lấy exp time để so sánh
  const refreshToken = req.cookies.get(REFRESH_TOKEN); //lấy refresh token
  const currentTime = Math.floor(Date.now() / 1000);

  if (/\/api\//.test(pathname)) {
    const headers = req.headers;
    if (!expTime || (expTime && Number(expTime) < currentTime)) {
      //logic refresh token
    }
  }
}
