// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthHook";

export function ProtectedRoute() {
    const { user, loading } = useAuth();

    if (loading) return <p>Chargement...</p>;

    return user ? <Outlet /> : <Navigate to="/login" replace />;
}
