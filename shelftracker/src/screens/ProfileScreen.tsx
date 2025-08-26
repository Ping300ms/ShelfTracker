import { useAuth } from "../hooks/AuthHook.ts";
import TopBar from "../components/common/TopBar.tsx";
import "../styles/Profile.css";
import {useCart} from "../hooks/CartHook.ts";
import EquipmentQR from "../components/common/EquipmentQR.tsx";

function ProfileScreen() {
    const { user, signOut } = useAuth();
    const { cart } = useCart();

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
            {cart.length > 0 && <EquipmentQR equipment={cart[0]} />}
        </div>
    );
}

export default ProfileScreen;
