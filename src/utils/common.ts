import { ofetch } from "ofetch";
import {
  ACCESS_TOKEN,
  CLIENT_ID,
  REFRESH_TOKEN,
  TOKEN_EXPIRED_TIME,
} from "./constant";
import { NextRequest } from "next/server";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const isTokenValid = (expTime: string | null) => {
  if (!expTime) return false;
  const currentTime = Math.floor(Date.now() / 1000);
  if (Number(expTime) < currentTime - 2000) {
    return false;
  }
  return true;
};

export const refreshTokenFunc = async (req: NextRequest) => {
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
      return accessToken;
    }
  } catch (error: any) {
    console.log(error.data);
    return false;
  }
};

export async function getFingerSprint() {
  const fpPromise = await FingerprintJS.load();
  const fpPromiseGet = await fpPromise.get();
  const clientId = fpPromiseGet.visitorId;
  return clientId;
}
