import { LoginForm } from "../components/loginScreen/LoginForm.tsx";

function LoginScreen() {
    return (
        <div className="root">
            <div className="card centered">
                <h2 className="title">Connexion</h2>
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginScreen;
