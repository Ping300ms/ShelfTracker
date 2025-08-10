import { useAuth } from "../hooks/AuthHook";
import { LoginForm } from "../components/LoginForm";
import { NavLink } from "react-router-dom";

function LoginScreen() {
    const { loading } = useAuth();

    if (loading) return <div>Chargement...</div>;

        return (
            <div>
                <LoginForm/>
                <NavLink to="/ShelfTracker/signup" end>
                    S'inscrire
                </NavLink>
            </div>
        );
}

export default LoginScreen;
