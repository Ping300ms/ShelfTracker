import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SignupScreen from "./screens/SignupScreen";
import ScanScreen from "./screens/ScanScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProtectedLayout from "./layouts/ProtectedLayout";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public */}
                    <Route path="/ShelfTracker/login" element={
                            <LoginScreen />
                    } />
                    <Route path="/ShelfTracker/signup" element={
                            <SignupScreen />
                    } />

                    {/* Privé */}
                    <Route path="/ShelfTracker" element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <HomeScreen />
                            </ProtectedLayout>
                        </ProtectedRoute>
                    } />
                    <Route path="/ShelfTracker/scan" element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <ScanScreen />
                            </ProtectedLayout>
                        </ProtectedRoute>
                    } />
                    <Route path="/ShelfTracker/profile" element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <ProfileScreen />
                            </ProtectedLayout>
                        </ProtectedRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
