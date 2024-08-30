import { ACCESS_TOKEN } from "@/utils/constant";
import { NextRequest, NextResponse } from "next/server";

export type TUser = {
  id: number;
  email: string;
};

export async function GET(req: NextRequest) {
  // Thông tin người dùng giả
  const user: TUser = {
    id: 1,
    email: "user@example.com",
  };

  const authorize = true; // true: đã login, thay đổi phải refresh để lấy lại giá trị mới từ server

  let response: any = unauthorizeRes();

  if (authorize) {
    response = successRes(user);
  }
  return NextResponse.json(response);
  /*
    Ở đây sẽ bắt accessToken, ví dụ
    const accessToken = req.headers['new-token'] ??  req.cookies.get(ACCESS_TOKEN)
    await sendProxy(target, {
      headers : {
        authorization: 'Bearer' + accessToken
      }
  })
  */
}

const successRes = (data: any, statusCode = 200, message = "success") => {
  return {
    data,
    statusCode,
    message,
  };
};

const unauthorizeRes = (statusCode = 401, message = "Unauthorize") => {
  return {
    statusCode,
    message,
  };
};
