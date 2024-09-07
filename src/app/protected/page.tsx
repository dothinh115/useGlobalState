import User from "@/components/User";
import { TUser } from "@/types/user";

type TProps = {
  user: TUser | null
}

const ProtectedPage = ({user}: TProps) => {
  return (
    <User />
  );
};

export default (ProtectedPage);
