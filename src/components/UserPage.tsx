"use client";
import { useGlobalState } from "@/hooks/useGlobalState";
import { TUser } from "@/types/user";
import { clientFetch } from "@/utils/clientFetch";
import { USER } from "@/utils/constant";
import { useState } from "react";

function UserPage() {
  const [user] = useGlobalState<TUser>(USER);
  const [clientUser, setClientUser] = useState<TUser | null>(null);
  const handleClientFetch = async () => {
    const { data } = await clientFetch<{ data: { data: TUser } }>("api/me");
    setClientUser(data.data);
  };
  return (
    <div>
      route dc protect
      <br />
      Email user: {user?.email}
      <br />
      <button className="p-1 bg-white text-black" onClick={handleClientFetch}>
        Click để fetch ở client
      </button>
      <br />
      Data fetch từ client: {clientUser?.email}
    </div>
  );
}

export default UserPage;
