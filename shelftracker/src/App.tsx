import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/common/ProtectedRoute.tsx";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SignupScreen from "./screens/SignupScreen";
import ScanScreen from "./screens/ScanScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProtectedLayout from "./layouts/ProtectedLayout";
import {CartProvider} from "./context/CartContext.tsx";
import CartScreen from "./screens/CartScreen.tsx";
import CheckoutScreen from "./screens/CheckoutScreen.tsx";

export default function App() {
    return (
        <AuthProvider>
            <CartProvider>
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
                        <Route path="/ShelfTracker/cart" element={
                            <ProtectedRoute>
                                <ProtectedLayout>
                                    <CartScreen/>
                                </ProtectedLayout>
                            </ProtectedRoute>
                        } />
                        <Route path="/ShelfTracker/checkout" element={
                            <ProtectedRoute>
                                <ProtectedLayout>
                                    <CheckoutScreen/>
                                </ProtectedLayout>
                            </ProtectedRoute>
                        } />
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
}
