import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_TOKEN, TOKEN_EXPIRED_TIME } from "@/utils/constant";
import { isTokenValid, refreshTokenFunc } from "./utils/common";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  let accessToken = req.cookies.get(ACCESS_TOKEN)?.value;
  const res = NextResponse.next();
  const expTime = req.cookies.get(TOKEN_EXPIRED_TIME); //lấy exp time để so sánh
  const tokenValid = isTokenValid(expTime?.value ?? null);

  if (!tokenValid || !accessToken) {
    //nếu token hết hạn thì gọi hàm refresh token
    accessToken = await refreshTokenFunc(req, res);
  }

  const apiBaseUrl = process.env.API_URL || "";
  const newUrl = new URL(apiBaseUrl);
  newUrl.pathname = `${newUrl.pathname}${url.pathname.replace(/\/api\//, "")}`;
  //chuyển hướng đến api thực
  return NextResponse.rewrite(newUrl, {
    headers: {
      authorization: "Bearer " + accessToken,
    },
  });
}

export const config = {
  matcher: "/api/:path*",
};
