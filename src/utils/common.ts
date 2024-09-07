import { ofetch } from "ofetch";
import {
  ACCESS_TOKEN,
  CLIENT_ID,
  REFRESH_TOKEN,
  TOKEN_EXPIRED_TIME,
} from "./constant";
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export const isTokenValid = (expTime: string | null) => {
  if (!expTime) return false;
  const currentTime = Math.floor(Date.now() / 1000);
  if (Number(expTime) < currentTime) {
    return false;
  }
  return true;
};

export const refreshTokenFunc = async (req: NextRequest, res: NextResponse) => {
  const cookiePath = process.env.COOKIE_PATH;
  const apiUrl = process.env.API_URL;
  const refreshToken = req.cookies.get(REFRESH_TOKEN);
  const clientId = req.cookies.get(CLIENT_ID);

  if (!refreshToken || !clientId) {
    return false;
  }

  const body = {
    refreshToken: refreshToken.value,
    clientId: clientId.value,
  };

  try {
    const response: any = await ofetch("refresh-token", {
      baseURL: apiUrl,
      method: "POST",
      body,
    });

    const accessToken = response.data.accessToken;

    if (accessToken) {
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

      return accessToken;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
