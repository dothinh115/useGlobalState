"use client"
import { useGlobalState } from "@/hooks/useGlobalState"

export default function Test() {
    const [user] = useGlobalState('user');
    return (
        <div>
            {user}
        </div>
    )
}
