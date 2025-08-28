import { useAuth } from "../hooks/AuthHook.ts";
import TopBar from "../components/common/TopBar.tsx";
import "../styles/Settings.css";
import {useCart} from "../hooks/CartHook.ts";
import EquipmentQR from "../components/common/EquipmentQR.tsx";

function SettingsScreen() {
    const { user, signOut } = useAuth();
    const { cart } = useCart();

    return (
        <div className="profile-container">
            <TopBar title="Paramètres" />

            <div className="profile-card">
                {user && (
                    <>
                        <h2 className="profile-title">Profil</h2>
                        <p className="profile-email">{user.email}</p>
                        <button className="logout-btn" onClick={signOut}>
                            Se déconnecter
                        </button>
                    </>
                )}
            </div>

            <div className="profile-card">
                {user && (
                    <>
                        <h2 className="profile-title">QR Codes</h2>

                    </>
                )}
            </div>
            {cart.length > 0 && <EquipmentQR equipment={cart[0]} />}
        </div>
    );
}

export default SettingsScreen;
