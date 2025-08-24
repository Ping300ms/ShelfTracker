import {useAuth} from "../hooks/AuthHook.ts";
import TopBar from "../components/common/TopBar.tsx";

function ProfileScreen() {
    const { user, signOut } = useAuth();
    return (
        <div>
            <TopBar title={"Profil"}/>
            {user && <p>Email : {user.email}</p>}
            <button onClick={signOut}>Se déconnecter</button>
        </div>
    );
}
export default ProfileScreen;