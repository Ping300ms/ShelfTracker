import { LoginForm } from "../components/loginScreen/LoginForm.tsx";
import { NavLink } from "react-router-dom";
import "../styles/Glass.css";

function LoginScreen() {
    return (
        <div className="root">
            <div className="card">
                <h2 className="title">Connexion</h2>
                <LoginForm />
                <div className="footer">
                    <span>Pas de compte ?</span>
                    <NavLink className="link" to="/ShelfTracker/signup" end>
                        S'inscrire
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;
