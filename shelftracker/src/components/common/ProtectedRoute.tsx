// ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthHook.ts";
import {Loader} from "./Loader.tsx";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loader/>; // ou un spinner
    }

    if (!user) {
        return <Navigate to="/ShelfTracker/login" replace />;
    }

    return <>{children}</>;
};
