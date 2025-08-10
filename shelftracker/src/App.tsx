// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen  from "./screens/HomeScreen";
import SignupScreen from "./screens/SignupScreen.tsx";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/ShelfTracker/login" element={<LoginScreen />} />
                    <Route path="/ShelfTracker/signup" element={<SignupScreen/>} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/ShelftTracker" element={<HomeScreen />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/ShelfTracker/login" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
