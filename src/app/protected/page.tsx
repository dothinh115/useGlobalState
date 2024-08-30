
import User from "@/components/User";
import {  serverUserFetch } from "@/utils/common";
import { redirect } from "next/navigation";

async function Protected () {
    const user = await serverUserFetch();
    if(!user) return redirect("/")
    return (<>
        <User />
    </>)
}

export default (Protected)