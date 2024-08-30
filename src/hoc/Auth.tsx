import { fetchUser } from "@/utils/common";
import { redirect } from "next/navigation";

const Auth = (Component: React.ComponentType<any>) => {
    const AuthenticatedComponent:React.FC = async  (props: any) => {
        const user = await fetchUser();
        if(!user) {
            return redirect('/')
        }
        return <Component {...props} user={user} />
    }
    return AuthenticatedComponent

}

export default Auth