// src/routes/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthHook";

export function ProtectedRoute() {
    const { user } = useAuth();

    if (user === null)
        return <Navigate to="/ShelfTracker/login" replace />;
}
