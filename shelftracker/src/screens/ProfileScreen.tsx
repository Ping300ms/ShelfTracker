import {useAuth} from "../hooks/AuthHook.ts";

function ProfileScreen() {
    const { user, signOut } = useAuth();
    return (
        <div>
            <h1>Profil</h1>
            {user && <p>Email : {user.email}</p>}
            <button onClick={signOut}>Se déconnecter</button>
        </div>
    );
}
export default ProfileScreen;