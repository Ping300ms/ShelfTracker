import type {Profile} from "../../types/Profile";
import "./ProfileSelector.css";

interface ProfileSelectorProps {
    profiles: Profile[];
    selectedProfile: string | "";
    onChange: (value: string | "create") => void;
}

export function ProfileSelector({ profiles, selectedProfile, onChange }: ProfileSelectorProps) {
    return (
        <div className="profile-selector__container">
            <label className="profile-selector__label">
                Profil
                <select
                    value={selectedProfile}
                    className="profile-selector__select"
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === "create") onChange("create");
                        else onChange(value);
                    }}
                >
                    {profiles.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.name}
                        </option>
                    ))}
                    <option value="create">+ Ajouter un profil</option>
                </select>
            </label>
        </div>
    );
}
