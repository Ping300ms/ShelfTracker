import type { User } from "@supabase/supabase-js";

interface ProfileCardProps {
    user: User | null;
    onSignOut: () => void;
}

function SettingsProfile({ user, onSignOut }: ProfileCardProps) {
    if (!user) return null;

    return (
        <div className="card">
            <h2>Profil</h2>
            <p>{user.email}</p>
            <button className="btn" onClick={onSignOut}>
                Se déconnecter
            </button>
        </div>
    );
}

export default SettingsProfile;
