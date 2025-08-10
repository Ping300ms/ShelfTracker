import React, { useState } from "react";
import { useAuth } from "../hooks/AuthHook";
import { useNavigate } from "react-router-dom";


interface LoginFormProps {
    onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = () => {
    const { signIn } = useAuth();
    const [email, setEmail] =
        useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await signIn(email, password);
            await navigate("/ShelfTracker");
            console.log("OK");
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
            <button type="submit">Se connecter</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
};
