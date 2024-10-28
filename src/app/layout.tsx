import AppWrapper from "@/components/AppWrapper";
import "./globals.css";
import { TUser } from "@/types/user";
import serverFetch from "@/utils/serverFetch";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user: TUser | null = null;

  try {
    const { data: fetchedUser } = await serverFetch<{ data: { data: TUser } }>(
      `api/me`
    );
    user = fetchedUser.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
  return (
    <AppWrapper user={user}>
      <div className="p-5">{children}</div>
    </AppWrapper>
  );
}
