import User from "@/components/User";
import Protected from "@/hoc/Protected";

async function ProtectedPage () {
    return (
        <User />
    )
}

export default Protected(ProtectedPage)