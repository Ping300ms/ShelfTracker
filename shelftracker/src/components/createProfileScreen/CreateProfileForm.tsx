import type {NewProfile} from "../../types/Profile.ts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProfil } from "../../api/ProfilesApi.ts";

function CreateProfileScreen() {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            alert("Le nom est obligatoire.");
            return;
        }

        setLoading(true);
        try {
            const newProfile: NewProfile = { name };
            await createProfil(newProfile);
            navigate("/ShelfTracker/checkout"); // redirection après ajout
        } catch (err) {
            console.error(err);
            alert("Impossible de créer le profil.");
        } finally {
            setLoading(false);
        }
    };

    return (
            <form onSubmit={handleSubmit} className="card form-card">
                <label className="form-label">
                    Nom
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input"
                        placeholder="Entrez le nom du profil"
                    />
                </label>

                <button type="submit" className="btn" disabled={loading}>
                    {loading ? "Création..." : "Créer le profil"}
                </button>
            </form>
    );
}

export default CreateProfileScreen;
