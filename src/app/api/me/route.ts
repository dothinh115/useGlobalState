import { NextResponse } from "next/server";

export type TUser = {
  id: number;
  email: string;
};

export async function GET() {
  // Thông tin người dùng giả
  const user: TUser = {
    id: 1,
    email: "user@example.com",
  };

  // Trả về thông tin người dùng dưới dạng JSON
  return NextResponse.json(user);
}
