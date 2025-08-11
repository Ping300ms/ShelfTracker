import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SignupScreen from "./screens/SignupScreen";
import { ProtectedRoute } from "./components/ProtectedRoute";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/ShelfTracker/login" element={<LoginScreen />} />
                    <Route path="/ShelfTracker/signup" element={<SignupScreen />} />

                    <Route
                        path="/ShelfTracker/"
                        element={
                            <ProtectedRoute>
                                <HomeScreen />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
