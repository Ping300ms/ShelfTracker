import type {Profile} from "../../types/Profile";

interface ProfileSelectorProps {
    profiles: Profile[];
    selectedProfile: number | "";
    onChange: (value: number | "create") => void;
}

export function ProfileSelector({ profiles, selectedProfile, onChange }: ProfileSelectorProps) {
    return (
        <div className="profile-selector">
            <label>
                Profil
                <select
                    value={selectedProfile}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === "create") onChange("create");
                        else onChange(Number(value));
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
