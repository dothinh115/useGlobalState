import { NextResponse, type NextRequest } from "next/server";
import { TOKEN_EXPIRED_TIME } from "@/utils/constant";
import { isTokenValid, refreshTokenFunc } from "./utils/common";

const staticFileExtensions =
  /\.(jpg|jpeg|png|gif|svg|ico|css|js|woff|woff2|ttf|eot|js|css)$/i;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!staticFileExtensions.test(pathname)) {
    const expTime = req.cookies.get(TOKEN_EXPIRED_TIME); //lấy exp time để so sánh
    const tokenValid = isTokenValid(expTime?.value ?? null);
    if (!tokenValid) {
      const res = NextResponse.next();

      //nếu token hết hạn thì gọi hàm refresh token
      const newToken = await refreshTokenFunc(req, res);
      return res;
    }
  }
}
