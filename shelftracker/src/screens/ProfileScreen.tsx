import { useAuth } from "../hooks/AuthHook.ts";
import TopBar from "../components/common/TopBar.tsx";
import "../styles/Profile.css";

function ProfileScreen() {
    const { user, signOut } = useAuth();

    return (
        <div className="profile-container">
            <TopBar title="Profil" />

            <div className="profile-card">
                {user && (
                    <>
                        <p className="profile-email">{user.email}</p>
                        <button className="logout-btn" onClick={signOut}>
                            Se déconnecter
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default ProfileScreen;
