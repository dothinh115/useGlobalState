"use client"
import withProtection from "@/hoc/Protected";
import { useGlobalState } from "@/hooks/useGlobalState";
import { TUser } from "@/types/user";
import { USER } from "@/utils/constant";

 function User () {
    const [user] = useGlobalState<TUser>(USER);

    return (<div>
        route dc protect 
        <br />
        Email user: {user?.email}
    </div>)
}

export default withProtection(User)