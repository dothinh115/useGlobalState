import { TUser } from "@/types/user";
import serverFetch from "./serverFetch";

export const getUser = async () => {
  try {
    const { data: fetchedUser } = await serverFetch<{ data: { data: TUser } }>(
      `api/me`
    );
    return fetchedUser.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
  return null;
};
