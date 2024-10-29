import AppWrapper from "@/components/AppWrapper";
import "./globals.css";
import { TUser } from "@/types/user";
import React from "react";
import { getUser } from "@/utils/getUser";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user: TUser | null = await getUser();

  return (
    <AppWrapper user={user}>
      <div className="p-5">{children}</div>
    </AppWrapper>
  );
}

export const dynamic = "force-dynamic";
