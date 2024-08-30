import Auth from "@/hoc/Auth"
import { TUser } from "../api/me/route"
type TProps= {
    user: TUser
}
 function Protected ({user}: TProps) {
    return (<div>
        route dc protect 
        <br />
        Email user: {user.email}
    </div>)
}

export default Auth(Protected)