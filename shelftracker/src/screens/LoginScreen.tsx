import { LoginForm } from "../components/loginScreen/LoginForm.tsx";
import "../styles/Login.css";

function LoginScreen() {
    return (
        <div className="root">
            <div className="card">
                <h2 className="title">Connexion</h2>
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginScreen;
