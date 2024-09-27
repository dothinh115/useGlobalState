import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_TOKEN, TOKEN_EXPIRED_TIME } from "@/utils/constant";
import { isTokenValid, refreshTokenFunc } from "./utils/common";

const staticFileExtensions =
  /\.(jpg|jpeg|png|gif|svg|ico|css|js|woff|woff2|ttf|eot|js|css)$/i;

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = url;
  let accessToken = req.cookies.get(ACCESS_TOKEN)?.value;
  const res = NextResponse.next();
  if (staticFileExtensions.test(pathname) || !pathname.startsWith("/api"))
    return res;
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
