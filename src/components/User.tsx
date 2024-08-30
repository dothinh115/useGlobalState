"use client"
import { TUser } from "@/app/api/me/route";
import { useGlobalState } from "@/hooks/useGlobalState";
import { USER } from "@/utils/constant";

export default function User () {
    const [user] = useGlobalState<TUser>(USER);

    return (<div>
        route dc protect 
        <br />
        Email user: {user?.email}
    </div>)
}