import { useAuth } from "../hooks/AuthHook.ts";
import TopBar from "../components/common/TopBar.tsx";
import SettingsProfile from "../components/settingsScreen/SettingsProfile.tsx";
import SettingsQRCodes from "../components/settingsScreen/SettingsQRCodes.tsx";

function SettingsScreen() {
    const { user, signOut } = useAuth();

    return (
        <div>
            <TopBar title="Paramètres" />

            <SettingsProfile user={user} onSignOut={signOut} />
            <SettingsQRCodes user={user}/>
        </div>
    );
}

export default SettingsScreen;
