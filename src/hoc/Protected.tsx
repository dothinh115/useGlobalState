"use client"
import { useGlobalState } from "@/hooks/useGlobalState"
import { USER } from "@/utils/constant"
import { redirect } from "next/navigation";

export default function Protected <P extends JSX.IntrinsicAttributes>(WrappedComponent: React.ComponentType<P>) {
    const [user] = useGlobalState(USER);
    if(!user) return redirect('/')
    return (props: P) => {
        return (<WrappedComponent {...props}/>)
    }
}