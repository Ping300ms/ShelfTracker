import React, { useState } from "react";
import { useAuth } from "../../hooks/AuthHook.ts";

interface SignupFormProps {
    onSuccess?: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }) => {
    const { signUp } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            await signUp(email, password);
            setSuccess("Compte créé avec succès. Vérifiez vos emails pour confirmer.");
            if (onSuccess) onSuccess();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Une erreur inconnue est survenue");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
            />
            <input
                type="password"
                placeholder="Mot de passe"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
            />
            <button type="submit">S'inscrire</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </form>
    );
};
