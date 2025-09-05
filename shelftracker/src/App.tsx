import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/common/ProtectedRoute.tsx";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ScanScreen from "./screens/ScanScreen";
import SettingsScreen from "./screens/SettingsScreen.tsx";
import ProtectedLayout from "./layouts/ProtectedLayout";
import {CartProvider} from "./context/CartContext.tsx";
import CartScreen from "./screens/CartScreen.tsx";
import CheckoutScreen from "./screens/CheckoutScreen.tsx";
import EquipmentDetailScreen from "./screens/EquipmentDetailScreen.tsx";

import "./global.css";
import EquipmentCreateScreen from "./screens/EquipmentCreateScreen.tsx";
import EquipmentEditScreen from "./screens/EquipmentEditScreen.tsx";
import CreateProfileScreen from "./screens/CreateProfileScreen.tsx";
import CalendarScreen from "./screens/CalendarScreen.tsx";

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
                                    <SettingsScreen />
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
                        <Route path="/ShelfTracker/equipment/:id" element={
                            <ProtectedRoute>
                                <ProtectedLayout>
                                    <EquipmentDetailScreen />
                                </ProtectedLayout>
                            </ProtectedRoute>
                        } />
                        <Route path="/ShelfTracker/equipment/edit/:id" element={
                            <ProtectedRoute>
                                <ProtectedLayout>
                                    <EquipmentEditScreen />
                                </ProtectedLayout>
                            </ProtectedRoute>
                        } />
                        <Route path="/ShelfTracker/equipment/new" element={
                            <ProtectedRoute>
                                <ProtectedLayout>
                                    <EquipmentCreateScreen />
                                </ProtectedLayout>
                            </ProtectedRoute>
                        } />
                        <Route path="/ShelfTracker/create-profile" element={
                            <ProtectedRoute>
                                <ProtectedLayout>
                                    <CreateProfileScreen />
                                </ProtectedLayout>
                            </ProtectedRoute>
                        } />
                        <Route path="/ShelfTracker/calendar" element={
                            <ProtectedRoute>
                                <ProtectedLayout>
                                    <CalendarScreen />
                                </ProtectedLayout>
                            </ProtectedRoute>
                        } />
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
}
