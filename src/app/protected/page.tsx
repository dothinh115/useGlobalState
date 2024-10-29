import UserPage from "@/components/UserPage";
import { TUser } from "@/types/user";
import { getUser } from "@/utils/getUser";
import { redirect } from "next/navigation";

const ProtectedPage = async () => {
  let user: TUser | null = await getUser();
  if (!user) return redirect("/");
  return <UserPage />;
};

export default ProtectedPage;
