// src/components/LoginForm.tsx
import React, { useState } from "react";
import { useAuth } from "../../hooks/AuthHook.ts";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

interface LoginFormProps {
    onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = () => {
    const { signIn } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await signIn(email, password);
            await navigate("/ShelfTracker");
        } catch (err: unknown) {
            if (err instanceof Error) setError(err.message);
            else setError("Une erreur inconnue est survenue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form className="login-form__container" onSubmit={handleSubmit} aria-live="polite">
                <input
                    className="login-form__input"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <input
                    className="login-form__input"
                    type="password"
                    placeholder="Mot de passe"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button className="btn" type="submit" disabled={loading}>
                    {loading ? "Chargement..." : "Se connecter"}
                </button>
            </form>
            {error && <p className="error" role="alert">{error}</p>}
        </>
    );
};
