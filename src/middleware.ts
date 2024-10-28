import { NextResponse, type NextRequest } from "next/server";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  TOKEN_EXPIRED_TIME,
} from "@/utils/constant";
import { isTokenValid, refreshTokenFunc } from "./utils/common";
import { jwtDecode } from "jwt-decode";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  let accessToken = req.cookies.get(ACCESS_TOKEN)?.value;

  //tạo headers
  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("connection");

  const expTime = req.cookies.get(TOKEN_EXPIRED_TIME); //lấy exp time để so sánh
  const tokenValid = isTokenValid(expTime?.value ?? null);

  if (!tokenValid || !accessToken) {
    //nếu token hết hạn thì gọi hàm refresh token
    accessToken = await refreshTokenFunc(req);
  }

  headers.set("authorization", "Bearer " + accessToken);
  let res: NextResponse;
  if (url.pathname.startsWith("/api/")) {
    const apiBaseUrl = process.env.API_URL || "";
    const newUrl = new URL(apiBaseUrl);
    newUrl.pathname = `${newUrl.pathname}${url.pathname.replace(
      /\/api\//,
      ""
    )}`;
    res = NextResponse.rewrite(newUrl, {
      headers,
    });
  } else {
    res = NextResponse.next();
  }

  if (accessToken) {
    const cookiePath = process.env.COOKIE_PATH;
    const accessTokenDecoded: any = jwtDecode(accessToken);
    const accessTokenExpires = new Date(accessTokenDecoded.exp * 1000);
    res.cookies.set({
      name: ACCESS_TOKEN,
      value: accessToken,
      domain: cookiePath,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: accessTokenExpires,
    });

    res.cookies.set({
      name: TOKEN_EXPIRED_TIME,
      value: accessTokenDecoded.exp,
      domain: cookiePath,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: accessTokenExpires,
    });
  } else {
    res.cookies.delete(ACCESS_TOKEN);
    res.cookies.delete(REFRESH_TOKEN);
    res.cookies.delete(TOKEN_EXPIRED_TIME);
  }

  //chuyển hướng đến api thực
  return res;
}

export const config = {
  matcher: [
    {
      source: "/((?!_next/static|_next/image|favicon.ico).*)", // Loại bỏ các đường dẫn có chứa /_next/static, /_next/image và favicon.ico
    },
  ],
};
