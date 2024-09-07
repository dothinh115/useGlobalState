import { serverFetch } from "@/utils/api";
import AppWrapper from "@/components/AppWrapper";
import "./globals.css";
import { TUser } from "@/types/user";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user: TUser | null = null;
  
  try {
    const {data: fetchedUser} = await serverFetch<{data: {data:TUser}}>(`api/me`);
    user = fetchedUser.data
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
  return (
      <AppWrapper user={null} >
      {children}
      </AppWrapper>

  );
}
