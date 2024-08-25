"use client"
import { useGlobalState } from "@/hooks/useGlobalState"
import { USER } from "@/utils/constant";

export default function Test() {
    const [user] = useGlobalState(USER);
    return (
        <div>
            {user}
        </div>
    )
}
