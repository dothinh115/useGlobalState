import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log(pathname);
  return NextResponse.next();
}
export const config = {
  matcher: "/(.*)/api/(.*)/", // */api/*
};
