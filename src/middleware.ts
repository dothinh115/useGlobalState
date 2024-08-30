import { NextResponse, type NextRequest } from "next/server";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  TOKEN_EXPIRED_TIME,
} from "@/utils/constant";
import { jwtDecode } from "jwt-decode";

const staticFileExtensions =
  /\.(jpg|jpeg|png|gif|svg|ico|css|js|woff|woff2|ttf|eot|js|css)$/i;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const expTime = req.cookies.get(TOKEN_EXPIRED_TIME); //lấy exp time để so sánh
  const refreshToken = req.cookies.get(REFRESH_TOKEN); //lấy refresh token
  const currentTime = Math.floor(Date.now() / 1000);

  if (/\/api\//.test(pathname)) {
    //khi đi vào /api/
    const headers = req.headers;

    /*
      Khi đi vào api thì có 2 trường hợp, 1 là client gọi, và 2 là server gọi
      Nếu là server gọi thì ko cần phải check token vì nó đã được refresh và đưa vào 
      headers ở đoạn code bên dưới, ở đây chỉ cần check client gọi, nếu ở client gọi
      mà token hết hạn, thì cũng refresh và đưa vào headers để đồng nhất code sẽ bắt ở server

      //headers không được có new-token, nếu có thì đã được refresh ở bên dưới
      if(headers['new-token] && (!expTime || (expTime && Number(expTime) < currentTime))) {
        //logic tương tự như bên dưới
      }
    */
  } else if (staticFileExtensions.test(pathname)) {
    // console.log("File tĩnh");
  } else {
    if (!expTime || (expTime && Number(expTime) < currentTime)) {
      //Token hết hạn, gọi refresh token
      console.log("Token hết hạn, gọi refresh token");
      const res = NextResponse.next();

      /* 
        ở đây đi vào route thực sự, ví dụ như là /protected, route này phải có user mới dc truy cập
        cho nên ở đây sẽ gọi /api/me trước khi trả về kết quả cho client, cần truyền, nếu ở đây token
        đã hết hạn thì ví dụ code như sau:

        const newAccessToken = await refreshTokenFunction(); // lấy accessToken mới

        //decode token mới và lấy ra exp time của nó và set vào cookie
        const accessTokenDecoded: any = jwtDecode(newAccessToken);
        const accessTokenExpires = new Date(accessTokenDecoded.exp * 1000);

        //set token mới vào response để trả về client

        res.cookies.set(ACCESS_TOKEN, newAccessToken, {
          httpOnly: true,
          secure: true,
          expires: accessTokenExpires,
          sameSite: "lax",
        });

        res.cookies.set(TOKEN_EXPIRED_TIME, accessTokenDecoded.exp, {
          httpOnly: true,
          secure: true,
          expires: accessTokenExpires,
          sameSite: "lax",
        });

        //gắn token mới vào headers để server bắt dc và gắn vào authorization
        res.headers.set('new-token', newAccessToken)
      */
    }
  }
}
