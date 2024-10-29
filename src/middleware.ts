import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  TOKEN_EXPIRED_TIME,
} from "./utils/constant";
import { isTokenValid, refreshTokenFunc } from "./utils/common";
import { jwtDecode } from "jwt-decode";

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  let accessToken = req.cookies.get(ACCESS_TOKEN)?.value;
  const expTime = req.cookies.get(TOKEN_EXPIRED_TIME)?.value;
  let isTokenRefreshed = false;

  const isValid = isTokenValid(expTime ?? null);

  if (!isValid || !accessToken) {
    accessToken = await refreshTokenFunc(req);
    isTokenRefreshed = true;
  }

  const headers = new Headers(req.headers);
  let res: NextResponse;
  if (accessToken) {
    headers.set("authorization", `Bearer ${accessToken}`);
  }
  if (url.pathname.startsWith("/api/")) {
    const apiBaseUrl = process.env.API_URL ?? "";
    const target = new URL(apiBaseUrl);
    target.pathname = `${target.pathname}${url.pathname.replace(
      /\/api\//,
      ""
    )}`;
    res = NextResponse.rewrite(target, {
      headers,
    });
  } else {
    res = NextResponse.next();
  }

  if (accessToken && isTokenRefreshed) {
    const accessTokenDecoded: any = jwtDecode(accessToken);
    const accessTokenExp = new Date(accessTokenDecoded.exp * 1000);
    setCookie(res, ACCESS_TOKEN, accessToken, accessTokenExp);
    setCookie(res, TOKEN_EXPIRED_TIME, accessTokenDecoded.exp, accessTokenExp);
  }

  if (!accessToken) {
    res.cookies.delete(ACCESS_TOKEN);
    res.cookies.delete(TOKEN_EXPIRED_TIME);
    res.cookies.delete(REFRESH_TOKEN);
  }

  return res;
}

export const config = {
  matcher: [
    {
      source: "/((?!_next/static|_next/image|favicon.ico).*)",
    },
  ],
};

const setCookie = (
  res: NextResponse,
  name: string,
  value: string,
  expires: Date
) => {
  res.cookies.set({
    name,
    value,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires,
  });
};
