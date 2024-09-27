import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_TOKEN, TOKEN_EXPIRED_TIME } from "@/utils/constant";
import { isTokenValid, refreshTokenFunc } from "./utils/common";

const staticFileExtensions =
  /\.(jpg|jpeg|png|gif|svg|ico|css|js|woff|woff2|ttf|eot|js|css)$/i;

export async function middleware(req: NextRequest & { "new-token"?: string }) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get(ACCESS_TOKEN);
  if (!staticFileExtensions.test(pathname)) {
    const expTime = req.cookies.get(TOKEN_EXPIRED_TIME); //lấy exp time để so sánh
    const tokenValid = isTokenValid(expTime?.value ?? null);
    const res = NextResponse.next();
    if (!tokenValid || !accessToken) {
      //nếu token hết hạn thì gọi hàm refresh token
      await refreshTokenFunc(req, res);
    }
    return res;
  }
}
