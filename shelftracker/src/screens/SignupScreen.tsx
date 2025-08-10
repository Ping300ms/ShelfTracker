import { SignupForm } from "../components/SignupForm";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthHook";

function SignupScreen() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    if (loading) return <div>Chargement...</div>;

    if (user) {
        // Déjà connecté → on redirige directement vers l'accueil
        navigate("/ShelfTracker");
        return null;
    }

    return (
        <div>
            <SignupForm onSuccess={() => navigate("/ShelfTracker")} />
            <NavLink to="/ShelfTracker">Déjà un compte ? Se connecter</NavLink>
        </div>
    );
}

export default SignupScreen;
