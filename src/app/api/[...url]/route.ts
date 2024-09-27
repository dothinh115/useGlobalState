import { ACCESS_TOKEN } from "@/utils/constant";
import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { ofetch } from "ofetch";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const match = req.url?.match(/\/api\/[^\/]+(?:\/[^\/]*)*/);
  let replacedPath: string | undefined;

  if (match) {
    replacedPath = match[0].replace(/\/api/, "");
  }

  if (!replacedPath) {
    return NextResponse.json(
      {
        statusCode: 500,
        message: "Path không hợp lệ!",
      },
      {
        status: 500,
      }
    );
  }
  try {
    const token = getCookie(ACCESS_TOKEN, { req, res });
    //ở đây mình dùng ofetch để chuyển hướng đến api đích
    const response = await ofetch(replacedPath, {
      baseURL: process.env.API_URL,
      method: req.method,
      body: req.method !== "GET" ? req.body : undefined,
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return NextResponse.json(response, { status: response.statusCode });
  } catch (error: any) {
    return NextResponse.json(error.data, { status: error.data.statusCode });
  }
}

export { handler as GET, handler as POST, handler as PATCH, handler as DELETE };
