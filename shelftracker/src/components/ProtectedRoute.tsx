// ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthHook";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Chargement...</div>; // ou un spinner
    }

    if (!user) {
        return <Navigate to="/ShelfTracker/login" replace />;
    }

    return <>{children}</>;
};
