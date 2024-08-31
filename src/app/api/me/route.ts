import { TUser } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  //ở đây bắt accessToken và gắn vào headers

  // Thông tin người dùng giả
  const user: TUser = {
    id: "abc",
    email: "user@example.com",
    isEditedUsername: false,
    role: 1,
    rootUser: false,
    username: "user",
  };

  const authorize = true; // true: đã login, thay đổi phải refresh để lấy lại giá trị mới từ server

  let response: any = unauthorizeRes();

  if (authorize) {
    response = successRes(user);
  }
  return NextResponse.json(response);
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
