import { serverFetch } from "@/utils/api";
import AppWrapper from "@/components/AppWrapper";
import "./globals.css";
import { TUser } from "@/types/user";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: {data: TUser} = await serverFetch(`${process.env.API_URL}/api/me`);
  return (
    <AppWrapper user={user.data ?? null} >
     {children}
     </AppWrapper>
  );
}
