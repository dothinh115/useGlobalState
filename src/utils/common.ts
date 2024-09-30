import { ofetch } from "ofetch";
import { REFRESH_TOKEN } from "./constant";
import { NextRequest } from "next/server";

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

  if (!refreshToken) {
    return false;
  }

  const body = {
    refreshToken: refreshToken.value,
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
